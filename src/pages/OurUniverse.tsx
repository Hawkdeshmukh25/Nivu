import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, MapPin, Calendar, ChevronLeft, ChevronRight, Edit2 } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { newMemories, type Memory } from '../data/memoryData4';
import clsx from 'clsx';

interface MemoryGroup {
  date: string;
  title: string;
  items: Memory[];
}

export default function OurUniverse() {
  const [memories, setMemories] = useLocalStorage<Memory[]>('quiet-memories-v9', newMemories);
  const [selectedGroup, setSelectedGroup] = useState<MemoryGroup | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ date: '', message: '' });
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newMemoryForm, setNewMemoryForm] = useState({ photoUrl: '', date: '', message: '' });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_SIZE = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        // compress to save localStorage space
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        setNewMemoryForm(prev => ({ ...prev, photoUrl: dataUrl }));
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleAddNewMemory = () => {
    if (!newMemoryForm.photoUrl) return;
    
    const newMemory: Memory = {
      id: Date.now().toString(),
      title: 'A Memory',
      date: newMemoryForm.date,
      place: '',
      message: newMemoryForm.message,
      mediaUrls: [newMemoryForm.photoUrl],
      isFavorite: false,
      x: 50,
      y: 50
    };
    
    setMemories(prev => [...prev, newMemory]);
    setNewMemoryForm({ photoUrl: '', date: '', message: '' });
    setIsAddModalOpen(false);
  };

  // Removed dangerous auto-filter on mount

  const groupedMemories = useMemo(() => {
    const groups: Record<string, Memory[]> = {};
    memories.forEach(m => {
      const d = m.date || m.id;
      if (!groups[d]) groups[d] = [];
      groups[d].push(m);
    });
    return Object.entries(groups).map(([_, mems]) => ({
      date: mems[0].date || '', // if it's empty, we keep it empty
      title: mems[0].date 
        ? (mems.length > 1 
          ? `Memories from ${new Date(mems[0].date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}` 
          : `Moment on ${new Date(mems[0].date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`)
        : 'A Memory',
      items: mems
    })).sort((a, b) => {
      // Items without dates go to the end
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      
      const timeA = new Date(a.date).getTime();
      const timeB = new Date(b.date).getTime();
      
      return sortOrder === 'asc' ? timeA - timeB : timeB - timeA;
    });
  }, [memories, sortOrder]);

  const isVideo = (url: string) => url.toLowerCase().endsWith('.mp4');

  const openModal = (group: MemoryGroup) => {
    setSelectedGroup(group);
    setCurrentMediaIndex(0);
    const item = group.items[0];
    setEditForm({ date: item.date, message: item.message });
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    if (!selectedGroup) return;
    const currentItem = selectedGroup.items[currentMediaIndex];
    setMemories(prev => prev.map(m => m.id === currentItem.id ? { ...m, date: editForm.date, message: editForm.message } : m));
    setSelectedGroup(null); // Close modal on save to reflect new groups
    setIsEditing(false);
  };

  const nextMedia = () => {
    if (!selectedGroup) return;
    const nextIdx = (currentMediaIndex + 1) % selectedGroup.items.length;
    setCurrentMediaIndex(nextIdx);
    setEditForm({ date: selectedGroup.items[nextIdx].date, message: selectedGroup.items[nextIdx].message });
    setIsEditing(false);
  };
  const prevMedia = () => {
    if (!selectedGroup) return;
    const prevIdx = (currentMediaIndex - 1 + selectedGroup.items.length) % selectedGroup.items.length;
    setCurrentMediaIndex(prevIdx);
    setEditForm({ date: selectedGroup.items[prevIdx].date, message: selectedGroup.items[prevIdx].message });
    setIsEditing(false);
  };

  const toggleFavorite = (id: string) => {
    setMemories(prev => prev.map(m => m.id === id ? { ...m, isFavorite: !m.isFavorite } : m));
    setSelectedGroup(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        items: prev.items.map(m => m.id === id ? { ...m, isFavorite: !m.isFavorite } : m)
      };
    });
  };

  return (
    <div className="w-[98%] mx-auto pb-6 min-h-full lg:h-[calc(100vh-40px)] flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6 z-10 relative">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-3xl md:text-5xl font-serif text-brand-beige mb-2">Proof That You Are Loved</h1>
          <p className="text-brand-muted text-lg">A constellation of moments to remind you.</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex gap-4">
           <button 
             onClick={() => setIsAddModalOpen(true)}
             className="px-4 py-2.5 rounded-full bg-brand-rose/20 border border-brand-rose/40 text-brand-ivory text-sm font-medium hover:bg-brand-rose/30 transition-colors shadow-lg backdrop-blur-md"
           >
             Add Memory +
           </button>
           <button 
             onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
             className="px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-brand-ivory text-sm hover:bg-white/10 transition-colors flex items-center gap-2 shadow-lg backdrop-blur-md"
           >
             <Calendar size={16} className="text-brand-rose" />
             {sortOrder === 'asc' ? 'Oldest to Newest' : 'Newest to Oldest'}
           </button>
        </motion.div>
      </div>

      {/* Main View Area */}
      <div className="flex-1 relative glass-card rounded-3xl border border-white/5 flex flex-col lg:overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="flex-1 p-4 md:p-8 lg:overflow-y-auto custom-scrollbar w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center w-full">
            {groupedMemories.map((group, groupIdx) => {
              const coverItem = group.items[0];
              const coverUrl = coverItem.mediaUrls[0];
              return (
                <div 
                  key={groupIdx} 
                  onClick={() => openModal(group)}
                  className="bg-[#F4E8DB] p-3 pb-8 shadow-xl cursor-pointer hover:scale-[1.02] transition-transform rotate-1 hover:rotate-0 w-full max-w-[340px]"
                >
                  {coverUrl && (
                    isVideo(coverUrl) ? (
                      <video src={coverUrl} className="w-full aspect-square object-cover mb-4 sepia-[10%]" muted />
                    ) : (
                      <img src={coverUrl} alt="memory" className="w-full aspect-square object-cover mb-4 sepia-[10%]" />
                    )
                  )}
                  <h3 className="font-serif text-black/90 text-lg text-center font-medium mb-1">{group.title}</h3>
                  <p className="text-center text-black/50 text-xs">
                    {group.date ? `${new Date(group.date).toLocaleDateString()} ${group.items.length > 1 ? `(${group.items.length} items)` : ''}` : 'No date set'}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Memory Detail Modal */}
      <AnimatePresence>
        {selectedGroup && selectedGroup.items.length > 0 && (() => {
          const currentItem = selectedGroup.items[currentMediaIndex];
          const mediaUrl = currentItem.mediaUrls[0];
          
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => setSelectedGroup(null)}
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-md bg-[#F4E8DB] p-4 pb-8 shadow-2xl rounded-sm z-10 rotate-[-1deg]"
              >
                <button 
                  onClick={() => setSelectedGroup(null)}
                  className="absolute -top-4 -right-4 p-2 bg-brand-main text-brand-ivory rounded-full shadow-lg hover:bg-brand-secondary transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="relative group overflow-hidden bg-black/5">
                  <div className="relative h-80 w-full flex items-center justify-center mb-2">
                    {mediaUrl && (
                      isVideo(mediaUrl) ? (
                        <video src={mediaUrl} controls className="w-full h-full object-contain" />
                      ) : (
                        <img src={mediaUrl} alt={currentItem.title} className="w-full h-full object-contain sepia-[10%]" />
                      )
                    )}
                    {selectedGroup.items.length > 1 && (
                      <>
                        <button onClick={prevMedia} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/30 backdrop-blur-sm text-white rounded-full hover:bg-black/50"><ChevronLeft size={20}/></button>
                        <button onClick={nextMedia} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/30 backdrop-blur-sm text-white rounded-full hover:bg-black/50"><ChevronRight size={20}/></button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/20 px-2 py-1 rounded-full backdrop-blur-sm max-w-xs overflow-x-auto">
                          {selectedGroup.items.map((_, idx) => (
                            <div key={idx} className={clsx("w-1.5 h-1.5 rounded-full shrink-0 transition-colors", idx === currentMediaIndex ? "bg-white" : "bg-white/40")} />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  <button 
                    onClick={() => toggleFavorite(currentItem.id)}
                    className="absolute top-4 right-4 p-3 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition-colors z-20"
                  >
                    <Heart size={20} fill={currentItem.isFavorite ? "#C98D9F" : "none"} className={currentItem.isFavorite ? "text-brand-rose" : ""} />
                  </button>
                </div>

                <div className="px-6 pb-2 text-center mt-4">
                  <h2 className="font-serif text-3xl text-black/90 mb-4">
                    {currentItem.date 
                      ? `Moment on ${new Date(currentItem.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}` 
                      : 'A Memory'}
                  </h2>
                  
                  {isEditing ? (
                    <div className="flex flex-col gap-4 mb-4">
                      <input 
                        type="date" 
                        value={editForm.date} 
                        onChange={e => setEditForm(prev => ({ ...prev, date: e.target.value }))}
                        className="border border-brand-main/20 rounded p-2 text-brand-main bg-white/50 focus:outline-none focus:border-brand-main/50"
                      />
                      <textarea 
                        value={editForm.message}
                        onChange={e => setEditForm(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Add a sweet note here..."
                        className="border border-brand-main/20 rounded p-2 text-brand-main bg-white/50 resize-none h-24 focus:outline-none focus:border-brand-main/50"
                      />
                      <div className="flex gap-2">
                        <button onClick={() => setIsEditing(false)} className="flex-1 border border-brand-main/20 text-brand-main px-4 py-2 rounded-lg hover:bg-black/5">Cancel</button>
                        <button onClick={handleSaveEdit} className="flex-1 bg-brand-main text-brand-ivory px-4 py-2 rounded-lg hover:bg-brand-secondary">Save</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-center gap-4 text-sm text-black/60 mb-6">
                        {currentItem.date ? (
                          <span className="flex items-center gap-1"><Calendar size={14}/> {new Date(currentItem.date).toLocaleDateString()}</span>
                        ) : (
                          <span className="flex items-center gap-1 italic"><Calendar size={14}/> No date set</span>
                        )}
                        {currentItem.place && <span className="flex items-center gap-1"><MapPin size={14}/> {currentItem.place}</span>}
                      </div>
                      {currentItem.message ? (
                        <p className="font-serif italic text-black/80 text-lg leading-relaxed mb-6">
                          "{currentItem.message}"
                        </p>
                      ) : (
                        <p className="font-serif italic text-black/40 text-sm leading-relaxed mb-6">
                          No note added yet.
                        </p>
                      )}
                      {(!currentItem.date || !currentItem.message) && (
                        <button 
                          onClick={() => setIsEditing(true)} 
                          className="text-brand-main/60 hover:text-brand-main flex items-center gap-1 justify-center w-full mt-2 transition-colors"
                        >
                          <Edit2 size={14} /> <span className="text-sm underline">Add Note & Date</span>
                        </button>
                      )}
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

      {/* Add Memory Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsAddModalOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#F4E8DB] p-6 shadow-2xl rounded-sm z-10"
            >
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="absolute -top-4 -right-4 p-2 bg-brand-main text-brand-ivory rounded-full shadow-lg hover:bg-brand-secondary transition-colors"
              >
                <X size={20} />
              </button>

              <h2 className="font-serif text-3xl text-black/90 mb-6 text-center">Add a Memory</h2>
              
              <div className="flex flex-col gap-5">
                {/* Photo Upload */}
                <div>
                  <label className="block text-black/70 text-sm mb-2 font-medium">Upload Photo *</label>
                  {newMemoryForm.photoUrl ? (
                    <div className="relative w-full h-48 bg-black/5 rounded flex items-center justify-center overflow-hidden border border-black/10">
                      <img src={newMemoryForm.photoUrl} alt="Preview" className="w-full h-full object-contain sepia-[10%]" />
                      <button 
                        onClick={() => setNewMemoryForm(prev => ({ ...prev, photoUrl: '' }))}
                        className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70 backdrop-blur-sm"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <label className="w-full h-32 border-2 border-dashed border-brand-main/30 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-black/5 transition-colors">
                      <span className="text-brand-main/70 text-sm font-medium flex items-center gap-2">
                        <span className="text-xl">+</span> Select a photo
                      </span>
                      <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                    </label>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="block text-black/70 text-sm font-medium">Date Stamp</label>
                  <input 
                    type="date" 
                    value={newMemoryForm.date} 
                    onChange={e => setNewMemoryForm(prev => ({ ...prev, date: e.target.value }))}
                    className="border border-brand-main/20 rounded p-2.5 text-brand-main bg-white/50 focus:outline-none focus:border-brand-main/50"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="block text-black/70 text-sm font-medium">Note</label>
                  <textarea 
                    value={newMemoryForm.message}
                    onChange={e => setNewMemoryForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Write a sweet note about this memory..."
                    className="border border-brand-main/20 rounded p-2.5 text-brand-main bg-white/50 resize-none h-24 focus:outline-none focus:border-brand-main/50 custom-scrollbar"
                  />
                </div>

                <button 
                  onClick={handleAddNewMemory}
                  disabled={!newMemoryForm.photoUrl}
                  className="w-full mt-2 bg-brand-main text-brand-ivory px-4 py-3 rounded-lg hover:bg-brand-secondary transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Memory
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
