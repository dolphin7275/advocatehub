import React, { useState, useEffect } from 'react'
import { Outlet,useNavigate } from 'react-router-dom'
import api from '../../apiCalls/axios'

const AdvocateList = () => {
  const [lawyers, setLawyers] = useState([]);
  const [filteredLawyers, setFilteredLawyers] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    court_level: '',
    case_type: '',
    price: '',
    experience: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const response = await api.get('/userapi/approved-lawyers/');
        setLawyers(response.data);
        console.log(response.data);
        
        setFilteredLawyers(response.data);
      } catch (err) {
        console.error('Failed to fetch lawyers', err);
      }
    };
    fetchLawyers();
  }, []);

  useEffect(() => {
    const hasAnyFilter = Object.values(filters).some(val => val);
    if (!hasAnyFilter) {
      setFilteredLawyers(lawyers);
      return;
    }

    let filtered = [...lawyers];

    if (filters.location) filtered = filtered.filter(l => l.location === filters.location);
    if (filters.court_level) filtered = filtered.filter(l => l.court_level === filters.court_level);
    if (filters.case_type) filtered = filtered.filter(l => l.case_types?.includes(filters.case_type));
    if (filters.price) filtered = filtered.filter(l => parseInt(l.price) <= parseInt(filters.price));
    if (filters.experience) filtered = filtered.filter(l => parseInt(l.experience) >= parseInt(filters.experience));

    setFilteredLawyers(filtered);
  }, [filters, lawyers]);

  const handleChange = (e) => {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="p-6 min-h-screen bg-[#f4e9d8]">
      <div className="flex justify-center mb-8">
        <div className="flex flex-wrap gap-4 justify-center">
          {[
            { name: 'location', options: ['', 'Delhi', 'Mumbai', 'Bangalore', 'Lucknow', 'Bhopal'] },
            { name: 'court_level', options: ['', 'High Court', 'District Court', 'Supreme Court', 'Session Court', 'Family Court'] },
            { name: 'case_type', options: ['', 'Criminal', 'Civil', 'Family'] },
            { name: 'price', options: ['', '100', '200', '500'] },
            { name: 'experience', options: ['', '1', '3', '5'] }
          ].map(filter => (
            <select
              key={filter.name}
              name={filter.name}
              onChange={handleChange}
              className="px-4 py-2 rounded-full bg-[#0a043c] text-white shadow-md"
            >
              <option value="">{filter.name.charAt(0).toUpperCase() + filter.name.slice(1)}</option>
              {filter.options.slice(1).map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ))}
        </div>
      </div>



      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredLawyers.length > 0 ? filteredLawyers.map(lawyer => (
          <div
            key={lawyer.user?.id}
            className="bg-[#e0c097] p-6 rounded-xl shadow-lg flex flex-col items-center text-center"
          >
            <img
              src={lawyer.user?.profile || '/default-avatar.png'}
              alt="Lawyer"
              className="w-24 h-24 rounded-full object-cover shadow mb-3"
            />
            <h3 className="font-bold text-lg text-black">{lawyer.user?.name || 'Lawyer'}</h3>
            <div className="text-red-600 text-sm font-semibold">★★★★☆</div>
            <div className="text-sm font-bold text-black">Exp: {lawyer.experience}yrs</div>
            <div className="text-sm text-gray-800 my-1">
              {lawyer.languages || 'English , Hindi , Tamil'}
            </div>
            <div className="text-sm font-medium mb-3 text-black">Cost : ₹{lawyer.price} per hr</div>
            <button
              className="bg-[#0a043c] text-white py-2 px-4 rounded shadow hover:bg-[#030224] transition"
              onClick={() => navigate(`lawyer/${lawyer.user?.id}`)}
            >
              See Profile
            </button>
          </div>
        )) : (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No lawyers match the selected filters.
          </p>
        )}
      </div>
      <Outlet/>
    </div>
  );
};
export default AdvocateList
  


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api/axios'; // your axios instance

// const AdvocateList = () => {
//   const [lawyers, setLawyers] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchLawyers = async () => {
//       try {
//         const response = await api.get('/userapi/approved-lawyers/');
//         setLawyers(response.data);
//       } catch (error) {
//         console.error('Error fetching lawyers:', error);
//       }
//     };

//     fetchLawyers();
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#f4e9d8] p-6">
//       <h2 className="text-2xl font-bold text-center mb-6">Available Advocates</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {lawyers.length > 0 ? lawyers.map((lawyer) => (
//           <div
//             key={lawyer.id}
//             className="bg-[#f5e4c5] rounded-lg shadow-md p-4 text-center hover:shadow-xl transition"
//           >
//             <img
//               src={lawyer.user?.profile || '/default-avatar.png'}
//               alt={lawyer.user?.name || 'Lawyer'}
//               className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
//             />
//             <h3 className="font-semibold text-lg mb-2">{lawyer.user?.name || 'Unnamed Lawyer'}</h3>
//             <div className="text-sm mb-1">Exp: {lawyer.experience || 0} yrs</div>
//             <div className="text-sm mb-1">Languages: {(lawyer.languages || 'English, Hindi')}</div>
//             <div className="text-sm mb-2">Cost: ₹{lawyer.price || 'N/A'} per hour</div>
//             <button
//               onClick={() => navigate(`/lawyer/${lawyer.id}`)}
//               className="bg-blue-900 text-white px-4 py-2 rounded mt-4 hover:bg-blue-800 transition"
//             >
//               See Profile
//             </button>
//           </div>
//         )) : (
//           <div className="col-span-full text-center text-gray-600">
//             No advocates found.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdvocateList;
