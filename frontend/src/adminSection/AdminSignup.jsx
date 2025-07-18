import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get('/userapi/check-auth/');
        if (res.data?.role === 'admin' && res.data?.is_superuser) {
          navigate('/admin/dashboard');
        }
      } catch (err) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...dataToSend } = formData;
      const res = await api.post('/userapi/admin-register/', dataToSend);
      setSuccess('Admin account created successfully!');
      setTimeout(() => navigate('/admin/dashboard'), 1500);
    } catch (err) {
      console.error(err);
      if (err.response?.data?.email) {
        setError('Email already exists. Redirecting to login...');
        setTimeout(() => navigate('/admin/login'), 1500);
      } else {
        setError('Signup failed. Please check the input values.');
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

          {error && <p className="text-red-300 text-sm">{error}</p>}
          {success && <p className="text-green-300 text-sm">{success}</p>}

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
    </div>
  );
};

export default AdminSignup;