/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from "framer-motion";
import Assets from '../../assets/assets';

// Scale-in animation for headings
const scaleIn = (delay) => ({
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, delay: delay, ease: "easeOut" },
  },
});

// Slide-in-left animation for description
const slideInLeft = (delay) => ({
  hidden: { x: -60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, delay: delay, ease: "easeOut" },
  },
});

const Practice = () => {
  const items = [
    { icon: Assets.propertyCases, title: "Property Cases" },
    { icon: Assets.criminalDefense, title: "Criminal Defense" },
    { icon: Assets.spousalIssues, title: "Spousal Issues" },
    { icon: Assets.legalDefense, title: "Legal Cases" },
    { icon: Assets.businessLaw, title: "Business Law" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
      className="bg-[#010922] py-16 px-4 sm:px-8 lg:px-16 text-center"
    >
      <motion.h2
        variants={scaleIn(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
        className="text-4xl font-bold text-white mb-4"
      >
        Our Areas of Practice
      </motion.h2>

      <motion.p
        variants={slideInLeft(0.6)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
        className="text-white text-lg mb-12"
      >
        Taking any range of case for maintaining law.
      </motion.p>

<div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            variants={scaleIn(idx * 0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="bg-[#aad9d9] p-8 sm:p-10 rounded-[2rem] flex flex-col items-center transition-transform duration-300 hover:scale-105"
          >
            <div className="bg-[#8080d7] p-4 rounded-xl mb-6">
              <img
                src={item.icon}
                alt={item.title || "Practice area icon"}
                className="w-20 h-20"
              />
            </div>
            <h3 className="text-[#010922] font-bold text-xl text-center"> {/* Text changed to dark shade #010922 */}
              {item.title}
            </h3>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Practice;