import { motion } from 'framer-motion';

export default function Fireflies() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 md:w-1.5 md:h-1.5 bg-[#FFD700] rounded-full blur-[2px]"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: Math.random() * 0.4 + 0.1
          }}
          animate={{
            y: [null, Math.random() * -150 - 50],
            x: [null, Math.random() * 100 - 50],
            opacity: [null, Math.random() * 0.8 + 0.2, 0]
          }}
          transition={{
            duration: Math.random() * 15 + 15,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            boxShadow: '0 0 10px 2px rgba(255, 215, 0, 0.4)'
          }}
        />
      ))}
    </div>
  );
}
