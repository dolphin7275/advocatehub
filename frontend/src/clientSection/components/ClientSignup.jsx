import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import api from  "../../apiCalls/axios"

const ClientSignup = () => {
    const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
    language: "",
    dob: "",
    profile_pic: null,
  });

  const [profileFileName, setProfileFileName] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profile_pic") {
      setForm({ ...form, profile_pic: files[0] });
      setProfileFileName(files[0]?.name || "");
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", form.email); // ✅ username = email
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("confirm_password", form.password2);
    formData.append("phone", form.phone);
    formData.append("language", form.language);
    formData.append("dob", form.dob);
    formData.append("role", "client");
    if (form.profile_pic) formData.append("profile", form.profile_pic); // match backend field name

    try {
      const response = await api.post("/userapi/register/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Registered:", response.data);
      alert("Registration successful!");
      navigate("/client/login");
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      alert("Something went wrong. Check your input.");
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fceee0] p-4 font-sans">
      <div className="w-full max-w-4xl bg-[#f5efe5] rounded-lg shadow-xl p-8 md:p-12">
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800 underline">
          Client Sign up Page
        </h1>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
            <div>
              <label className="block text-gray-700 font-bold mb-2 text-lg">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#C8A165]"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2 text-lg">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your Email"
                required
                className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#C8A165]"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2 text-lg">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#C8A165]"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2 text-lg">Profile Picture</label>
              <div className="flex items-center w-full p-3 border border-gray-300 rounded-md bg-white focus-within:ring-2 focus-within:ring-[#C8A165]">
                <input
                  type="file"
                  id="profilePic"
                  name="profile_pic"
                  onChange={handleChange}
                  accept="image/*"
                  className="hidden"
                />
                <input
                  type="text"
                  readOnly
                  placeholder="No file selected"
                  value={profileFileName}
                  className="flex-1 bg-transparent focus:outline-none text-gray-500"
                />
                <label
                  htmlFor="profilePic"
                  className="bg-[#c8a165] text-white text-sm px-4 py-1 rounded cursor-pointer hover:bg-[#b08b52] transition-colors duration-200"
                >
                  Upload
                </label>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2 text-lg">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your Password"
                required
                className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#C8A165]"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2 text-lg">Confirm Password</label>
              <input
                type="password"
                name="password2"
                value={form.password2}
                onChange={handleChange}
                placeholder="Confirm your Password"
                required
                className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#C8A165]"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2 text-lg">Language</label>
              <select
                name="language"
                value={form.language}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md bg-white appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-[#C8A165] cursor-pointer text-gray-500"
              >
                <option value="">Choose</option>
                <option value="english" className="text-gray-900">English</option>
                <option value="hindi" className="text-gray-900">Hindi</option>
                <option value="other" className="text-gray-900">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2 text-lg">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#C8A165]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-12 bg-[#2a304e] text-white font-semibold text-lg px-10 py-3 rounded-md w-fit mx-auto block hover:bg-[#1a203a] transition-colors duration-200 shadow-md"
          >
            Create Account
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-700 text-base leading-tight">
            Already have an account?{" "}
            <Link
              to="/client/login"
              className="text-blue-600 font-bold hover:underline"
            >
              login here
            </Link>
          </p>
          <p className="text-gray-700 text-base mt-2 leading-tight">
            Are you a Lawyer?{" "}
            <Link
              to="/advocate/signup"
              className="text-blue-600 font-bold hover:underline"
            >
              Sign up as Lawyer
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientSignup;