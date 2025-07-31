/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from "framer-motion";
import Assets from '../../assets/assets';

// Animation variants
const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const Search = () => {
  return (
    <div>
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
        className="py-16 px-4 sm:px-8 lg:px-16 bg-[#8080d7]" // Main section background is #8080d7
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center text-white" // All text within this div will be white
        >

          {/* Card 1 */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center p-6 rounded-lg bg-[#8080d7]" // Removed shadow-lg
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              src={Assets.searchLawyer}
              alt="Search Advocate"
              className="w-24 h-24 sm:w-28 sm:h-28 mb-4"
            />
            <h3 className="text-xl font-bold pt-3 mb-2">Search Advocate</h3>
            <p className="text-base max-w-xs">
              Enter your location and legal concern to explore verified advocates near you.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center p-6 rounded-lg bg-[#8080d7]" // Removed shadow-lg
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, rotate: -5 }}
              src={Assets.bookLawyer}
              alt="Book Advocate"
              className="w-24 h-24 sm:w-28 sm:h-28 mb-4"
            />
            <h3 className="text-xl pt-3 font-bold mb-2">Book Advocate</h3>
            <p className="text-base max-w-xs">
              View real-time availability and book a convenient appointment instantly.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center p-6 rounded-lg bg-[#8080d7]" // Removed shadow-lg
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              src={Assets.meetLawyer}
              alt="Meet Advocate"
              className="w-24 h-24 sm:w-28 sm:h-28 mb-4"
            />
            <h3 className="text-xl pt-3 font-bold mb-2">Meet Advocate</h3>
            <p className="text-base max-w-xs">
              Talk to your advocate through secure video call or live chat, whenever it suits you.
            </p>
          </motion.div>

        </motion.div>
      </motion.section>
    </div>
  );
};

export default Search;