import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import api from '../../apiCalls/axios.js';

console.log("📦 Loaded: AdvocateProfile.jsx");

const AdvocateProfile = () => {
  const { id } = useParams();
  const [lawyer, setLawyer] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

  const [mode, setMode] = useState('Meeting');
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState(30);
  const [date, setDate] = useState('');
  const [fromTime, setFromTime] = useState('');

  useEffect(() => {
    const fetchLawyer = async () => {
      try {
        const response = await api.get(`/userapi/lawyer/${id}/`);
        setLawyer(response.data);
      } catch (error) {
        console.error('Error fetching lawyer:', error);
      }
    };
    fetchLawyer();
  }, [id]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showBooking) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showBooking]);

  if (!lawyer) return <div className="p-4">Loading...</div>;

  const RatingBar = ({ label, value, color }) => (
    <div className="flex items-center justify-between">
      <span className="w-24 text-sm">{label}</span>
      <div className="w-full ml-2 bg-gray-200 h-2 rounded-full overflow-hidden">
        <div className={`${color} h-2`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );

  const handleBooking = async () => {
    if (!date || !fromTime) {
      alert('Please select a valid slot');
      return;
    }

    const localDate = new Date(`${date}T${fromTime}`);
    const utcISOString = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000).toISOString();

    try {
      await api.post('/userapi/book/', {
        lawyer_id: id,
        mode,
        location,
        duration,
        scheduled_for: utcISOString,
      });
      alert('Booking Created!');
      setShowBooking(false);
    } catch (err) {
      const msg = err.response?.data?.error || 'Booking Failed';
      alert(msg);
    }
  };

  const handleModalClose = (e) => {
    // Close modal only if clicking on the backdrop, not the modal content
    if (e.target === e.currentTarget) {
      setShowBooking(false);
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow p-6">
        {/* Profile Info */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
          <img
            src={lawyer.user?.profile || '/default-profile.jpg'}
            alt="Lawyer"
            className="w-32 h-32 rounded-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/default-profile.jpg';
            }}
          />
          <div className="mt-4 md:mt-0">
            <h2 className="text-2xl font-semibold">{lawyer.user?.name}</h2>
            <p className="text-gray-600">
              {Array.isArray(lawyer.case_types) ? lawyer.case_types.join(', ') : lawyer.case_types}
            </p>
            <p className="text-gray-600 mt-1">Location: {lawyer.location}</p>
            <p className="text-gray-600">Consultation Fee: ₹{lawyer.price}</p>
            <p className="text-gray-600">Experience: {lawyer.experience} years</p>
          </div>
        </div>

        {/* 📄 ABOUT SECTION */}
        <div className="mt-6 bg-[#f2d9b1] p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">About Me</h3>
            <p className="text-gray-800 text-sm leading-relaxed">
              {lawyer.about ||
                `My name is ${lawyer.user?.name}. I have been practicing law for over 10 years, specializing in criminal defense, family law matters, and civil disputes. I hold an LLB and have completed my Master's in Criminal Law from Mumbai University. My journey began with a deep commitment to justice and helping those who are unaware of their rights...`}
            </p>
        </div>

        {/* Ratings */}
        <div className="mt-6 bg-yellow-50 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Rating & Reviews</h2>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-3xl font-bold">4.81</span>
            <div className="text-yellow-500 text-lg">★★★★☆</div>
            <span className="text-sm text-gray-600">45 clients</span>
          </div>
          <div className="space-y-1 mt-3">
            <RatingBar label="Excellent" value={90} color="bg-green-800" />
            <RatingBar label="Good" value={75} color="bg-cyan-400" />
            <RatingBar label="Average" value={60} color="bg-yellow-400" />
            <RatingBar label="Below Average" value={35} color="bg-orange-400" />
            <RatingBar label="Poor" value={15} color="bg-red-600" />
          </div>
        </div>

        {/* Book Button */}
        <div className="text-center mt-6">
          <button
            className="bg-blue-700 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-blue-800 transition"
            onClick={() => setShowBooking(true)}
          >
            Book an Appointment
          </button>
        </div>
      </div>

      {/* Booking Modal Popup - Rendered outside main container */}
      {showBooking && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4"
          style={{ zIndex: 9999 }}
          onClick={handleModalClose}
        >
          <div 
            className="bg-black text-white p-6 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-out scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Schedule an appointment</h2>
              <button
                onClick={() => setShowBooking(false)}
                className="text-white hover:text-gray-300 text-2xl font-bold leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700 transition-colors"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium">Select Mode</label>
                <select
                  className="w-full text-black p-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                >
                  <option value="Meeting">Meeting</option>
                  <option value="online">Online</option>
                  <option value="physical">Physical</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">Add Location</label>
                <input
                  type="text"
                  className="w-full text-black p-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter location"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">Duration</label>
                <div className="flex space-x-2">
                  {[30, 45, 60].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDuration(d)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        duration === d 
                          ? 'bg-white text-black shadow-lg' 
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                    >
                      {d} min
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">Available Slots</label>
                <select
                  className="w-full text-black p-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={(e) => {
                    const [d, t] = e.target.value.split(', ');
                    setDate(d);
                    setFromTime(t);
                  }}
                >
                  <option value="">Select a slot</option>
                  {lawyer.available_slots &&
                    Object.entries(lawyer.available_slots).map(([d, times]) =>
                      times.map((t) => (
                        <option key={`${d}-${t}`} value={`${d}, ${t}`}>
                          {new Date(`${d}T${t}`).toLocaleString('en-IN', {
                            dateStyle: 'long',
                            timeStyle: 'short',
                          })}
                        </option>
                      ))
                    )}
                </select>
              </div>
            </div>

            <div className="flex space-x-4 mt-8">
              <button
                onClick={() => setShowBooking(false)}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg flex-1 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleBooking}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex-1 font-medium transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdvocateProfile;