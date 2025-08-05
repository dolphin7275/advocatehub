/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from "framer-motion";

// MOTION ADDED: Professional fade-in from bottom animation
const fadeInUp = (delay) => ({
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, delay: delay, ease: "easeOut" },
  },
});

// MOTION ADDED: Scale animation for headings
const scaleIn = (delay) => ({
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, delay: delay, ease: "easeOut" },
  },
});

// MOTION ADDED: Slide in from left animation
const slideInLeft = (delay) => ({
  hidden: { x: -60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, delay: delay, ease: "easeOut" },
  },
});

function HowItWorks() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
      className="bg-[#010922] py-8 px-4 md:py-12 md:px-8 text-center" // Background changed to dark shade #010922
    >
      {/* Heading with responsive text size */}
      <motion.h2
        variants={scaleIn(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="text-3xl md:text-4xl font-semibold text-white mb-3" // Text changed to white
      >
        How it Works?
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        variants={fadeInUp(0.4)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="max-w-3xl mx-auto text-white text-base md:text-lg mb-6 md:mb-8" // Text changed to white
      >
        Connect with Verified Lawyers Across India.
      </motion.p>

      {/* Description */}
      <motion.p
        variants={slideInLeft(0.6)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
        className="max-w-3xl mx-auto text-white text-sm md:text-base" // Text changed to white
      >
        Advocate Hub is your one-stop legal platform to find and connect with experienced lawyers instantly. Chat or video call to discuss your legal concerns—civil, criminal, family, or corporate—and get personalized solutions. No long waits, no confusion. Just trusted legal guidance made simple, fast, and accessible for everyone, everywhere in India.
      </motion.p>
    </motion.section>
  );
}

export default HowItWorks;