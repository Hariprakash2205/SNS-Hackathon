/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Menu, 
  UserCircle2, 
  Search, 
  PlusSquare, 
  Users, 
  Tractor, 
  GraduationCap, 
  Mic, 
  Home, 
  FileText, 
  Bell, 
  Settings,
  ArrowRight,
  ArrowLeft,
  Info,
  Landmark,
  Keyboard,
  X,
  User,
  Languages,
  ClipboardCheck,
  Volume2,
  Share2,
  IdCard,
  ReceiptText,
  Wallet,
  Smile,
  Phone,
  LayoutGrid,
  Bookmark
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

type Screen = 'home' | 'assistant' | 'detail';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-[430px] h-[884px] bg-white shadow-2xl overflow-hidden relative flex flex-col rounded-none sm:rounded-[3rem]">
        <AnimatePresence mode="wait">
          {currentScreen === 'home' && (
            <HomeScreen key="home" onStartAssistant={() => setCurrentScreen('assistant')} onOpenDetail={() => setCurrentScreen('detail')} />
          )}
          {currentScreen === 'assistant' && (
            <AssistantScreen key="assistant" onBack={() => setCurrentScreen('home')} />
          )}
          {currentScreen === 'detail' && (
            <SchemeDetailScreen key="detail" onBack={() => setCurrentScreen('home')} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function HomeScreen({ onStartAssistant, onOpenDetail }: { onStartAssistant: () => void; onOpenDetail: () => void; key?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col h-full bg-white overflow-hidden"
    >
      {/* Header */}
      <header className="flex-none flex items-center justify-between px-6 py-4 bg-white sticky top-0 z-10">
        <button className="p-2 -ml-2 text-primary hover:bg-blue-50 rounded-full transition-colors">
          <Menu size={28} />
        </button>
        <h1 className="text-xl font-bold text-navy-accent font-display">Sarakar Sahay</h1>
        <button className="p-2 -mr-2 text-primary hover:bg-blue-50 rounded-full transition-colors">
          <UserCircle2 size={28} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 pb-32 overflow-y-auto">
        <section className="mt-6 mb-8">
          <h2 className="text-3xl font-bold text-navy-accent leading-tight font-display">
            Welcome to Sarakar Sahay
          </h2>
          <p className="mt-2 text-slate-500 text-lg">
            Find government schemes easily with your voice.
          </p>
        </section>

        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="text-slate-400" size={20} />
          </div>
          <input
            type="text"
            placeholder="Search for schemes..."
            className="w-full py-4 pl-12 pr-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        <div className="space-y-6">
          <motion.div whileHover={{ y: -4 }} className="bg-[#EEF2FF] rounded-3xl overflow-hidden shadow-sm border border-blue-50">
            <div className="h-32 flex items-center justify-center bg-[#E0E7FF]">
              <div className="p-4 bg-primary rounded-xl text-white shadow-lg">
                <PlusSquare size={40} />
              </div>
            </div>
            <div className="p-6 bg-white">
              <h3 className="text-xl font-bold text-navy-accent font-display">Healthcare & Wellness</h3>
              <p className="mt-2 text-slate-500 leading-relaxed">
                Medical kits, health insurance, and free clinics for rural areas.
              </p>
              <button 
                onClick={onOpenDetail}
                className="mt-6 w-full py-4 bg-primary text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-md active:scale-95"
              >
                View Schemes <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} className="bg-[#F0FDF4] rounded-3xl overflow-hidden shadow-sm border border-green-50">
            <div className="h-32 flex items-center justify-center bg-[#DCFCE7]">
              <div className="p-4 text-green-600">
                <Users size={64} strokeWidth={1.5} />
              </div>
            </div>
            <div className="p-6 bg-white">
              <h3 className="text-xl font-bold text-navy-accent font-display">Social Harmony & Digital Activism</h3>
              <p className="mt-2 text-slate-500 leading-relaxed">
                Community development programs and digital literacy training.
              </p>
              <button 
                onClick={onOpenDetail}
                className="mt-6 w-full py-4 bg-primary text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-md active:scale-95"
              >
                View Schemes <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8 mb-4">
          <button className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:bg-slate-50 transition-colors group">
            <div className="p-3 bg-blue-50 rounded-2xl text-primary group-hover:bg-blue-100 transition-colors mb-3">
              <Tractor size={32} />
            </div>
            <span className="font-bold text-navy-accent font-display">Farming</span>
          </button>
          <button className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:bg-slate-50 transition-colors group">
            <div className="p-3 bg-blue-50 rounded-2xl text-primary group-hover:bg-blue-100 transition-colors mb-3">
              <GraduationCap size={32} />
            </div>
            <span className="font-bold text-navy-accent font-display">Education</span>
          </button>
        </div>
      </main>

      {/* Voice Search Button */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={onStartAssistant}
          className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white shadow-xl border-8 border-white hover:bg-blue-700 transition-colors"
        >
          <Mic size={32} />
        </motion.button>
        <span className="mt-2 text-primary font-bold text-sm bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full font-display">Tap & Speak</span>
      </div>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-3 flex items-center justify-between z-10">
        <button className="flex flex-col items-center gap-1 text-primary">
          <Home size={24} />
          <span className="text-[10px] font-bold uppercase tracking-wider font-display">Home</span>
        </button>
        <button 
          onClick={onOpenDetail}
          className="flex flex-col items-center gap-1 text-slate-400"
        >
          <FileText size={24} />
          <span className="text-[10px] font-bold uppercase tracking-wider font-display">Schemes</span>
        </button>
        <div className="w-16" />
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <Bell size={24} />
          <span className="text-[10px] font-bold uppercase tracking-wider font-display">Alerts</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <Settings size={24} />
          <span className="text-[10px] font-bold uppercase tracking-wider font-display">Settings</span>
        </button>
      </nav>
    </motion.div>
  );
}

function AssistantScreen({ onBack }: { onBack: () => void; key?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex flex-col h-full bg-background-light overflow-hidden font-display"
    >
      {/* Header */}
      <div className="flex-none flex items-center bg-background-light p-4 border-b border-primary/10 justify-between sticky top-0 z-10">
        <button onClick={onBack} className="text-navy-accent flex size-12 shrink-0 items-center justify-center cursor-pointer hover:bg-black/5 rounded-full transition-colors">
          <ArrowLeft size={28} />
        </button>
        <h2 className="text-navy-accent text-xl font-bold leading-tight tracking-tight flex-1 text-center">Sarakar Sahay</h2>
        <div className="flex w-12 items-center justify-end">
          <button className="flex items-center justify-center rounded-xl h-12 bg-transparent text-navy-accent p-0 hover:bg-black/5 w-12 transition-colors">
            <Info size={28} />
          </button>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth">
        {/* Assistant Message */}
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 flex items-center justify-center rounded-full size-10 shrink-0 border border-primary/20">
            <Landmark size={20} className="text-primary" />
          </div>
          <div className="flex flex-1 flex-col gap-1 items-start">
            <p className="text-primary font-bold text-[10px] uppercase tracking-wider">Assistant</p>
            <div className="text-[16px] font-medium leading-relaxed max-w-[90%] rounded-2xl rounded-tl-none px-4 py-3 bg-white text-navy-accent shadow-sm border border-primary/5">
              Vanakkam! I can help you find government schemes. Speak in Tamil or English.
            </div>
          </div>
        </div>

        {/* User Message */}
        <div className="flex flex-row-reverse items-start gap-3">
          <div className="bg-navy-accent flex items-center justify-center rounded-full size-10 shrink-0 overflow-hidden border-2 border-white shadow-md">
            <img 
              className="w-full h-full object-cover" 
              alt="Portrait of an Indian farmer smiling" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxwzw8TNxedpTe2c1cKHWYkIGpaDi6NuZmzjmaEkbUVMGUxhSVtbpAnIdbBY6Hvo_fUAsauQHNkIv8Iv33ONmrzn_mBVtYdG8u_KNKi02zEdDN7NmhKlSCkOQmihZYSEbtiweMDSjnHwyLbt6KJilisFdxQXE9m4lX6ryVBfOoetJaxpC1AnYxB3pUnnGCtj_4jcNGxxc6A81SOru8AzTXIjaDw2RVtjTfb4-_l5csyX2ZW1Q-nZp4cgt2sjCgDikR-Nx_6RNVira3"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-1 flex-col gap-1 items-end">
            <p className="text-navy-accent font-bold text-[10px] uppercase tracking-wider">You</p>
            <div className="text-[18px] font-semibold leading-snug max-w-[90%] rounded-2xl rounded-tr-none px-4 py-3 bg-primary text-white shadow-lg">
              Naan Coimbatore farmer, what health schemes are for me?
            </div>
          </div>
        </div>
      </div>

      {/* Listening State Area */}
      <div className="flex-none bg-white rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] p-6 flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-1">
          <h3 className="text-navy-accent text-xl font-bold tracking-tight">Listening...</h3>
          <p className="text-slate-500 text-sm font-medium">Processing your request</p>
        </div>

        {/* Waveform */}
        <div className="flex items-center justify-center gap-1 h-12 w-full">
          {[6, 10, 14, 8, 12, 5, 10, 14, 8].map((h, i) => (
            <motion.div
              key={i}
              animate={{ height: [h * 3, (h + 4) * 3, h * 3] }}
              transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
              className={`w-1.5 rounded-full bg-primary`}
              style={{ opacity: 0.4 + (i % 3) * 0.2 }}
            />
          ))}
        </div>

        {/* Main Voice Button */}
        <div className="relative">
          <motion.div 
            animate={{ scale: [1.2, 1.35, 1.2], opacity: [0.2, 0.1, 0.2] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 bg-primary rounded-full"
          />
          <button className="relative bg-primary text-white size-16 rounded-full flex items-center justify-center shadow-xl shadow-primary/40 active:scale-95 transition-transform">
            <Mic size={32} />
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-8 pt-1">
          <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
            <Keyboard size={24} />
            <span className="text-[9px] font-bold uppercase">Type</span>
          </button>
          <button className="px-5 py-1.5 bg-slate-100 rounded-full text-navy-accent font-bold text-xs border border-slate-200 hover:bg-slate-200 transition-colors">
            தமிழ் / English
          </button>
          <button onClick={onBack} className="flex flex-col items-center gap-1 text-slate-400 hover:text-red-500 transition-colors">
            <X size={24} />
            <span className="text-[9px] font-bold uppercase">Stop</span>
          </button>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="flex-none flex gap-2 border-t border-slate-200 bg-white px-4 pb-4 pt-2">
        <button onClick={onBack} className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 hover:text-primary transition-colors">
          <Home size={24} />
          <p className="text-[10px] font-bold uppercase tracking-wider">Home</p>
        </button>
        <button className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 hover:text-primary transition-colors">
          <FileText size={24} />
          <p className="text-[10px] font-bold uppercase tracking-wider">Schemes</p>
        </button>
        <button className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 hover:text-primary transition-colors">
          <User size={24} />
          <p className="text-[10px] font-bold uppercase tracking-wider">Profile</p>
        </button>
      </div>
    </motion.div>
  );
}

function SchemeDetailScreen({ onBack }: { onBack: () => void; key?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="flex flex-col h-full bg-background-light overflow-hidden font-display"
    >
      {/* Top Official Accent */}
      <div className="tricolor-accent flex-none" />

      {/* Header */}
      <div className="flex-none flex items-center bg-white p-4 shadow-sm justify-between sticky top-0 z-10">
        <button onClick={onBack} className="text-slate-900 flex size-10 shrink-0 items-center justify-center cursor-pointer hover:bg-black/5 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight">Sarakar Sahay</h2>
          <span className="text-[10px] text-primary font-bold uppercase tracking-widest">Government of India</span>
        </div>
        <div className="flex w-10 items-center justify-end">
          <button className="text-slate-900 hover:text-primary transition-colors">
            <Languages size={24} />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Scheme Hero Card */}
        <div className="p-4">
          <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-md border border-slate-200">
            <div 
              className="w-full bg-center bg-no-repeat aspect-video bg-cover relative" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA6lUmF2P5PMu4z_26jtSClPXJrd0OdlIfEzDYQ9HflVvN2V6YXhNE3MDvX8hNET3j9A8mk-d39-gK3AnKCIYyJYlbpl1bd42I8NH9VVgb_V2dBj2XWllajFXBpKu7SdPM-Yqh9uP6mJNLsdu3Iu2ol9lWW8HSlUDuOaDx3lLcMh8ePkkQKsCQJd88y4q2TWgpUsZtprSlPny5zeYTIGmKweq3gf6vE4vXHeQadXPTHnDgPM8littdw717OxueXDaeaTxrItnlpCpRS")' }}
            >
              <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg uppercase">
                Healthcare Scheme
              </div>
            </div>
            <div className="flex flex-col p-5">
              <h1 className="text-slate-900 text-2xl font-bold leading-tight">Ayushman Bharat</h1>
              <p className="text-slate-500 text-sm mt-1">Pradhan Mantri Jan Arogya Yojana (PM-JAY)</p>
              
              <div className="mt-4 p-4 bg-success/10 rounded-lg border border-success/20">
                <p className="text-slate-600 text-sm font-medium">Total Family Benefit</p>
                <p className="text-success text-2xl font-bold">₹5,00,000</p>
                <p className="text-slate-500 text-[11px] mt-1">Per year per family for secondary & tertiary care</p>
              </div>

              <div className="flex gap-3 mt-6">
                <button className="flex-1 flex items-center justify-center gap-2 rounded-xl h-12 bg-primary text-white font-bold text-base shadow-lg shadow-primary/30 active:scale-95 transition-transform">
                  <ClipboardCheck size={20} />
                  <span>Apply Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Voice & Share Tools */}
        <div className="px-4 grid grid-cols-2 gap-3">
          <button className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors">
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <Volume2 size={20} />
            </div>
            <div className="text-left">
              <p className="text-slate-900 text-sm font-bold leading-tight">Audio Info</p>
              <p className="text-slate-500 text-xs">Listen to details</p>
            </div>
          </button>
          <button className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors">
            <div className="rounded-full bg-whatsapp/10 p-2 text-whatsapp">
              <Share2 size={20} />
            </div>
            <div className="text-left">
              <p className="text-slate-900 text-sm font-bold leading-tight">WhatsApp</p>
              <p className="text-slate-500 text-xs">Share with family</p>
            </div>
          </button>
        </div>

        {/* Required Documents */}
        <div className="mt-6 px-4">
          <h3 className="text-slate-900 text-lg font-bold mb-3">Documents Needed</h3>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { icon: <IdCard size={24} />, label: 'Aadhaar Card' },
              { icon: <ReceiptText size={24} />, label: 'Ration Card' },
              { icon: <Wallet size={24} />, label: 'Income Cert.' }
            ].map((doc, i) => (
              <div key={i} className="flex-shrink-0 w-32">
                <div className="aspect-[3/2] rounded-lg bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-1 overflow-hidden relative">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:10px_10px]"></div>
                  <div className="text-slate-400 z-10">{doc.icon}</div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase z-10">{doc.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="mt-8 px-4">
          <h3 className="text-slate-900 text-lg font-bold mb-3">People helped by this</h3>
          <div className="flex items-center -space-x-3 mb-4">
            {[
              { bg: 'bg-slate-200', text: 'text-slate-500' },
              { bg: 'bg-primary/20', text: 'text-primary' },
              { bg: 'bg-success/20', text: 'text-success' }
            ].map((avatar, i) => (
              <div key={i} className={`size-10 rounded-full border-2 border-white ${avatar.bg} flex items-center justify-center overflow-hidden`}>
                <Smile size={20} className={avatar.text} />
              </div>
            ))}
            <div className="size-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden">
              <span className="text-[10px] font-bold text-slate-500">+12k</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl italic text-slate-600 text-sm border-l-4 border-primary shadow-sm">
            "Ayushman Bharat covered my father's surgery completely. We didn't pay a single rupee at the hospital." 
            <p className="not-italic font-bold mt-2 text-slate-900">— Rajesh, Bihar</p>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 px-4 mb-4">
          <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between shadow-lg">
            <div>
              <h4 className="font-bold text-lg">Need help now?</h4>
              <p className="text-slate-400 text-sm">Talk to a Sahay agent</p>
            </div>
            <button className="bg-white text-slate-900 size-12 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform">
              <Phone size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="flex-none fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 pb-6 pt-2 flex justify-between items-center z-20 max-w-[430px] mx-auto">
        <button onClick={onBack} className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
          <Home size={22} />
          <span className="text-[10px] font-medium">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-primary">
          <LayoutGrid size={22} />
          <span className="text-[10px] font-bold">Schemes</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
          <Bookmark size={22} />
          <span className="text-[10px] font-medium">Saved</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
          <User size={22} />
          <span className="text-[10px] font-medium">Profile</span>
        </button>
      </div>
    </motion.div>
  );
}
