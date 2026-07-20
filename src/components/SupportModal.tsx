import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, ExternalLink, Heart, Phone } from 'lucide-react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const contacts = [
  { name: 'Parth', phone: '919766631092' },
  { name: 'Diii', phone: '919834641288' }
];

export default function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const defaultMessage = "I need your help";



  const handleWhatsApp = (phone: string) => {
    const text = encodeURIComponent(defaultMessage);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-main/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[500px] z-10"
          >
            <div className="bg-brand-secondary border border-white/10 rounded-3xl p-6 md:p-8 w-full shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-brand-rose/20 text-brand-rose">
                    <Heart size={20} />
                  </div>
                  <h2 className="text-xl font-serif text-brand-ivory">I need someone</h2>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 text-brand-muted transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-brand-beige mb-3 uppercase tracking-wider">Reach out</h3>
                  <div className="flex flex-col gap-3">
                    {contacts.map((contact) => (
                      <div key={contact.name} className="flex gap-2">
                        <button 
                          onClick={() => handleWhatsApp(contact.phone)}
                          className="flex-1 flex items-center justify-between p-4 rounded-xl border border-green-500/30 bg-green-500/10 hover:bg-green-500/20 text-brand-ivory transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <MessageSquare size={20} className="text-green-400" />
                            <span className="font-medium">Message {contact.name}</span>
                          </div>
                          <ExternalLink size={16} className="text-green-400/70" />
                        </button>
                        <a 
                          href={`tel:+${contact.phone}`}
                          className="flex items-center justify-center p-4 rounded-xl border border-brand-purple/30 bg-brand-purple/10 hover:bg-brand-purple/20 text-brand-ivory transition-colors"
                          title={`Call ${contact.name}`}
                        >
                          <Phone size={20} className="text-brand-purple" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>


              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
