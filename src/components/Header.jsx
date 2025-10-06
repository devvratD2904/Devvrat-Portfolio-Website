import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Camera, Volume2, VolumeX } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useMusic } from './MusicPlayer';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isPlaying: isMusicPlaying, togglePlayPause: toggleMusic } = useMusic();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    {
      href: '/',
      label: 'Home',
      isExternal: false,
      onClick: (e) => {
        if (location.pathname === '/') {
          e.preventDefault();
          scrollToTop();
        }
      }
    },
    { href: isHomePage ? '#about' : '/#about', label: 'About', isExternal: !isHomePage },
    { href: isHomePage ? '#projects' : '/#projects', label: 'Projects', isExternal: !isHomePage },
    { href: '/gallery', label: 'Gallery', isExternal: false },
    { href: isHomePage ? '#music' : '/#music', label: 'Music', isExternal: !isHomePage },
    { href: isHomePage ? '#personal' : '/#personal', label: 'Personal', isExternal: !isHomePage },
  ];

  const scrollToSection = (e, href, isExternal) => {
    e?.preventDefault();
    if (isExternal) return; // Let the link handle the navigation

    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (href === '/gallery') {
      // Let the Link component handle the navigation
      return;
    }
    setIsOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || isOpen ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                scrollToTop();
              }
            }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent font-funky"
              >
                D.D
              </motion.div>
            </Link>
            
            <button 
              onClick={toggleMusic}
              className="relative group p-2 rounded-full hover:bg-slate-800/50 transition-colors"
              aria-label={isMusicPlaying ? 'Pause music' : 'Play music'}
              title="Original composition by me"
            >
              <motion.div
                animate={{ 
                  scale: isMusicPlaying ? [1, 1.1, 1] : 1,
                  rotate: isMusicPlaying ? [0, 5, -5, 0] : 0
                }}
                transition={{ 
                  scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                  rotate: { duration: 1, repeat: Infinity }
                }}
                className="relative"
              >
                {isMusicPlaying ? (
                  <Volume2 className="w-5 h-5 text-purple-400" />
                ) : (
                  <>
                    <VolumeX className="w-5 h-5 text-gray-400" />
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-red-500 transform -rotate-12"></div>
                  </>
                )}
              </motion.div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {isMusicPlaying ? 'Pause music' : 'Play music'}
                <div className="text-xxs text-purple-300">Original composition</div>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.href} className="relative group">
                {item.href.startsWith('/') ? (
                  <Link
                    to={item.href}
                    onClick={item.onClick}
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    {item.href === '/gallery' && <Camera className="w-4 h-4 mr-1" />}
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={(e) => scrollToSection(e, item.href, item.isExternal)}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </button>
                )}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-orange-400 transition-all duration-300 group-hover:w-full"></span>
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-md shadow-lg px-6 py-4 rounded-b-lg"
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <div key={item.href} className="block">
                    {item.href.startsWith('/') ? (
                      <Link
                        to={item.href}
                        onClick={(e) => {
                          if (item.onClick) {
                            item.onClick(e);
                          } else if (location.pathname === '/' && item.href.startsWith('#')) {
                            e.preventDefault();
                            scrollToSection(e, item.href, false);
                          }
                          setIsOpen(false);
                        }}
                        className="block px-3 py-2 text-gray-300 hover:text-white transition-colors duration-200 rounded hover:bg-slate-800"
                      >
                        {item.href === '/gallery' && <Camera className="inline w-4 h-4 mr-2" />}
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        onClick={(e) => scrollToSection(e, item.href, item.isExternal)}
                        className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white transition-colors duration-200 rounded hover:bg-slate-800"
                      >
                        {item.label}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;