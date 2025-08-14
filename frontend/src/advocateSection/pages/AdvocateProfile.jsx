import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import api from '../../apiCalls/axios.js';
import { motion } from 'framer-motion';

import logoIcon from "../../assets/images/logo_icon.png";
import logoText from "../../assets/images/logo-text.png";
import profileImage from "../../assets/images/avatarImage.jpg";

console.log("📦 Loaded: AdvocateProfile.jsx");

const statesInIndia = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal"
];

const languagesList = [
  "English", "Hindi", "Tamil", "Telugu", "Kannada", "Marathi", "Gujarati", "Bengali", "Urdu", "Punjabi"
];

const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
    strokeLinejoin="round" className="inline-block mr-1">
    <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    <path d="M15 5l4 4" />
  </svg>
);

const AdvocateProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState({
    firstName: "Sara",
    lastName: "Amid",
    bio: "Law officer",
    phone: "0374376XXXX",
    email: "saraamid1998@gmail.com",
    country: "Lucknow, India",
    experience: "10 Years",
    feeRange: "35,000-60,000",
    houseNo: "123",
    landmark: "Near City Mall",
    locality: "Hazratganj",
    pincode: "226001",
    state: "Uttar Pradesh",
    city: "Lucknow",
  });
  const [documentTypes, setDocumentTypes] = useState({});
  const [documentPreviews, setDocumentPreviews] = useState({});

useEffect(() => {
  const fetchUserData = async () => {
    try {
      const res = await api.get("/userapi/me/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`
        }
      });

      const apiData = res.data;

      // 🔹 Full name ko split karne ka logic
      let firstName = apiData.first_name || "";
      let lastName = apiData.last_name || "";

      if ((!firstName && !lastName) && apiData.name) {
        const nameParts = apiData.name.trim().split(" ");
        firstName = nameParts[0] || "";
        lastName = nameParts.slice(1).join(" ") || "";
      }

      setUserData({
        firstName: firstName,
        lastName: lastName,
        profession: apiData.profession || '',
        phone: apiData.phone || '',
        altPhone: apiData.alt_phone || '',
        email: apiData.email || '',
        password: '',
        confirmPassword: '',
        dob: apiData.details?.dob || '',
        languages: apiData.details?.language ? [apiData.details.language] : [],
        houseNo: apiData.details?.house_no || '',
        locality: apiData.details?.locality || '',
        landmark: apiData.details?.landmark || '',
        pincode: apiData.details?.pincode || '',
        state: apiData.details?.state || '',
        city: apiData.details?.city || '',
        profilePic: apiData.profile || profileImage
      });

    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchUserData();
}, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleFileUpload = (doc) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.jpg,.jpeg,.png";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const ext = file.name.split(".").pop().toUpperCase();
        const fileURL = URL.createObjectURL(file);
        setDocumentTypes((prev) => ({
          ...prev,
          [doc]: { name: file.name, type: ext }
        }));
        setDocumentPreviews((prev) => ({
          ...prev,
          [doc]: fileURL
        }));
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen font-inter bg-gradient-to-br from-[#010922] to-[#8080d7] text-[#010922]">
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-[#aad9d9] shadow-md py-5 px-8 flex justify-between items-center"
      >
        <div className="flex items-center space-x-3">
          <img src={logoIcon} alt="Logo Icon" className="h-11 w-11 rounded-full" />
          <img src={logoText} alt="Logo Text" className="h-6" />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#8080d7] hover:bg-[#6f6fc8] text-white font-bold py-2.5 px-5 rounded-lg shadow-lg transition duration-300"
        >
          Log Out
        </motion.button>
      </motion.header>

      <main className="container mx-auto px-8 py-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-10"
        >
          <button className="bg-[#010922] hover:bg-[#192240] text-white text-2xl font-extrabold py-4 px-10 rounded-xl shadow-xl transition duration-300">
            My Profile
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-r from-[#aad9d9] to-[#8080d7] p-8 rounded-2xl shadow-xl mb-10 flex items-center relative border-2 border-[#aad9d9]"
        >
          <img
            src={profileImage}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover mr-8 border-4 border-white shadow-lg"
          />
          <div>
            <h2 className="text-4xl font-extrabold text-[#010922] mb-1">
              {userData.firstName} {userData.lastName}
            </h2>
            <p className="text-white text-lg mb-1">Criminal Law</p>
            <p className="text-[#010922] text-base">English</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="absolute top-6 right-6 bg-white text-[#8080d7] py-2 px-4 rounded-lg shadow-md flex items-center space-x-2 text-base font-semibold transition duration-300"
            onClick={handleEditToggle}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isEditing
                    ? "M5 13l4 4L19 7"
                    : "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                }
              />
            </svg>
            <span>{isEditing ? "Save" : "Edit"}</span>
          </motion.button>
        </motion.div>

        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white p-8 rounded-2xl shadow-xl mb-10 border-2 border-[#aad9d9]"
        >
          <h3 className="text-2xl font-bold text-[#010922] mb-5 pb-3 border-b-2 border-[#8080d7]">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "First Name", name: "firstName" },
              { label: "Last Name", name: "lastName" },
              { label: "Bio", name: "bio" },
              { label: "Phone", name: "phone" },
              { label: "Email", name: "email" },
              { label: "Country", name: "country" },
              { label: "Experience", name: "experience" },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-[#8080d7] text-base mb-1">{item.label}</p>
                {isEditing ? (
                  <input
                    type="text"
                    name={item.name}
                    value={userData[item.name]}
                    onChange={handleInputChange}
                    className="border border-[#8080d7] rounded-md px-3 py-2 w-full"
                  />
                ) : (
                  <p className="text-[#010922] font-medium text-lg">{userData[item.name]}</p>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Address Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="bg-white p-8 rounded-2xl shadow-xl mb-10 border-2 border-[#aad9d9]"
        >
          <h3 className="text-2xl font-bold text-[#010922] mb-5 pb-3 border-b-2 border-[#8080d7]">
            Address Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "House No", name: "houseNo" },
              { label: "Landmark", name: "landmark" },
              { label: "Locality", name: "locality" },
              { label: "Pincode", name: "pincode" },
              { label: "State", name: "state" },
              { label: "City", name: "city" },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-[#8080d7] text-base mb-1">{item.label}</p>
                {isEditing ? (
                  <input
                    type="text"
                    name={item.name}
                    value={userData[item.name]}
                    onChange={handleInputChange}
                    className="border border-[#8080d7] rounded-md px-3 py-2 w-full"
                  />
                ) : (
                  <p className="text-[#010922] font-medium text-lg">{userData[item.name]}</p>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Update Documents */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-xl mb-10 border-2 border-[#aad9d9]"
        >
          <h3 className="text-2xl font-bold text-[#010922] mb-5 pb-3 border-b-2 border-[#8080d7]">
            Update Documents
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["Bar Council Certificate", "Aadhaar Card", "Pan Card", "COP Certificate"].map(
              (doc, idx) => (
                <div
                  key={idx}
                  className="flex flex-col space-y-3 p-4 bg-[#aad9d9] rounded-lg border border-[#8080d7]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[#010922] font-medium text-base">
                      {doc}
                      {documentTypes[doc] && (
                        <span className="ml-2 text-sm text-[#8080d7] font-semibold">
                          [{documentTypes[doc].type}] - {documentTypes[doc].name}
                        </span>
                      )}
                    </span>
                    <button
                      className="bg-[#010922] hover:bg-[#192240] text-white font-bold py-2 px-4 rounded-md shadow-md text-sm transition duration-300 hover:scale-105"
                      onClick={() => handleFileUpload(doc)}
                    >
                      Upload
                    </button>
                  </div>
                  {documentPreviews[doc] && (
                    <div className="flex items-center space-x-3">
                      <button
                        className="bg-[#8080d7] text-white text-xs px-3 py-1 rounded shadow hover:bg-[#6f6fc8]"
                        onClick={() => {
                          const viewer = document.getElementById(`preview-${idx}`);
                          viewer.style.display =
                            viewer.style.display === "none" ? "block" : "none";
                        }}
                      >
                        View
                      </button>
                      <div id={`preview-${idx}`} style={{ display: "none" }}>
                        {documentTypes[doc]?.type === "PDF" ? (
                          <iframe
                            src={documentPreviews[doc]}
                            title="PDF Preview"
                            className="w-40 h-40 border"
                          ></iframe>
                        ) : (
                          <img
                            src={documentPreviews[doc]}
                            alt="Preview"
                            className="w-20 h-20 object-cover border rounded"
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default AdvocateProfile;


