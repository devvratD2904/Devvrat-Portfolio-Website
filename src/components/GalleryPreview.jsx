import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Camera, ArrowRight } from 'lucide-react';

const GalleryPreview = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const previewImages = [
    {
      id: 1,
      src: 'https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=1600',
      category: 'Nature',
      title: 'Mountain Serenity',
      description: 'Capturing the raw beauty of untouched landscapes',
    },
    {
      id: 2,
      src: 'https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=1600',
      category: 'Urban',
      title: 'City Lights',
      description: 'Urban landscapes and architectural marvels',
    },
    {
      id: 3,
      src: 'https://images.pexels.com/photos/1142950/pexels-photo-1142950.jpeg?auto=compress&cs=tinysrgb&w=1600',
      category: 'Portrait',
      title: 'Human Stories',
      description: 'Emotions and moments frozen in time',
    },
  ];

  return (
    <section id="gallery-preview" className="relative pb-24 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/2 -right-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-purple-300 bg-purple-900/50 rounded-full">
            PHOTOGRAPHY
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-300 via-pink-400 to-orange-400 bg-clip-text text-transparent leading-tight pb-2">
            Visual Storytelling
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Each photograph is a story waiting to be told. Explore my collection of moments captured through the lens.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {previewImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl h-[400px] transform transition-all duration-500 group-hover:shadow-purple-500/30">
                <motion.img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  animate={{ 
                    scale: hoveredIndex === index ? 1.1 : 1,
                    transition: { duration: 5, ease: 'easeInOut' }
                  }}
                />
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.span 
                        className="inline-block text-sm font-medium text-purple-300 mb-2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        {image.category}
                      </motion.span>
                      <motion.h3 
                        className="text-2xl font-bold text-white mb-2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {image.title}
                      </motion.h3>
                      <motion.p 
                        className="text-gray-300 text-sm"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {image.description}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Link
            to="/gallery"
            className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-orange-500 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 overflow-hidden relative"
          >
            <span className="relative z-10 flex items-center">
              <Camera className="w-5 h-5 mr-2" />
              Explore Full Gallery
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Link>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default GalleryPreview;
