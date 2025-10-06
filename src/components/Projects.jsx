import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Code, Palette, Globe } from 'lucide-react';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedCategory, setSelectedCategory] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'POS System',
      description: 'A comprehensive Point of Sale solution designed for retail businesses, featuring real-time inventory management, sales analytics, and multi-location support. The system includes barcode scanning, receipt printing, and integrates with popular payment gateways. Built with a focus on performance and user experience, it helps businesses streamline their operations and gain valuable business insights.',
      category: 'web',
      tech: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'REST API'],
      features: [
        'A PWA POS System',
        'Automated Financial Reports',
        'Multi Company Support',
        'Barcode scanning',
        'Compalete Stock management PO, SO, GRN, Transfer,Enquiry, Cart',
      ],
      demoUrl: '#',
      githubUrl: '#',
    },
    {
      id: 2,
      title: 'Interactive Portfolio Platform',
      description: 'A dynamic portfolio platform that combines professional background with creative projects. The responsive design ensures optimal viewing across devices, while the interactive elements provide an engaging user experience. The platform includes a blog section, project showcase, and contact form, all built with performance and accessibility in mind.',
      category: 'design',
      tech: ['React.js', 'Vercel', 'Tailwind CSS', 'Framer Motion'],
      features: [
        'Responsive design',
        'Interactive animations',
        'SEO optimized',
        'Project filtering'
      ],
      demoUrl: '#',
      githubUrl: '#',
    },
    {
      id: 3,
      title: 'Blob Tracker',
      description: 'An advanced computer vision application that processes video streams to detect and track objects in real-time. The application implements various image processing techniques including background subtraction, contour detection, and object tracking. Ideal for surveillance, motion detection, and interactive installations. The modular architecture allows for easy extension with additional computer vision algorithms.',
      category: 'ai',
      tech: ['Python', 'OpenCV', 'NumPy', 'TensorFlow'],
      features: [
        'Real-time object detection',
        'Customizable tracking parameters',
        'Multiple object tracking',
        'Background subtraction',
        'Performance optimization',
        'Cross-platform compatibility'
      ],
      demoUrl: '#',
      githubUrl: '#',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Projects', icon: Globe },
    { id: 'web', name: 'Web Apps', icon: Code },
    { id: 'mobile', name: 'Mobile', icon: Globe },
    { id: 'design', name: 'Design', icon: Palette },
    { id: 'ai', name: 'AI/ML', icon: Code },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section id="projects" className="py-20 bg-slate-800/20">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="px-2">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
              Projects
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A collection of my recent work, showcasing my skills and experience in various domains of development and design.
          </p>
        </motion.div>

        {/* Category Filter - Currently hidden */}

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group bg-slate-800/50 backdrop-blur-md rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 border border-slate-700/50 hover:border-purple-500/30"
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 p-6 h-80 flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors break-words">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {project.description}
                  </p>
                </div>
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-purple-300 mb-2">Key Features:</h4>
                  <ul className="grid grid-cols-2 gap-1 text-xs text-gray-300 break-words">
                    {project.features.slice(0, 4).map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-purple-400 mr-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="p-6 border-t border-slate-700">
                <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-slate-800/50 text-purple-300 rounded-full border border-slate-700 whitespace-nowrap"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects - Currently hidden */}
      </div>
    </section>
  );
};

export default Projects;
