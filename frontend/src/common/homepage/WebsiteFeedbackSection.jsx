// frontend1/src/common/homepage/WebsiteFeedbackSection.jsx
import React, { useState, useEffect } from 'react';
import api from '../../apiCalls/axios'; // Adjust path based on your structure
import { useAuth } from '../AuthContext'; // Assuming AuthContext provides user info

function WebsiteFeedbackSection() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [rating, setRating] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const { user } = useAuth(); // Get user from AuthContext to check if logged in

  // Function to fetch all website feedback
  const fetchWebsiteFeedback = async () => {
    setLoadingFetch(true);
    setFetchError(null);
    try {
      // Assuming /api/website-feedback/ is publicly viewable (AllowAny in Django view)
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
  }, []); // Fetch on component mount

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);
    setLoadingSubmit(true);

    if (!user) { // Check if user is logged in
      setMessage('Please log in to submit feedback.');
      setIsError(true);
      setLoadingSubmit(false);
      return;
    }

    try {
      const response = await api.post('/api/website-feedback/', {
        rating: parseInt(rating),
        feedback_text: feedbackText,
      });

      setMessage('Feedback submitted successfully!');
      setIsError(false);
      setRating(''); // Reset form
      setFeedbackText(''); // Reset form

      // Refresh the list after successful submission
      fetchWebsiteFeedback();

    } catch (err) {
      console.error('Error submitting feedback:', err.response?.data || err.message);
      setMessage(err.response?.data?.non_field_errors?.[0] || err.response?.data?.detail || 'Failed to submit feedback.');
      setIsError(true);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md my-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Share Your Experience!</h2>
      
      {/* Feedback Submission Form */}
      <div className="mb-10 p-6 bg-white rounded-lg shadow-inner">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Submit Website Feedback</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating (1-5):</label>
            <input
              type="number"
              id="rating"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="feedbackText" className="block text-sm font-medium text-gray-700">Your Feedback:</label>
            <textarea
              id="feedbackText"
              rows="4"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Tell us what you think about the website..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center transition duration-200"
            disabled={loadingSubmit || !user} // Disable if loading or not logged in
          >
            {loadingSubmit ? (
              <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Submit Feedback'
            )}
          </button>
          {!user && <p className="text-red-500 text-center mt-2">You must be logged in to submit feedback.</p>}
        </form>
        {message && (
          <p className={`mt-4 text-center ${isError ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </p>
        )}
      </div>

      {/* Display Existing Feedback */}
      <h3 className="text-2xl font-semibold text-gray-700 mb-4 text-center">What Others Say</h3>
      {loadingFetch ? (
        <div className="text-center py-4">Loading feedback...</div>
      ) : fetchError ? (
        <div className="text-center py-4 text-red-500">{fetchError}</div>
      ) : feedbackList.length === 0 ? (
        <p className="text-gray-600 text-center">No website feedback submitted yet. Be the first!</p>
      ) : (
        <div className="space-y-4">
          {feedbackList.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <p className="font-semibold text-gray-900">
                {item.user.username} - <span className="text-yellow-500">{item.rating} Stars</span>
              </p>
              <p className="text-gray-700 mt-1">{item.feedback_text}</p>
              <p className="text-sm text-gray-500 mt-1">Submitted on: {new Date(item.created_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WebsiteFeedbackSection;
