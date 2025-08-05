/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from '../../apiCalls/axios';

const AdvocateSignup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    cnic: "",
    education: '',
    barCouncilCert: null,
    aadhaarCard: null,
    panCard: null,
    additionalCert: null,
    profilePicture: null,
    location: "",
    courtLevel: "",
    caseTypes: "",
    availability: "",
    experience: "",
    pricing: "",
    languages: "Hindi"
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setPasswordError("");

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match!");
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("username", formData.email);
    data.append("name", formData.fullName);
    data.append("email", formData.email);
    data.append("phone", formData.phoneNumber);
    data.append("password", formData.password);
    data.append("confirm_password", formData.confirmPassword);
    data.append("role", "lawyer");

    data.append("cnic", formData.cnic);
    data.append("education", formData.education);
    data.append("location", formData.location);
    data.append("court_level", formData.courtLevel);
    data.append("case_types", formData.caseTypes);
    data.append("availability", formData.availability);
    data.append("experience", formData.experience);
    data.append("price", formData.pricing);
    data.append("languages", formData.languages);

    data.append("bar", formData.barCouncilCert);
    data.append("aadhar", formData.aadhaarCard);
    data.append("pan", formData.panCard);
    data.append("degree", formData.additionalCert);
    data.append("profile", formData.profilePicture);

    try {
      await api.post('/userapi/register/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/advocate/login');
    } catch (err) {
      if (err.response?.data) {
        setError(JSON.stringify(err.response.data));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setError('Registration failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 font-sans flex flex-col items-center" style={{ backgroundColor: "#6E7582" }}>
      <h2 className="text-3xl font-bold mb-10 " style={{ color: "#8C2B32", textDecorationColor: "#F8F8F5" }}>
        ADVOCATE SIGN UP
      </h2>

      {error && (
        <div className="bg-red-100 text-red-800 px-4 py-2 mb-6 rounded border border-red-300 max-w-xl">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full max-w-4xl space-y-8">
        {/* Section 1 – Personal Information */}
        <div>
          <h3 className="text-2xl font-extrabold mb-4" style={{ color: "#F8F8F5" }}>
            Section 1 – Personal Information
          </h3>
          <div className="p-8 rounded-xl shadow-lg" style={{ backgroundColor: "#6E7582" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
              {[
                ["fullName", "Full Name", "text"],
                ["email", "Email", "email"],
                ["phoneNumber", "Phone Number", "text"],
                ["password", "Password", "password"],
                ["confirmPassword", "Confirm Password", "password"],
                ["cnic", "CNIC Number", "text"],
                ["education", "Education", "text"]
              ].map(([id, label, type]) => (
                <div key={id} className="flex flex-col">
                  <label htmlFor={id} className="text-xl font-bold mb-2" style={{ color: "#F8F8F5" }}>{label}</label>
                  <input
                    id={id}
                    name={id}
                    type={type}
                    value={formData[id]}
                    onChange={handleChange}
                    required
                    placeholder={`Enter your ${label.toLowerCase()}`}
                    className="p-3 rounded-lg text-sm border border-gray-300 placeholder-gray-400"
                    style={{ backgroundColor: "#F8F8F5", color: "#000" }}
                  />
                </div>
              ))}

              <div className="flex flex-col">
                <label htmlFor="profilePicture" className="text-xl font-bold mb-2" style={{ color: "#F8F8F5" }}>
                  Profile Picture
                </label>
                <label className="p-3 border border-gray-300 rounded-lg text-sm flex items-center justify-between cursor-pointer">
                  <span className="text-gray-500 truncate pr-2">
                    {formData.profilePicture ? formData.profilePicture.name : ""}
                  </span>
                  <span className="px-4 py-2 rounded-md text-white font-semibold" style={{ backgroundColor: "#8C2B32" }}>
                    Upload
                  </span>
                  <input type="file" name="profilePicture" onChange={handleChange} className="hidden" />
                </label>
              </div>

              {passwordError && (
                <p className="text-red-500 text-sm mt-1 col-span-2">{passwordError}</p>
              )}
            </div>
          </div>
        </div>

        {/* Section 2 – KYC Upload */}
        <div>
          <h3 className="text-2xl font-extrabold mb-4" style={{ color: "#F8F8F5" }}>
            Section 2 – KYC Upload
          </h3>
          <div className="p-8 rounded-xl shadow-lg" style={{ backgroundColor: "#6E7582" }}>
            <div className="grid grid-cols-[max-content_max-content] gap-x-8 gap-y-6 items-center">
              {[
                ["barCouncilCert", "Bar Council Certificate"],
                ["aadhaarCard", "Aadhaar Card"],
                ["panCard", "PAN Card"],
                ["additionalCert", "Additional Certificate"]
              ].map(([name, label]) => (
                <React.Fragment key={name}>
                  <label htmlFor={name} className="text-xl font-bold" style={{ color: "#F8F8F5" }}>{`Upload ${label}`}</label>
                  <label className="p-3 border border-gray-300 rounded-lg flex items-center justify-center cursor-pointer w-[160px] text-white font-semibold" style={{ backgroundColor: "#8C2B32" }}>
                    <span>{formData[name] ? formData[name].name : "Upload"}</span>
                    <input type="file" name={name} onChange={handleChange} className="hidden" />
                  </label>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3 – Practice Information */}
        <div>
          <h3 className="text-2xl font-extrabold mb-4" style={{ color: "#F8F8F5" }}>
            Section 3 – Practice Information
          </h3>
          <div className="p-8 rounded-xl shadow-lg" style={{ backgroundColor: "#6e7582" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
              {[
                ["location", "Location"],
                ["caseTypes", "Case Types"],
                ["availability", "Availability"],
                ["experience", "Experience"],
                ["pricing", "Pricing per Session (₹)"],
                ["languages", "Languages"]
              ].map(([id, label]) => (
                <div key={id} className="flex flex-col">
                  <label htmlFor={id} className="text-xl font-bold mb-2" style={{ color: "#F8F8F5" }}>{label}</label>
                  <input
                    id={id}
                    name={id}
                    value={formData[id]}
                    onChange={handleChange}
                    placeholder={`Enter ${label.toLowerCase()}`}
                    required
                    className="p-3 border border-gray-300 rounded-lg text-sm"
                    style={{ backgroundColor: "#F8F8F5", color: "#000" }}
                  />
                </div>
              ))}

              <div className="flex flex-col">
                <label htmlFor="courtLevel" className="text-xl font-bold mb-2" style={{ color: "#F8F8F5" }}>Court Level</label>
                <select
                  id="courtLevel"
                  name="courtLevel"
                  value={formData.courtLevel}
                  onChange={handleChange}
                  required
                  className="p-3 border border-gray-300 rounded-lg text-sm"
                  style={{ backgroundColor: "#6E7582", color: "#000" }}
                >
                  <option value="">Choose</option>
                  <option value="District court">District court</option>
                  <option value="Session court">Session court</option>
                  <option value="Supreme court">Supreme court</option>
                  <option value="Family court">Family court</option>
                  <option value="High court">High court</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`px-10 py-3 text-white text-lg font-semibold rounded-lg mx-auto block transition duration-300 shadow-lg mt-10 ${
            loading ? 'bg-gray-400 cursor-not-allowed' : ''
          }`}
          style={{ backgroundColor: loading ? '#999' : '#8C2B32' }}
        >
          {loading ? 'Creating...' : 'Create Account'}
        </button>
      </form>

  
      {/* Footer Links */}
  <div className="mt-10 text-center">
          <p className="text-[#F8F8F5] text-xl font-semibold">
            Already have an account?{" "}
            <Link to="/Advocate/login" className="text-[#8C2B32] font-bold text-xl">
              Login here
            </Link>
          </p>
          <p className="text-[#F8F8F5] text-xl font-semibold mt-4">
            Are you a Client?{" "}
            <Link to="/client/Signup"  className="text-[#8C2B32] font-bold text-xl">
              Sign up as Client
            </Link>
          </p>
        </div>

</div>
  );
};

export default AdvocateSignup;
