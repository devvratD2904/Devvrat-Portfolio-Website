import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, Code, Palette, Music, Camera, Braces } from 'lucide-react';
import { FaReact, FaNodeJs } from "react-icons/fa";
import { AiOutlinePython } from "react-icons/ai";
import { LiaDocker } from "react-icons/lia";
import { IoLogoGithub } from "react-icons/io";
const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills = [
    { name: 'Node.js', level: 90, icon: FaNodeJs },
    { name: 'React.js', level: 85, icon: FaReact },
    { name: 'Python', level: 70, icon: AiOutlinePython },
    { name: 'Docker', level: 80, icon: LiaDocker },
    { name: 'Git Actions', level: 85, icon: IoLogoGithub },
  ];

  const experiences = [
    {
      year: '2025(Aug)-Present',
      role: 'Software developer Level 1',
      company: 'WeServe Codes pvt. ltd.',
      description: 'Building scalable software and refining my craft in real-world projects',
    },
    {
      year: '2025(Jan)-2025(Jul)',
      role: 'Intern Software Developer',
      company: 'WeServe Codes pvt. ltd.',
      description: 'Kickstarted my journey creating user-focused web solutions.',
    },

  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            I'm a passionate developer who believes in the power of creative code.
            With a background in both technical development and visual arts, I create
            digital experiences that are not only functional but also beautiful and engaging.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-slate-800/30 backdrop-blur-md rounded-2xl p-8"
          >
            <h3 className="text-3xl font-bold mb-8 flex items-center">
              <Code className="w-8 h-8 mr-3 text-purple-400" />
              Skills & Expertise
            </h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <skill.icon className="w-5 h-5 mr-2 text-orange-400" />
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <span className="text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className="h-2 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Experience Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-slate-800/30 backdrop-blur-md rounded-2xl p-8"
          >
            <h3 className="text-3xl font-bold mb-8 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mr-3 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M12 16h.01M16 12h.01M8 12h.01M3 12h18"
                />
              </svg>
              Experience
            </h3>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={`${exp.role}-${exp.company}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="relative pl-8 pb-8 border-l-2 border-purple-500/30 last:border-transparent last:pb-0"
                >
                  <div className="absolute w-4 h-4 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full -left-2 top-1"></div>
                  <div className="text-sm font-mono text-purple-400">{exp.year}</div>
                  <h4 className="text-xl font-bold mt-1">{exp.role}</h4>
                  <div className="text-orange-400 font-medium mb-2">{exp.company}</div>
                  <p className="text-gray-300">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <a
            href="https://drive.google.com/file/d/1rkbEIAW5ZHEeQCsNZWYtNkHtp_GqAtlW/view?usp=drivesdk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-orange-500 text-white font-medium rounded-full hover:opacity-90 transition-opacity"
          >

            View Resume
          </a>

        </motion.div>
      </div>
    </section>
  );
};

export default About;
