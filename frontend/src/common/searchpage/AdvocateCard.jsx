import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckCircle, X } from 'lucide-react';
import LawyerReviews from "../searchpage/LawyerReviews"
import api from '../../apiCalls/axios';
import 'react-toastify/dist/ReactToastify.css';
import LawyerReviewSection from './LawyerReviewSection';

const AdvocateCard = () => {
  const { id } = useParams();
  const [lawyer, setLawyer] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

  const [mode, setMode] = useState('Meeting');
  const [location, setLocation] = useState('');
  const [duration] = useState(30);
  const [date, setDate] = useState('');
  const [fromTime, setFromTime] = useState('');
  const [showFullBio, setShowFullBio] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Custom toast components
  const CustomSuccessToast = ({ message }) => (
    <div className="custom-toast-container">
      <CheckCircle size={64} className="custom-toast-icon-success" />
      <p className="custom-toast-message">{message}</p>
    </div>
  );

  const CustomErrorToast = ({ message, closeToast }) => (
    <div className="custom-toast-container">
      <button 
        onClick={() => {
          closeToast();
          setShowToast(false);
        }}
        className="custom-toast-close-btn"
      >
        <X size={24} />
      </button>
      <div className="custom-toast-icon-error-bg">
        <X size={48} className="custom-toast-icon-error" />
      </div>
      <p className="custom-toast-message">{message}</p>
    </div>
  );

  useEffect(() => {
    const fetchLawyer = async () => {
      try {
        const response = await api.get(`/userapi/lawyers/${id}/`);
        setLawyer(response.data);
        console.log("✅ Available Slots:", response.data.available_slots);
      } catch (error) {
        console.error('Error fetching lawyer:', error);
        setShowToast(true);
        toast.error(
          <CustomErrorToast message="Failed to load lawyer details. Please try again." />,
          { 
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            closeButton: false,
            className: "custom-toast-wrapper",
            onClose: () => setShowToast(false)
          }
        );
      }
    };
    fetchLawyer();
  }, [id]);

  if (!lawyer) return <div className="p-4">Loading...</div>;

  const RatingBar = ({ label, value, color }) => (
    <div className="flex items-center justify-between text-sm">
      <span className="w-28">{label}</span>
      <div className="w-full ml-2 bg-gray-200 h-2 rounded-full overflow-hidden">
        <div className={`${color} h-2`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );

  const handleBooking = async () => {
    if (!date || !fromTime) {
      setShowToast(true);
      toast.error(
        <CustomErrorToast message="Please select a valid date and time" />,
        { 
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          closeButton: false,
          className: "custom-toast-wrapper",
          onClose: () => setShowToast(false)
        }
      );
      return;
    }

    if (!location) {
      setShowToast(true);
      toast.error(
        <CustomErrorToast message="Please select a location" />,
        { 
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          closeButton: false,
          className: "custom-toast-wrapper",
          onClose: () => setShowToast(false)
        }
      );
      return;
    }

    const localISOString = `${date}T${fromTime}`; 

    try {
      await api.post('/userapi/book/', {
        lawyer_id: lawyer.id,
        mode,
        location,
        duration,
        scheduled_for: localISOString,
      });
      
      // Show success toast
      setShowToast(true);
      toast.success(
        <CustomSuccessToast message="Booking confirmed successfully!" />,
        { 
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          closeButton: false,
          className: "custom-toast-wrapper",
          onClose: () => setShowToast(false)
        }
      );
      
      setShowBooking(false);
    } catch (err) {
      console.error('❌ Booking Error:', err.response?.data || err.message);
      const msg = err.response?.data?.error || 'Booking failed. Please try again.';
      
      setShowToast(true);
      toast.error(
        <CustomErrorToast message={msg} />,
        { 
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          closeButton: false,
          className: "custom-toast-wrapper",
          onClose: () => setShowToast(false)
        }
      );
    }
  };

  const handleFollow = () => {
    setShowToast(true);
    toast.success(
      <CustomSuccessToast message="Following advocate successfully!" />,
      { 
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        closeButton: false,
        className: "custom-toast-wrapper",
        onClose: () => setShowToast(false)
      }
    );
  };

  const closeModal = () => {
    setShowBooking(false);
    // Reset form fields when closing
    setMode('Meeting');
    setLocation('');
    setDate('');
    setFromTime('');
  };

  return (
    <div className="bg-[#8080d7] min-h-screen p-4 md:p-8">
      {/* Blur overlay when toast is visible */}
      {showToast && <div className="toast-overlay"></div>}
      
      <div className={`${showToast ? 'blurred' : ''}`}>
        <div className="text-lg font-bold text-[#1A1F2B] mb-4">
          <i>Advocate {lawyer.user?.name}</i>
        </div>

        <div className="bg-[#aad9d9] rounded-xl shadow-xl p-6 flex flex-col md:flex-row items-center gap-6">
          <img
            // src={lawyer.user?.profile || '/default-profile.jpg'}
            src={lawyer.user?.profile ? `${api.defaults.baseURL}${lawyer.user.profile}` : '/default-profile.jpg'}
            alt="Lawyer"
            className="w-40 h-40 rounded-xl object-cover border-4 border-white shadow"
          />
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-[#0a043c]">{lawyer.user?.name}</h2>
            <p className="mt-1 text-sm text-black">Specialization: {Array.isArray(lawyer.case_types) ? lawyer.case_types.join(', ') : lawyer.case_types || 'N/A'}</p>
            <p className="text-sm mt-1 text-black">Languages: {lawyer.languages || 'English, Hindi'}</p>
            <p className="text-sm mt-1 text-black">Experience: {lawyer.experience}+ years</p>
            <p className="text-sm mt-1 font-medium text-black">Fee: ₹{lawyer.price}/session</p>
            <div className="mt-4 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
              <button 
                className="bg-white text-black border border-black px-6 py-2 rounded-md font-semibold hover:bg-gray-100"
                onClick={handleFollow}
              >
                Follow
              </button>
              <button
                className="bg-[#0a043c] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#030224]"
                onClick={() => setShowBooking(true)}
              >
                Book an Appointment
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[#aad9d9] rounded-xl shadow-lg p-6 mt-6">
          <h3 className="text-lg font-bold text-[#0a043c] mb-2">About Me</h3>
          <p className="text-sm text-black leading-relaxed">
            {showFullBio
              ? `My name is ${lawyer.user?.name}. I have been practicing law for over ${lawyer.experience}+ years, specializing in criminal defense, family law matters, and civil disputes. I hold an LLB and have completed my Master's in Criminal Law from Mumbai University. My journey began with a deep commitment to justice and helping those unaware of their rights. I've successfully represented clients in high-stakes cases and have a very strong record in both trial and settlement negotiations. I offer legal consultancy, draft contracts, and assist with court documentation. Whether it's navigating a divorce, resolving a property conflict, or defending against criminal charges, I believe in thorough preparation, empathy, and strategic execution.`
              : `My name is ${lawyer.user?.name}. I have been practicing law for over ${lawyer.experience}+ years, specializing in criminal defense, family law matters, and civil disputes...`}
            <span
              onClick={() => setShowFullBio(!showFullBio)}
              className="text-blue-900 font-semibold cursor-pointer ml-1"
            >
              {showFullBio ? 'Read Less' : 'Read More'}
            </span>
          </p>
        </div>

        {/* <div className="bg-[#f1d2a9] rounded-xl shadow-lg p-6 mt-6">
          <h3 className="text-lg font-bold text-[#0a043c] mb-3">Rating & Reviews</h3>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-4xl font-bold text-black">4.81</span>
            <div className="text-yellow-500 text-xl">★★★★☆</div>
            <span className="text-sm text-gray-700 mt-1">45 clients</span>
          </div>
          <div className="space-y-2">
            <RatingBar label="Excellent" value={90} color="bg-green-700" />
            <RatingBar label="Good" value={70} color="bg-blue-400" />
            <RatingBar label="Average" value={50} color="bg-yellow-400" />
            <RatingBar label="Below Average" value={25} color="bg-orange-400" />
            <RatingBar label="Poor" value={10} color="bg-red-600" />
          </div>
        </div> */}
        
        <LawyerReviews
          lawyerUserId={id}
          averageRating={lawyer.average_rating}
          reviewCount={lawyer.review_count}
        />
        <LawyerReviewSection/>

        {/* <div className="text-center mt-8">
          <button
            className="bg-[#0a043c] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#030224] transition"
            onClick={() => setShowBooking(true)}
          >
            Book an Appointment
          </button>
        </div> */}
      </div>

      {/* Booking Modal Popup */}
      {showBooking && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-[#aad9d9] text-black p-6 rounded-2xl shadow-2xl w-96 max-w-sm border-2 border-[#d2b77c]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-serif font-bold text-[#0a043c]">Schedule Appointment</h2>
              <button 
                onClick={closeModal} 
                className="text-[#0a043c] text-2xl hover:text-red-600 transition-colors font-bold"
              >
                ×
              </button>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-bold mb-1 text-[#0a043c]">Select Mode</label>
              <select
                className="w-full bg-white border-2 border-[#d2b77c] text-black p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a043c] focus:border-[#0a043c]"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
              >
                <option value="Meeting">Meeting</option>
                <option value="online">Online</option>
                <option value="physical">Physical</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-bold mb-1 text-[#0a043c]">Add Location</label>
              <select
                className="w-full bg-white border-2 border-[#d2b77c] text-black p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a043c] focus:border-[#0a043c]"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">Select Location</option>
                <option value="Lucknow">Lucknow</option>
                <option value="Bihar">Bihar</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi chamber">Delhi chamber</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Indore">Indore</option>
                <option value="Ahmadnagar">Ahmadnagar</option>
                <option value="Nagpur">Nagpur</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-1 text-[#0a043c]">Available Slots</label>
              <select
                className="w-full bg-white border-2 border-[#d2b77c] text-black p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a043c] focus:border-[#0a043c]"
                onChange={(e) => {
                  const [d, t] = e.target.value.split(', ');
                  setDate(d);
                  setFromTime(t);
                }}
              >
                <option value="">Select a slot</option>
                {lawyer.available_slots &&
                  Object.entries(lawyer.available_slots).flatMap(([d, times]) =>
                    times.map((time, index) => (
                      <option key={`${d}-${time}-${index}`} value={`${d}, ${time}`}>
                        {new Date(`${d}T${time}`).toLocaleString('en-IN', {
                          dateStyle: 'long',
                          timeStyle: 'short',
                          timeZone: 'Asia/Kolkata',
                        })}
                      </option>
                    ))
                  )}
              </select>
            </div>

            <div className="flex justify-between gap-3 mt-5">
              <button
                onClick={closeModal}
                className="bg-white text-[#0a043c] border-2 border-[#0a043c] px-4 py-2 rounded-md font-bold flex-1 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleBooking}
                className="bg-[#0a043c] text-white px-4 py-2 rounded-md font-bold flex-1 hover:bg-[#030224] transition-colors"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
        toastClassName="custom-toast-wrapper"
        bodyClassName="custom-toast-body"
        className="toast-container-center"
      />

      <style jsx>{`
        .toast-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.3);
          z-index: 9998;
          pointer-events: none;
        }

        .blurred {
          filter: blur(2px);
          pointer-events: none;
        }

        .custom-toast-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 20px;
          position: relative;
        }

        .custom-toast-icon-success {
          color: #10b981;
          margin-bottom: 12px;
        }

        .custom-toast-icon-error-bg {
          width: 64px;
          height: 64px;
          background-color: #ef4444;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }

        .custom-toast-icon-error {
          color: white;
        }

        .custom-toast-message {
          font-size: 16px;
          font-weight: 600;
          color: #374151;
          margin: 0;
          line-height: 1.4;
        }

        .custom-toast-close-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          background: none;
          border: none;
          cursor: pointer;
          color: #6b7280;
          padding: 4px;
          border-radius: 4px;
          transition: background-color 0.2s;
        }

        .custom-toast-close-btn:hover {
          background-color: #f3f4f6;
        }

        .custom-toast-wrapper {
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
          min-width: 300px;
          max-width: 400px;
          margin: 0 auto;
        }

        .custom-toast-body {
          padding: 0;
        }

        .toast-container-center {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: auto;
        }

        :global(.Toastify__toast-container) {
          z-index: 9999;
        }
      `}</style>
    </div>
  );
};

export default AdvocateCard;