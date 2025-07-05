import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { MdPending } from "react-icons/md";
import { useLocation } from "react-router-dom";

const AdvocateInfo = () => {
  const [activeLink, setActiveLink] = useState("All Profiles");
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

  return (
    <div className="min-h-screen text-sm bg-[#F4EADE]">
      <header className="bg-gradient-to-r from-[#C9A66C] to-[#C9A66C] px-6 py-4 rounded-b-2xl shadow-md">
        <div className="max-w-full flex items-center justify-between">
          <div className="flex items-center space-x-20">
            <h1 className="text-2xl font-extrabold text-[#0e1a2b]">
              ADVOCATE<span className="text-yellow-500">HUB</span>
            </h1>
            <nav className="flex space-x-20">
              <a href="#home" className="text-lg font-bold text-[#0e1a2b]">Home</a>
              <a href="#about" className="text-lg font-bold text-[#0e1a2b]">About</a>
            </nav>
            <div className="relative ml-4">
              <input
                type="text"
                placeholder="Search by Lawyers"
                className="pl-5 pr-10 py-2 w-[280px] rounded-md border border-gray-400 bg-[#fdf7ed] text-sm text-gray-800 shadow-inner"
              />
              <button className="absolute right-1 top-[50%] translate-y-[-50%] px-3 bg-white border-l border-gray-400 rounded-md h-[80%] flex items-center justify-center">
                <FaSearch className="text-black" />
              </button>
            </div>
          </div>
          <button className="ml-6 bg-[#0e1a2b] text-white px-4 py-2 text-sm rounded-md shadow-md hover:bg-[#1a2a3b]">Refresh</button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row bg-[#f5e9dc] min-h-screen">
        <aside className="w-full md:w-60 bg-[#0D163D] text-white p-4 shadow-lg space-y-4 mt-2 md:mt-4">
          <ul className="space-y-8 pl-2">
            <li>
              <button onClick={() => setActiveLink("All Profiles")} className="flex items-center gap-2 px-2 py-2 rounded hover:bg-[#1e2c3c] transition">
                <span>All Profiles</span>
              </button>
            </li>
            <li>
              <button onClick={() => setActiveLink("Pending Profiles")} className="flex items-center gap-2">
                <span>Pending Profiles</span>
                <MdPending className="text-yellow-400" />
              </button>
            </li>
            <li>
              <button onClick={() => setActiveLink("Approved Profiles")} className="flex items-center gap-2">
                <span>Approved Profiles</span>
                <FaCheckCircle className="text-green-400" />
              </button>
            </li>
            <li>
              <button onClick={() => setActiveLink("Rejected Profiles")} className="flex items-center gap-2">
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

        <main className="flex-1 p-6 space-y-6">
          {/* Personal Info */}
          <section className="bg-[#C9A66CA3] p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Personal Information</h2>
            <div className="space-y-2 bg-[#C9A66CA3] p-4 rounded-md">
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone:</strong> {profile.phone}</p>
              <p><strong>CNIC:</strong> {profile.cnic}</p>
              <p><strong>Education:</strong> {profile.education}</p>
            </div>
          </section>

          {/* KYC Documents */}
         {/* KYC Documents */}
<section className="bg-[#C9A66CA3] p-6 rounded-lg shadow-md">
  <h2 className="text-xl font-bold mb-4">KYC Upload</h2>
  {profile.kyc ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Object.entries(profile.kyc).map(([key, url]) => (
        <div key={key} className="bg-[#C9A66C] p-4 rounded-lg shadow-md flex flex-col items-center">
          <img
            src={url}
            alt={key}
            className="w-32 h-32 object-cover border border-gray-300 mb-3 rounded"
          />
          <p className="text-sm font-semibold text-center mb-4">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </p>
          <div className="flex gap-2">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white bg-[#0D163D] px-3 py-1 rounded hover:bg-[#1a2a3b]"
            >
              View
            </a>
            <a
              href={url}
              download
              className="text-sm text-white bg-[#0D163D] px-3 py-1 rounded hover:bg-[#1a2a3b]"
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


          {/* Practice Info */}
          <section className="bg-[#C9A66CA3] p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Practice Information</h2>
            <p><strong>Location:</strong> {profile.practice?.location}</p>
            <p><strong>Experience:</strong> {profile.practice?.experience}</p>
            <p><strong>Pricing per Session:</strong> {profile.practice?.pricingPerSession}</p>
          </section>

          {/* Action Buttons */}
          <section className="bg-[#C9A66CA3] p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Profile Action</h2>
            <div className="flex gap-4">
              <button className="bg-[#C9A66C] px-4 py-2 text-[#0D163D] rounded shadow font-semibold">Approve</button>
              <button className="bg-[#0D163D] px-4 py-2 text-[#C9A66C] rounded shadow font-semibold">Reject</button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdvocateInfo;
