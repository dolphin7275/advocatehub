import React, { useState, useEffect }from 'react';
import { motion } from 'framer-motion';
import api from "../../apiCalls/axios.js";
import profileImage from "../../assets/images/avatarImage.jpg";

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

const ClientProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    profession: '',
    phone: '',
    altPhone: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    languages: [],
    houseNo: '',
    locality: '',
    landmark: '',
    pincode: '',
    state: '',
    city: '',
    profilePic: profileImage
  });

  // ✅ Fetch data from backend
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


  const toggleEdit = () => setIsEditing(!isEditing);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLanguageSelect = (lang) => {
    setUserData((prev) => {
      const isSelected = prev.languages.includes(lang);
      return {
        ...prev,
        languages: isSelected
          ? prev.languages.filter(l => l !== lang)
          : [...prev.languages, lang]
      };
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#010922] to-[#8080d7] text-white py-10 px-4 font-inter">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        className="max-w-3xl mx-auto bg-[#f0faff] text-[#010922] rounded-2xl p-6 shadow-lg relative"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleEdit}
          className="absolute top-4 left-4 bg-[#010922] text-[#aad9d9] px-4 py-2 rounded-md font-semibold flex items-center gap-2"
        >
          <PencilIcon />
          {isEditing ? "Save" : "Edit"}
        </motion.button>

        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-28 h-28 rounded-full mx-auto border-4 border-white shadow-md overflow-hidden mb-4"
          >
            <img src={userData.profilePic} alt="Profile" className="w-full h-full object-cover" />
          </motion.div>
          <h2 className="text-2xl font-bold inline-block px-4 py-2 rounded-full bg-gradient-to-r from-[#010922] to-[#8080d7] text-white shadow-md">
            {userData.firstName} {userData.lastName}
          </h2>
          {/* <p className="text-lg font-semibold mt-2 inline-block px-3 py-1 rounded-full bg-gradient-to-r from-[#aad9d9] to-[#8080d7] text-[#010922] shadow">
            {userData.profession}
          </p> */}
        </div>

        <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "First Name", name: "firstName" },
            { label: "Last Name", name: "lastName" },
            { label: "Profession", name: "profession" },
            { label: "Phone Number", name: "phone" },
            { label: "Alternate Number", name: "altPhone" },
            { label: "Email", name: "email" },
            { label: "Password", name: "password", type: "password" },
            { label: "Confirm Password", name: "confirmPassword", type: "password" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name} className="flex flex-col">
              <label className="text-sm font-medium mb-1">{label}</label>
              {isEditing ? (
                <input
                  type={type}
                  name={name}
                  value={userData[name]}
                  onChange={handleChange}
                  className="p-2 rounded-md border border-gray-300 text-sm"
                />
              ) : (
                <p className="bg-[#aad9d9] text-[#010922] p-2 rounded-md text-sm font-medium">
                  {userData[name] || "—"}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* DOB + Language in one row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Date of Birth */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Date of Birth</label>
            {isEditing ? (
              <input
                type="date"
                name="dob"
                value={userData.dob}
                onChange={handleChange}
                className="p-2 rounded-md border border-gray-300 text-sm"
              />
            ) : (
              <p className="bg-[#aad9d9] text-[#010922] p-2 rounded-md text-sm font-medium">
                {userData.dob || "—"}
              </p>
            )}
          </div>

          {/* Language */}
          <div className="flex flex-col relative">
            <label className="text-sm font-medium mb-1">Language</label>
            {isEditing ? (
              <div
                className="relative"
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              >
                <div className="p-2 rounded-md border border-gray-300 text-sm bg-white cursor-pointer">
                  {userData.languages.length > 0 ? userData.languages.join(", ") : "Select Language(s)"}
                </div>
                {languageDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-48 overflow-y-auto">
                    {languagesList.map((lang) => (
                      <div
                        key={lang}
                        className={`px-4 py-2 text-sm hover:bg-blue-100 cursor-pointer ${
                          userData.languages.includes(lang) ? 'bg-blue-100 font-medium' : ''
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLanguageSelect(lang);
                        }}
                      >
                        {lang}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p className="bg-[#aad9d9] text-[#010922] p-2 rounded-md text-sm font-medium">
                {userData.languages.length ? userData.languages.join(", ") : "—"}
              </p>
            )}
          </div>
        </div>

        <hr className="my-6 border-gray-400" />

        <h3 className="text-xl font-semibold mb-4">Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "House No", name: "houseNo" },
            { label: "Locality", name: "locality" },
            { label: "Landmark", name: "landmark" },
            { label: "Pincode", name: "pincode" },
            { label: "City", name: "city" }
          ].map(({ label, name }) => (
            <div key={name} className="flex flex-col">
              <label className="text-sm font-medium mb-1">{label}</label>
              {isEditing ? (
                <input
                  type="text"
                  name={name}
                  value={userData[name]}
                  onChange={handleChange}
                  className="p-2 rounded-md border border-gray-300 text-sm"
                />
              ) : (
                <p className="bg-[#aad9d9] text-[#010922] p-2 rounded-md text-sm font-medium">
                  {userData[name] || "—"}
                </p>
              )}
            </div>
          ))}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">State</label>
            {isEditing ? (
              <select
                name="state"
                value={userData.state}
                onChange={handleChange}
                className="p-2 rounded-md border border-gray-300 text-sm"
              >
                <option value="">Select State</option>
                {statesInIndia.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            ) : (
              <p className="bg-[#aad9d9] text-[#010922] p-2 rounded-md text-sm font-medium">
                {userData.state || "—"}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ClientProfile;

