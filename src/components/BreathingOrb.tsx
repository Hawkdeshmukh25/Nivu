import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';
import clsx from 'clsx';

type Pattern = '4-7-8' | 'box' | 'slow';

export default function BreathingOrb() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [pattern, setPattern] = useState<Pattern>('4-7-8');
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Hold Gently'>('Inhale');
  
  // Basic mock animation state for the UI
  // In a real app, this would use sophisticated timing hooks based on the pattern
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!isPlaying) {
      setScale(1);
      return;
    }
    
    // Very simplified breathing logic for the prototype
    let timeoutId: ReturnType<typeof setTimeout>;
    
    const runCycle = () => {
      setPhase('Inhale');
      setScale(1.5);
      
      timeoutId = setTimeout(() => {
        setPhase('Hold');
        
        timeoutId = setTimeout(() => {
          setPhase('Exhale');
          setScale(1);
          
          timeoutId = setTimeout(() => {
            setPhase('Hold Gently');
            
            timeoutId = setTimeout(runCycle, 2000);
          }, 4000);
        }, 4000);
      }, 4000);
    };

    runCycle();
    
    return () => clearTimeout(timeoutId);
  }, [isPlaying, pattern]);

  return (
    <div className="glass-card p-6 lg:p-8 flex flex-col items-center justify-between h-full min-h-[340px]">
      <div className="flex justify-between w-full items-center mb-6">
        <h2 className="text-xl font-serif text-brand-ivory">Breathe in... breathe out</h2>
        <div className="flex gap-2">
          {(['4-7-8', 'box', 'slow'] as Pattern[]).map((p) => (
            <button
              key={p}
              onClick={() => setPattern(p)}
              className={clsx(
                "px-3 py-1 text-xs rounded-full border transition-colors",
                pattern === p 
                  ? "bg-brand-purple/20 border-brand-purple/50 text-brand-ivory" 
                  : "border-white/10 text-brand-muted hover:border-white/30"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-40 h-40 flex items-center justify-center mb-6">
        <motion.div
          animate={{ scale }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="absolute inset-0 bg-brand-rose/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ scale }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="relative z-10 w-28 h-28 bg-gradient-to-tr from-brand-rose/40 to-brand-purple/40 rounded-full flex items-center justify-center border border-white/20 shadow-[0_0_40px_rgba(201,141,159,0.3)]"
        />
      </div>

      <div className="h-8 mb-6">
        <AnimatePresence mode="wait">
          {isPlaying && (
            <motion.p
              key={phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-lg text-brand-beige font-medium tracking-wide"
            >
              {phase}...
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-brand-ivory hover:bg-white/20 transition-colors"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
        </button>
        <button
          onClick={() => { setIsPlaying(false); setScale(1); }}
          className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-brand-muted hover:bg-white/5 transition-colors"
        >
          <RotateCcw size={18} />
        </button>
      </div>
    </div>
  );
}
