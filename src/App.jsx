// App.jsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import { MusicProvider } from './components/MusicPlayer';
import Home from './pages/Home';
import GalleryPage from './pages/GalleryPage';
import DinoGame from './components/DinoGame';

const App = () => {
  const location = useLocation();

  const hideHeaderFooter = location.pathname === "/gallery"; // condition

  return (
    <MusicProvider>
      <div className="bg-slate-900 text-white overflow-x-hidden min-h-screen flex flex-col">
        {!hideHeaderFooter && <Header />}

        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<GalleryPage />} />
              {/* <Route path="/game" element={<DinoGame />} /> */}
            </Routes>
          </AnimatePresence>
        </main>

        {!hideHeaderFooter && <Footer />}
      </div>
    </MusicProvider>
  );
};

export default App;
