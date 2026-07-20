import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenLine, Lock, Download, Trash2, ArrowLeft, Send } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const templates = [
  "A letter to my younger self",
  "Things I wish people understood",
  "What I am too afraid to say",
  "A letter I will never send",
  "Things that hurt but still matter",
  "What I need right now",
  "A letter for a future version of me",
  "A letter to someone I miss"
];

interface Letter {
  id: string;
  template: string;
  content: string;
  date: string;
  status: 'draft' | 'locked' | 'archived';
  action?: 'keep' | 'release' | 'discuss' | 'revisit';
  password?: string;
}

export default function Letters() {
  const [letters, setLetters] = useLocalStorage<Letter[]>('quiet-letters', []);
  const [isWriting, setIsWriting] = useState(false);
  const [currentLetter, setCurrentLetter] = useState<Partial<Letter> | null>(null);
  const [showActionPrompt, setShowActionPrompt] = useState(false);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [pendingLetter, setPendingLetter] = useState<Letter | null>(null);
  const [passwordError, setPasswordError] = useState(false);
  const [isSettingPassword, setIsSettingPassword] = useState(false);
  const [isReleasing, setIsReleasing] = useState(false);

  const handleOpenLetter = (letter: Letter) => {
    if (letter.status === 'locked') {
      setPendingLetter(letter);
      setIsSettingPassword(false);
      setShowPasswordModal(true);
      setPasswordInput('');
      setPasswordError(false);
    } else {
      setCurrentLetter(letter);
      setIsWriting(true);
    }
  };

  const handlePasswordSubmit = () => {
    if (isSettingPassword) {
      if (passwordInput.trim().length > 0) {
        setCurrentLetter(prev => prev ? { ...prev, status: 'locked', password: passwordInput.trim() } : null);
        setShowPasswordModal(false);
        setPasswordInput('');
      } else {
        setPasswordError(true);
      }
    } else {
      if (pendingLetter && pendingLetter.password === passwordInput) {
        setCurrentLetter(pendingLetter);
        setIsWriting(true);
        setShowPasswordModal(false);
        setPendingLetter(null);
        setPasswordInput('');
      } else {
        setPasswordError(true);
      }
    }
  };

  const handleLockToggle = () => {
    if (currentLetter?.status === 'locked') {
      // Unlock it
      setCurrentLetter(prev => prev ? { ...prev, status: 'draft', password: undefined } : null);
    } else {
      // Prompt to lock it
      setIsSettingPassword(true);
      setShowPasswordModal(true);
      setPasswordInput('');
      setPasswordError(false);
    }
  };

  const startNewLetter = (template: string) => {
    setCurrentLetter({
      id: Date.now().toString(),
      template,
      content: '',
      date: new Date().toISOString(),
      status: 'draft'
    });
    setIsWriting(true);
    setShowActionPrompt(false);
  };

  const handleSave = (action?: Letter['action']) => {
    if (currentLetter && currentLetter.id) {
      if (action === 'release') {
        // Releasing it to the wind deletes the letter (or doesn't save it) and plays an animation
        setLetters(prev => prev.filter(l => l.id !== currentLetter.id));
        setShowActionPrompt(false);
        setIsReleasing(true);
        setTimeout(() => {
          setIsReleasing(false);
          closeEditor();
        }, 1200);
      } else {
        // Keep it safe
        const newLetter = { ...currentLetter, action } as Letter;
        setLetters(prev => {
          const existing = prev.findIndex(l => l.id === newLetter.id);
          if (existing >= 0) {
            const updated = [...prev];
            updated[existing] = newLetter;
            return updated;
          }
          return [newLetter, ...prev];
        });
        closeEditor();
      }
    }
  };

  const closeEditor = () => {
    setIsWriting(false);
    setCurrentLetter(null);
    setShowActionPrompt(false);
  };

  const handleExport = () => {
    if (!currentLetter) return;
    const blob = new Blob([`${currentLetter.template}\n\n${currentLetter.content}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Letter-${new Date().toLocaleDateString()}.txt`;
    a.click();
  };

  return (
    <div className="max-w-5xl mx-auto pb-24 min-h-full lg:h-[calc(100vh-100px)] flex flex-col relative">
      <AnimatePresence mode="wait">
        {!isWriting ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col h-full"
          >
            <div className="mb-10">
              <h1 className="text-3xl md:text-5xl font-serif text-brand-beige mb-4">Unsent Letters</h1>
              <p className="text-brand-muted text-lg">A private place for the words you cannot say out loud.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
              {/* Templates */}
              <div>
                <h2 className="text-xl font-serif text-brand-ivory mb-6">Write a new letter</h2>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => startNewLetter('')}
                    className="text-left p-3 rounded-xl border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all group flex items-center justify-between"
                  >
                    <span className="font-serif text-brand-beige text-base italic">Write on a custom topic...</span>
                    <PenLine size={16} className="text-brand-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  {templates.map((template, i) => (
                    <button
                      key={i}
                      onClick={() => startNewLetter(template)}
                      className="text-left p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all group flex items-center justify-between"
                    >
                      <span className="font-serif text-brand-ivory text-base">{template}</span>
                      <PenLine size={16} className="text-brand-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Saved Letters */}
              <div>
                <h2 className="text-xl font-serif text-brand-ivory mb-6">Your sealed letters</h2>
                {letters.length === 0 ? (
                  <div className="glass-panel rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[300px] border-dashed border-white/10">
                    <PenLine size={32} className="text-brand-muted/50 mb-4" />
                    <p className="text-brand-muted font-serif italic text-lg">You haven't written any letters yet.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {letters.map(letter => (
                      <div 
                        key={letter.id} 
                        onClick={() => handleOpenLetter(letter)}
                        className="glass-card p-5 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-colors"
                      >
                        <div>
                          <h3 className="font-serif text-brand-ivory text-lg mb-1">{letter.template}</h3>
                          <p className="text-xs text-brand-muted">{new Date(letter.date).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {letter.status === 'locked' ? <Lock size={16} className="text-brand-rose" /> : null}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="editor"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isReleasing ? { opacity: 0, y: -400, rotate: 5, scale: 0.9 } : { opacity: 1, scale: 1, y: 0, rotate: 0 }}
            transition={isReleasing ? { duration: 1.2, ease: "easeInOut" } : { duration: 0.3 }}
            className="flex-1 flex flex-col bg-[#FAF7F2] text-black/80 rounded-sm p-6 md:p-12 shadow-2xl relative origin-center min-h-[80vh] lg:min-h-0"
          >
            {/* Editor Header Tools */}
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-black/10">
              <button 
                onClick={closeEditor}
                className="flex items-center gap-2 text-black/50 hover:text-black/80 transition-colors"
              >
                <ArrowLeft size={18} /> Back
              </button>
              
              <div className="flex items-center gap-4 text-black/50">
                <button onClick={handleExport} className="hover:text-black/80 transition-colors"><Download size={18} /></button>
                <button onClick={handleLockToggle} className={`transition-colors ${currentLetter?.status === 'locked' ? 'text-brand-rose' : 'hover:text-black/80'}`}><Lock size={18} /></button>
                <button 
                  onClick={() => {
                    setLetters(prev => prev.filter(l => l.id !== currentLetter?.id));
                    closeEditor();
                  }} 
                  className="hover:text-red-700 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <input
              value={currentLetter?.template || ''}
              onChange={(e) => setCurrentLetter(prev => prev ? { ...prev, template: e.target.value } : null)}
              placeholder="What is this letter about?"
              className="text-2xl md:text-3xl font-serif text-black/90 mb-8 italic bg-transparent outline-none w-full placeholder-black/20"
            />

            <textarea
              value={currentLetter?.content || ''}
              onChange={(e) => setCurrentLetter(prev => prev ? { ...prev, content: e.target.value } : null)}
              placeholder="Start writing..."
              className="flex-1 w-full bg-transparent resize-none outline-none font-serif text-lg leading-loose text-black/80 placeholder-black/30"
              autoFocus
            />

            <div className="mt-8 flex justify-end">
              <button 
                onClick={() => setShowActionPrompt(true)}
                disabled={!currentLetter?.content}
                className="px-8 py-3 bg-brand-main text-brand-ivory rounded-sm hover:bg-brand-secondary transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                Finish Letter <Send size={16} />
              </button>
            </div>

            {/* Action Prompt Modal */}
            <AnimatePresence>
              {showActionPrompt && (
                <div className="absolute inset-0 bg-[#FAF7F2]/90 backdrop-blur-sm z-20 flex items-center justify-center p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full bg-white p-10 shadow-2xl rounded-sm border border-black/5"
                  >
                    <h3 className="text-2xl font-serif text-center mb-8 text-black/90">What should happen to this thought?</h3>
                    <div className="flex flex-col gap-3">
                      <button onClick={() => handleSave('keep')} className="p-4 border border-black/10 hover:bg-black/5 text-left font-medium transition-colors rounded-sm">
                        Keep it safe
                      </button>
                      <button onClick={() => handleSave('release')} className="p-4 border border-black/10 hover:bg-black/5 text-left font-medium transition-colors group flex justify-between items-center rounded-sm">
                        Release it to the wind <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xl">🌬️</span>
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="max-w-sm w-full bg-[#F4E8DB] p-8 shadow-2xl rounded-sm border border-black/10"
            >
              <div className="flex justify-center mb-4 text-brand-main">
                <Lock size={32} />
              </div>
              <h3 className="text-xl font-serif text-center mb-6 text-black/90">
                {isSettingPassword ? 'Set a password to seal this letter' : 'This letter is sealed'}
              </h3>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setPasswordError(false);
                }}
                onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                placeholder="Enter password..."
                className={`w-full p-3 bg-white/50 border ${passwordError ? 'border-red-500' : 'border-brand-main/20'} rounded-sm mb-4 outline-none focus:border-brand-main/50 transition-colors text-black/90`}
                autoFocus
              />
              {passwordError && (
                <p className="text-red-500 text-xs mb-4 text-center font-medium">
                  {isSettingPassword ? 'Password cannot be empty.' : 'Incorrect password.'}
                </p>
              )}
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowPasswordModal(false)} 
                  className="flex-1 py-2.5 border border-brand-main/20 text-brand-main hover:bg-black/5 transition-colors font-medium rounded-sm"
                >
                  Cancel
                </button>
                <button 
                  onClick={handlePasswordSubmit} 
                  className="flex-1 py-2.5 bg-brand-main text-brand-ivory rounded-sm hover:bg-brand-secondary transition-colors font-medium shadow-md"
                >
                  {isSettingPassword ? 'Seal Letter' : 'Unlock'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
