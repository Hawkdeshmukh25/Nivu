import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Fireflies from './Fireflies.tsx';

interface Props {
  onSuccess: () => void;
}

export default function Question2Pin({ onSuccess }: Props) {
  const [pin, setPin] = useState<string>('');
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isSuccess) return;
    
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
    setPin(value);
    setIsError(false);

    if (value.length === 4) {
      if (value === '7777') {
        setIsSuccess(true);
        setTimeout(() => onSuccess(), 1500);
      } else {
        setIsError(true);
        setTimeout(() => setPin(''), 1000);
      }
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0 flex flex-col items-center justify-center p-6 cursor-text bg-[#050505]"
      onClick={handleContainerClick}
    >
      <Fireflies />

      <motion.div 
        className="relative z-10 flex flex-col items-center text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <h2 className="text-2xl md:text-3xl font-serif text-brand-beige mb-16">
          What is the secret pin?
        </h2>

        {/* Hidden input for capturing mobile/desktop keyboard */}
        <input
          ref={inputRef}
          type="tel"
          value={pin}
          onChange={handleChange}
          disabled={isSuccess || isError}
          className="opacity-0 absolute -top-10"
          autoFocus
          autoComplete="off"
        />

        <motion.div 
          className="flex gap-6 md:gap-8 mb-12"
          animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          {[0, 1, 2, 3].map((index) => (
            <div 
              key={index}
              className={`w-4 h-4 md:w-5 md:h-5 rounded-full transition-all duration-300 ${
                pin.length > index 
                  ? isSuccess 
                    ? 'bg-brand-beige shadow-[0_0_15px_rgba(231,199,165,0.6)]'
                    : isError 
                      ? 'bg-red-400/80 shadow-[0_0_15px_rgba(248,113,113,0.4)]'
                      : 'bg-brand-ivory shadow-[0_0_10px_rgba(244,232,219,0.4)]'
                  : 'bg-white/10 border border-white/20'
              }`}
            />
          ))}
        </motion.div>

        <div className="h-8">
          <AnimatePresence mode="wait">
            {isError && (
              <motion.p
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-brand-muted/80 italic font-light"
              >
                Almost... try again.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
