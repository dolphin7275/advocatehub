/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom'; // Corrected import for Link from 'react-router-dom'

const container = (delay) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: delay },
  },
});

const fadeInUp = (delay) => ({
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, delay: delay, ease: "easeOut" },
  },
});

const scaleIn = (delay) => ({
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, delay: delay, ease: "easeOut" },
  },
});

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
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      id='home'
      name='home'
      className="bg-[#8080d7] py-16 px-4 sm:px-6 md:px-10" // Adjusted padding for better responsiveness
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">

        {/* Left - Content */}
        <div className="flex-1 w-full"> {/* Added w-full for consistent sizing on small screens */}
          <motion.h1
            variants={container(0)}
            initial="hidden"
            animate="visible"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-center md:text-left text-[#ffffff] drop-shadow" // Adjusted text sizes for responsiveness
          >
            Justice Is Just a Click Away
          </motion.h1>

          <motion.p
            variants={fadeInUp(0.3)}
            initial="hidden"
            animate="visible"
            className="mt-4 text-lg text-[#fff] text-center md:text-left px-1" // Added px-1 for padding on small screens
          >
            Talk to verified lawyers anytime, anywhere.
          </motion.p>

          <motion.p
            variants={fadeInUp(0.5)}
            initial="hidden"
            animate="visible"
            className="mt-2 text-lg text-[#fff] pb-3 text-center md:text-left px-1" // Added px-1 for padding on small screens
          >
            No queues, No complications — just real legal help, instantly.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mt-6 space-y-3 px-1" // Added px-1 for padding on small screens
          >
            {[
              '100% Verified Advocates Across India',
              'Chat or Video Call Instantly',
              'Support for Civil, Criminal, Family & More',
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={listItem}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-2 text-[#fff] text-base pl-6 sm:pl-10" // Adjusted padding for responsiveness
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 + (index * 0.2) + 0.2 }}
                  className="text-[#aad9d9] mt-1"
                >
                  ✔
                </motion.span>
                <span>{item}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Button */}
          <motion.div
            variants={scaleIn(1.2)}
            initial="hidden"
            animate="visible"
            className="mt-8 flex justify-center md:justify-start pb-10" // Adjusted alignment for responsiveness
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                // boxShadow: "0 10px 25px -5px rgba(140, 43, 50, 0.4)" // Original commented out
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-[#aad9d9] hover:bg-[#99c3c3] text-[#010922] cursor-pointer px-6 py-3 rounded-xl text-lg font-semibold transition-all shadow-md w-full sm:w-auto" // Added w-full and sm:w-auto for responsive button width
            >
              <Link to='/advocate-list'>
                Book a Session
              </Link>
            </motion.button>
          </motion.div>
        </div>

        {/* Right - Illustration */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex-1 flex justify-center w-full md:w-auto" // Image container always visible and responsive
        >
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
            src="https://cdn-icons-png.flaticon.com/512/2965/2965567.png" // Image source applied
            alt="Legal Help"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md object-contain drop-shadow-lg" // Ensured responsive image sizing
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;