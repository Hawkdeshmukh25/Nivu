import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const messages = [
  "I'm feeling slightly overwhelmed at the moment. I need a short break and will continue shortly.",
  "I'm having difficulty focusing today. Could you please help me prioritise the most urgent task?",
  "I may need some assistance with this task. Could we quickly review it together?"
];

export default function OfficeMessageTemplates() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-serif text-brand-ivory text-lg mb-2">Ready-to-use messages</h3>
      {messages.map((msg, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4 items-start group"
        >
          <p className="flex-1 text-sm text-brand-ivory font-serif leading-relaxed italic">"{msg}"</p>
          <button
            onClick={() => copyToClipboard(msg, idx)}
            className="p-2 rounded-full bg-white/5 hover:bg-white/20 text-brand-beige transition-colors flex-shrink-0"
            aria-label="Copy message"
          >
            {copiedIndex === idx ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
          </button>
        </motion.div>
      ))}
    </div>
  );
}
