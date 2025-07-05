import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../apiCalls/axios.js";

const ClientLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    console.log("Login data:", formData);

    try {
      // JWT login using email as username
      const res = await api.post("/userapi/login/", {
        username: formData.email,
        password: formData.password,
      });

      const { access, refresh } = res.data;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      // Set default Authorization header for all future requests
      api.defaults.headers.common["Authorization"] = `Bearer ${access}`;

      const roleRes = await api.get("/userapi/me/");
      const role = roleRes.data.role;
      localStorage.setItem("role", role);

      if (role !== "client") {
        setError("You are not registered as a client.");
        return;
      }

      alert("Login successful!");
      navigate("/client/dashboard");
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError("Login failed. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
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
              placeholder=""
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

          {error && (
            <div className="mb-4 text-sm text-red-600 font-semibold">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-[#004d32] text-white text-base font-semibold border-none rounded-md cursor-pointer hover:bg-[#003922] transition duration-200"
          >
            {loading ? "Logging in..." : "Login"}
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