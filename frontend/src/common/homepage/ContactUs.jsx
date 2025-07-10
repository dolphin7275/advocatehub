/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Added framer-motion import
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Query:', formData);
    toast.success('Your message has been sent!');
    setFormData({ name: '', email: '', contact: '', subject: '', message: '' });
  };

  // Animation variants for form elements
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1 // Stagger animation for form fields
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id='contact-us' name='contact-us' className='w-[100%] bg-[#6E7582] p-10'>
      {/* Added fade-in animation for the entire form container */}
      <motion.div 
        className="max-w-xl mx-auto p-6 rounded-lg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {/* Added slide-in animation for header */}
        <motion.h2 
          className="text-4xl font-bold mb-4 text-[#8c2b32] text-center"
          variants={itemVariants}
        >
          Contact Us
        </motion.h2>
        
        {/* Added fade-in animation for subtitle */}
        <motion.p 
          className="text-[#F8F8F5] text-lg mb-12 text-center"
          variants={itemVariants}
        >
          Facing issues with our advocates?
        </motion.p>

        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-4"
          variants={containerVariants}
        >
          {/* Added individual animations for each form field */}
          <motion.input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full px-4 py-2 border bg-[#bbbbbb] rounded focus:outline-none hover:bg-white"
            variants={itemVariants}
            whileFocus={{ scale: 1.02 }} // Added subtle scale on focus
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
          <motion.input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full px-4 py-2 border bg-[#bbbbbb] rounded focus:outline-none focus:bg-white"
            variants={itemVariants}
            whileFocus={{ scale: 1.02 }} // Added subtle scale on focus
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
          <motion.input
            type="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Your Contact no."
            required
            className="w-full px-4 py-2 border bg-[#bbbbbb] rounded focus:outline-none focus:bg-white"
            variants={itemVariants}
            whileFocus={{ scale: 1.02 }} // Added subtle scale on focus
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
          <motion.input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full px-4 py-2 border bg-[#bbbbbb] rounded focus:outline-none focus:bg-white"
            variants={itemVariants}
            whileFocus={{ scale: 1.02 }} // Added subtle scale on focus
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
          <motion.textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="4"
            required
            className="w-full px-4 py-2 border bg-[#bbbbbb] rounded focus:outline-none focus:bg-white"
            variants={itemVariants}
            whileFocus={{ scale: 1.02 }} // Added subtle scale on focus
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
          {/* Added button animations with hover and tap effects */}
          <motion.button
            type="submit"
            className="w-full bg-[#8c2b32] text-[#fff0d7] py-2 rounded hover:bg-[#621E23] cursor-pointer"
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -2 }} // Added lift effect on hover
            whileTap={{ scale: 0.98 }} // Added press effect on click
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          > 
            Send Message
          </motion.button>
        </motion.form>
      </motion.div>
      
      {/* Toast Notification */}
      <ToastContainer position="top-center" autoClose={3000} />
    </section>
  )
}

export default ContactUs