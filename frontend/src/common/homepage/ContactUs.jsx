/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
    toast.success('Your message has been sent!');
    setFormData({ name: '', email: '', contact: '', subject: '', message: '' });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    // Page background is now mid-purple #8080d7
    <section className="bg-[#8080d7] text-white">
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 py-10">
        <motion.div
          className="w-full max-w-6xl mx-auto p-6 sm:p-8 rounded-2xl shadow-2xl bg-[#aad9d9] border border-[#99c2c2]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-4 text-[#010922] text-center uppercase tracking-wide"
            variants={itemVariants}
          >
            Contact Us
          </motion.h2>

          <motion.p
            className="text-[#010922] text-sm sm:text-base md:text-lg mb-6 text-center"
            variants={itemVariants}
          >
            Facing issues with our advocates? We’re here to help!
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            variants={containerVariants}
          >
            {['name', 'email', 'contact', 'subject'].map((field) => (
              <motion.input
                key={field}
                type={field === 'email' ? 'email' : field === 'contact' ? 'tel' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                required
                className="w-full px-4 py-3 text-[#010922] placeholder-gray-700 bg-[#F3F4F6] border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#010922] transition-all duration-200 hover:shadow-md hover:border-[#7aafa8]"
                variants={itemVariants}
                whileFocus={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              />
            ))}

            <motion.textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              required
              className="w-full px-4 py-3 text-[#010922] placeholder-gray-700 bg-[#F3F4F6] border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#010922] resize-y transition-all duration-200 hover:shadow-md hover:border-[#7aafa8]"
              variants={itemVariants}
              whileFocus={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />

            <motion.button
              type="submit"
              className="w-full bg-[#010922] text-white py-3 rounded-xl hover:bg-[#1A1F2E] transition-all duration-200 font-semibold text-lg tracking-wide"
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              Send Message
            </motion.button>
          </motion.form>
        </motion.div>
      </div>

      <ToastContainer position="top-center" autoClose={3000} theme="dark" />
    </section>
  );
};

export default ContactUs;