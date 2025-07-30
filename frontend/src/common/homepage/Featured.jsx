/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from "../../apiCalls/axios";
import { FaStar } from 'react-icons/fa';

const Featured = () => {
  const [featuredLawyers, setFeaturedLawyers] = useState([]);

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const res = await api.get('/userapi/all-lawyers/');
        const approved = res.data.filter(lawyer => lawyer.profile_status === 'approved');
        setFeaturedLawyers(approved.slice(0, 4));
      } catch (err) {
        console.error('Failed to load lawyers:', err);
      }
    };
    fetchLawyers();
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
      className="bg-[#8080d7] py-16 px-4 sm:px-8 md:px-12 lg:px-20 text-center" // Background changed to mid purple #8080d7
    >
      {/* Title */}
      <motion.h2
        className="text-3xl sm:text-4xl font-bold mb-4 text-white" // Text changed to white
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        Featured Lawyers
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        className="text-white text-base sm:text-lg mb-12" // Text changed to white
        variants={textVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        Meet the most popular and highly recommended lawyers on our platform.
      </motion.p>

      {/* Lawyer Cards */}
      <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
        {featuredLawyers.length === 0 ? (
          <p className="text-white">No featured lawyers available at the moment.</p> // Text changed to white
        ) : (
          featuredLawyers.map((lawyer, i) => (
            <motion.div
              key={i}
              className="bg-[#aad9d9] w-full max-w-[250px] sm:w-[220px] rounded-xl p-4 shadow-md text-left" // Card background changed to #aad9d9
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-3">
                <img
                  src={lawyer.user_profile || "/images/lawyer-avatar.jpg"}
                  alt="Lawyer"
                  className="w-14 h-14 rounded-full object-cover mr-3 border border-white shadow" // Border changed to white
                />
                <div>
                  <h3 className="text-sm font-bold text-[#010922]">{lawyer.user_name}</h3> {/* Name text changed to dark shade */}
                  <div className="flex items-center">
                    {[...Array(5)].map((_, idx) => (
                      <FaStar
                        key={idx}
                        className={`h-3 w-3 ${idx < (lawyer.rating || 4) ? 'text-[#010922]' : 'text-gray-300'}`} // Star color adjusted to dark shade
                      />
                    ))}
                  </div>
                  <p className="text-xs font-semibold text-[#010922] mt-1"> {/* Experience text changed to dark shade */}
                    Exp: {lawyer.experience || '2'} yrs
                  </p>
                </div>
              </div>

              <div className="text-xs text-[#010922] mb-2 ml-1 leading-5"> {/* Language/Cost text changed to dark shade */}
                <p>{lawyer.languages || 'English, Hindi, Tamil'}</p>
                <p>Cost: ₹{lawyer.price || 100} /hr</p>
              </div>

              <div className="text-center mt-2">
                <button className="bg-[#8080d7] text-white px-4 py-1 text-sm rounded shadow hover:bg-[#6a6ac2] transition"> {/* Button background changed to mid purple #8080d7, text white */}
                  See Profile
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Browse All Button */}
      <div className="mt-12">
        <button className="border text-lg border-[#aad9d9] bg-[#aad9d9] text-[#010922] px-8 py-3 rounded-full font-semibold hover:bg-[#99c3c3] hover:text-[#010922] transition"> {/* Button background and border changed to #aad9d9, text to dark shade */}
          Browse All
        </button>
      </div>

      {/* Join Section */}
      <div className="mt-10">
        <motion.p
          className="text-base mb-3 text-white" // Text changed to white
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          Are you a Lawyer?
        </motion.p>
        <button className="bg-[#aad9d9] text-[#010922] px-6 py-3 rounded-full text-sm font-bold shadow-md hover:bg-[#99c3c3] transition"> {/* Button background changed to #aad9d9, text to dark shade */}
          Join our Law Firm
        </button>
      </div>
    </motion.section>
  );
};

export default Featured;