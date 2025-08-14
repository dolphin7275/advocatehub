import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import api from "../apiCalls/axios";


export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        setError('You are not authorized as an admin.');
        
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return;
      }

      localStorage.setItem('role', 'admin');
      localStorage.setItem('adminName', name);
      
      navigate('/admin/dashboard/');
    } catch (err) {
      console.error(err);
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="flex flex-col md:flex-row lg:flex-row min-h-screen bg-[#8080d7] text-[#010922] font-sans">
      
      <div className="w-full md:w-full lg:w-1/2 flex justify-center items-center p-8 max-md:py-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            
            <span className="text-white">ADVOCATE</span>{' '}
            <span className="text-[#010922]">HUB</span>
          </h1>
          
          <p className="mt-4 text-white text-md md:text-lg italic">Seek for the truth</p>
        </div>
      </div>

      
      
      <div className="w-full md:w-full lg:w-1/2 flex justify-center items-center px-6 py-10 md:px-12 lg:p-20 bg-[#8080d7]">
        
        <div className="w-full max-w-md mx-auto bg-[#aad9d9] p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-300">
          <form onSubmit={handleLogin} className="space-y-5">
            
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#010922] text-center">
              ADMIN LOGIN
            </h2>

            
            <div>
              <label className="block font-semibold mb-2 text-[#010922]">Email</label>
              <input
                type="text"
                placeholder="username@gmail.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                
                className="w-full px-4 py-3 text-[#010922] placeholder-gray-700 bg-[#F3F4F6] border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#010922] transition-all duration-200 hover:shadow-md hover:border-[#7aafa8]"
              />
            </div>

            
            <div>
              <label className="block font-semibold mb-2 text-[#010922]">Password</label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                
                className="w-full px-4 py-3 text-[#010922] placeholder-gray-700 bg-[#F3F4F6] border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#010922] transition-all duration-200 hover:shadow-md hover:border-[#7aafa8]"
              />
            </div>

            
            <div className="text-right text-sm">
              <a href="/forgot-password" className="text-[#010922] hover:underline">
                Forgot Password?
              </a>
            </div>

                       {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

            
            <button
              type="submit"
              disabled={loading}
              
              className="w-full py-3 bg-[#010922] hover:bg-[#1A1F2E] text-white rounded-xl font-semibold transition-all duration-200 text-lg tracking-wide disabled:bg-gray-400"
            >
              {loading ? 'Logging in...' : 'LOGIN'}
            </button>
            
            
            <div className="mt-8 text-center text-sm text-[#010922]">
              <p className="text-base font-medium">Don't have an account?</p>
              <div className="mt-4 flex flex-col sm:flex-row justify-center gap-3">
                <a href="/client/signup" className="text-[#010922] text-sm font-medium hover:underline hover:text-[#1A1F2E] transition-colors duration-200">
                  Sign up as Client
                </a>
                <a href="/advocate/signup" className="text-[#010922] text-sm font-medium hover:underline hover:text-[#1A1F2E] transition-colors duration-200">
                  Sign up as Advocate
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
