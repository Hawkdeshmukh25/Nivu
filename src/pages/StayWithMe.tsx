import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const visuals = [
  {
    id: 'rain',
    name: 'Rainy Touch',
    url: '/soothing_rain.png',
    audioUrl: 'https://assets.mixkit.co/active_storage/sfx/2397/2397-preview.mp3', // Subtle, soft raindrops
    bgPosition: 'center center'
  }
];

const gentleLines = [
  "You are safe here in this moment.",
  "Breathe in softly, let it all go.",
  "It is okay if all you did today was survive.",
  "The rain washes away the heavy thoughts.",
  "You are allowed to rest.",
  "Everything will be okay, just give it time.",
  "Your feelings are valid, but they do not define you.",
  "You don't have to carry the weight of the world.",
  "This storm will pass, just like the others.",
  "I am so proud of you for just being here.",
  "You are doing the best you can, and that is enough.",
  "It is okay to not have everything figured out right now.",
  "You are loved, exactly as you are.",
  "Close your eyes, and take one deep breath.",
  "No matter how hard today was, you made it through.",
  "Your heart is strong, even when it feels heavy.",
  "You don't have to be strong all the time.",
  "Be gentle with yourself today.",
  "There is no rush. Take all the time you need.",
  "You are allowed to take up space and feel your feelings.",
  "The world is better with you in it.",
  "You have survived every hard day you have ever faced.",
  "It is okay to pause and simply be.",
  "Your worth is not tied to your productivity.",
  "You are not alone in this.",
  "Let the quiet wash over you.",
  "You have permission to let go of control.",
  "Every storm eventually runs out of rain.",
  "You are growing, even on the days you feel stuck.",
  "Your peace is more important than perfection."
];

export default function StayWithMe() {
  const navigate = useNavigate();
  const [visualIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [hideUI, setHideUI] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Disclaimer Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDisclaimer(false);
      setTimeout(() => setHasStarted(true), 1500); // Wait for fade out animation
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  // Audio Sync
  useEffect(() => {
    if (audioRef.current && hasStarted) {
      if (isMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log('Audio autoplay prevented:', e));
      }
    }
  }, [isMuted, hasStarted, visualIndex]);

  useEffect(() => {
    if (!hasStarted) return;
    const lineInterval = setInterval(() => {
      setLineIndex((prev) => (prev + 1) % gentleLines.length);
    }, 14000);
    return () => clearInterval(lineInterval);
  }, [hasStarted]);

  // Idle timer to auto-hide UI
  useEffect(() => {
    if (!hasStarted) return;
    let timeout: ReturnType<typeof setTimeout>;
    const handleMouseMove = () => {
      setHideUI(false);
      clearTimeout(timeout);
      timeout = setTimeout(() => setHideUI(true), 5000);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    timeout = setTimeout(() => setHideUI(true), 5000);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-hidden flex items-center justify-center">
      {/* Disclaimer Overlay (Solid Black) */}
      <AnimatePresence>
        {showDisclaimer && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 flex items-center justify-center z-50 bg-black pointer-events-none"
          >
            <p className="text-3xl md:text-5xl font-serif text-brand-ivory drop-shadow-2xl text-center px-8 italic tracking-wide">
              Nivaa headphones pehen looo okay??
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {hasStarted && (
        <>
          {/* Background Audio */}
          <audio 
            ref={audioRef} 
            loop 
            src={visuals[visualIndex].audioUrl} 
          />

          {/* Background Visual Carousel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={visualIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              className="absolute inset-0 bg-contain bg-no-repeat bg-center"
              style={{ 
                backgroundImage: `url(${visuals[visualIndex].url})`,
                backgroundPosition: visuals[visualIndex].bgPosition 
              }}
            />
          </AnimatePresence>

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white animate-float"
                style={{
                  width: Math.random() * 3 + 'px',
                  height: Math.random() * 3 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  animationDuration: (Math.random() * 10 + 10) + 's',
                  animationDelay: (Math.random() * 5) + 's',
                }}
              />
            ))}
          </div>

          {/* Gentle Lines overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.p
                key={lineIndex}
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 0.9, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(10px)' }}
                transition={{ duration: 2 }}
                className="text-xl md:text-3xl font-serif text-brand-ivory drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] px-8 text-center"
              >
                {gentleLines[lineIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Controls Overlay */}
          <AnimatePresence>
            {!hideUI && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 pointer-events-none"
              >
                {/* Top Bar */}
                <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent pointer-events-auto">
                  <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-brand-muted hover:text-brand-ivory transition-colors group"
                  >
                    <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-serif">Leave quietly</span>
                  </button>
                  
                  <div className="flex gap-4">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-3 rounded-full bg-white/10 text-brand-ivory hover:bg-white/20 backdrop-blur-md transition-colors"
                    >
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
