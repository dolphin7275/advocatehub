import React, { useState, useEffect } from 'react';
import api from '../../apiCalls/axios';

const LawyerReviews = ({ lawyerUserId, averageRating, reviewCount }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to calculate rating distribution from raw reviews
  const calculateRatingDistribution = (reviewsData) => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let totalReviews = 0;

    reviewsData.forEach(review => {
      if (review.rating >= 1 && review.rating <= 5) {
        counts[review.rating]++;
        totalReviews++;
      }
    });

    const distribution = {
      excellent: { count: counts[5], percentage: totalReviews > 0 ? (counts[5] / totalReviews) * 100 : 0 },
      good: { count: counts[4], percentage: totalReviews > 0 ? (counts[4] / totalReviews) * 100 : 0 },
      average: { count: counts[3], percentage: totalReviews > 0 ? (counts[3] / totalReviews) * 100 : 0 },
      belowAverage: { count: counts[2], percentage: totalReviews > 0 ? (counts[2] / totalReviews) * 100 : 0 },
      poor: { count: counts[1], percentage: totalReviews > 0 ? (counts[1] / totalReviews) * 100 : 0 },
    };

    // Ensure percentages are integers for progress bar width
    Object.keys(distribution).forEach(key => {
      distribution[key].percentage = Math.round(distribution[key].percentage);
    });

    return distribution;
  };

  const ratingDistribution = calculateRatingDistribution(reviews);

  // Helper to render stars based on a rating value
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.532 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.777.565-1.832-.197-1.532-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      );
    }
    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="rgb(209 213 219)" /> {/* Tailwind gray-300 */}
            </linearGradient>
          </defs>
          <path fill="url(#half-gradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.532 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.777.565-1.832-.197-1.532-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      );
    }
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.532 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.777.565-1.832-.197-1.532-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        const reviewsResponse = await api.get(`/userapi/lawyers/${lawyerUserId}/reviews/`);
        setReviews(reviewsResponse.data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews.');
      } finally {
        setLoading(false);
      }
    };

    if (lawyerUserId) {
      fetchReviews();
    }
  }, [lawyerUserId]);

  if (loading) return <div className="p-4 text-center text-sm text-gray-600">Loading reviews...</div>;
  if (error) return <div className="p-4 text-center text-sm text-red-600">{error}</div>;

  return (
    <div className="bg-[#aad9d9] rounded-xl shadow-lg p-6 mt-6">
      <h3 className="text-lg font-bold text-[#0a043c] mb-3">Rating & Reviews</h3>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Average Rating */}
        <div className="flex-shrink-0 text-center md:text-left">
          <p className="text-5xl font-bold text-black">{averageRating ? parseFloat(averageRating).toFixed(2) : 'N/A'}</p>
          <div className="flex justify-center md:justify-start mt-1 mb-2">
            {renderStars(parseFloat(averageRating || 0))}
          </div>
          <p className="text-gray-700 text-sm">{reviewCount || 0} clients</p>
        </div>

        {/* Rating Breakdown Bars */}
        <div className="flex-grow w-full">
          {Object.entries(ratingDistribution).map(([key, data]) => (
            <div key={key} className="flex items-center mb-2">
              <span className="text-gray-700 w-24 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
              <div className="w-full bg-gray-200 rounded-full h-3 mx-2">
                <div
                  className={`h-3 rounded-full ${
                    key === 'excellent' ? 'bg-green-700' :
                    key === 'good' ? 'bg-blue-400' :
                    key === 'average' ? 'bg-yellow-400' :
                    key === 'belowAverage' ? 'bg-orange-400' :
                    'bg-red-600'
                  }`}
                  style={{ width: `${data.percentage}%` }}
                ></div>
              </div>
              <span className="text-gray-700 w-10 text-right">{data.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LawyerReviews;
