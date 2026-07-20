import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Fireflies from './Fireflies.tsx';

interface Props {
  onSuccess: () => void;
}

export default function Question1({ onSuccess }: Props) {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSuccess) return;

    const normalized = answer.trim().toLowerCase();
    if (normalized === 'nivu') {
      setError(false);
      setIsSuccess(true);
      setTimeout(() => onSuccess(), 1500);
    } else {
      setError(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-[#050505]"
    >
      <Fireflies />

      <motion.div 
        className="relative z-10 w-full max-w-md bg-[#181A2D]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-10 md:p-12 shadow-2xl flex flex-col items-center text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <h2 className="text-2xl md:text-3xl font-serif text-brand-beige mb-10">
          What does Parth call you?
        </h2>

        <form onSubmit={handleSubmit} className="w-full relative">
          <input
            type="text"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              setError(false);
            }}
            disabled={isSuccess}
            className="w-full bg-transparent border-b border-white/20 text-center text-xl md:text-2xl text-brand-ivory focus:outline-none focus:border-brand-beige py-3 transition-colors disabled:opacity-50"
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
          
          <div className="h-10 mt-6 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {error && (
                <motion.p
                  key="error"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-brand-muted/80 italic font-light"
                >
                  That doesn't feel quite right.
                </motion.p>
              )}
              {isSuccess && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-2 h-2 rounded-full bg-brand-beige shadow-[0_0_15px_rgba(231,199,165,0.8)]"
                />
              )}
            </AnimatePresence>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
