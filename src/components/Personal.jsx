import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, Coffee, Lightbulb, Zap, Star, Quote } from 'lucide-react';

const Personal = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const funFacts = [
    { icon: Coffee, text: 'Consumed over 1,000 cups of coffee. (you can always buy me one)' },
    { icon: Lightbulb, text: 'Gets best ideas during the worst situation' },
    { icon: Zap, text: 'Can debug code faster with jazz and rock blasting in the background' },
    { icon: Star, text: 'A proud Sapiosexual' },
  ];

  const inspirations = [
    {
      quote: "For he that gets hurt Will be he who has stalled",
      author: "Bob Dylan from song Times they are a-changin'"
    },
    {
      quote: "Get busy living or Get busy dying",
      author: "Stephen King from novel Shawshank Redemption"
    },
    {
      quote: "All you touch and all you see, it’s all your life will ever be",
      author: "Pink Floyd from song Breathe"
    }
  ];

  const interests = [
    { name: 'Street Photography' },
    { name: 'Vinyl Records' },
    { name: 'Mountain Hiking' },
    { name: 'Football' },
    { name: 'Motorsports' },
    { name: 'Learning unnecessary skills' },
    { name: 'Reading random articals and reddit comment threads' },
    { name: 'Playing.. "Would you rather"' },
    { name: 'Finding the laziest way possible for any work' },
  ];

  return (
    <section id="personal" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
            Personal Touch
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Beyond the code and pixels, here's a glimpse into what makes me tick as a creative individual.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Fun Facts */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-slate-800/30 backdrop-blur-md rounded-2xl p-8"
          >
            <h3 className="text-3xl font-bold mb-8 flex items-center">
              <Heart className="w-8 h-8 mr-3 text-pink-400" />
              Meeee :3
            </h3>
            <div className="space-y-6">
              {funFacts.map((fact, index) => {
                const Icon = fact.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="flex items-start space-x-4 group"
                  >
                    <div className="p-3 bg-gradient-to-r from-purple-500/20 to-orange-500/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-orange-400" />
                    </div>
                    <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      {fact.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Interests */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-slate-800/30 backdrop-blur-md rounded-2xl p-8"
          >
            <h3 className="text-3xl font-bold mb-8">Interests & Hobbies</h3>
            <div className="flex flex-wrap gap-3">
              {interests.map((interest, index) => (
                <motion.div
                  key={interest.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.4 + index * 0.1,
                    type: 'spring',
                    stiffness: 100
                  }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="px-4 py-2 bg-slate-700/50 rounded-full text-gray-200 hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-orange-500/30 transition-all duration-300 cursor-default flex items-center space-x-2"
                >
                  <span className="text-xl">{interest.emoji}</span>
                  <span>{interest.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Inspirations */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-purple-900/30 via-slate-800/30 to-orange-900/30 backdrop-blur-md rounded-2xl p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-orange-500/10 rounded-full filter blur-3xl"></div>

          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-8 flex items-center">
              <Quote className="w-8 h-8 mr-3 text-purple-400 transform -scale-x-100" />
              Whispered Wisdom
            </h3>
            <div className="space-y-8">
              {inspirations.map((inspiration, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.2 }}
                  className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300"
                >
                  <p className="text-xl italic text-gray-300 mb-4">"{inspiration.quote}"</p>
                  <p className="text-right text-purple-400 font-medium">— {inspiration.author}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Personal;
