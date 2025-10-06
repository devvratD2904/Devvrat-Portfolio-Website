import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail, Instagram } from 'lucide-react';
import { FaPinterest } from 'react-icons/fa';
import { TbBrandPinterest } from 'react-icons/tb';
const Footer = () => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/devvratD2904', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/devvrat-dave-02b584222/', label: 'LinkedIn' },
    { icon: TbBrandPinterest, href: 'https://www.pinterest.com/gintoki2904/_created', label: 'Pinterest' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Music', href: '#music' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // const scrollToTop = () => {
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // };

  return (
    <footer className="bg-slate-900/50 backdrop-blur-md border-t border-slate-700/50">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <motion.h3
              className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent cursor-pointer"
            >
              Stalk me here
            </motion.h3>
            <p className="text-gray-400 mb-6 max-w-md">
              I love "Did you know?" so tell me any fun facts about anything nerdy.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-slate-800/50 rounded-full hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-orange-500/20 transition-all duration-300 group"
                  >
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-xl font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.button
                    onClick={() => scrollToSection(link.href)}
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                  >
                    {link.name}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xl font-bold mb-6 text-white">Get In Touch</h4>
            <div className="space-y-3">
              <p className="text-gray-400">
                <span className="text-white font-medium">Email:</span><br />
                <a
                  href="mailto:devvratdave0@gmail.com"
                  className="text-gray-300 hover:text-white underline"
                >
                  devvratdave1@gmail.com
                </a>
              </p>
              <p className="text-gray-400">
                <span className="text-white font-medium">Location:</span><br />
                Ahmedabad, India
              </p>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-slate-700/50 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm flex items-center">
            © {new Date().getFullYear()} Devvrat. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-4 md:mt-0 flex items-center">
            Made with <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" /> for you
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
