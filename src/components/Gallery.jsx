import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

const Gallery = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const images = [
    {
      id: 1,
      src: 'https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'nature',
      title: 'Mountain Serenity',
      description: 'Captured during a sunrise hike in the Alps',
    },
    {
      id: 2,
      src: 'https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'urban',
      title: 'City Lights',
      description: 'Urban architecture meets natural lighting',
    },
    {
      id: 3,
      src: 'https://images.pexels.com/photos/1142950/pexels-photo-1142950.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'portrait',
      title: 'Human Stories',
      description: 'Capturing authentic moments and emotions',
    },
    {
      id: 4,
      src: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'nature',
      title: 'Ocean Dreams',
      description: 'The endless beauty of coastal landscapes',
    },
    {
      id: 5,
      src: 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'urban',
      title: 'Street Art',
      description: 'Finding art in unexpected places',
    },
    {
      id: 6,
      src: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'portrait',
      title: 'Creative Minds',
      description: 'Portraits of fellow artists and creatives',
    },
    {
      id: 7,
      src: 'https://images.pexels.com/photos/1173777/pexels-photo-1173777.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'nature',
      title: 'Forest Whispers',
      description: 'The magical atmosphere of ancient woods',
    },
    {
      id: 8,
      src: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'urban',
      title: 'Metropolitan',
      description: 'The rhythm and energy of city life',
    },
  ];

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'nature', name: 'Nature' },
    { id: 'urban', name: 'Urban' },
    { id: 'portrait', name: 'Portrait' },
  ];

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(image => image.category === selectedCategory);

  const nextImage = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
      const nextIndex = (currentIndex + 1) % filteredImages.length;
      setSelectedImage(filteredImages[nextIndex].id);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
      const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
      setSelectedImage(filteredImages[prevIndex].id);
    }
  };

  const selectedImageData = filteredImages.find(img => img.id === selectedImage);

  return (
    <section id="gallery" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
            Photo Gallery
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A collection of moments captured through my lens. Each photo tells a unique story.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white'
                  : 'bg-slate-700/50 text-gray-300 hover:bg-slate-700/80'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * (index % 4) }}
              className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
              onClick={() => setSelectedImage(image.id)}
            >
              <motion.img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                whileHover={{ scale: 1.05 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white font-bold text-lg">{image.title}</h3>
                <p className="text-gray-300 text-sm">{image.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedImage(null);
              }
            }}
          >
            <div className="relative max-w-5xl w-full max-h-[90vh]">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-orange-400 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-orange-500 transition-colors z-10"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <motion.img
                  key={selectedImage}
                  src={selectedImageData?.src}
                  alt={selectedImageData?.title}
                  className="max-w-full max-h-[80vh] mx-auto rounded-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                />
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-orange-500 transition-colors z-10"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
              
              <div className="mt-4 text-center text-white">
                <h3 className="text-2xl font-bold">{selectedImageData?.title}</h3>
                <p className="text-gray-300">{selectedImageData?.description}</p>
                <div className="mt-2 flex items-center justify-center text-sm text-gray-400">
                  <Camera className="w-4 h-4 mr-1" />
                  <span>Photo #{selectedImageData?.id}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
