import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  "You do not need to solve everything right now.",
  "Let us only get through this minute.",
  "You are allowed to pause.",
  "This feeling is present, but it is not your entire identity.",
  "No explanation is required here.",
  "You don't have to be strong right now.",
  "Whatever you are feeling is allowed to be here."
];

export default function ComfortMessages() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card flex items-center justify-center h-[120px] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
        <motion.div 
          key={index}
          className="h-full bg-brand-rose/40"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 8, ease: "linear" }}
        />
      </div>
      
      <div className="relative z-10 px-8 w-full max-w-3xl flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 1.5 }}
            className="text-lg md:text-xl font-serif text-brand-beige text-center leading-relaxed italic"
          >
            "{messages[index]}"
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
