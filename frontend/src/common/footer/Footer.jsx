/* eslint-disable no-unused-vars */
import React from 'react'
import { motion } from 'framer-motion'; // Added framer-motion import
import Assets from '../../assets/assets'
import { Link } from 'react-router'

const Footer = () => {
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2 // Stagger animation for columns
      }
    }
  };

  const columnVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    // Added slide-up animation for entire footer
    <motion.footer 
      className="bg-[#1A1F2B] pt-10 pb-2 px-6 md:px-20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Added staggered animations for footer columns */}
      <motion.div 
        className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8 py-4 text-lg"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        
        {/* Left Column - Logo & Quote with fade-in animation */}
        <motion.div 
          className="flex-1 space-y-4"
          variants={columnVariants}
        >
          {/* Added subtle hover animation for logo */}
          <motion.img
            src={Assets.logo}
            alt="Advocate Hub Logo"
            className="w-78"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
          <p className="text-[#C4A552] text-sm text-center leading-snug">
            Everything is law — or nothing.
            We turn logic into winning arguments.
          </p>
        </motion.div>

        {/* Center Column - Navigation with staggered link animations */}
        <motion.div 
          className="flex-3 flex flex-col items-center justify-start space-y-6 text-left"
          variants={columnVariants}
        >
          <h2 className="font-bold text-xl text-[#C4A552]">A Trusted Law Firm</h2>
          <ul className="space-y-2 text-lg text-[#ceb571] text-center">
            {/* Added individual hover animations for navigation links */}
            <motion.li
              whileHover={{ x: 5, color: '#C4A552' }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Link to="/">Home</Link>
            </motion.li>
            <motion.li
              whileHover={{ x: 5, color: '#C4A552' }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Link to="/">Featured Lawyers</Link>
            </motion.li>
            <motion.li
              whileHover={{ x: 5, color: '#C4A552' }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Link to="/">Testimonials</Link>
            </motion.li>
            <motion.li
              whileHover={{ x: 5, color: '#C4A552' }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Link to="/">Contact Us</Link>
            </motion.li>
          </ul>
          
          {/* Added subtle animation for divider line */}
          <motion.div 
            className="h-px w-69 bg-neutral-600"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          />
          <p className="text-[#F8F8F5] text-sm">
            © 2025 All Rights Reserved
          </p>
        </motion.div>

        {/* Right Column - Contact Info with individual hover effects */}
        <motion.div 
          className="flex flex-col justify-center space-y-5"
          variants={columnVariants}
        >
          {/* Added subtle hover animations for contact info */}
          <motion.div 
            className='flex flex-row gap-2'
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <h3 className="font-semibold text-[#ceb571]">Call us at: </h3>
            <h3 className="text-[#F8F8F5]">0309-XXXXXX</h3>
          </motion.div>
          <motion.div 
            className='flex flex-row gap-2'
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <h3 className="font-semibold text-[#ceb571]">Email: </h3>
            <h3 className="text-[#F8F8F5]">contact@advocatehub.com</h3>
          </motion.div>
          <motion.div 
            className='flex flex-row gap-2'
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <h3 className="font-semibold text-[#ceb571]">Support Hours: </h3>
            <h3 className="text-[#F8F8F5]">10 AM to 5 PM</h3>
          </motion.div>  
        </motion.div>

      </motion.div>
    </motion.footer>
  )
}

export default Footer