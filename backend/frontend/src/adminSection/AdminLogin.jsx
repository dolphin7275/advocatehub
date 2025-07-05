import React, { useState } from 'react'

const AdminLogin = () => {

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
    <div className="flex min-h-screen">
      <div
        className="flex-1 bg-cover bg-center flex flex-col justify-center items-center p-5"
        style={{
          backgroundImage:
            "",
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
        <p className="text-black text-lg">Seek for the truth</p>
      </div>

      <div className="flex-1 flex flex-col justify-center p-16 bg-[#0d163d]">
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
          <h2 className="text-left text-3xl mb-8 font-bold text-[#fff0d7]">
            Log in
          </h2>

          <div className="mb-5">
            <label className="block font-semibold mb-2 text-[#fff0d7]">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border-none rounded-md bg-white text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-[#004d32]"
            />
          </div>

          <div className="mb-5">
            <label className="block text-[#fff0d7] font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border-none rounded-md bg-white text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-[#004d32]"
            />
          </div>

          {/* <div className="text-right mb-5">
            <a
              href="/forgot-password"
              className="text-xs text-gray-700 hover:underline"
            >
              Forgot Password?
            </a>
          </div> */}

          <button
            type="submit"
            className="w-full mt-4 p-3 bg-[#cc8e2a] text-white text-base font-semibold border-none rounded-md cursor-pointer hover:bg-[#eeebe6] hover:text-[#0d163d] transition duration-200"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  )
}

export default AdminLogin
