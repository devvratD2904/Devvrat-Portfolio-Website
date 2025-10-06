import Hero from '../components/Hero';   // use your new Hero.jsx
import About from '../components/About';
import Projects from '../components/Projects';
import Music from '../components/Music';
import Personal from '../components/Personal';
import GalleryPreview from '../components/GalleryPreview';
import MusicPlayer from '../components/MusicPlayer';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// Import images
import standingImg from '../assets/images/game/standing_pixel.png';
import teacherImg from '../assets/images/game/teacher_pixel.png';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        // Delay to ensure DOM sections are rendered before scrolling
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 0);
      }
    }
  }, [location]);

  return (
    <>
      <Hero />           
      <About />
      <Projects />
      <MusicPlayer/>
      <GalleryPreview />
      {/* <section id="game" className="py-16 bg-slate-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Play My Game</h2>
          <div className="max-w-3xl mx-auto bg-slate-700/50 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-slate-600/30">
            <div className="aspect-video bg-slate-800/50 rounded-lg overflow-hidden mb-6 border-2 border-slate-600/30">
              <div className="h-full flex items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-full h-12 bg-slate-600/30 bottom-0"></div>
                  <div className="relative z-10">
                    <img 
                      src={standingImg} 
                      alt="Game Character" 
                      className="h-24 w-auto drop-shadow-lg"
                    />
                  </div>
                  <div className="absolute right-1/4">
                    <img 
                      src={teacherImg} 
                      alt="Obstacle" 
                      className="h-16 w-auto opacity-70"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-3">Dino Runner</h3>
              <p className="text-slate-300 mb-6 max-w-md mx-auto">Jump over obstacles and see how far you can go! Use SPACE, UP ARROW, or TAP to jump.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/game" 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Play Now
                </Link>
                <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
                  <span>High Score: {localStorage.getItem('dinoHighScore') || '0'}</span>
                </div>
              </div>
              <div className="mt-4 text-sm text-slate-500">
                Works on both desktop and mobile devices
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <Music />
      <Personal />
    </>
  );
};

export default Home;