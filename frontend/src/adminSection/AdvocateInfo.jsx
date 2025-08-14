import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { MdPending } from "react-icons/md";
import { useLocation } from "react-router-dom";
import api from '../apiCalls/axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckCircle, X } from 'lucide-react';



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


const AlertDialog = ({ message, onClose }) => (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-[#141f52] text-white p-4 rounded-lg shadow-xl max-w-sm mx-auto">
      <p className="text-base mb-3">{message}</p>
      <button
        onClick={onClose}
        className="bg-[#aad9d9] text-[#010922] font-semibold px-3 py-1 rounded hover:bg-[#8cb7b7] transition-colors text-sm"
      >
        OK
      </button>
    </div>
  </div>
);


const KYCDocumentCard = ({ label, url }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="p-2 rounded-lg shadow-md bg-[#8080d7] flex flex-col items-center text-white w-full transform transition-transform duration-300 hover:scale-105">
      <div className="w-full mb-2 flex items-center justify-center bg-gray-200 rounded-t-lg overflow-hidden flex-1 min-h-[100px] max-h-[200px]">
        {url && !imageError ? (
          <img
            src={url}
            alt={label}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <span className="text-gray-500 text-xs p-2 text-center">
            {url ? "Image Not Found" : "No document uploaded"}
          </span>
        )}
      </div>
      <p className="text-xs font-semibold text-center mb-1">{label}</p>
      {url && (
        <div className="flex flex-col gap-2 text-xs mt-auto justify-center w-full">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#010922] bg-[#aad9d9] px-4 py-2 rounded hover:bg-[#8cb7b7] transition-colors text-center w-full text-sm font-semibold transform transition-transform duration-300 hover:scale-105"
          >
            View
          </a>
          <a
            href={url}
            download
            className="text-[#010922] bg-[#aad9d9] px-4 py-2 rounded hover:bg-[#8cb7b7] transition-colors text-center w-full text-sm font-semibold transform transition-transform duration-300 hover:scale-105"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
};

const AdvocateInfo = () => {
  const [activeLink, setActiveLink] = useState("All Profiles");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const location = useLocation();
  const profile = location.state?.profile;

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-400 text-xl font-bold p-4 text-center">
        No profile data found. Please return to the dashboard.
      </div>
    );
  }

  const showAlert = (message) => {
    setAlertMessage(message);
  };

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
      showAlert(`Lawyer ${action}d successfully`);
    } catch (error) {
      console.error(`Failed to ${action} lawyer`, error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);

        if (error.response.status === 403) {
          showAlert(`Failed to ${action} lawyer: You don't have admin permissions`);
        } else if (error.response.status === 404) {
          showAlert(`Failed to ${action} lawyer: Lawyer not found`);
        } else {
          showAlert(`Failed to ${action} lawyer: ${error.response.data.error || 'Unknown error'}`);
        }
      } else if (error.request) {
        console.error('No response received:', error.request);
        showAlert(`Failed to ${action} lawyer: No response from server. Is the backend running?`);
      } else {
        console.error('Error:', error.message);
        showAlert(`Failed to ${action} lawyer: ${error.message}`);
      }
    }
  };

  return (
    <div className="relative min-h-screen text-white bg-[#010922] font-sans overflow-x-hidden">
      {alertMessage && <AlertDialog message={alertMessage} onClose={() => setAlertMessage(null)} />}

      <header className="bg-[#8080d7] p-3 flex items-center justify-start sticky top-0 z-40">
        <button
          className="p-1 text-[#aad9d9]"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </header>

      <div className="flex relative">
        <aside
          className={`fixed top-0 left-0 z-50 bg-[#010922] h-full text-white p-4 shadow-lg space-y-4 w-64
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex justify-end">
            <button onClick={() => setSidebarOpen(false)} className="p-2 text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <ul className="space-y-4 pl-2 mt-2">
            <li>
              <button
                onClick={() => { setActiveLink("All Profiles"); setSidebarOpen(false); }}
                className={`flex items-center gap-2 px-2 py-1 rounded w-full text-left transition-colors ${activeLink === "All Profiles" ? "bg-[#8cb7b7] text-[#010922]" : "bg-[#aad9d9] text-[#010922] hover:bg-[#8cb7b7]"}`}
              >
                <span>All Profiles</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => { setActiveLink("Pending Profiles"); setSidebarOpen(false); }}
                className={`flex items-center gap-2 px-2 py-1 rounded w-full text-left transition-colors ${activeLink === "Pending Profiles" ? "bg-[#8cb7b7] text-[#010922]" : "bg-[#aad9d9] text-[#010922] hover:bg-[#8cb7b7]"}`}
              >
                <span>Pending Profiles</span>
                <MdPending className="ml-auto text-[#010922]" />
              </button>
            </li>
            <li>
              <button
                onClick={() => { setActiveLink("Approved Profiles"); setSidebarOpen(false); }}
                className={`flex items-center gap-2 px-2 py-1 rounded w-full text-left transition-colors ${activeLink === "Approved Profiles" ? "bg-[#8cb7b7] text-[#010922]" : "bg-[#aad9d9] text-[#010922] hover:bg-[#8cb7b7]"}`}
              >
                <span>Approved Profiles</span>
                <FaCheckCircle className="ml-auto text-[#010922]" />
              </button>
            </li>
            <li>
              <button
                onClick={() => { setActiveLink("Rejected Profiles"); setSidebarOpen(false); }}
                className={`flex items-center gap-2 px-2 py-1 rounded w-full text-left transition-colors ${activeLink === "Rejected Profiles" ? "bg-[#8cb7b7] text-[#010922]" : "bg-[#aad9d9] text-[#010922] hover:bg-[#8cb7b7]"}`}
              >
                <span>Rejected Profiles</span>
                <FaTimesCircle className="ml-auto text-[#010922]" />
              </button>
            </li>
            <li>
              <button
                className="flex items-center gap-2 px-2 py-1 rounded w-full text-left bg-[#aad9d9] text-[#010922] hover:bg-[#8cb7b7] transition-colors"
              >
                <span>Logout</span>
                <FaSignOutAlt className="ml-auto text-[#010922]" />
              </button>
            </li>
          </ul>
        </aside>

        <main className={`flex-1 transition-all duration-300 ease-in-out p-4 sm:p-6 md:p-8 min-h-screen
          ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-4">
              <section className="bg-[#aad9d9] p-6 rounded-3xl shadow-xl text-[#010922] border border-white/20 flex-1">
                <h2 className="text-xl md:text-2xl font-bold mb-3">Personal Information</h2>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="w-56 h-56 flex-shrink-0 bg-white/50 backdrop-blur-md rounded-2xl shadow-lg flex items-center justify-center p-2 transform transition-transform duration-300 hover:scale-105">
                    {profile.user_profile ? (
                      <img
                        src={profile.user_profile}
                        alt="Profile"
                        className="h-full fix-content rounded-xl border-4 border-[#141f52]"
                      />
                    ) : (
                      <span className="text-gray-700 text-center font-bold">No Profile Image</span>
                    )}
                  </div>
                  <div className="flex-1 bg-[#8080d7] text-white p-6 rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-105">
                    <p className='text-lg mb-3'>
                      <strong>Name:</strong> {profile.user_name}
                    </p>
                    <p className='text-lg mb-3'>
                      <strong>Email:</strong> {profile.user_email}
                    </p>
                    <p className='text-lg mb-3'>
                      <strong>Phone:</strong> {profile.phone}
                    </p>
                    <p className='text-lg mb-3'>
                      <strong>CNIC:</strong> {profile.cnic}
                    </p>
                    <p className='text-lg'>
                      <strong>Education:</strong> {profile.education}
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-[#aad9d9] p-4 rounded-lg shadow-md text-[#010922] flex-1">
                <h2 className="text-xl md:text-2xl font-bold mb-3">Practice Information</h2>
                <div className='space-y-6'>
                  <p className='text-base capitalize'><strong>Location:</strong> {profile.location}</p>
                  <p className='text-base'><strong>Experience:</strong> {profile.experience}</p>
                  <p className='text-base'><strong>Pricing per Session:</strong> {profile.price}</p>
                </div>
              </section>
            </div>

            <section className="bg-[#aad9d9] p-4 rounded-lg shadow-md text-[#010922]">
              <h2 className="text-xl md:text-2xl font-bold mb-3">KYC Upload</h2>
              {profile ? (
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ['Degree Certificate', profile?.degree],
                    ['Aadhar Card', profile?.aadhar],
                    ['Pan Card', profile?.pan],
                    ['Bar Council Certificate', profile?.bar],
                  ].map(([label, url]) => (
                    <KYCDocumentCard key={label} label={label} url={url} />
                  ))}
                </div>
              ) : (
                <p className="text-red-600 font-semibold">No KYC documents available.</p>
              )}
            </section>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center text-base pt-4 sm:pt-4">
            <button
              className="bg-[#aad9d9] hover:bg-[#8cb7b7] text-[#010922] font-semibold px-3 py-1 rounded-lg transition-colors shadow-md w-full sm:w-auto"
              onClick={() => handleAction(profile.id, 'approve')}>
              Approve
            </button>
            <button
              className="bg-red-500 hover:bg-[#8cb7b7] text-[#010922] font-semibold px-3 py-1 rounded-lg transition-colors shadow-md w-full sm:w-auto"
              onClick={() => handleAction(profile.id, 'reject')}>
              Reject
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdvocateInfo;