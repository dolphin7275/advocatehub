/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckCircle, X } from 'lucide-react';
import api from '../apiCalls/axios';

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get('/userapi/check-auth/');
        if (res.data?.role === 'admin' && res.data?.is_superuser) {
          navigate('/admin/dashboard');
        }
      } catch {
        // Not logged in or not admin — do nothing
      }
    };
    checkAuth();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
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
    setError('');
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setShowToast(true);
      toast.error(
        <CustomErrorToast message="Passwords do not match." />,
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

    setLoading(true);

    try {
      const { name, email, phone, password } = formData;
      const dataToSend = { name, email, phone, password };
      await api.post('/userapi/admin-register/', dataToSend);
      
      // Show success toast
      setShowToast(true);
      toast.success(
        <CustomSuccessToast message="Admin account created successfully!" />,
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

      setTimeout(() => navigate('/admin/dashboard'), 1500);
    } catch (err) {
      console.error(err);
      setShowToast(true);
      
      if (err.response?.data?.email) {
        setError('Email already exists. Redirecting to login...');
        setTimeout(() => navigate('/admin/login'), 1500); // ⏳ redirect after short delay
      } else {
        toast.error(
          <CustomErrorToast message="Signup failed. Please check the input values." />,
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
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#6E7582] flex items-center justify-center px-4">
      <div className="bg-[#6E7582] p-8 rounded-xl shadow-md w-full max-w-md border border-gray-300">
        <h2 className="text-2xl font-bold text-center text-[#8C2B32] mb-6">Admin Signup</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-white">Name</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D3B173] text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D3B173] text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white">Phone</label>
            <input
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D3B173] text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D3B173] text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D3B173] text-black"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#8C2B32] hover:bg-red-800 text-white rounded-md font-semibold"
          >
            {loading ? 'Creating Admin...' : 'Create Admin'}
          </button>

          <div className="text-sm text-center mt-4 text-white">
            Already have an account?{' '}
            <Link
              to="/admin/login"
              className="text-[#D3B173] hover:underline font-medium"
            >
              Login
            </Link>
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

export default AdminSignup;