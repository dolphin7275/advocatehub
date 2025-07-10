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
        const res = await api.get("/userapi/me/");
        setUser(res.data);
      } catch (error) {
        console.error("Auth fetch error:", error);
        setUser(null);
      } finally {
        setLoading(false); // update
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

