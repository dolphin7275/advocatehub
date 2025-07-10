/* eslint-disable no-unused-vars */
import React from 'react'
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
    // MOTION ADDED: Section container with fade-in animation
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
      className="bg-[#1A1F2B] py-12 px-4 text-center"
    >
      {/* MOTION ADDED: Main heading with scale animation */}
      <motion.h2 
        variants={scaleIn(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
        className="text-4xl font-semibold text-[#C4A552] mb-3"
      >
        How it Works?
      </motion.h2>

      {/* MOTION ADDED: Subtitle with fade-in from bottom */}
      <motion.p 
        variants={fadeInUp(0.4)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
        className='max-w-3xl mx-auto text-[#ceb571] text-lg mb-8'
      >
        Connect with Verified Lawyers Across India.
      </motion.p>

      {/* MOTION ADDED: Main description with slide-in from left */}
      <motion.p 
        variants={slideInLeft(0.6)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
        // MOTION ADDED: Subtle hover effect for better engagement
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
        className="max-w-3xl mx-auto text-[#F8F8F5] text-base"
      >
        Advocate Hub is your one-stop legal platform to find and connect with experienced lawyers instantly. Chat or video call to discuss your legal concerns—civil, criminal, family, or corporate—and get personalized solutions. No long waits, no confusion. Just trusted legal guidance made simple, fast, and accessible for everyone, everywhere in India.
      </motion.p>
    </motion.section>
  )
}

export default HowItWorks;