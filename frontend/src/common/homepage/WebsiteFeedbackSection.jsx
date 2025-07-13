
import React, { useState, useEffect } from 'react';
import api from '../../apiCalls/axios'; 
import { useAuth } from '../AuthContext'; // you have AuthContext

function WebsiteFeedbackSection() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [rating, setRating] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const { user } = useAuth();

  // Fetch website feedback on mount
  const fetchWebsiteFeedback = async () => {
    setLoadingFetch(true);
    setFetchError(null);
    try {
      const response = await api.get('/api/website-feedback/');
      setFeedbackList(response.data);
    } catch (err) {
      console.error('Error fetching website feedback:', err.response?.data || err.message);
      setFetchError('Failed to load website feedback.');
    } finally {
      setLoadingFetch(false);
    }
  };

  useEffect(() => {
    fetchWebsiteFeedback();
  }, []);

  // Submit new feedback
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);
    setLoadingSubmit(true);

    if (!user) {
      setMessage('Please log in to submit feedback.');
      setIsError(true);
      setLoadingSubmit(false);
      return;
    }

    try {
      await api.post('/api/website-feedback/', {
        rating: parseInt(rating),
        feedback_text: feedbackText,
      });

      setMessage('Feedback submitted successfully!');
      setIsError(false);
      setRating('');
      setFeedbackText('');
      fetchWebsiteFeedback(); // refresh
    } catch (err) {
      console.error('Error submitting feedback:', err.response?.data || err.message);
      setMessage(
        err.response?.data?.non_field_errors?.[0] ||
        err.response?.data?.detail ||
        'Failed to submit feedback.'
      );
      setIsError(true);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">💬 Share Your Feedback</h2>

      {/* Feedback Input Form */}
      <div className="bg-neutral-100 p-4 rounded-md shadow-sm mb-8">
        <h3 className="text-xl font-semibold mb-2">Add Feedback</h3>
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Write your comment..."
            className="flex-1 p-2 rounded-md border border-gray-300 bg-white focus:outline-none"
            required
          />
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-16 text-center p-2 rounded-md border border-gray-300"
            placeholder="⭐"
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md"
            disabled={loadingSubmit || !user}
          >
            {loadingSubmit ? 'Sending...' : 'Send'}
          </button>
        </form>
        {message && (
          <p className={`mt-2 text-sm ${isError ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </p>
        )}
      </div>

      {/* Feedback List */}
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">What Others Say</h3>
      {loadingFetch ? (
        <div className="text-center py-4">Loading feedback...</div>
      ) : fetchError ? (
        <div className="text-center py-4 text-red-500">{fetchError}</div>
      ) : feedbackList.length === 0 ? (
        <p className="text-gray-600 text-center">No feedback yet. Be the first!</p>
      ) : (
        <div className="space-y-4">
          {feedbackList.map((item) => (
            <div
              key={item.id}
              className="flex items-start space-x-3 bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
                  {item.user.username?.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-700">
                  <span className="font-semibold">{item.user.username}</span>{' '}
                  <span className="text-yellow-500">{item.rating} ⭐</span>
                </div>
                <p className="text-gray-700 mt-1">{item.feedback_text}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Submitted on: {new Date(item.created_at).toLocaleDateString()}
                </p>

                {/* Admin Reply (if exists) */}
                {item.reply && (
                  <div className="mt-3 ml-4 pl-4 border-l-2 border-green-400 bg-green-50 rounded-lg py-2">
                    <p className="text-green-700 font-semibold">
                      ↳ 🛠️ {item.reply.responder_name} (Admin)
                    </p>
                    <p className="text-gray-800">"{item.reply.reply_text}"</p>
                    <p className="text-xs text-gray-500">
                      Replied on: {new Date(item.reply.created_at).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WebsiteFeedbackSection;
