import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdvocateLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
  };

  return (
    <div className="flex h-screen font-sans">
      <div
        className="relative flex-1 bg-cover bg-center flex flex-col justify-center items-center p-5 text-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1588776814546-8e1a529d7b77?auto=format&fit=crop&w=900&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gray-900 opacity-50"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-4">
            <img
              src="/path/to/your/shield-logo.png"
              alt="AdvocateHub Logo"
              className="h-20 w-auto"
            />
          </div>

          <h1 className="text-4xl font-bold text-white mb-2">
            ADVOCATE<span className="text-[#C8A165]">HUB</span>
          </h1>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center p-10 md:p-16 bg-[#fceee0] font-sans">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Log in
        </h2>

        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="username@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-[#C8A165]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-[#C8A165] tracking-wide"
            />
          </div>

          <div className="text-right mb-10">
            <Link
              to="/forgot-password"
              className="text-sm text-gray-700 hover:underline"
            >
              Forgot Password ?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-[#004d32] text-white font-semibold text-lg rounded-xl hover:bg-[#003922] transition-colors duration-200 shadow-md"
          >
            Login
          </button>

          <div className="text-center mt-8">
            <p className="text-gray-900 text-base mb-6 font-semibold font-inter">
              Don't have an account ?
            </p>

            <div className="flex justify-center items-center space-x-32">
              <Link
                to="/client/signup"
                className="text-blue-600 font-bold hover:underline"
              >
                Sign up as Client
              </Link>
              <Link
                to="/advocate/signup"
                className="text-blue-600 font-bold hover:underline"
              >
                Sign up as Lawyer
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdvocateLogin;
