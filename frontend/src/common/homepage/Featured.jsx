/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from "../../apiCalls/axios";
import { FaStar } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Featured = () => {
  const [featuredLawyers, setFeaturedLawyers] = useState([]);
  const navigate = useNavigate();

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

  // Check if user is authenticated
  const isUserAuthenticated = () => {
    // Check for the actual keys your app uses
    const accessToken = localStorage.getItem('accessToken');
    const role = localStorage.getItem('role');
    const adminName = localStorage.getItem('adminName');
    
    // User is authenticated if they have an access token
    const isAuthenticated = !!(accessToken && accessToken.trim() !== '');
    
    console.log('Authentication check:', {
      accessToken: accessToken ? 'Present' : 'Missing',
      role: role,
      adminName: adminName,
      isAuthenticated: isAuthenticated
    });
    
    return isAuthenticated;
  };

  // Handle Browse All button click
  const handleBrowseAll = () => {
    if (isUserAuthenticated()) {
      navigate('/advocate-list');
    } else {
      // Show custom toast for not logged in users
      toast.error('Login first', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: '#ff4757',
          color: '#ffffff',
          fontSize: '16px',
          fontWeight: 'bold',
          borderRadius: '10px',
          textAlign: 'center',
          padding: '15px 20px',
          boxShadow: '0 4px 15px rgba(255, 71, 87, 0.3)',
        },
        progressStyle: {
          background: '#ffffff',
        },
      });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      } 
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 25px rgba(0,0,0,0.2)",
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const starVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.2,
      rotate: 180,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="bg-[#8080d7] py-16 px-4 sm:px-8 md:px-12 lg:px-20 text-center overflow-hidden" 
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 bg-white/5 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </motion.div>

      {/* Title */}
      <motion.h2
        className="text-3xl sm:text-4xl font-bold mb-4 text-white relative z-10"
        variants={textVariants}
        whileHover={{ 
          scale: 1.05,
          textShadow: "0px 0px 20px rgba(255,255,255,0.5)"
        }}
      >
        Featured Lawyers
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        className="text-white text-base sm:text-lg mb-12 relative z-10"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        Meet the most popular and highly recommended lawyers on our platform.
      </motion.p>

      {/* Lawyer Cards */}
      <motion.div 
        className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
      >
        {featuredLawyers.length === 0 ? (
          <motion.p 
            className="text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No featured lawyers available at the moment.
          </motion.p>
        ) : (
          featuredLawyers.map((lawyer, i) => (
            <motion.div
              key={i}
              className="bg-[#aad9d9] w-full max-w-[350px] sm:w-[220px] rounded-xl p-4 shadow-md text-left cursor-pointer"
              variants={cardVariants}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className="flex items-center mb-3"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 + 0.3 }}
              >
                <motion.img
                  src={lawyer.user_profile || "/images/lawyer-avatar.jpg"}
                  alt="Lawyer"
                  className="w-20 h-20 rounded-full object-cover mr-3 border border-white shadow"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    boxShadow: "0px 0px 15px rgba(255,255,255,0.5)"
                  }}
                />
                <div>
                  <motion.h3 
                    className="text-sm font-bold text-[#010922]"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 + 0.4 }}
                  >
                    {lawyer.user_name}
                  </motion.h3>
                  <motion.div 
                    className="flex items-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 + 0.5 }}
                  >
                    {[...Array(5)].map((_, idx) => (
                      <motion.div
                        key={idx}
                        variants={starVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        custom={idx}
                      >
                        <FaStar
                          className={`h-3 w-3 ${idx < (lawyer.rating || 4) ? 'text-[#010922]' : 'text-gray-300'}`}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                  <motion.p 
                    className="text-xs font-semibold text-[#010922] mt-1"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 + 0.6 }}
                  >
                    Exp: {lawyer.experience || '2'} yrs
                  </motion.p>
                </div>
              </motion.div>

              <motion.div 
                className="text-xs text-[#010922] mb-2 ml-1 leading-5"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 + 0.7 }}
              >
                <p>{lawyer.languages || 'English, Hindi, Tamil'}</p>
                <p>Cost: ₹{lawyer.price || 100} /hr</p>
              </motion.div>

              <motion.div 
                className="text-center mt-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 + 0.8 }}
              >
                {/* <motion.button 
                  className="bg-[#8080d7] text-white px-4 py-1 text-sm rounded shadow hover:bg-[#6a6ac2] transition"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0px 5px 15px rgba(0,0,0,0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  See Profile
                </motion.button> */}
              </motion.div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Browse All Button */}
      <motion.div 
        className="mt-12 relative z-10"
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
      >
        <motion.button 
          className="border text-lg border-[#aad9d9] bg-[#aad9d9] text-[#010922] px-8 py-3 rounded-full font-semibold hover:bg-[#99c3c3] hover:text-[#010922] transition"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={handleBrowseAll}
        >
          Browse All
        </motion.button>
      </motion.div>

      {/* Join Section */}
      <motion.div 
        className="mt-10 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.8 }}
      >
        <motion.p
          className="text-base mb-3 text-white"
          variants={textVariants}
          whileHover={{ 
            scale: 1.02,
            textShadow: "0px 0px 10px rgba(255,255,255,0.3)"
          }}
        >
          Are you a Lawyer?
        </motion.p>
        <motion.button 
          className="bg-[#aad9d9] text-[#010922] px-6 py-3 rounded-full text-sm font-bold shadow-md hover:bg-[#99c3c3] transition"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Join our Law Firm
        </motion.button>
      </motion.div>

      {/* Custom Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{
          zIndex: 9999,
        }}
      />
    </motion.section>
  );
};

export default Featured;