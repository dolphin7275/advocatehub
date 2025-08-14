import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckCircle, X } from 'lucide-react';
import api from '../../apiCalls/axios';

const AdvocateLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Custom toast components
  const CustomSuccessToast = ({ message }) => (
    <div className="custom-toast-container">
      <CheckCircle size={64} className="custom-toast-icon-success" />
      <p className="custom-toast-message">{message}</p>
    </div>
  );

  const CustomErrorToast = ({ message, closeToast }) => (
    <div className="custom-toast-container">
      <button 
        onClick={() => {
          closeToast();
          setShowToast(false);
        }}
        className="custom-toast-close-btn"
      >
        <X size={24} />
      </button>
      <div className="custom-toast-icon-error-bg">
        <X size={48} className="custom-toast-icon-error" />
      </div>
      <p className="custom-toast-message">{message}</p>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.post("/userapi/login/", {
        username: formData.email,
        password: formData.password,
      });

      const { access, refresh } = res.data;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      const roleRes = await api.get("/userapi/me/", {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      const { role, details } = roleRes.data;
      const status = details?.profile_status;
      localStorage.setItem("role", role);

      if (role !== "lawyer") {
        toast.error("You are not registered as a lawyer.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

      // Show success toast
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // ✅ Role-based redirect with slight delay to show toast
      setTimeout(() => {
        if (status === "approved") {
          navigate("/advocate/dashboard");
        } else if (status === "pending") {
          navigate("/advocate/waiting");
        } else if (status === "rejected") {
          navigate("/");
        } else {
          toast.error("Unknown profile status. Contact support.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Please check your credentials.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen font-sans">
      <div
        className="relative flex-1 bg-cover bg-center flex flex-col justify-center items-center p-5 text-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1588776814546-8e1a529d7b77?auto=format&fit=crop&w=900&q=80')`,
        }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: '#6E7582'}}></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-4">
            <img
              src="./../public/logo_icon.png"
              alt="AdvocateHub Logo"
              className="h-20 w-auto"
            />
          </div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-[#1A1F2B]">ADVOCATE</span>
            <span className="text-[#8C2B32]">HUB</span>
          </h1>
             <p className="text-lg italic" style={{ color: '#F8F8F5' }}>
               Seek for the truth
             </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center p-10 md:p-16 bg-[#fceee0] font-sans">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Log in
        </h2>

        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
          <div className="mb-6">
            <label className="block font-semibold mb-2 text-lg">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="username@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-md bg-[#F8F8F5] text-black focus:outline-none focus:ring-2 focus:ring-[#C8A165]"
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2 text-lg">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-md bg-[#F8F8F5] text-black focus:outline-none focus:ring-2 focus:ring-[#C8A165] tracking-wide"
            />
          </div>

          <div className="text-right mb-10">
            <Link
              to="/forgot-password"
              className="text-sm hover:underline"
              style={{ color: '#F8F8F5' }}
            >
              Forgot Password ?
            </Link>
          </div>

          {error && (
            <div className="text-red-500 text-center text-sm mb-4">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 font-semibold text-lg rounded-xl transition-colors duration-200 shadow-md"
            style={{
              backgroundColor: '#8C2B32',
              color: '#F8F8F5',
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="text-center mt-8">
            <p className="mb-6 font-semibold text-lg">
              Don't have an account ?
            </p>

            <div className="flex justify-center items-center space-x-10">
              <Link
                to="/client/signup"
                className="font-bold hover:underline text-xl"
                style={{ color: '#8C2B32' }}
              >
                Sign up as Client
              </Link>
              <Link
                to="/advocate/signup"
                className="font-bold hover:underline text-xl"
                style={{ color: '#8C2B32' }}
              >
                Sign up as Lawyer
              </Link>
            </div>
          </div>
        </form>
      </div>

      {/* Toast Container */}
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
        toastClassName="custom-toast-wrapper"
        bodyClassName="custom-toast-body"
        className="toast-container-center"
      />
    </div>
  );
};

export default AdvocateLogin;
