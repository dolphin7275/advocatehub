import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
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
    <div className="flex min-h-screen bg-[#6E7582] text-white">
      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold">
            <span className="text-black">ADVOCATE</span>{' '}
            <span className="text-[#8C2B32]">HUB</span>
          </h1>
          <p className="mt-4 text-white text-lg italic">Seek for the truth</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex flex-col justify-center p-12 md:p-20 bg-[#6E7582]">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md mx-auto bg-transparent"
        >
          <h2 className="text-3xl font-bold mb-8 text-[#8C2B32]">
            ADMIN LOGIN
          </h2>

          <div className="mb-5">
            <label className="block font-semibold mb-2">Email</label>
            <input
              type="text"
              placeholder="username@gmail.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-white text-black shadow-md focus:outline-none"
            />
          </div>

          <div className="mb-5">
            <label className="block font-semibold mb-2">Password</label>
            <input
              type="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-white text-black shadow-md focus:outline-none"
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
          </div>

          {error && (
            <div className="text-red-300 text-sm font-medium mb-4">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#8C2B32] hover:bg-red-800 text-white rounded-md font-bold text-lg transition"
          >
            {loading ? 'Logging in...' : 'LOGIN'}
          </button>

          <div className="mt-8 text-center text-sm">
  <p className="text-base font-medium">Don't have an account?</p>
  <div className="mt-4 space-x-6">
    <a
      href="/client/signup"
      className="text-[#8C2B32] text-xl font-bold"
    >
      Sign up as Client
    </a>
    <a
      href="/advocate/signup"
      className="text-[#8C2B32] text-xl font-bold"
    >
      Sign up as Advocate
    </a>
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

export default AdminLogin
