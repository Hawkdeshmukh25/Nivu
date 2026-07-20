import { motion } from 'framer-motion';

const FEELINGS = [
  "I miss him", "I love him", "I feel angry", "I feel hurt",
  "I feel betrayed", "I feel guilty", "I feel confused", "I feel scared",
  "I feel numb", "I feel grateful", "I feel lonely",
  "I wish things had been different", "I do not know what I feel"
];

interface Props {
  selectedFeelings: string[];
  onToggle: (feeling: string) => void;
}

export default function FeelingSelector({ selectedFeelings, onToggle }: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {FEELINGS.map((feeling, idx) => {
        const isSelected = selectedFeelings.includes(feeling);
        return (
          <motion.button
            key={feeling}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => onToggle(feeling)}
            className={`px-4 py-2 rounded-full border text-sm font-serif transition-colors ${
              isSelected 
                ? 'bg-brand-rose/20 border-brand-rose text-brand-rose shadow-sm' 
                : 'bg-[#1F1D2B]/60 hover:bg-[#2A263A] border-white/10 text-brand-ivory'
            }`}
          >
            {feeling}
          </motion.button>
        );
      })}
    </div>
  );
}
