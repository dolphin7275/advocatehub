import React, { useEffect, useState } from 'react';
import api from "../../apiCalls/axios"
import { FaStar } from 'react-icons/fa';

const Featured = () => {
  const [featuredLawyers, setFeaturedLawyers] = useState([]);

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const res = await api.get('/userapi/all-lawyers/');
        console.log(res.data)
        const approved = res.data.filter(lawyer => lawyer.profile_status === 'approved');
        setFeaturedLawyers(approved.slice(0, 4));
      } catch (err) {
        console.error('Failed to load lawyers:', err);
      }
    };
    fetchLawyers();
  }, []);

  return (
    <section className="bg-[#6E7582] py-16 px-4 text-center">
      <h2 className="text-4xl font-bold mb-4 text-[#8c2b32] text-center">Featured Lawyers</h2>
      <p className="text-[#F8F8F5] text-lg mb-12 text-center">
        Meet the most popular and highly recommended lawyers on our platform.
      </p>

      <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
        {featuredLawyers.length === 0 ? (
          <p className="text-[#f8f8f5]">No featured lawyers available at the moment.</p>
        ) : (
          featuredLawyers.map((lawyer, i) => (
            <div
              key={i}
              className="bg-[#d6b47a] w-[200px] rounded-xl p-4 shadow-md text-left font-sans"
            >
              <div className="flex items-center mb-2">
                <img
                  src={lawyer.user_profile || "/images/lawyer-avatar.jpg"}
                  alt="Lawyer"
                  className="w-14 h-14 rounded-full object-cover mr-3 border border-white shadow"
                />
                <div>
                  <h3 className="text-sm font-bold text-[#1e1e1e]">{lawyer.user_name}</h3>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, idx) => (
                      <FaStar
                        key={idx}
                        className={`h-3 w-3 ${
                          idx < (lawyer.rating || 4) ? 'text-red-500' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-s font-semibold text-black mt-1">
                    Exp: {lawyer.experience || '2'}yrs
                  </p>
                </div>
              </div>

              <div className="text-xs text-black mb-2 ml-1">
                <p>{lawyer.languages || 'English , Hindi , Tamil'}</p>
                <p>Cost : ₹{lawyer.price || 100} per hr</p>
              </div>

              <div className="text-center mt-2">
                <button className="bg-[#0e1a3c] text-white px-4 py-1 text-sm rounded shadow hover:bg-[#09132d] transition">
                  See Profile
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="m-8">
        <button className="border text-lg border-[#b48a48] bg-[#c4a552] text-[#1e1e1e] px-8 py-3 rounded-full font-semibold hover:bg-[#b48a48] hover:text-white transition">
          Browse All
        </button>
      </div>

      <div className="mt-6">
        <p className='text-base mb-2'>Are you a Lawyer?</p>
        <button className="bg-[#8c2b32] text-white px-6 py-3 rounded-full text-sm font-bold shadow-md hover:bg-[#09132d] transition">
          Join to our Law Firm.
        </button>
      </div>
    </section>
  );
};

export default Featured;
