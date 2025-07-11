import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { MdPending } from "react-icons/md";
import { useLocation } from "react-router-dom";
import api from '../apiCalls/axios'


// ✅ CSRF token helper function
const getCsrfToken = () => {
  const name = "csrftoken";
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return "";
};

const AdvocateInfo = () => {
  const [activeLink, setActiveLink] = useState("All Profiles");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();
  const { profile } = location.state;
  console.log(profile.education);
  console.log(profile.kyc?.AadhaarFront);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100 text-red-700 text-lg font-semibold">
        No profile data found. Please return to the dashboard.
      </div>
    );
  }

  const handleAction = async (id, action) => {
    try {
      const csrfToken = getCsrfToken(); 
      await api.post(
        `/userapi/${action}-lawyer/${id}/`,
        {},
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
          withCredentials: true,
        }
      );
      alert(`Lawyer ${action}d successfully`);
    } catch (error) {
      console.error(`Failed to ${action} lawyer`, error);
      alert(`Failed to ${action} lawyer`);
    }
  };

  return (
    <div className="min-h-screen text-sm bg-[#141f52] relative">

      {/* Toggle Button */}
      <button
        className="text-white absolute top-4 left-4 z-50"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            absolute top-0 left-0 z-40 bg-[#0D163D] w-64 h-full text-white p-4 shadow-lg space-y-4
            transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          {/* Close Button */}
          <div className="flex justify-end">
            <button onClick={() => setSidebarOpen(false)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <ul className="space-y-6 pl-2 mt-2">
            <li>
              <button onClick={() => { setActiveLink("All Profiles"); setSidebarOpen(false); }} className="flex items-center gap-2 px-2 py-2 rounded hover:bg-[#1e2c3c] transition">
                <span>All Profiles</span>
              </button>
            </li>
            <li>
              <button onClick={() => { setActiveLink("Pending Profiles"); setSidebarOpen(false); }} className="flex items-center gap-2">
                <span>Pending Profiles</span>
                <MdPending className="text-yellow-400" />
              </button>
            </li>
            <li>
              <button onClick={() => { setActiveLink("Approved Profiles"); setSidebarOpen(false); }} className="flex items-center gap-2">
                <span>Approved Profiles</span>
                <FaCheckCircle className="text-green-400" />
              </button>
            </li>
            <li>
              <button onClick={() => { setActiveLink("Rejected Profiles"); setSidebarOpen(false); }} className="flex items-center gap-2">
                <span>Rejected Profiles</span>
                <FaTimesCircle className="text-red-500" />
              </button>
            </li>
            <li>
              <button className="flex items-center gap-2">
                <span>Logout</span>
                <FaSignOutAlt className="text-blue-400" />
              </button>
            </li>
          </ul>
        </aside>

        {/* Client Info */}
        {/* Personal & Practice + KYC side by side */}
<main className={`flex-1 p-12 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
  <div className="flex flex-col lg:flex-row gap-6">

    {/* Left: Personal + Practice Info */}
    <div className="flex-1 space-y-6">
      {/* Personal Info */}
      <section className="bg-[#e8d6b5] p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Personal Information</h2>
        <div className="flex items-start gap-6">
          {profile.user_profile && (
            <img
              src={profile.user_profile}
              alt="Profile"
              className="w-32 h-35 object-cover"
              style={{ borderRadius: '30px 5px 30px 5px', border: '#141f52 solid' }}
            />
          )}
          <div className="space-y-2 p-2 rounded-md ">
            <p className='capitalize'><strong >Name:</strong> {profile.user_name}</p>
            <p><strong>Email:</strong> {profile.user_email}</p>
            <p><strong>Phone:</strong> {profile.phone}</p>
            <p><strong>CNIC:</strong> {profile.cnic}</p>
            <p><strong>Education:</strong> {profile.education}</p>
          </div>
        </div>
      </section>

      {/* Practice Info */}
      <section className="bg-[#e8d6b5] p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Practice Information</h2>
        <p className='capitalize'><strong>Location:</strong> {profile.location}</p>
        <p><strong>Experience:</strong> {profile.experience}</p>
        <p><strong>Pricing per Session:</strong> {profile.price}</p>
      </section>
    </div>

    {/* Right: KYC Documents */}
    <section className="bg-[#e8d6b5] p-6 rounded-lg shadow-md w-full lg:w-1/3">
  <h2 className="text-xl font-bold mb-4">KYC Upload</h2>
  {profile ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {[
        ['Degree Certificate', profile?.degree],
        ['Aadhar Card', profile?.aadhar],
        ['Pan Card', profile?.pan],
        ['Bar Council Certificate', profile?.bar],
      ].map(([label, url]) => (
        <div key={label} className="p-3 rounded-lg shadow-md bg-[#C9A66C] flex flex-col items-center">
          <div className="w-25 h-15 mb-3 flex items-center justify-center bg-gray-200 rounded">
            {url ? (
              <img
                src={url}
                alt={label}
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <span className="text-gray-500">Preview</span>
            )}
          </div>
          <p className="text-sm font-semibold text-center mb-2">{label}</p>
          <div className="flex gap-2">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white bg-[#0e1a2b] px-3 py-1 rounded hover:bg-[#1a2a3b]"
            >
              View
            </a>
            <a
              href={url}
              download
              className="text-sm text-white bg-[#0e1a2b] px-3 py-1 rounded hover:bg-[#1a2a3b]"
            >
              Download
            </a>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-red-600 font-semibold">No KYC documents available.</p>
  )}
</section>

  </div>

  {/* Action Buttons */}
  <div className="flex gap-8 justify-center text-lg pt-8">
    <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => handleAction(profile.id, 'approve')}>Approve</button>
    <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={() => handleAction(profile.id, 'reject')}>Reject</button>
  </div>
</main>

      </div>
    </div>
  );
};

export default AdvocateInfo;


