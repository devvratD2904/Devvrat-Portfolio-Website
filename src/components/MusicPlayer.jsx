import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Play, Pause, Music as MusicIcon } from 'lucide-react';

// Create a context to share music state
const MusicContext = React.createContext();

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    // Initialize audio when component mounts
    const initializeAudio = async () => {
      try {
        const audioModule = await import('../assets/audio/mymusic1.mp3');
        const audioElement = new Audio(audioModule.default);
        audioElement.loop = true;
        setAudio(audioElement);
      } catch (error) {
        console.error('Error loading audio:', error);
      }
    };

    initializeAudio();

    return () => {
      // Cleanup audio when component unmounts
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, []);

  const togglePlayPause = () => {
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <MusicContext.Provider value={{ isPlaying, togglePlayPause }}>
      {children}
    </MusicContext.Provider>
  );
};

const MusicPlayer = () => {
  const { isPlaying, togglePlayPause } = useMusic();
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="music" className="py-8 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="group relative bg-slate-800/30 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/20 to-orange-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-300 -z-10"></div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center w-full sm:w-auto">
              <div className="relative group/button">
                <button
                  onClick={togglePlayPause}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-orange-500 flex items-center justify-center text-white hover:opacity-90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 group-hover/button:scale-110"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 ml-0.5" />
                  )}
                </button>
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full opacity-75 blur-sm -z-10 group-hover/button:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="ml-4 overflow-hidden">
                <h3 className="text-sm sm:text-base font-medium text-white line-clamp-2">
                  This music is generated with SUNO AI by me with the hint of Indian folk, and some futuristic vibe
                </h3>
              </div>
            </div>
            
            <div className="text-sm text-gray-400 whitespace-nowrap">
              <span className="text-purple-400">🎵</span> Add Some Background Music
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MusicPlayer;
