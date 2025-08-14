/* eslint-disable no-unused-vars */
import React from 'react'
import { motion } from 'framer-motion';
import Assets from '../../assets/assets'
import { Link } from 'react-router'
import TermsAndConditions from '../homepage/TermsAndConditions';
import PrivacyPolicy from '../homepage/PrivacyPolicy';
import FAQs from '../homepage/FAQs';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
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
    <motion.footer
      className="bg-[#1A1F2B] pt-10 pb-2 px-6 md:px-20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 py-4 text-lg"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Column 1 - Logo */}
        <motion.div className="space-y-4" variants={columnVariants}>
          <motion.img
            src={Assets.logo}
            alt="Advocate Hub Logo"
            className="w-78"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
          <p className="text-[#C4A552] text-sm text-center leading-snug">
            Everything is law — or nothing.<br />
            We turn logic into winning arguments.
          </p>
        </motion.div>

        {/* Column 2 - A Trusted Law Firm */}
        <motion.div className="space-y-6 text-center md:text-left" variants={columnVariants}>
          <h2 className="font-bold text-xl text-[#C4A552]">A Trusted Law Firm</h2>
          <ul className="space-y-2 text-lg text-[#ceb571] items-center">
            {/*Added individual hover animations fro navigation links*/}
            <motion.li whileHover={{ x: 5, color: '#C4A552' }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}>
                  <Link to="/">Home</Link>
            </motion.li>
            <motion.li whileHover={{ x: 5, color: '#C4A552' }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}>
                  <Link to="/">Featured Lawyers</Link>
            </motion.li>
            <motion.li whileHover={{ x: 5, color: '#C4A552' }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}>
                  <Link to="/">Testimonials</Link>
            </motion.li>
            <motion.li whileHover={{ x: 5, color: '#C4A552' }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}>
                  <Link to="/">Contact-Us</Link>
            </motion.li>
          </ul>
        </motion.div>

        {/* Column 3 - Quick Links */}
        <motion.div className="space-y-6 text-center md:text-left" variants={columnVariants}>
          <h2 className="font-bold text-xl text-[#C4A552]">Quick Links</h2>
          <ul className="space-y-2 text-lg text-[#ceb571] items-center">
            {/*Added individual hover animations fro navigation links*/}
            <motion.li whileHover={{ x: 5, color: '#C4A552' }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}>
                  <Link to="/PrivacyPolicy">Privacy Policy</Link>
            </motion.li>
            <motion.li whileHover={{ x: 5, color: '#C4A552' }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}>
                  <Link to="/TermsAndConditions">Terms & Conditions</Link>
            </motion.li>
            <motion.li whileHover={{ x: 5, color: '#C4A552' }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}>
                  <Link to="/FAQs">FAQs</Link>
            </motion.li>
          </ul>
        </motion.div>

        {/* Column 4 - Contact Info */}
        <motion.div className="space-y-5" variants={columnVariants}>
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

      {/* Divider and copyright */}
      <motion.div
        className="h-px w-69 bg-neutral-600 mx-auto mt-4"
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
      />
      <p className="text-[#F8F8F5] text-sm text-center pt-2">© 2025 All Rights Reserved</p>
    </motion.footer>
  );
};

export default Footer;
