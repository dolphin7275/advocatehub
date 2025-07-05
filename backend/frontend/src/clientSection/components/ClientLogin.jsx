import React, { useState } from "react";

const ClientLogin = () => {
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

    alert("Login attempted! Check console for data.");
  };

  return (
    <div className="flex min-h-screen font-['Segoe_UI','sans-serif']">
      <div
        className="flex-1 bg-cover bg-center flex flex-col justify-center items-center p-5"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1588776814546-8e1a529d7b77?auto=format&fit=crop&w=900&q=80')",
        }}
      >
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-5xl font-bold text-black leading-none">
            ADVOCATE
          </span>
          <span className="text-5xl font-bold text-[#C8A165] leading-none">
            HUB
          </span>
        </div>
        <p className="text-white text-lg italic">Seek for the truth</p>
      </div>

      <div className="flex-1 flex flex-col justify-center p-16 bg-[#fceee0]">
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
          <h2 className="text-left text-3xl mb-8 font-bold text-black">
            Log in
          </h2>

          <div className="mb-5">
            <label className="block font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="username@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border-none rounded-md bg-white text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-[#004d32]"
            />
          </div>

          <div className="mb-5">
            <label className="block font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border-none rounded-md bg-white text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-[#004d32]"
            />
          </div>

          <div className="text-right mb-5">
            <a
              href="/forgot-password"
              className="text-xs text-gray-700 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-[#004d32] text-white text-base font-semibold border-none rounded-md cursor-pointer hover:bg-[#003922] transition duration-200"
          >
            Login
          </button>

          <div className="text-center mt-7">
            <p className="mb-2">Don't have an account?</p>
            <div className="flex justify-center gap-6">
              <a
                href="/client/signup"
                className="text-[#007bff] font-bold no-underline hover:underline"
              >
                Sign up as Client
              </a>
              <a
                href="/advocate/signup"
                className="text-[#007bff] font-bold no-underline hover:underline"
              >
                Sign up as Lawyer
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientLogin;
