import React from "react";
import { Link } from "react-router-dom";

const ClientSignup = () => {
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fceee0] p-4 font-sans">
      <div className="w-full max-w-4xl bg-[#f5efe5] rounded-lg shadow-xl p-8 md:p-12">
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800 underline">
          Client Sign up Page
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
          <div>
            <label className="block text-gray-700 font-bold mb-2 text-lg">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#C8A165]"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2 text-lg">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your Email"
              className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#C8A165]"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2 text-lg">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Enter your phone number"
              className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#C8A165]"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2 text-lg">
              Profile Picture
            </label>

            <div className="flex items-center w-full p-3 border border-gray-300 rounded-md bg-white focus-within:ring-2 focus-within:ring-[#C8A165]">
              <input type="file" className="hidden" id="profilePic" />

              <input
                type="text"
                readOnly
                placeholder=""
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
            <label className="block text-gray-700 font-bold mb-2 text-lg">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your Password"
              className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#C8A165]"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2 text-lg">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Enter your Password"
              className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#C8A165]"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2 text-lg">
              Language
            </label>
            <div className="relative">
              <select className="w-full p-3 border border-gray-300 rounded-md bg-white appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-[#C8A165] cursor-pointer text-gray-500">
                <option value="">Choose</option>
                <option value="english" className="text-gray-900">
                  English
                </option>
                <option value="hindi" className="text-gray-900">
                  Hindi
                </option>
                <option value="other" className="text-gray-900">
                  Other
                </option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-900">
                <svg
                  className="fill-current h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2 text-lg">
              Date of Birth
            </label>
            <input
              type="date"
              className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#C8A165]"
            />
          </div>
        </div>

        <button className="mt-12 bg-[#2a304e] text-white font-semibold text-lg px-10 py-3 rounded-md w-fit mx-auto block hover:bg-[#1a203a] transition-colors duration-200 shadow-md">
          Create Account
        </button>

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
