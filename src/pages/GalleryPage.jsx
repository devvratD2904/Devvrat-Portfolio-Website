import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, Camera, Filter, ArrowLeft } from 'lucide-react';

const GalleryPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); 
    return () => clearTimeout(timer);
  }, []);

  const images = [
    {
      id: 1,
      src: 'https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=1600',
      category: 'nature',
      title: 'Mountain Serenity',
      description: 'Captured during a sunrise hike in the Alps',
      location: 'Swiss Alps, Switzerland',
      date: 'June 2023',
    },
    {
      id: 2,
      src: 'https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=1600',
      category: 'urban',
      title: 'City Lights',
      description: 'Urban architecture meets natural lighting',
      location: 'New York, USA',
      date: 'May 2023',
    },
    {
      id: 3,
      src: 'https://images.pexels.com/photos/1142950/pexels-photo-1142950.jpeg?auto=compress&cs=tinysrgb&w=1600',
      category: 'portrait',
      title: 'Human Stories',
      description: 'Capturing authentic moments and emotions',
      location: 'Paris, France',
      date: 'April 2023',
    },
    {
      id: 4,
      src: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1600',
      category: 'nature',
      title: 'Ocean Dreams',
      description: 'The endless beauty of coastal landscapes',
      location: 'Maldives',
      date: 'March 2023',
    },
    {
      id: 5,
      src: 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=1600',
      category: 'urban',
      title: 'Street Art',
      description: 'Finding art in unexpected places',
      location: 'Berlin, Germany',
      date: 'February 2023',
    },
    {
      id: 6,
      src: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=1600',
      category: 'portrait',
      title: 'Creative Minds',
      description: 'Portraits of fellow artists and creatives',
      location: 'London, UK',
      date: 'January 2023',
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

  // Welcome animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-center"
        >
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1.5, repeat: Infinity, repeatType: "reverse" }
            }}
            className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full mx-auto mb-6"
          />
          <div className="space-y-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-2xl md:text-3xl font-serif italic text-gray-700"
            >
              "We shall meet in the place where there is no darkness."
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-600"
            >
              ― George Orwell, 1984
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: 'spring', stiffness: 300 }}
              className="pt-4"
            >
              <span className="text-lg text-gray-500">so...</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, type: 'spring' }}
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent"
            >
              Welcome to the Bright Side
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-700 hover:text-orange-500 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
              The Bright Side
            </h1>
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  selectedCategory !== 'all' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filter</span>
              </button>
              
              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 p-2 z-50">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 rounded-md text-sm transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-orange-100 text-orange-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredImages.map((image) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl aspect-[4/5] cursor-pointer"
              onClick={() => setSelectedImage(image.id)}
              layoutId={`image-${image.id}`}
            >
              <motion.img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white font-bold text-xl mb-1">{image.title}</h3>
                <p className="text-gray-300 text-sm">{image.category}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">No images found in this category.</p>
          </div>
        )}
      </main>

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
            <motion.div 
              className="relative max-w-6xl w-full max-h-[90vh]"
              layoutId={`image-${selectedImage}`}
            >
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
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-orange-500 transition-colors z-10"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <motion.img
                  key={selectedImage}
                  src={selectedImageData?.src}
                  alt={selectedImageData?.title}
                  className="max-w-full max-h-[70vh] mx-auto rounded-lg"
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
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-orange-500 transition-colors z-10"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
              
              <motion.div 
                className="mt-6 text-center text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-2">{selectedImageData?.title}</h3>
                <p className="text-gray-300 max-w-2xl mx-auto">{selectedImageData?.description}</p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {selectedImageData?.location}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {selectedImageData?.date}
                  </div>
                  <div className="flex items-center">
                    <Camera className="w-4 h-4 mr-2" />
                    <span>#{selectedImageData?.id}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
