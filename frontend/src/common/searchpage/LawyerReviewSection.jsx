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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.post(`/userapi/lawyers/${lawyerId}/reviews/`, {
        ...formData,
        lawyer_id: lawyerId,
      });
      setReviews((prev) => [res.data, ...prev]);
      setFormData({ feedback: '', rating: 5 });
    } catch (err) {
      console.error(err);
      alert('Failed to submit review. Are you logged in?');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#aad9d9] rounded-xl shadow-xl p-6 mt-8 text-[#F8F8F5]">
      <h2 className="text-3xl font-bold text-[#1A1F2B] mb-6 text-center">Client Reviews</h2>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="bg-[#F8F8F5] text-black p-4 rounded-lg mb-8 shadow-md">
        <textarea
          rows={3}
          className="w-full border border-gray-300 rounded-md p-2 mb-3"
          placeholder="Write your review..."
          value={formData.feedback}
          onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
          required
        />
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-[#1A1F2B]">
            Rating:{' '}
            <select
              className="border rounded px-3 py-1"
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
            className="bg-[#8C2B32] text-white px-5 py-2 rounded hover:bg-red-800 disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </form>

      {/* Display Reviews */}
      {loading && <p className="text-center text-[#F8F8F5]">Loading reviews...</p>}
      {error && <p className="text-center text-red-200">{error}</p>}
      {reviews.length === 0 && !loading && (
        <p className="text-center text-[#F8F8F5]">No reviews yet for this lawyer.</p>
      )}

      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-[#F8F8F5] text-[#1A1F2B] rounded-lg shadow-md p-4 mb-6 hover:shadow-xl transition"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={review.user?.profile ? `${api.defaults.baseURL}${review.user.profile}` : '/default-profile.jpg'}
                alt="client img"
                className="w-10 h-10 rounded-full object-cover"
              />
              <p className="font-semibold">{review.user.name}</p>
            </div>
            <span className="text-yellow-500 font-bold">{'⭐'.repeat(review.rating)}</span>
          </div>
          <p className="mt-3 italic text-gray-700">"{review.feedback}"</p>
          <p className="text-sm text-gray-500 mt-1">
            Submitted on: {new Date(review.created_at).toLocaleDateString()}
          </p>

          {review.reply && (
            <div className="mt-4 ml-4 pl-4 border-l-2 border-indigo-400 bg-indigo-100 rounded-lg py-2">
              <p className="text-indigo-800 font-semibold">↳ 👨‍⚖️ {review.reply.lawyer_name}</p>
              <p className="text-gray-800">"{review.reply.reply_text}"</p>
              <p className="text-xs text-gray-600">
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
