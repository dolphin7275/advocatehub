


import React, { useState, useEffect } from 'react';
import api from '../../apiCalls/axios';
import { useParams } from 'react-router-dom';

function LawyerReviewSection() {
  const { id: lawyerId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ feedback: '', rating: 5 });
  const [submitting, setSubmitting] = useState(false);

  // Fetch reviews
  useEffect(() => {
    if (!lawyerId) return;

    const fetchReviews = async () => {
      try {
        const res = await api.get(`/userapi/lawyers/${lawyerId}/reviews/`);
        setReviews(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch reviews.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [lawyerId]);

  // Submit new review
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.post(`/userapi/lawyers/${lawyerId}/reviews/`, {...formData, lawyer_id : lawyerId,});
      setReviews((prev) => [res.data, ...prev]); // Add new review on top
      setFormData({ feedback: '', rating: 5 }); // Reset form
    } catch (err) {
      console.error(err);
      alert('Failed to submit review. Are you logged in?');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-xl shadow-md mt-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Client Reviews</h2>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
        <textarea
          rows={3}
          className="w-full border rounded p-2 mb-2"
          placeholder="Write your review..."
          value={formData.feedback}
          onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
          required
        />
        <div className="flex items-center justify-between">
          <label className="text-sm">
            Rating:{' '}
            <select
              className="border rounded px-2 py-1"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} ⭐
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            disabled={submitting}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </form>

      {/* Display Reviews */}
      {loading && <p className="text-center text-gray-500">Loading reviews...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {reviews.length === 0 && !loading && (
        <p className="text-center text-gray-600">No reviews yet for this lawyer.</p>
      )}

      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-white shadow border rounded-lg p-4 mb-6 transition duration-200 hover:shadow-lg"
        >
          <div className="flex justify-between items-center">
            <span>
              <img
                src={review.user?.profile ? `${api.defaults.baseURL}${review.user.profile}` : '/default-profile.jpg'}
                alt="client img"
                className="w-10 h-10 rounded-full object-cover"
              />
              <p className="text-lg font-semibold text-gray-800">{review.user.name}</p>
            </span>
            <span className="text-yellow-500 font-bold">{'⭐'.repeat(review.rating)}</span>
          </div>
          <p className="text-gray-700 mt-2 italic">"{review.feedback}"</p>
          <p className="text-sm text-gray-500 mt-1">
            Submitted on: {new Date(review.created_at).toLocaleDateString()}
          </p>

          {review.reply && (
            <div className="mt-4 ml-4 pl-4 border-l-2 border-indigo-300 bg-indigo-50 rounded-lg py-2">
              <p className="text-indigo-700 font-semibold">↳ 👨‍⚖️ {review.reply.lawyer_name}</p>
              <p className="text-gray-800">"{review.reply.reply_text}"</p>
              <p className="text-xs text-gray-500">
                Replied on: {new Date(review.reply.created_at).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default LawyerReviewSection;
