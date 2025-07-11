import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../apiCalls/axios";// ✅ Update if your api path differs

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // new

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Only fetch user data if we have a token
        const token = localStorage.getItem('accessToken');
        if (!token) {
          setUser(null);
          setLoading(false);
          return;
        }

        const res = await api.get("/userapi/me/");
        setUser(res.data);
      } catch (error) {
        console.error("Auth fetch error:", error);
        setUser(null);
        // If token is invalid, remove it from localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = (userData, tokens) => {
    setUser(userData);
    if (tokens?.access) {
      localStorage.setItem('accessToken', tokens.access);
    }
    if (tokens?.refresh) {
      localStorage.setItem('refreshToken', tokens.refresh);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

