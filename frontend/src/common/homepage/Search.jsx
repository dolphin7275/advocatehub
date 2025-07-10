/* eslint-disable no-unused-vars */
import React from 'react'
import { motion } from "framer-motion";
import Assets from '../../assets/assets'

// MOTION ADDED: Compact animation variants
const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const Search = () => {
  return (
    <div className="">
      {/* Step Cards Section */}
      {/* MOTION ADDED: Section with fade-in animation */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
        className="text-[#eeebe6] py-15 px-4 bg-[#6E7582]"
      >
        {/* MOTION ADDED: Grid container with staggered children */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center"
        >
          {/* Card 1 */}
          {/* MOTION ADDED: Card with hover effects */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            {/* MOTION ADDED: Image with scale animation */}
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              src={Assets.searchLawyer}
              alt="Search Advocate"
              className="w-30 h-30 mb-4"
            />
            <h3 className="text-xl font-bold pt-3 mb-2 text-[#8C2B32]">Search Advocate</h3>
            <p className="text-base text-[#F8F8F5] max-w-xs">
              Enter your location and legal concern to explore verified advocates
              near you.
            </p>
          </motion.div>

          {/* Card 2 */}
          {/* MOTION ADDED: Card with hover effects */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            {/* MOTION ADDED: Image with scale animation */}
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, rotate: -5 }}
              src={Assets.bookLawyer}
              alt="Book Advocate"
              className="w-30 h-30 mb-4"
            />
            <h3 className="text-xl pt-3 font-bold mb-2 text-[#8C2B32]">Book Advocate</h3>
            <p className="text-base text-[#F8F8F5] max-w-xs">
              View real-time availability and book a convenient appointment
              instantly.
            </p>
          </motion.div>

          {/* Card 3 */}
          {/* MOTION ADDED: Card with hover effects */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            {/* MOTION ADDED: Image with scale animation */}
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              src={Assets.meetLawyer}
              alt="Meet Advocate"
              className="w-30 h-30 mb-4"
            />
            <h3 className="text-xl pt-3 font-bold text-[#8C2B32] mb-2">Meet Advocate</h3>
            <p className="text-base text-[#F8F8F5] max-w-xs">
              Talk to your advocate through secure video call or live chat,
              whenever it suits you.
            </p>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  )
}

export default Search