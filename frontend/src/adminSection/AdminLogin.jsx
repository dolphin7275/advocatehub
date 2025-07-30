/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckCircle, X } from 'lucide-react';
import api from "../apiCalls/axios"

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.post('/userapi/login/', { username, password });
      const { access, refresh } = res.data;
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);

      const profileRes = await api.get('/userapi/me/', {
        headers: { Authorization: `Bearer ${access}` },
      });

      const { role, name } = profileRes.data;

      if (role !== 'admin') {
        setShowToast(true);
        toast.error(
          <CustomErrorToast message="You are not authorized as admin." />,
          { 
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            closeButton: false,
            className: "custom-toast-wrapper",
            onClose: () => setShowToast(false)
          }
        );
        return;
      }

      localStorage.setItem('role', 'admin');
      localStorage.setItem('adminName', name);
      
      // Show success toast
      setShowToast(true);
      toast.success(
        <CustomSuccessToast message={`Welcome Admin ${name}!`} />,
        { 
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          closeButton: false,
          className: "custom-toast-wrapper",
          onClose: () => setShowToast(false)
        }
      );

      setTimeout(() => navigate('/admin/dashboard/'), 1000);
    } catch (err) {
      console.error(err);
      setShowToast(true);
      toast.error(
        <CustomErrorToast message="Login failed. Please check your credentials." />,
        { 
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          closeButton: false,
          className: "custom-toast-wrapper",
          onClose: () => setShowToast(false)
        }
      );
    } finally {
      setLoading(false);
    }
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
        <form onSubmit={handleLogin} className="w-full max-w-md mx-auto">
          <h2 className="text-left text-3xl mb-8 font-bold text-[#fff0d7]">
            Log in
          </h2>

          <div className="mb-5">
            <label className="block font-semibold mb-2 text-[#fff0d7]">Email</label>
            <input
              type="username"
              name="text"
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border-none rounded-md bg-white text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-[#004d32]"
            />
          </div>
          
          
          {error && <div className="text-red-600 text-sm font-medium">{error}</div>}

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
            disabled={loading}
            className="w-full py-2 px-4 bg-[#0c1a49] hover:bg-blue-800 text-white rounded-md font-semibold transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

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
  )
}

export default AdminLogin