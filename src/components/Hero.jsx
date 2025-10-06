import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, Instagram } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { PinterestOutlined } from '@ant-design/icons';

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden py-20">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl mb-6"
          >
            <motion.span
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="block text-white font-mine"
            >
              Portfolio
            </motion.span>

            <motion.span
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="block bg-gradient-to-r from-purple-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent font-funky"
            >
              Devvrat Dave
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            <TypeAnimation
              sequence={[
                "Hey There! I am Devvrat",
                2000,
                "I am a Full-Stack Developer",
                500,
                "And Sometimes a Photographer",
                2000,
              ]}
              wrapper="span"
              speed={50} // typing speed (lower = slower)
              repeat={Infinity} // loop forever
            />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex justify-center space-x-6 mb-12"
          >
            {[
              { icon: Github, href: 'https://github.com/devvratD2904', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/devvrat-dave-02b584222/', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:devvratdave1@gmail.com', label: 'Mail' },
              { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-slate-800/50 backdrop-blur-md rounded-full hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-orange-500/20 transition-all duration-300 group"
              >
                <social.icon className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

      </div>
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-white transition-colors"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;
