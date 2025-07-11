/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import '../../index.css';

import { CheckCircle, X } from 'lucide-react';
import api from "../../apiCalls/axios"

const ClientLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Custom toast components
  const CustomSuccessToast = ({ message, closeToast }) => (
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
        setShowToast(true);
        toast.error(
          <CustomErrorToast message="You are not registered as a client." />,
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

      setShowToast(true);
      toast.success(
        <CustomSuccessToast message="Login successful!" />,
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
      setTimeout(() => navigate("/advocate-list"), 1000);
    } catch (err) {
      console.error(err);
      setShowToast(true);
      if (err.response?.status === 401) {
        toast.error(
          <CustomErrorToast message="Invalid email or password." />,
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
      } else {
        toast.error(
          <CustomErrorToast message="Login failed. Please try again later." />,
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
    <div className="login-container">
      {/* Blur overlay when toast is visible */}
      {showToast && <div className="toast-overlay"></div>}
      
      <div className={`login-left-section ${showToast ? 'blurred' : ''}`}>
        <div className="login-logo">
          <span className="logo-advocate">ADVOCATE</span>
          <span className="logo-hub">HUB</span>
        </div>
        <p className="login-tagline">Seek for the truth</p>
      </div>

      <div className={`login-right-section ${showToast ? 'blurred' : ''}`}>
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="login-title">Log in</h2>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="username@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              placeholder=""
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="forgot-password-link">
            <a href="/forgot-password" className="forgot-link">
              Forgot Password?
            </a>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="login-button"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="signup-links">
            <p className="signup-text">Don't have an account?</p>
            <div className="signup-options">
              <a href="/client/signup" className="signup-link">
                Sign up as Client
              </a>
              <a href="/advocate/signup" className="signup-link">
                Sign up as Lawyer
              </a>
            </div>
          </div>
        </form>
      </div>

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

export default ClientLogin;