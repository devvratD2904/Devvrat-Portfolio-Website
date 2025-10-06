import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Music as MusicIcon, Play, ExternalLink } from 'lucide-react';
import { grandpa, heaven, jab, soul, wanna } from '../assets/images';

const Music = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const playlists = [
    {
      id: 1,
      name: 'Heaven to Ears',
      description: 'collection of the best instrumental music pieces to add some cool background music in your life while doing work',
      image: heaven,
      link: 'https://open.spotify.com/playlist/5UFFMtHOctzJKcukgw1YO7?si=1d395d9aab304314'
    },
    {
      id: 2,
      name: 'JAB..I was a kid',
      description: 'Songs me and my sister used to dance after fighting over remote',
      image: jab,
      link: 'https://open.spotify.com/playlist/4LBwVnlS3bWs6Fd9rF8csR?si=2a102b83835c4544'
    },
    {
      id: 3,
      name: 'Grandpa\'s Tressure',
      description: 'Songs my grandpa used to love and play on his gramophone',
      image: grandpa,
      link: 'https://open.spotify.com/playlist/55ZFZimojS7CNglMKKtLvJ?si=785bec4f91614011'
    },
    {
      id: 4,
      name: 'Wanna get high',
      description: 'Proof that music can make people high',
      image: wanna,
      link: 'https://open.spotify.com/playlist/567ZpnUOAAMe5zMRKkbcCX?si=4206b94b968d452a' 
    },
    {
      id: 5,
      name: 'Soul-Deracination',
      description: 'Emptiness/Loneliness',
      image: soul,
      link: 'https://open.spotify.com/playlist/3BBhy99c1BwaIBM734yGGW?si=95a6edad435449ed'
    },
  ];

  const recentTracks = [
    { artist: 'Pink Flyod', track: 'Wish You Were Here', album: 'Wish You Were Here', link: 'https://open.spotify.com/track/6mFkJmJqdDVQ1REhVfGgd1?si=28ee3745df6546cc' },
    { artist: 'The Beatles', track: 'While my Guitar Gently Weeps', album: 'The White Album', link: 'https://open.spotify.com/track/389QX9Q1eUOEZ19vtzzI9O?si=c02ff23e3a324bab' },
    { artist: 'Bob Dylan', track: 'Blowin\' in the wind', album: 'The Freewheelin\' Bob Dylan', link: 'https://open.spotify.com/track/18GiV1BaXzPVYpp9rmOg0E?si=5d6f436d53f4465e' },
    { artist: 'Jeff Buckley', track: 'Lover You Should\'ve Come Over', album: 'Grace', link: 'https://open.spotify.com/track/6Jv7kjGkhY2fT4yuBF3aTz?si=69a4e65c2efc4809' },
    { artist: 'FleetWood Mac', track: 'Silver Spring', album: 'Rumours', link: 'https://open.spotify.com/track/4nZi6XNe36Ut4Nij3IQ1yC?si=c20eb88a01454a03' },
    { artist: 'Guns N Roses', track: 'November Rain', album: 'Use Your Illusion I', link: 'https://open.spotify.com/track/3YRCqOhFifThpSRFJ1VWFM?si=88d101be40fd44ef' },
    { artist: 'Radiohead', track: 'Let Down', album: 'OK Computer', link: 'https://open.spotify.com/track/2fuYa3Lx06QQJAm0MjztKr?si=0a18a0d7b2994f77' },
  ];

  return (
    <section id="music" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-slate-800/20 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-5 lg:px-6 w-full">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
            Music is what I Breathe
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-2">
            Music fuels my creativity. Here's a glimpse into the soundscapes that
            accompany my work and inspires my thinking.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
          {/* Playlists Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 md:mb-0"
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 flex items-center">
              <MusicIcon className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-purple-400" />
              My Playlists
            </h3>
            <div className="space-y-3 sm:space-y-4 md:space-y-5">
              {playlists.map((playlist, index) => (
                <motion.div
                  key={playlist.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  className="w-full"
                >
                  <a
                    href={playlist.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-slate-800/40 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="relative flex-shrink-0">
                        <img
                          src={playlist.image}
                          alt={playlist.name}
                          className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-lg sm:rounded-xl object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 rounded-lg sm:rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm sm:text-base md:text-lg font-bold text-white group-hover:text-purple-400 transition-colors truncate">
                          {playlist.name}
                        </h4>
                        <p className="text-xs text-gray-400 mt-0.5 line-clamp-2 leading-tight">
                          {playlist.description}
                        </p>
                      </div>
                      <div className="p-1.5 sm:p-2 rounded-full bg-slate-700/50 group-hover:bg-purple-600 transition-colors flex-shrink-0">
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300" />
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recently Played */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 lg:mt-0"
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mr-3 text-orange-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
              On Loop Forever and Ever
            </h3>
            <div className="bg-slate-800/40 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6">
              <ul className="space-y-2 sm:space-y-3">
                {recentTracks.map((track, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="w-full"
                  >
                    <a
                      href={track.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 sm:p-3 rounded-lg hover:bg-slate-700/50 transition-colors group"
                    >
                      <div className="flex items-center flex-1 min-w-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-700/50 rounded-lg flex items-center justify-center mr-3 sm:mr-4 group-hover:bg-purple-600 transition-colors flex-shrink-0">
                          <Play className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm sm:text-base font-medium text-white truncate">{track.track}</p>
                          <p className="text-xs text-gray-400 truncate">
                            {track.artist} • {track.album}
                          </p>
                        </div>
                      </div>
                      <div className="p-1.5 sm:p-2 rounded-full bg-slate-700/50 group-hover:bg-purple-600 transition-colors flex-shrink-0">
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300" />
                      </div>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
            {/* <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-6 bg-slate-800/40 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h4 className="text-sm sm:text-base font-bold text-white">Follow me on Spotify</h4>
                  <p className="text-xs text-gray-400 mt-1">For more playlists and updates</p>
                </div>
                <a
                  href="https://open.spotify.com/user/312yraikybmirdldyoyiwpmj7j2y?si=7b48945617e14527"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2 text-sm bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-full hover:opacity-90 transition-opacity text-center whitespace-nowrap"
                >
                  View on Spotify
                </a>
              </div>
            </motion.div> */}
          </motion.div>
        </div>
        
        {/* Spotify Follow Section - Moved outside the grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 md:mt-12 lg:mt-16 bg-slate-800/40 backdrop-blur-md rounded-xl sm:rounded-2xl p-5 sm:p-6 hover:shadow-lg transition-all duration-300 max-w-3xl mx-auto w-full"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="text-lg sm:text-xl font-bold text-white">Follow me on Spotify</h4>
              <p className="text-sm text-gray-400 mt-1">For more playlists and updates</p>
            </div>
            <a
              href="https://open.spotify.com/user/312yraikybmirdldyoyiwpmj7j2y?si=7b48945617e14527"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-full hover:opacity-90 transition-opacity text-center whitespace-nowrap flex-shrink-0"
            >
              View on Spotify
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Music;
