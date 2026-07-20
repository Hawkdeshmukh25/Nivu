import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onOpen: () => void;
}

export default function DoorPhase({ onOpen }: Props) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPrompt(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleDoorClick = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Wait for the animation to play before transitioning to the first question
    setTimeout(() => {
      onOpen();
    }, 5500); // 4s open + 1s pause + 0.5s fade
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
      transition={{ duration: 3 }}
      className="absolute inset-0 bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Dim lighting overlay */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Dust particles (simple CSS approximation) */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.5 + 0.2
            }}
            animate={{
              y: [null, Math.random() * -100 - 50],
              x: [null, Math.random() * 50 - 25],
              opacity: [null, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      {/* The Door Container */}
      <div className="relative z-10 w-full max-w-[400px] h-[75vh]">
        {/* Ambient Light Bloom instead of a harsh oval */}
        <motion.div
          className="fixed inset-0 bg-[#F4E8DB]/20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpening ? 1 : 0 }}
          transition={{ duration: 4, ease: 'easeInOut' }}
        />

        {/* The Door itself */}
        <motion.div
          onClick={handleDoorClick}
          className="w-full h-full bg-cover bg-center rounded-sm cursor-pointer shadow-2xl relative"
          style={{
            backgroundImage: 'url(/door1.png)',
            transformOrigin: 'center',
          }}
          initial={{ scale: 1, opacity: 1 }}
          animate={isOpening ? { scale: 3, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 4, ease: 'easeInOut' }}
        >
        </motion.div>
      </div>

      {/* Bottom Text */}
      <div className="absolute bottom-16 left-0 right-0 text-center z-20 pointer-events-none flex flex-col gap-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpening ? 0 : 0.6 }}
          transition={{ duration: 2 }}
          className="text-lg md:text-xl tracking-wide font-light"
        >
          Some places exist only for one soul.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: showPrompt && !isOpening ? 0.8 : 0 }}
          transition={{ duration: 1.5 }}
          className="text-sm tracking-widest uppercase text-brand-beige"
        >
          Click the door.
        </motion.p>
      </div>

      {/* Welcome Home text (shows after door opens) */}
      <AnimatePresence>
        {isOpening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, delay: 1.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none bg-black/40 backdrop-blur-sm"
          >
            <h1 className="text-4xl md:text-6xl font-serif text-brand-beige italic drop-shadow-2xl">
              Welcome back.
            </h1>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
