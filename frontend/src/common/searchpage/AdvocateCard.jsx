import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LawyerReviews from "../searchpage/LawyerReviews"
import api from '../../apiCalls/axios';

const AdvocateCard = () => {
  const { id } = useParams();
  const [lawyer, setLawyer] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

  const [mode, setMode] = useState('Meeting');
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState(30);
  const [date, setDate] = useState('');
  const [fromTime, setFromTime] = useState('');
  const [showFullBio, setShowFullBio] = useState(false);

  useEffect(() => {
    const fetchLawyer = async () => {
      try {
        const response = await api.get(`/userapi/lawyer/${id}/`);
        setLawyer(response.data);
        console.log("✅ Available Slots:", response.data.available_slots);
      } catch (error) {
        console.error('Error fetching lawyer:', error);
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
      alert('Please select a valid date and time');
      return;
    }

    const localISOString = `${date}T${fromTime}`; 

    try {
      await api.post('/userapi/book/', {
        lawyer_id: id,
        mode,
        location,
        duration,
        scheduled_for: localISOString,
      });
      alert('Booking Created!');
      setShowBooking(false);
    } catch (err) {
      console.error('❌ Booking Error:', err.response?.data || err.message);
      const msg = err.response?.data?.error || 'Booking Failed';
      alert(msg);
    }
  };

  return (
    <div className="bg-[#fdf3e6] min-h-screen p-4 md:p-8">
      <div className="text-lg font-bold text-black mb-4">
        <i>Advocate {lawyer.user?.name}</i>
      </div>

      <div className="bg-[#f1d2a9] rounded-xl shadow-xl p-6 flex flex-col md:flex-row items-center gap-6">
        <img
          src={lawyer.user?.profile || '/default-profile.jpg'}
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
            <button className="bg-white text-black border border-black px-6 py-2 rounded-md font-semibold hover:bg-gray-100">
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

      <div className="bg-[#f1d2a9] rounded-xl shadow-lg p-6 mt-6">
        <h3 className="text-lg font-bold text-[#0a043c] mb-2">About Me</h3>
        <p className="text-sm text-black leading-relaxed">
          {showFullBio
            ? `My name is ${lawyer.user?.name}. I have been practicing law for over ${lawyer.experience}+ years, specializing in criminal defense, family law matters, and civil disputes. I hold an LLB and have completed my Master's in Criminal Law from Mumbai University. My journey began with a deep commitment to justice and helping those unaware of their rights. I've successfully represented clients in high-stakes cases and have a very strong record in both trial and settlement negotiations. I offer legal consultancy, draft contracts, and assist with court documentation. Whether it’s navigating a divorce, resolving a property conflict, or defending against criminal charges, I believe in thorough preparation, empathy, and strategic execution.`
            : `My name is ${lawyer.user?.name}. I have been practicing law for over ${lawyer.experience}+ years, specializing in criminal defense, family law matters, and civil disputes...`}
          <span
            onClick={() => setShowFullBio(!showFullBio)}
            className="text-blue-900 font-semibold cursor-pointer ml-1"
          >
            {showFullBio ? 'Read Less' : 'Read More'}
          </span>
        </p>
      </div>

      {/* Render the new LawyerReviews component here */}

      <div className="bg-[#f1d2a9] rounded-xl shadow-lg p-6 mt-6">
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
      </div>
      
      <LawyerReviews
        lawyerUserId={id}
        averageRating={lawyer.average_rating}
        reviewCount={lawyer.review_count}
      />

      <div className="text-center mt-8">
        <button
          className="bg-[#0a043c] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#030224] transition"
          onClick={() => setShowBooking(true)}
        >
          Book an Appointment
        </button>
      </div>

      {showBooking && (
        <div className="bg-[#f1d2a9] rounded-xl shadow-lg p-6 mt-6">
          <div className="flex justify-center items-center mt-8">
            <div className="bg-black text-white p-8 rounded-2xl shadow-lg w-[430px]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif font-semibold">Schedule an appointment</h2>
                <button onClick={() => setShowBooking(false)} className="text-white text-xl">×</button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Select Mode</label>
                <select
                  className="w-full bg-white border border-gray-300 text-black p-3 rounded-md focus:outline-none"
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                >
                  <option value="Meeting">Meeting</option>
                  <option value="online">Online</option>
                  <option value="physical">Physical</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Add Location</label>
                <select
                  className="w-full bg-white border border-gray-300 text-black p-3 rounded-md focus:outline-none"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option>Lucknow</option>
                  <option>Bihar</option>
                  <option>Mumbai</option>
                  <option>Delhi chamber</option>
                  <option>Kolkata</option>
                  <option>Indore</option>
                  <option>Ahmadnagar</option>
                  <option>Nagpur</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Available Slots</label>
                <select
                  className="w-full bg-white border border-gray-300 text-black p-3 rounded-md focus:outline-none"
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

              <div className="flex justify-between">
                <button
                  onClick={() => setShowBooking(false)}
                  className="bg-[#d2b77c] text-black px-6 py-2 rounded-md font-semibold w-[45%]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBooking}
                  className="bg-[#0a043c] text-white px-6 py-2 rounded-md font-semibold w-[45%] border border-white"
                >
                  Booked
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvocateCard;


// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import api from '../api/axios';

// const AdvocateCard = () => {
//   const { id } = useParams();
//   const [lawyer, setLawyer] = useState(null);
//   const [showBooking, setShowBooking] = useState(false);
//   const [mode, setMode] = useState('Meeting');
//   const [location, setLocation] = useState('');
//   const [duration, setDuration] = useState(30);
//   const [date, setDate] = useState('');
//   const [fromTime, setFromTime] = useState('');
//   const [showFullBio, setShowFullBio] = useState(false);
//   const [bookingMessage, setBookingMessage] = useState('');

//   useEffect(() => {
//     const fetchLawyer = async () => {
//       try {
//         const response = await api.get(`/userapi/lawyer/${id}/`);
//         setLawyer(response.data);
//         console.log("✅ Available Slots:", response.data.available_slots);
//       } catch (error) {
//         console.error('Error fetching lawyer:', error);
//       }
//     };
//     fetchLawyer();
//   }, [id]);

//   if (!lawyer) return <div className="p-4">Loading...</div>;

//   const RatingBar = ({ label, value, color }) => (
//     <div className="flex items-center justify-between text-sm">
//       <span className="w-28">{label}</span>
//       <div className="w-full ml-2 bg-gray-200 h-2 rounded-full overflow-hidden">
//         <div className={`${color} h-2`} style={{ width: `${value}%` }}></div>
//       </div>
//     </div>
//   );

//   const handleBooking = async () => {
//     if (!date || !fromTime) {
//       setBookingMessage('Please select a valid date and time');
//       return;
//     }

//     const localDate = new Date(`${date}T${fromTime}`);
//     const utcISOString = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000).toISOString();

//     try {
//       await api.post('/userapi/book/', {
//         lawyer_id: id,
//         mode,
//         location,
//         duration,
//         scheduled_for: utcISOString,
//       });
//       setBookingMessage('✅ Booking confirmed successfully!');
//       setShowBooking(false);
//     } catch (err) {
//       console.error('❌ Booking Error:', err.response?.data || err.message);
//       const msg = err.response?.data?.error || 'Booking Failed';
//       setBookingMessage(`❌ ${msg}`);
//     }
//   };

//   return (
//     <div className="bg-[#fdf3e6] min-h-screen p-4 md:p-8">
//       <div className="text-lg font-bold text-black mb-4">
//         <i>Advocate {lawyer.user?.name}</i>
//       </div>

//       {bookingMessage && (
//         <div className="text-center text-md text-green-800 bg-green-100 p-2 mb-4 rounded">
//           {bookingMessage}
//         </div>
//       )}

//       <div className="bg-[#f1d2a9] rounded-xl shadow-xl p-6 flex flex-col md:flex-row items-center gap-6">
//         <img
//           src={lawyer.user?.profile || '/default-profile.jpg'}
//           alt="Lawyer"
//           className="w-40 h-40 rounded-xl object-cover border-4 border-white shadow"
//         />
//         <div className="flex-1 text-center md:text-left">
//           <h2 className="text-2xl font-bold text-[#0a043c]">{lawyer.user?.name}</h2>
//           <p className="mt-1 text-sm text-black">Specialization: {Array.isArray(lawyer.case_types) ? lawyer.case_types.join(', ') : lawyer.case_types || 'N/A'}</p>
//           <p className="text-sm mt-1 text-black">Languages: {lawyer.languages || 'English, Hindi'}</p>
//           <p className="text-sm mt-1 text-black">Experience: {lawyer.experience}+ years</p>
//           <p className="text-sm mt-1 font-medium text-black">Fee: ₹{lawyer.price}/session</p>
//           <div className="mt-4 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
//             <button className="bg-white text-black border border-black px-6 py-2 rounded-md font-semibold hover:bg-gray-100">
//               Follow
//             </button>
//             <button
//               className="bg-[#0a043c] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#030224]"
//               onClick={() => setShowBooking(true)}
//             >
//               Book an Appointment
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="bg-[#f1d2a9] rounded-xl shadow-lg p-6 mt-6">
//         <h3 className="text-lg font-bold text-[#0a043c] mb-2">About Me</h3>
//         <p className="text-sm text-black leading-relaxed">
//           {showFullBio
//             ? `My name is ${lawyer.user?.name}. I have been practicing law for over ${lawyer.experience}+ years, specializing in criminal defense, family law matters, and civil disputes. I hold an LLB and have completed my Master's in Criminal Law from Mumbai University. My journey began with a deep commitment to justice and helping those unaware of their rights. I've successfully represented clients in high-stakes cases and have a very strong record in both trial and settlement negotiations. I offer legal consultancy, draft contracts, and assist with court documentation. Whether it’s navigating a divorce, resolving a property conflict, or defending against criminal charges, I believe in thorough preparation, empathy, and strategic execution.`
//             : `My name is ${lawyer.user?.name}. I have been practicing law for over ${lawyer.experience}+ years, specializing in criminal defense, family law matters, and civil disputes...`}
//           <span
//             onClick={() => setShowFullBio(!showFullBio)}
//             className="text-blue-900 font-semibold cursor-pointer ml-1"
//           >
//             {showFullBio ? 'Read Less' : 'Read More'}
//           </span>
//         </p>
//       </div>

//       <div className="bg-[#f1d2a9] rounded-xl shadow-lg p-6 mt-6">
//         <h3 className="text-lg font-bold text-[#0a043c] mb-3">Rating & Reviews</h3>
//         <div className="flex items-center gap-2 mb-4">
//           <span className="text-4xl font-bold text-black">4.81</span>
//           <div className="text-yellow-500 text-xl">★★★★☆</div>
//           <span className="text-sm text-gray-700 mt-1">45 clients</span>
//         </div>
//         <div className="space-y-2">
//           <RatingBar label="Excellent" value={90} color="bg-green-700" />
//           <RatingBar label="Good" value={70} color="bg-blue-400" />
//           <RatingBar label="Average" value={50} color="bg-yellow-400" />
//           <RatingBar label="Below Average" value={25} color="bg-orange-400" />
//           <RatingBar label="Poor" value={10} color="bg-red-600" />
//         </div>
//       </div>

//       <div className="text-center mt-8">
//         <button
//           className="bg-[#0a043c] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#030224] transition"
//           onClick={() => setShowBooking(true)}
//         >
//           Book an Appointment
//         </button>
//       </div>

//       {showBooking && (
//         <div className="bg-[#f1d2a9] rounded-xl shadow-lg p-6 mt-6">
//           <div className="flex justify-center items-center mt-8">
//             <div className="bg-black text-white p-8 rounded-2xl shadow-lg w-[430px]">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-serif font-semibold">Schedule an appointment</h2>
//                 <button onClick={() => setShowBooking(false)} className="text-white text-xl">×</button>
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm font-semibold mb-2">Select Mode</label>
//                 <select
//                   className="w-full bg-white border border-gray-300 text-black p-3 rounded-md focus:outline-none"
//                   value={mode}
//                   onChange={(e) => setMode(e.target.value)}
//                 >
//                   <option value="Meeting">Meeting</option>
//                   <option value="online">Online</option>
//                   <option value="physical">Physical</option>
//                 </select>
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm font-semibold mb-2">Add Location</label>
//                 <select
//                   className="w-full bg-white border border-gray-300 text-black p-3 rounded-md focus:outline-none"
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                 >
//                   <option>Lucknow</option>
//                   <option>Bihar</option>
//                   <option>Mumbai</option>
//                   <option>Delhi chamber</option>
//                   <option>Kolkata</option>
//                   <option>Indore</option>
//                   <option>Ahmadnagar</option>
//                   <option>Nagpur</option>
//                 </select>
//               </div>

//               <div className="mb-6">
//                 <label className="block text-sm font-semibold mb-2">Available Slots</label>
//                 <select
//                   className="w-full bg-white border border-gray-300 text-black p-3 rounded-md focus:outline-none"
//                   onChange={(e) => {
//                     const [d, t] = e.target.value.split(', ');
//                     setDate(d);
//                     setFromTime(t);
//                   }}
//                 >
//                   <option value="">Select a slot</option>
//                   {lawyer.available_slots &&
//                     Object.entries(lawyer.available_slots).flatMap(([d, times]) =>
//                       times.map((time, index) => (
//                         <option key={`${d}-${time}-${index}`} value={`${d}, ${time}`}>
//                           {new Date(`${d}T${time}`).toLocaleString('en-IN', {
//                             dateStyle: 'long',
//                             timeStyle: 'short',
//                           })}
//                         </option>
//                       ))
//                     )}
//                 </select>
//               </div>

//               <div className="flex justify-between">
//                 <button
//                   onClick={() => setShowBooking(false)}
//                   className="bg-[#d2b77c] text-black px-6 py-2 rounded-md font-semibold w-[45%]"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleBooking}
//                   className="bg-[#0a043c] text-white px-6 py-2 rounded-md font-semibold w-[45%] border border-white"
//                 >
//                   Booked
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdvocateCard;
