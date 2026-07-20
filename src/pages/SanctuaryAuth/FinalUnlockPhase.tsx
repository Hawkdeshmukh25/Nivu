import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

export default function FinalUnlockPhase({ onComplete }: Props) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // 1. Door fully opens (0s -> 2s)
    // 2. Camera zooms through doorway into white light (2.5s -> 4.5s)
    // 3. Final message fades in over light (5s -> 9s)
    // 4. Complete and redirect (10s)

    const timer1 = setTimeout(() => setStage(1), 2500); // Start zoom
    const timer2 = setTimeout(() => setStage(2), 5000); // Show text
    const timer3 = setTimeout(() => onComplete(), 11000); // Redirect

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Main Background Image - Zooms in during stage 1 */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/6eb4d85a-598e-4639-a5a2-cd10ad8aebdd.png)' }}
        initial={{ scale: 1.1, filter: 'brightness(0.2)' }}
        animate={
          stage >= 1 
            ? { scale: 1, filter: 'brightness(1)' } 
            : { scale: 1.1, filter: 'brightness(0.2)' }
        }
        transition={{ duration: 4, ease: 'easeInOut' }}
      >
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </motion.div>

      {/* The Door Container (zooms in and fades out) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-10"
        animate={
          stage >= 1 
            ? { scale: 4, opacity: 0 } // Zoom the door towards camera and fade it out
            : { scale: 1, opacity: 1 }
        }
        transition={{ duration: 3, ease: 'easeInOut' }}
      >
        <div className="relative w-full max-w-[400px] h-[75vh]">
          {/* Light Behind Door */}
          <motion.div
            className="absolute inset-0 bg-brand-ivory rounded-full"
            initial={{ opacity: 0, filter: 'blur(30px)' }}
            animate={{ 
              opacity: stage >= 1 ? 1 : 0.8,
              filter: stage >= 1 ? 'blur(100px)' : 'blur(40px)',
              scale: stage >= 1 ? 3 : 1
            }}
            transition={{ duration: 3, ease: 'easeInOut' }}
          />

          {/* The Door itself - static, just zooms with container */}
          <motion.div
            className="w-full h-full bg-cover bg-center rounded-sm relative shadow-2xl"
            style={{ backgroundImage: 'url(/door1.png)' }}
          />
        </div>
      </motion.div>

      {/* Ambient glow instead of pure solid color */}
      <motion.div
        className="absolute inset-0 bg-[#F4E8DB]/10 mix-blend-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 1 ? 1 : 0 }}
        transition={{ duration: 2, delay: 1 }}
      />

      {/* Final Message */}
      <AnimatePresence>
        {stage >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center z-50 p-6"
          >
            <motion.p 
              className="text-xl md:text-2xl font-serif text-brand-beige mb-6 tracking-wide"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            >
              This place was made with care.
            </motion.p>
            <motion.p 
              className="text-lg md:text-xl text-brand-ivory italic opacity-80"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 2, delay: 2.5 }}
            >
              Whenever the world feels too heavy,<br className="md:hidden" /> come back here.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
