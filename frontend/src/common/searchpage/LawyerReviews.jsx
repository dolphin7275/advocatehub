import React, { useState, useEffect } from 'react';
import api from '../../apiCalls/axios';

const LawyerReviews = ({ lawyerUserId, averageRating: propAverageRating, reviewCount: propReviewCount }) => {
  const [reviews, setReviews] = useState([]);
  const [distribution, setDistribution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const calculateDistribution = (reviewsData) => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let total = 0;

    reviewsData.forEach(({ rating }) => {
      if (rating >= 1 && rating <= 5) {
        counts[rating]++;
        total++;
      }
    });

    const dist = {
      excellent: { count: counts[5], percentage: total ? (counts[5] / total) * 100 : 0 },
      good: { count: counts[4], percentage: total ? (counts[4] / total) * 100 : 0 },
      average: { count: counts[3], percentage: total ? (counts[3] / total) * 100 : 0 },
      belowAverage: { count: counts[2], percentage: total ? (counts[2] / total) * 100 : 0 },
      poor: { count: counts[1], percentage: total ? (counts[1] / total) * 100 : 0 },
    };

    Object.values(dist).forEach(obj => {
      obj.percentage = Math.round(obj.percentage);
    });

    return dist;
  };

  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    for (let i = 0; i < full; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star text-yellow-400"></i>);
    }

    if (hasHalf) {
      stars.push(<i key="half" className="fas fa-star-half-alt text-yellow-400"></i>);
    }

    for (let i = stars.length; i < 5; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star text-gray-300"></i>);
    }

    return stars;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/api/lawyers/${lawyerUserId}/reviews/`);
        setReviews(res.data);
        const dist = calculateDistribution(res.data);
        setDistribution(dist);
      } catch (err) {
        console.error(err);
        setError('Failed to load reviews.');
      } finally {
        setLoading(false);
      }
    };

    if (lawyerUserId) fetchData();
  }, [lawyerUserId]);

  const avgRating = propAverageRating || (reviews.length ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(2) : 'N/A');
  const totalReviews = propReviewCount || reviews.length;

  if (loading) return <div className="p-4 text-center text-sm text-gray-600">Loading reviews...</div>;
  if (error) return <div className="p-4 text-center text-sm text-red-600">{error}</div>;

  return (
    <div className="bg-[#f1d2a9] rounded-xl shadow-lg p-6 mt-6">
      <h3 className="text-lg font-bold text-[#0a043c] mb-3">Rating & Reviews</h3>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="flex-shrink-0 text-center md:text-left">
          <p className="text-5xl font-bold text-black">{avgRating}</p>
          <div className="flex justify-center md:justify-start mt-1 mb-2">
            {renderStars(parseFloat(avgRating))}
          </div>
          <p className="text-gray-700 text-sm">{totalReviews} client{totalReviews !== 1 ? 's' : ''}</p>
        </div>

        <div className="flex-grow w-full">
          {distribution && Object.entries(distribution).map(([key, data]) => (
            <div key={key} className="flex items-center mb-2">
              <span className="text-gray-700 w-24 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
              <div className="w-full bg-gray-200 rounded-full h-3 mx-2">
                <div
                  className={`h-3 rounded-full ${
                    key === 'excellent' ? 'bg-green-700' :
                    key === 'good' ? 'bg-blue-400' :
                    key === 'average' ? 'bg-yellow-400' :
                    key === 'belowAverage' ? 'bg-orange-400' : 'bg-red-600'
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
