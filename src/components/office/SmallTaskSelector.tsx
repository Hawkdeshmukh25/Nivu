
import { motion } from 'framer-motion';
import { MessageSquare, Image, Calendar, CheckSquare, ListTodo, Clock, Users, Coffee } from 'lucide-react';

const tasks = [
  { label: "Reply to one important message", icon: MessageSquare, duration: 5 },
  { label: "Write one caption", icon: Image, duration: 5 },
  { label: "Check one scheduled post", icon: Calendar, duration: 3 },
  { label: "Review one creative", icon: CheckSquare, duration: 5 },
  { label: "Organise one small task", icon: ListTodo, duration: 5 },
  { label: "Work for five minutes", icon: Clock, duration: 5 },
  { label: "Ask a teammate for help", icon: Users, duration: 2 },
  { label: "Take a short break", icon: Coffee, duration: 5 },
];

interface Props {
  onTaskSelect: (task: string, duration: number) => void;
}

export default function SmallTaskSelector({ onTaskSelect }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-serif text-brand-ivory text-lg mb-2">Small Work Steps</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {tasks.map((task, idx) => (
          <motion.button
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => onTaskSelect(task.label, task.duration)}
            className="bg-[#1F1D2B]/60 hover:bg-[#2A263A] border border-white/10 rounded-xl p-4 flex gap-4 items-center text-left transition-all shadow-md group"
          >
            <div className="w-10 h-10 rounded-full bg-brand-beige/10 group-hover:bg-brand-beige/20 flex items-center justify-center text-brand-beige transition-colors">
              <task.icon size={18} />
            </div>
            <span className="text-brand-ivory text-sm">{task.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
