/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
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
      avatar: Assets.avatarImage
    },
    {
      id: 3,
      name: "Bob Williams",
      rating: 5,
      review: "Solved my legal issue without stepping out of my home.",
      avatar: Assets.avatarImage
    },
    {
      id: 4,
      name: "Charlie Brown",
      rating: 4,
      review: "Genuine, real and experienced lawyers who truly listen.",
      avatar: Assets.avatarImage
    },
    {
      id: 5,
      name: "Diana Miller",
      rating: 5,
      review: "Affordable, accessible, and super easy to use for all people.",
      avatar: Assets.avatarImage
    },
    {
      id: 6,
      name: "Eve Davis",
      rating: 4,
      review: "Made legal help feel less stressful and more humane.",
      avatar: Assets.avatarImage
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
      avatar: Assets.avatarImage
    },
  ];

  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section id="testimonials" name="testimonials" className="w-full bg-[#010922] px-4 sm:px-8 py-10"> {/* Main background changed to dark shade #010922 */}
      <div className="w-full max-w-6xl mx-auto">
        <motion.div
          className="items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Testimonials</h2> {/* Heading text changed to white */}
          <p className="text-white text-lg mb-12 text-center"> {/* Subtitle text changed to white */}
            See What People Are Saying About Us
          </p>
        </motion.div>

        {/* Animated Row - Not a scrollable slider */}
        <div className="overflow-hidden">
          <div className="animate-infinite-scroll flex gap-6 w-max">
            {duplicatedReviews.map((review, index) => (
              <ReviewCard key={`${review.id}-${index}`} review={review} />
            ))}
          </div>
        </div>

        <style>
          {`
          @keyframes infinite-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-infinite-scroll {
            animation: infinite-scroll 40s linear infinite;
          }
          `}
        </style>
      </div>
    </section>
  );
}

export default Testimonials;

// ReviewCard component
function ReviewCard({ review }) {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <motion.svg
          key={i}
          className={`h-5 w-5 ${i < rating ? 'text-[#010922]' : 'text-gray-400'}`} // Star colors adjusted for visibility on light card
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
    <motion.div
      className="relative flex flex-col w-[80vw] sm:w-72 md:w-80 lg:w-96 p-4 sm:p-6 bg-[#aad9d9] rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-[#aad9d9]" // Card background changed to #aad9d9, border matches
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex flex-col items-center mb-4 z-10">
        <motion.img
          src={review.avatar}
          alt={review.name}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-4 object-cover border-4 border-[#010922]" // Avatar border changed to dark shade
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/100x100/60A5FA/ffffff?text=User";
          }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        />

        <p className="text-[#010922] leading-relaxed text-sm sm:text-base text-center mb-4 z-10 whitespace-pre-line"> {/* Review text changed to dark shade */}
          {review.review}
        </p>

        <h3 className="text-lg sm:text-xl text-[#010922] font-bold text-center mt-auto"> {/* Name text changed to dark shade */}
          {review.name}
        </h3>

        <div className="flex justify-center mt-2">
          {renderStars(review.rating)}
        </div>
      </div>
    </motion.div>
  );
}