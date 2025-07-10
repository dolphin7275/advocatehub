/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion'; // Added framer-motion import
import Assets from '../../assets/assets';

function Testimonials() {

  const reviews = [
    {
      id: 1,
      name: "Sara Amid",
      rating: 5,
      review: "Quick and professional advice right when I needed it.",
      avatar: Assets.avatarImage
    },
    {
      id: 2,
      name: "Alice Johnson",
      rating: 5,
      review: "Found the perfect lawyer in minutes. Highly recommend!",
      avatar:Assets.avatarImage
    },
    {
      id: 3,
      name: "Bob Williams",
      rating: 5,
      review: "Solved my legal issue without stepping out of my home.",
      avatar:Assets.avatarImage
    },
    {
      id: 4,
      name: "Charlie Brown",
      rating: 4,
      review: "Genuine, real and experienced lawyers who truly listen.",
      avatar:Assets.avatarImage
    },
    {
      id: 5,
      name: "Diana Miller",
      rating: 5,
      review: "Affordable, accessible, and super easy to use for all people.",
      avatar:Assets.avatarImage
    },
    {
      id: 6,
      name: "Eve Davis",
      rating: 4,
      review: "Made legal help feel less stressful and more humane.",
      avatar:Assets.avatarImage
    },
    {
      id: 7,
      name: "Frank White",
      rating: 5,
      review: "Quick and professional advice right when I needed it.",
      avatar: Assets.avatarImage
    },
    {
      id: 8,
      name: "Grace Green",
      rating: 5,
      review: "Genuine, experienced lawyers who truly listen.",
      avatar:Assets.avatarImage
    },
  ];

  // Duplicate reviews to create a continuous loop for auto-scrolling
  const duplicatedReviews = [...reviews, ...reviews, ...reviews];

  
  return (
    <section id='testimonials' name='testimonials' className='w-[100%] bg-[#1A1F2B] p-10'>
      <div className="w-full max-w-6xl mx-auto py-8">
        {/* Added fade-in animation for header section */}
        <motion.div 
          className="items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-[#C4A552] mb-4 text-center">Testimonials</h2>
          
          <p className="text-[#ceb571] text-lg mb-12 text-center">
            See What People Are Saying About Us
          </p>
        </motion.div>

        <div className="relative overflow-hidden group">
          <div className="flex w-full overflow-hidden whitespace-nowrap py-4">
            {/* Apply the infinite-scroll animation */}
            <div className="animate-infinite-scroll flex gap-6">
              {duplicatedReviews.map((review, index) => (
                <ReviewCard key={`${review.id}-${index}`} review={review} />
              ))}
            </div>
          </div>
        </div>

        {/* Custom CSS for the auto-scroll animation */}
        <style>
          {`
          @keyframes infinite-scroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%); /* Scroll half the content width (one full set of reviews) */
            }
          }
          .animate-infinite-scroll {
            animation: infinite-scroll 40s linear infinite; /* Adjust duration for speed */
          }
          /* Pause animation on hover */
          .group:hover .animate-infinite-scroll {
            animation-play-state: paused;
          }
          `}
        </style>
      </div>
    </section>
  );
}

export default Testimonials;




// ReviewCard component to display individual review
function ReviewCard({ review }) {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        // Added staggered animation for stars
        <motion.svg
          key={i}
          className={`h-5 w-5 ${i < rating ? 'text-[#8C2B32]' : 'text-[#6E7582]'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </motion.svg>
      );
    }
    return stars;
  };

  return (
    // Added hover animation and subtle scale effect for review cards
    <motion.div
      className="relative flex flex-col flex-shrink-0 w-80 sm:w-96 p-6 bg-[#C4A552] rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out
                 border border-gray-700 overflow-hidden"
      style={{ minWidth: '220px' }}
      whileHover={{ scale: 1.02, y: -5 }} // Added subtle hover lift effect
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >

      <div className="flex flex-col items-center mb-4 z-10">
        {/* Added bounce animation for avatar */}
        <motion.img
          src={review.avatar}
          alt={review.name}
          className="w-20 h-20 rounded-full mb-4 object-cover border-4 border-[#8C2B32]"
          onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/100x100/60A5FA/ffffff?text=User";
        }}
          whileHover={{ scale: 1.1 }} // Added hover scale effect for avatar
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        />

      <p className="text-[#8C2B32] leading-relaxed text-base text-center mb-4 z-10 whitespace-pre-line">
        {review.review}
      </p>

      <h3 className="text-xl text-[#F8F8F5] font-bold text-center mt-auto">
        {review.name}
      </h3>
  
      <div className="flex justify-center mt-2">
        {renderStars(review.rating)}
      </div>
    </div>
  </motion.div>
  );
}