/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router';

const container = (delay) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: delay },
  },
});

// MOTION ADDED: Professional fade-in from bottom animation
const fadeInUp = (delay) => ({
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, delay: delay, ease: "easeOut" },
  },
});

// MOTION ADDED: Scale animation for interactive elements
const scaleIn = (delay) => ({
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, delay: delay, ease: "easeOut" },
  },
});

// MOTION ADDED: Staggered animation for feature list items
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.8,
    },
  },
};

const listItem = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const Hero = () => {
  return (
    // MOTION ADDED: Section with overall fade-in animation
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      id='home' 
      name='home' 
      className="bg-[#6E7582] py-18 px-6"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">

        {/* Left - Content */}
        <div className="flex-1">
          <motion.h1
            variants={container(0)}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-6xl text-center font-bold leading-tight text-[#8C2B32] drop-shadow"
          >
            Justice Is Just a Click Away
          </motion.h1>

          {/* MOTION ADDED: First subtitle with fade-in from bottom */}
          <motion.p 
            variants={fadeInUp(0.3)}
            initial="hidden"
            animate="visible"
            className="mt-4 text-center text-lg text-[#fff0d7]"
          >
            Talk to verified lawyers anytime, anywhere.
          </motion.p>
          
          {/* MOTION ADDED: Second subtitle with delayed fade-in */}
          <motion.p 
            variants={fadeInUp(0.5)}
            initial="hidden"
            animate="visible"
            className="mt-2 text-center text-lg text-[#fff0d7] pb-3"
          >
            No queues, No complications — just real legal help, instantly.
          </motion.p>

          {/* MOTION ADDED: Feature list with staggered animation */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mt-6 space-y-3"
          >
            {[
              '100% Verified Advocates Across India',
              'Chat or Video Call Instantly',
              'Support for Civil, Criminal, Family & More',
            ].map((item, index) => (
              <motion.div 
                key={index} 
                variants={listItem}
                // MOTION ADDED: Subtle hover effect for feature items
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
                className="flex items-start ml-8 gap-2 text-[#fff0d7] text-base"
              >
                {/* MOTION ADDED: Checkmark with scale animation */}
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 + (index * 0.2) + 0.2 }}
                  className="text-[#8C2B32] mt-1"
                >
                  ✔
                </motion.span>
                <span>{item}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* MOTION ADDED: Button container with scale animation */}
          <motion.div 
            variants={scaleIn(1.2)}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-col justify-center sm:flex-row gap-4"
          >
            {/* MOTION ADDED: Enhanced button with professional hover effects */}
            <motion.button 
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(140, 43, 50, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-[#8C2B32] hover:bg-[#621E23] text-[#fff0d7] cursor-pointer px-6 py-3 rounded-xl text-lg font-semibold transition-all shadow-md"
            >
              <Link to='/advocate-list'>
                Book a Session
              </Link>
            </motion.button>
          </motion.div>
        </div>

        {/* Right - Illustration */}
        {/* MOTION ADDED: Image container with slide-in from right */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex-1 hidden md:flex justify-center"
        >
          {/* MOTION ADDED: Image with subtle floating animation and hover effects */}
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              y: [0, -10, 0], // Floating effect
            }}
            transition={{
              scale: { duration: 0.6, delay: 0.8 },
              opacity: { duration: 0.6, delay: 0.8 },
              y: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
            src="https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
            alt="Legal Help"
            className="w-full max-w-sm object-contain drop-shadow-lg"
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;