import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SupportModal from '../components/SupportModal';
import { 
  Wind, HandHeart, Headphones, PenLine, Heart, 
  ArrowRight, Info,
  Pause, SkipBack, SkipForward,
  Edit3, Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const navigate = useNavigate();
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const actions = [
    { title: 'Help me\ncalm down', icon: Wind, path: '/calm' },
    { title: 'Stay with me', icon: HandHeart, path: '/stay' },
    { title: 'Play something\nI\'ll understand', icon: Headphones, path: '/music' },
    { title: 'Let me write', icon: PenLine, path: '/letters' },
    { title: 'Remind me that\nI\'m loved', icon: Heart, path: '/universe' },
  ];

  return (
    <div className="max-w-[1150px] mx-auto min-h-[calc(100vh-2rem)] lg:min-h-0 lg:h-[calc(100vh-3rem)] flex flex-col text-brand-ivory font-sans">
      
      {/* Top Header */}
      <div className="flex justify-between items-end mb-4 flex-shrink-0">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl lg:text-4xl font-serif text-brand-ivory drop-shadow-lg"
        >
          What do you need right now?
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="hidden md:flex items-center text-brand-ivory/90 drop-shadow-md font-serif italic text-base md:text-lg"
        >
          <span className="flex items-center gap-2">Welcome back Nivuuu <Sparkles size={16} className="text-brand-beige" strokeWidth={1.5} /></span>
        </motion.div>
      </div>

      <div className="flex-1 flex flex-col gap-3 lg:gap-4 min-h-0">
        {/* Row 1: Action Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4 flex-shrink-0 h-auto lg:h-[140px]">
          {actions.map((action, idx) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              onClick={() => navigate(action.path)}
              className={`bg-[#1F1D2B]/40 backdrop-blur-xl rounded-[1.25rem] p-4 lg:p-5 flex flex-col justify-between h-full cursor-pointer hover:bg-[#2A263A]/50 border border-white/10 transition-all group relative overflow-hidden shadow-xl ${idx === 4 ? 'col-span-2 md:col-span-1' : ''}`}
            >
              {/* Subtle top glow */}
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-brand-rose/15 blur-[25px] rounded-full pointer-events-none" />
              
              <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-rose/90 mb-2 relative z-10 shadow-inner">
                <action.icon size={20} strokeWidth={1.5} />
              </div>
              
              <div className="relative z-10 flex justify-between items-end mt-auto">
                <h2 className="text-sm lg:text-base font-serif text-brand-ivory whitespace-pre-line leading-snug">
                  {action.title}
                </h2>
                <ArrowRight size={16} className="text-brand-muted group-hover:text-brand-ivory transition-colors group-hover:translate-x-1" strokeWidth={1.5} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Row 2: Previews */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 flex-1 min-h-0">
          
          {/* Breathe Preview (span 4) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4 bg-[#1F1D2B]/40 backdrop-blur-xl rounded-[1.25rem] p-4 lg:p-5 border border-white/10 flex flex-col relative overflow-hidden h-full shadow-xl cursor-pointer"
            onClick={() => navigate('/calm')}
          >
            <div className="flex justify-between items-center mb-2 lg:mb-4 z-10 relative">
              <h3 className="font-serif text-brand-ivory text-base lg:text-lg">Breathe in... breathe out</h3>
              <div className="flex items-center gap-2">
                <span className="text-[10px] lg:text-xs bg-white/10 px-2 py-0.5 rounded text-brand-muted">4-7-8</span>
                <Info size={14} className="text-brand-muted" />
              </div>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center relative z-10">
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full border border-brand-rose/30 flex items-center justify-center relative">
                 <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-tr from-brand-rose/30 to-brand-purple/20 blur-md absolute" />
                 <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-full bg-brand-rose/40 blur-xl absolute" />
                 <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-brand-beige absolute -left-1.5 top-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(231,199,165,0.8)]" />
              </div>
            </div>
            
            <div className="flex justify-center gap-6 mt-2 lg:mt-4 z-10 relative text-xs lg:text-sm">
              <span className="flex items-center gap-2 text-brand-rose"><span className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-brand-rose"></span> Inhale</span>
              <span className="flex items-center gap-2 text-brand-muted"><span className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-brand-muted"></span> Exhale</span>
            </div>
          </motion.div>

          {/* Music Preview (span 4) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-4 bg-[#1F1D2B]/40 backdrop-blur-xl rounded-[1.25rem] p-4 lg:p-5 border border-white/10 flex flex-col relative h-full cursor-pointer shadow-xl justify-between"
            onClick={() => navigate('/music')}
          >
            <div>
              <div className="flex justify-between items-center mb-3 lg:mb-4">
                <h3 className="font-serif text-brand-ivory text-base lg:text-lg">Underrated Song Sanctuary</h3>
                <span className="text-[10px] lg:text-xs text-brand-muted hover:text-brand-ivory">See all</span>
              </div>
              
              <div className="flex gap-3 lg:gap-4 items-center">
                <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=200&auto=format&fit=crop" className="w-12 h-12 lg:w-16 lg:h-16 rounded-lg object-cover shadow-lg" alt="Cover" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-serif text-brand-ivory text-sm lg:text-base">Falling Slowly</h4>
                      <p className="text-[10px] lg:text-xs text-brand-muted">Adrianne Lenker</p>
                    </div>
                    <Heart size={14} className="text-brand-rose" fill="#C98D9F" />
                  </div>
                  <div className="mt-1 lg:mt-2 text-[10px] lg:text-xs bg-brand-purple/20 text-brand-purple px-2 py-0.5 rounded-full inline-block border border-brand-purple/30">
                    midnight conversations
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center gap-4 lg:gap-5 mb-3 lg:mb-4">
                <SkipBack size={14} className="text-brand-muted" />
                <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-brand-ivory text-brand-main flex items-center justify-center">
                  <Pause size={12} />
                </div>
                <SkipForward size={14} className="text-brand-muted" />
              </div>

              <div className="flex items-center gap-2 lg:gap-3 text-[10px] lg:text-xs text-brand-muted">
                <span>1:23</span>
                <div className="flex-1 h-1 bg-white/10 rounded-full relative">
                   <div className="absolute left-0 top-0 h-full w-1/3 bg-brand-beige rounded-full" />
                   <div className="absolute left-1/3 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 lg:w-2.5 lg:h-2.5 bg-brand-beige rounded-full shadow-[0_0_5px_rgba(231,199,165,1)]" />
                </div>
                <span>4:58</span>
              </div>
            </div>
          </motion.div>

          {/* Universe Preview (span 4) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-4 bg-[#1F1D2B]/40 backdrop-blur-xl rounded-[1.25rem] p-4 lg:p-5 border border-white/10 flex flex-col relative overflow-hidden h-full shadow-xl cursor-pointer"
            onClick={() => navigate('/universe')}
          >
            <div className="flex justify-between items-center mb-2 lg:mb-4 z-10 relative">
              <h3 className="font-serif text-brand-ivory text-base lg:text-lg">Proof That You Are Loved</h3>
              <span className="text-[10px] lg:text-xs text-brand-muted hover:text-brand-ivory cursor-pointer">View all</span>
            </div>
            
             <div className="flex-1 relative min-h-[140px] mt-2">
                {/* Scalable smooth constellation line */}
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                  <path d="M 10 20 C 25 80, 35 90, 40 75 C 55 10, 65 15, 70 30 C 80 80, 85 85, 95 85" stroke="white" strokeWidth="0.5" strokeDasharray="1 2" fill="none" />
                  {/* Stars at connection points */}
                  <circle cx="10" cy="20" r="1.5" fill="white" />
                  <circle cx="40" cy="75" r="1.5" fill="white" />
                  <circle cx="70" cy="30" r="1.5" fill="white" />
                  <circle cx="95" cy="85" r="1.5" fill="white" opacity="0.5" />
                </svg>
                
                {/* Mock Polaroids - Zigzag layout to prevent overlap */}
                <div className="absolute top-0 left-0 rotate-[-8deg] bg-[#F4E8DB] p-1.5 pb-3 lg:pb-4 shadow-xl w-20 lg:w-24 z-10 transition-transform hover:scale-105 hover:z-20">
                  <img src="/WhatsApp Image 2026-07-20 at 2.51.42 AM.jpeg" className="w-full h-12 lg:h-16 object-cover sepia-[15%]" />
                  <p className="text-[7px] lg:text-[9px] font-serif italic text-black/80 text-center mt-1 lg:mt-1.5">You matter</p>
                </div>
                
                <div className="absolute bottom-0 left-[28%] rotate-[-4deg] bg-[#F4E8DB] p-1.5 pb-3 lg:pb-4 shadow-xl w-20 lg:w-24 z-10 transition-transform hover:scale-105 hover:z-20">
                  <img src="/WhatsApp Image 2026-07-20 at 3.42.43 AM.jpeg" className="w-full h-12 lg:h-16 object-cover sepia-[15%]" />
                  <p className="text-[7px] lg:text-[9px] font-serif italic text-black/80 text-center mt-1 lg:mt-1.5">Always</p>
                </div>
                
                <div className="absolute top-2 right-[28%] rotate-[6deg] bg-[#F4E8DB] p-1.5 pb-3 lg:pb-4 shadow-xl w-20 lg:w-24 z-10 transition-transform hover:scale-105 hover:z-20">
                  <img src="/WhatsApp Image 2026-07-20 at 3.42.42 AM (1).jpeg" className="w-full h-12 lg:h-16 object-cover sepia-[15%]" />
                  <p className="text-[7px] lg:text-[9px] font-serif italic text-black/80 text-center mt-1 lg:mt-1.5">We're here</p>
                </div>

                <div className="absolute bottom-1 right-0 rotate-[10deg] bg-[#F4E8DB] p-1.5 pb-3 lg:pb-4 shadow-xl w-20 lg:w-24 z-10 transition-transform hover:scale-105 hover:z-20">
                  <img src="/WhatsApp Image 2026-07-20 at 2.57.04 AM (1).jpeg" className="w-full h-12 lg:h-16 object-cover sepia-[15%]" />
                  <p className="text-[7px] lg:text-[9px] font-serif italic text-black/80 text-center mt-1 lg:mt-1.5">Forever</p>
                </div>
             </div>
          </motion.div>
        </div>

        {/* Row 3: Bottom Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 flex-shrink-0 h-auto lg:h-[130px]">
          
          {/* Deep Conversation (span 8) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-8 bg-[#1F1D2B]/40 backdrop-blur-xl rounded-[1.25rem] p-4 lg:p-5 border border-white/10 flex flex-col justify-between cursor-pointer shadow-xl h-full"
            onClick={() => navigate('/depth')}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-brand-ivory text-base lg:text-lg">Deep Conversation Room</h3>
              <div className="flex items-center gap-2 text-brand-muted hover:text-brand-ivory transition-colors">
                <span className="text-xs lg:text-sm">New prompt</span>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-xl p-2.5 lg:p-3 flex items-center gap-3 lg:gap-4 border border-white/5">
              <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-brand-muted font-serif text-sm lg:text-lg border border-white/5">
                "
              </div>
              <div className="flex-1 pr-2 lg:pr-4">
                <p className="font-serif text-brand-ivory text-xs lg:text-sm">What part of yourself do you protect by staying quiet?</p>
              </div>
              <button className="px-3 lg:px-4 py-1.5 lg:py-2 rounded-full bg-brand-beige text-brand-main text-[10px] lg:text-xs font-medium flex items-center gap-1.5 shadow-md hover:bg-white transition-colors">
                Write <Edit3 size={12} />
              </button>
            </div>
          </motion.div>

          {/* I Need Someone (span 4) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-4 bg-[#1F1D2B]/40 backdrop-blur-xl rounded-[1.25rem] p-4 lg:p-5 border border-white/10 flex items-center gap-3 lg:gap-4 cursor-pointer hover:bg-[#2A263A]/50 transition-colors shadow-xl h-full"
            onClick={() => setIsSupportModalOpen(true)}
          >
            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-brand-rose/10 flex items-center justify-center text-brand-rose flex-shrink-0 border border-brand-rose/20 relative">
               <div className="absolute inset-0 rounded-full border border-brand-rose/40 scale-110" />
               <div className="absolute inset-0 rounded-full border border-brand-rose/20 scale-125" />
               <Heart size={20} className="lg:w-6 lg:h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-brand-ivory text-base lg:text-lg mb-0.5 lg:mb-1">I need someone</h3>
              <p className="text-[10px] lg:text-xs text-brand-muted leading-tight mb-2">
                It's okay to not be okay. Reach out.
              </p>
              <button className="px-2.5 lg:px-3 py-1 rounded-full bg-brand-beige text-brand-main text-[10px] lg:text-xs font-medium flex items-center gap-1 hover:bg-white transition-colors shadow-md w-max">
                I need someone <ArrowRight size={10} className="lg:w-3 lg:h-3" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      <SupportModal isOpen={isSupportModalOpen} onClose={() => setIsSupportModalOpen(false)} />
    </div>
  );
}
