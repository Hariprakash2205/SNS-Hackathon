import os
import json
import base64
import tempfile
import pandas as pd
import streamlit as st
from dotenv import load_dotenv
from sarvamai import SarvamAI
from google import genai
from google.genai import types
from pydantic import BaseModel
from audio_recorder_streamlit import audio_recorder

# -------------------------------------------------------------------
# Configuration & Setup
# -------------------------------------------------------------------
load_dotenv()

st.set_page_config(page_title="Voice Scheme Assistant", page_icon="🎙️", layout="centered")

# Initialize API Clients
sarvam_client = SarvamAI(api_subscription_key=os.getenv("SARVAM_API_KEY"))
gemini_client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# -------------------------------------------------------------------
# Data Models
# -------------------------------------------------------------------
class UserDetails(BaseModel):
    age: int
    income: int
    occupation: str

# -------------------------------------------------------------------
# Core Functions
# -------------------------------------------------------------------

@st.cache_data
def load_data(csv_path="Schemes Datast.csv"):
    """Loads the dataset once and caches it for performance."""
    try:
        df = pd.read_csv(csv_path)
        # Fill missing text values to avoid pandas errors
        df = df.fillna("")
        return df
    except FileNotFoundError:
        st.error(f"Could not find {csv_path}. Make sure it is in the same folder as this script.")
        return pd.DataFrame()

def get_candidate_schemes(df: pd.DataFrame, occupation: str, top_n: int = 5) -> list:
    """Uses Pandas to find a shortlist of schemes based on occupation keywords."""
    if df.empty:
        return []
        
    if occupation and occupation.lower() not in ["unknown", "none", "", "0"]:
        # Search for the occupation in tags, category, and eligibility
        mask = (
            df['tags'].str.contains(occupation, case=False, na=False) |
            df['schemeCategory'].str.contains(occupation, case=False, na=False) |
            df['eligibility'].str.contains(occupation, case=False, na=False)
        )
        candidates = df[mask]
    else:
        # If no specific occupation was extracted, just grab general welfare schemes
        candidates = df.head(top_n)

    # Take the top N results to avoid overwhelming the LLM prompt
    candidates = candidates.head(top_n)
    
    # Return only the columns the LLM needs to read
    if not candidates.empty:
        return candidates[['scheme_name', 'benefits', 'eligibility']].to_dict(orient="records")
    return []

def speech_to_text_and_translate(audio_file_path: str):
    """Transcribes short regional audio instantly to English using Sarvam Synchronous API."""
    response = sarvam_client.speech_to_text.transcribe(
        file=open(audio_file_path, "rb"),
        model="saaras:v3",
        mode="translate" 
    )
    return response.transcript, response.language_code

def extract_entities_from_text(english_text: str) -> dict:
    """Uses Gemini to extract Age, Income, and Occupation into JSON."""
    prompt = f"Extract the user's age, income, and occupation from the following text: {english_text}. If a value is missing, guess a reasonable default or use 0/Unknown."
    
    response = gemini_client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=UserDetails,
            temperature=0.1 # Low temperature for factual extraction
        ),
    )
    return json.loads(response.text)

def evaluate_and_generate_response(schemes: list, lang_code: str, user_info: dict) -> str:
    """Gemini acts as a judge: It reads the text eligibility, filters, and writes the response."""
    if not schemes:
        return "I could not find any specific schemes for your occupation at the moment."
        
    prompt = f"""
    You are a helpful and empathetic government assistant. 
    User Profile: Age {user_info.get('age')}, Income {user_info.get('income')}, Occupation {user_info.get('occupation')}.
    
    Here is a shortlist of schemes and their exact eligibility rules:
    {json.dumps(schemes, indent=2)}
    
    Task 1: Read the 'eligibility' rules carefully. Ignore any schemes where the user explicitly does NOT meet the age or income requirements mentioned.
    Task 2: Write a conversational, brief response summarizing ONLY the schemes the user is eligible for, and mention the 'benefits'.
    Task 3: If they don't qualify for any of the listed schemes based on the text, politely tell them so.
    
    CRITICAL: You MUST translate your final response into the language matching the BCP-47 code: {lang_code}.
    Do NOT include any English text or markdown formatting (like ** or *). Return purely spoken text.
    """
    
    response = gemini_client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt
    )
    return response.text.strip()

def text_to_speech(text: str, lang_code: str) -> bytes:
    """Converts the localized text back into audio using Sarvam TTS."""
    response = sarvam_client.text_to_speech.convert(
        target_language_code=lang_code,
        text=text,
        model="bulbul:v3",
        speaker="shubh" # Options: anushka, shubh, etc.
    )
    
    audio_base64 = response.audios[0]
    return base64.b64decode(audio_base64)

# -------------------------------------------------------------------
# Streamlit UI
# -------------------------------------------------------------------

st.title("🎙️ Multi-Lingual Scheme Assistant")
st.write("Click the microphone icon and tell me your **Age**, **Income**, and **Occupation** in your native language.")

# Load CSV into memory
df_schemes = load_data("Schemes Datast.csv")

# 1. Capture Audio Input
audio_bytes = audio_recorder(text="Click to speak...", icon_size="2x")

if audio_bytes:
    st.audio(audio_bytes, format="audio/wav")
    
    # Save temporarily for the Sarvam SDK
    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_audio:
        temp_audio.write(audio_bytes)
        temp_audio_path = temp_audio.name

    with st.spinner("Processing your audio..."):
        try:
            # 2. STT & Translation
            st.toast("Transcribing audio...")
            english_transcript, lang_code = speech_to_text_and_translate(temp_audio_path)
            
            if not lang_code:
                lang_code = "hi-IN" # Default to Hindi to prevent TTS failure
                
            st.info(f"**Detected Intent (Translated):** {english_transcript}\n\n**Detected Language:** {lang_code}")
            
            # 3. Entity Extraction
            st.toast("Extracting details...")
            user_info = extract_entities_from_text(english_transcript)
            st.json(user_info)
            
            # 4. Pandas Fast Search (Candidate Generation)
            st.toast("Searching database...")
            candidate_schemes = get_candidate_schemes(df_schemes, occupation=user_info.get('occupation', ''))
            
            # 5. LLM Evaluation & Response Generation
            st.toast("Evaluating eligibility & generating response...")
            localized_reply = evaluate_and_generate_response(candidate_schemes, lang_code, user_info)
            st.success(f"**Bot Response:** {localized_reply}")
            
            # 6. TTS Generation
            st.toast("Synthesizing speech...")
            output_audio_bytes = text_to_speech(localized_reply, lang_code)
            st.audio(output_audio_bytes, format="audio/wav", autoplay=True)
            
        except Exception as e:
            st.error(f"An error occurred: {str(e)}")
            
    # Clean up temp file
    if os.path.exists(temp_audio_path):
        os.remove(temp_audio_path)