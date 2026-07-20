import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Heart, Music, Edit3, MessageCircle } from 'lucide-react';
import { mockSongs, type Song } from '../data/songs';
import clsx from 'clsx';

export default function MusicRoom() {
  const [currentSong, setCurrentSong] = useState<Song>(mockSongs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['1']));
  const [notes, setNotes] = useState<Record<string, string>>({});
  
  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(prev => ({ ...prev, [currentSong.id]: e.target.value }));
  };
  
  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="max-w-6xl mx-auto pb-24">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-3xl md:text-5xl font-serif text-brand-beige mb-4">Underrated Song Sanctuary</h1>
        <p className="text-brand-muted text-lg">A late-night listening room for songs that understand.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Player Area */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 flex flex-col relative overflow-hidden"
          >
            {/* Background blur of current cover */}
            <div 
              className="absolute inset-0 opacity-10 bg-cover bg-center blur-2xl"
              style={{ backgroundImage: `url(${currentSong.coverUrl})` }}
            />
            
            {currentSong.spotifyEmbedId ? (
              <div className="relative z-10 w-full mb-6">
                {mockSongs.map(song => (
                  song.spotifyEmbedId && (
                    <iframe 
                      key={song.id}
                      src={`https://open.spotify.com/embed/track/${song.spotifyEmbedId}?utm_source=generator&theme=0`} 
                      width="100%" 
                      height="152" 
                      frameBorder="0" 
                      allowFullScreen 
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                      className={clsx(
                        "rounded-xl shadow-2xl",
                        currentSong.id === song.id ? "block" : "hidden"
                      )}
                    ></iframe>
                  )
                ))}
                <div className="flex justify-between items-center mt-6 px-2">
                  <div className="flex-1" />
                  <button 
                    onClick={(e) => toggleFavorite(currentSong.id, e)}
                    className={clsx(
                      "p-3 rounded-full border transition-all",
                      favorites.has(currentSong.id) 
                        ? "bg-brand-rose/20 text-brand-rose border-brand-rose/30" 
                        : "bg-white/5 text-brand-muted border-white/10 hover:bg-white/10"
                    )}
                  >
                    <Heart size={20} fill={favorites.has(currentSong.id) ? "currentColor" : "none"} />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start mb-8">
                  <motion.img 
                    key={currentSong.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src={currentSong.coverUrl} 
                    alt={currentSong.title} 
                    className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-xl shadow-2xl"
                  />
                  <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start w-full">
                  <div className="flex-1" />
                    <h2 className="text-2xl md:text-3xl font-serif text-brand-ivory mb-2">{currentSong.title}</h2>
                    <p className="text-brand-muted text-lg mb-6">{currentSong.artist}</p>
                    
                    {/* Controls */}
                    <div className="flex items-center gap-6 w-full justify-center md:justify-start">
                      <button className="text-brand-muted hover:text-brand-ivory transition-colors">
                        <SkipBack size={24} />
                      </button>
                      <button 
                        onClick={togglePlay}
                        className="w-14 h-14 rounded-full bg-brand-ivory text-brand-main flex items-center justify-center hover:scale-105 transition-transform"
                      >
                        {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                      </button>
                      <button className="text-brand-muted hover:text-brand-ivory transition-colors">
                        <SkipForward size={24} />
                      </button>
                      
                      <div className="flex-1" />
                      
                      <button 
                        onClick={(e) => toggleFavorite(currentSong.id, e)}
                        className={clsx(
                          "p-3 rounded-full border transition-all",
                          favorites.has(currentSong.id) 
                            ? "bg-brand-rose/20 text-brand-rose border-brand-rose/30" 
                            : "bg-white/5 text-brand-muted border-white/10 hover:bg-white/10"
                        )}
                      >
                        <Heart size={20} fill={favorites.has(currentSong.id) ? "currentColor" : "none"} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Progress Bar Mock */}
                <div className="relative z-10 w-full flex items-center gap-4 text-xs text-brand-muted">
                  <span>{isPlaying ? '1:23' : '0:00'}</span>
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-beige w-1/3 rounded-full relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-brand-beige rounded-full shadow-[0_0_10px_rgba(231,199,165,0.8)]" />
                    </div>
                  </div>
                  <span>{currentSong.duration}</span>
                </div>
              </>
            )}
            
            {/* Inline Personal Note Letter */}
            <div className="relative mt-6 rounded-2xl bg-white/5 p-6 border border-white/10 backdrop-blur-sm overflow-hidden group hover:bg-white/10 transition-colors">
              {/* Subtle Dark Theme Lines */}
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(255,255,255,0.03) 31px, rgba(255,255,255,0.03) 32px)', backgroundPositionY: '40px' }} />
              
              <div className="relative z-10 font-serif">
                <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                  <Edit3 size={16} className="text-brand-purple" />
                  <h3 className="text-sm font-medium text-brand-purple/90 italic">
                    share your mind out about this song
                  </h3>
                </div>
                
                <textarea
                  value={notes[currentSong.id] || ''}
                  onChange={handleNoteChange}
                  placeholder="Dear me, this song reminds me of..."
                  className="w-full h-32 bg-transparent resize-none outline-none text-brand-ivory text-sm placeholder-brand-muted/50"
                  style={{ lineHeight: '32px' }}
                />
              </div>
            </div>
          </motion.div>

          {/* Deep Reflection Section */}
          <AnimatePresence mode="wait">
            {currentSong.philosophicalQuestion && (
              <motion.div 
                key={`q-${currentSong.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6 border-l-2 border-l-brand-purple flex gap-4 items-start"
              >
                <MessageCircle className="text-brand-purple mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="text-sm font-medium text-brand-purple mb-1">Inspired by this song</h3>
                  <p className="text-brand-ivory font-serif italic text-lg leading-relaxed">"{currentSong.philosophicalQuestion}"</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Playlist Sidebar */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="glass-panel rounded-2xl p-5 border border-white/5">
            <h3 className="text-lg font-serif text-brand-beige mb-4 flex items-center gap-2">
              <Music size={18} /> Up Next
            </h3>
            <div className="flex flex-col gap-2 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
              {mockSongs.map(song => (
                <div 
                  key={song.id}
                  onClick={() => setCurrentSong(song)}
                  className={clsx(
                    "flex items-center gap-4 p-2.5 rounded-xl cursor-pointer transition-all",
                    currentSong.id === song.id 
                      ? "bg-white/10 border border-white/10 shadow-sm" 
                      : "hover:bg-white/5 border border-transparent"
                  )}
                >
                  <img src={song.coverUrl} alt={song.title} className="w-10 h-10 rounded object-cover shadow-sm" />
                  <div className="flex-1 overflow-hidden">
                    <h4 className={clsx("text-sm font-medium truncate", currentSong.id === song.id ? "text-brand-ivory" : "text-brand-muted")}>
                      {song.title}
                    </h4>
                    <p className="text-[10px] text-brand-muted/70 truncate">{song.artist}</p>
                  </div>
                  <div className="text-[10px] text-brand-muted flex flex-col items-end gap-1">
                    <span>{song.duration}</span>
                    {favorites.has(song.id) && <Heart size={10} fill="#C98D9F" className="text-brand-rose" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
