import { Wind, Coffee, Music, TreePine, Armchair } from 'lucide-react';
import { motion } from 'framer-motion';

const resets = [
  { label: "60-second breathing exercise", icon: Wind, duration: 1 },
  { label: "Two-minute grounding exercise", icon: TreePine, duration: 2 },
  { label: "Drink some water", icon: Coffee, duration: 2 },
  { label: "Sit quietly for a moment", icon: Armchair, duration: 5 },
  { label: "Play a calming audio track", icon: Music, duration: 5 },
];

interface Props {
  onResetSelect: (reset: string, duration: number) => void;
}

export default function QuickResetList({ onResetSelect }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-serif text-brand-ivory text-lg mb-2">Quick Reset</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {resets.map((reset, idx) => (
          <motion.button
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => onResetSelect(reset.label, reset.duration)}
            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 flex gap-4 items-center text-left transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-brand-rose/10 flex items-center justify-center text-brand-rose">
              <reset.icon size={18} />
            </div>
            <span className="text-brand-ivory text-sm">{reset.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
