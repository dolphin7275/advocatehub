import React from 'react';
import Assets from '../../assets/assets';


function Testimonials() {
   

  const reviews = [
    {
      id: 1,
      name: "Sara Amid",
      rating: 5,
      review: "We originally ordered Crumble just to try it out. Fast forward a few months and now every birthday, anniversary, and random Tuesday comes with box of cookies from Crumble. There’s something magical about their texture.",
      avatar: Assets.avatarImage
    },
    {
      id: 2,
      name: "Alice Johnson",
      rating: 5,
      review: "We originally ordered Crumble just to try it out. Fast forward a few months and now every birthday, anniversary, and random Tuesday comes with box of cookies from Crumble. There’s something magical about their texture.",
      avatar:Assets.avatarImage
    },
    {
      id: 3,
      name: "Bob Williams",
      rating: 5,
      review: "We originally ordered Crumble just to try it out. Fast forward a few months and now every birthday, anniversary, and random Tuesday comes with box of cookies from Crumble. There’s something magical about their texture.",
      avatar:Assets.avatarImage
    },
    {
      id: 4,
      name: "Charlie Brown",
      rating: 5,
      review: "We originally ordered Crumble just to try it out. Fast forward a few months and now every birthday, anniversary, and random Tuesday comes with box of cookies from Crumble. There’s something magical about their texture.",
      avatar:Assets.avatarImage
    },
    {
      id: 5,
      name: "Diana Miller",
      rating: 5,
      review: "We originally ordered Crumble just to try it out. Fast forward a few months and now every birthday, anniversary, and random Tuesday comes with box of cookies from Crumble. There’s something magical about their texture.",
      avatar:Assets.avatarImage
    },
    {
      id: 6,
      name: "Eve Davis",
      rating: 5,
      review: "We originally ordered Crumble just to try it out. Fast forward a few months and now every birthday, anniversary, and random Tuesday comes with box of cookies from Crumble. There’s something magical about their texture.",
      avatar:Assets.avatarImage
    },
    {
      id: 7,
      name: "Frank White",
      rating: 5,
      review: "We originally ordered Crumble just to try it out. Fast forward a few months and now every birthday, anniversary, and random Tuesday comes with box of cookies from Crumble. There’s something magical about their texture.",
      avatar: Assets.avatarImage
    },
    {
      id: 8,
      name: "Grace Green",
      rating: 5,
      review: "We originally ordered Crumble just to try it out. Fast forward a few months and now every birthday, anniversary, and random Tuesday comes with box of cookies from Crumble. There’s something magical about their texture.",
      avatar:Assets.avatarImage
    },
  ];

  // Duplicate reviews to create a continuous loop for auto-scrolling
  const duplicatedReviews = [...reviews, ...reviews, ...reviews];

  return (
    <div className="w-full max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        {/* Updated font for the main heading to match "thunderbolt-like" style */}
        <h2 className="flex-grow text-4xl sm:text-4xl font-extrabold text-center text-gray-900 font-inter leading-tight">
          See What People Are Saying About Us
        </h2>
        {/* Navigation arrows with updated background color for consistency */}
        <div className="flex-shrink-0 flex space-x-4">
          
        </div>
      </div>

      <div className="relative overflow-hidden group">
        <div className="flex w-full overflow-hidden whitespace-nowrap py-4">
          {/* Apply the infinite-scroll animation */}
          <div className="animate-infinite-scroll flex gap-6">
            {duplicatedReviews.map((review, index) => (
              <ReviewCard key={`${review.id}-${index}`} review={review} />
            ))}
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
    </div>
  );
}
export default Testimonials;

// ReviewCard component to display individual review
function ReviewCard({ review }) {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`h-5 w-5 ${i < rating ? 'text-orange-400' : 'text-gray-500'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div
      className="relative flex flex-col flex-shrink-0 w-80 sm:w-96 p-6 bg-indigo-950 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out
                 border border-gray-700 overflow-hidden"
      style={{ minWidth: '220px' }}
    >
      {/* Double quotes positioned exactly as in the second image */}
      <div className="absolute top-0 right-6 -mt-2 -mr-2 text-6xl font-extrabold text-[#D4B67D] leading-none z-0">
        ”
      </div>

      <div className="flex flex-col items-center mb-4 z-10">
  <img
    src={review.avatar}
    alt={review.name}
    className="w-20 h-20 rounded-full mb-4 object-cover border-4 border-yellow-400"
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = "https://placehold.co/100x100/60A5FA/ffffff?text=User";
    }}
   />

   <p className="text-gray-300 leading-relaxed text-base font-inter text-center mb-4 z-10 whitespace-pre-line">
    {review.review}
   </p>

   <h3 className="text-xl font-bold text-white text-center font-inter mt-auto">
    {review.name}
   </h3>
  
   <div className="flex justify-center mt-2">
    {renderStars(review.rating)}
   </div>
  </div>
 </div>
  );
}



// import React from 'react';
// import Assets from '../../assets/assets';

// const Testimonials = () => {

//   const reviews = [
//       {
//         id: 1,
//         name: "Sara Amid",
//         rating: 5,
//         review: "We originally ordered Crumble just to try it out. Fast forward a few months and now every birthday, anniversary, and random Tuesday comes with box of cookies from Crumble. There’s something magical about their texture.",
//         avatar: Assets.avatarImage
//       },
//       {
//         id: 2,
//         name: "Sara Amid",
//         rating: 5,
//         review: "We originally ordered Crumble just to try it out. Fast forward a few months and now every birthday, anniversary, and random Tuesday comes with box of cookies from Crumble. There’s something magical about their texture.",
//         avatar: Assets.avatarImage
//       },
//       {
//         id: 3,
//         name: "Sara Amid",
//         rating: 5,
//         review: "We originally ordered Crumble just to try it out. Fast forward a few months and now every birthday, anniversary, and random Tuesday comes with box of cookies from Crumble. There’s something magical about their texture.",
//         avatar: Assets.avatarImage
//       },
//       {
//         id: 4,
//         name: "Sara Amid",
//         rating: 5,
//         review: "We originally ordered Crumble just to try it out. Fast forward a few months and now every birthday, anniversary, and random Tuesday comes with box of cookies from Crumble. There’s something magical about their texture.",
//         avatar: Assets.avatarImage
//       },
//       {
//         id: 5,
//         name: "Sara Amid",
//         rating: 5,
//         review: "We originally ordered Crumble just to try it out. Fast forward a few months and now every birthday, anniversary, and random Tuesday comes with box of cookies from Crumble. There’s something magical about their texture.",
//         avatar: Assets.avatarImage
//       },
//       {
//         id: 6,
//         name: "Sara Amid",
//         rating: 5,
//         review: "We originally ordered Crumble just to try it out. Fast forward a few months and now every birthday, anniversary, and random Tuesday comes with box of cookies from Crumble. There’s something magical about their texture.",
//         avatar: Assets.avatarImage
//       },
//       {
//         id: 7,
//         name: "Sara Amid",
//         rating: 5,
//         review: "We originally ordered Crumble just to try it out. Fast forward a few months and now every birthday, anniversary, and random Tuesday comes with box of cookies from Crumble. There’s something magical about their texture.",
//         avatar: Assets.avatarImage
//       },
//       {
//         id: 8,
//         name: "Sara Amid",
//         rating: 5,
//         review: "We originally ordered Crumble just to try it out. Fast forward a few months and now every birthday, anniversary, and random Tuesday comes with box of cookies from Crumble. There’s something magical about their texture.",
//         avatar: Assets.avatarImage
//       },
//     ];

//     const duplicatedReviews = [...reviews, ...reviews, ...reviews];


//   return (
//     <div className="w-full max-w-6xl mx-auto py-8">
//       <div className="flex justify-between items-center mb-8">
       
//         <h2 className="flex-grow text-4xl sm:text-5xl font-extrabold text-center text-gray-900 font-inter leading-tight">
//           See What People Are Saying <br /> About Us
//         </h2>
//         {/* Navigation buttons */}
//         <div className="flex-shrink-0 flex space-x-4">
//           <button className="p-3 bg-[#D4B67D] rounded-full shadow-md text-gray-700 hover:bg-gray-300 transition-colors">
//             {/* Left Arrow Icon */}
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//             </svg>
//           </button>
//           <button className="p-3 bg-[#D4B67D] rounded-full shadow-md text-gray-700 hover:bg-gray-300 transition-colors">
//             {/* Right Arrow Icon */}
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//             </svg>
//           </button>
//         </div>
//       </div>

//       <div className="relative overflow-hidden group">
//         <div className="flex w-full overflow-hidden whitespace-nowrap py-4">
//           {/* infinite-scroll animation */}
//           <div className="animate-infinite-scroll flex gap-6">
//             {duplicatedReviews.map((review, index) => (
//               <ReviewCard key={`${review.id}-${index}`} review={review} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Testimonials



// function ReviewCard({ review }) {
//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 0; i < 5; i++) {
//       stars.push(
//         <svg
//           key={i}
//           className={`h-5 w-5 ${i < rating ? 'text-orange-400' : 'text-gray-500'}`}
//           fill="currentColor"
//           viewBox="0 0 20 20"
//         >
//           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
//         </svg>
//       );
//     }
//     return stars;
//   };

//   return (
//     <div
//       className="relative flex flex-col flex-shrink-0 w-80 sm:w-96 p-6 bg-indigo-950 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out
//                  border border-gray-700 overflow-hidden"
//       style={{ minWidth: '320px' }}
//     >
//       {/* Double quotes positioned exactly as in the second image */}
//       <div className="absolute top-0 right-6 -mt-2 -mr-2 text-8xl font-extrabold text-[#D4B67D] leading-none z-0">
//         ”
//       </div>

//       <div className="flex flex-col items-center mb-4 z-10 flex-grow">
//         <img
//           src={review.avatar}
//           alt={review.name}
//           className="w-20 h-20 rounded-full mb-4 object-cover border-4 border-yellow-400"
//           onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/100x100/60A5FA/ffffff?text=User" }}
//         />
        
//         <p
//           className="text-gray-300 leading-relaxed text-base font-inter text-center mb-4 z-10 flex-grow "
//           // style={{ wordBreak: 'break-word' }}
//         >
//           {review.review}
//         </p>

//         <h3 className="text-xl font-bold text-white text-center font-inter mt-auto">{review.name}</h3>
        
//         <div className="flex justify-center mt-2">
//           {renderStars(review.rating)}
//         </div>
//       </div>
//     </div>
//   );
// }

