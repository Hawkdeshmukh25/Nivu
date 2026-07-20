import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface Props {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  selected?: boolean;
}

export default function GentleFoodCard({ icon: Icon, label, onClick, selected }: Props) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative p-4 lg:p-6 rounded-2xl flex flex-col items-center justify-center gap-3 transition-colors ${
        selected ? 'bg-brand-rose/20 border-brand-rose/50' : 'bg-[#1F1D2B]/40 hover:bg-[#2A263A] border-white/10'
      } border shadow-lg overflow-hidden group`}
    >
      <div className={`w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center transition-colors ${
        selected ? 'bg-brand-rose/30 text-brand-rose' : 'bg-brand-beige/10 group-hover:bg-brand-beige/20 text-brand-beige'
      }`}>
        <Icon size={24} className="lg:w-8 lg:h-8" strokeWidth={1.5} />
      </div>
      <span className="text-brand-ivory font-serif text-sm lg:text-base text-center">{label}</span>
    </motion.button>
  );
}
