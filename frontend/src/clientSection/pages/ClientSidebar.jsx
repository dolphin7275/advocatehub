import React, { useState } from "react";
import {   Routes, Route, useNavigate } from "react-router-dom";


const Sidebar = ({ onLogout,user }) => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "My Profile", path: "/profile" },
    { name: "Dashboard", path: "/dashboard"},
    { name: "Help & Support", path: "/help"  },
    { name: "Notifications", path: "/notifications"},
    
  ];
 

  return (
    <div className="w-64 bg-white shadow-lg p-4 rounded-xl">
      {/* User Info */}
      <div className="flex items-center space-x-3 mb-4">
        <img
          src={user.image}
          alt="User"
          className="w-12 h-12 rounded-full"
        />
        <span className="font-semibold text-lg">{user.name}</span>
      </div>
      <hr className="mb-4" />

      {/* Menu Items */}
      {menuItems.map((item, idx) => (
        <button
          key={idx}
          onClick={() => navigate(item.path)}
          className="flex items-center w-full px-3 py-2 text-left hover:bg-gray-100 rounded-md mb-2"
        >
          <span className="mr-3">{item.icon}</span>
          {item.name}
        </button>
      ))}

      {/* Logout */}
      <button
        onClick={onLogout}
        className="flex items-center w-full px-3 py-2 text-left hover:bg-red-100 text-red-500 rounded-md mt-4"
      >
        ⏻ Logout
      </button>
    </div>
  );
};

const Login = ({ onLogin }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <button
        onClick={onLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Log In
      </button>
    </div>
  );
};

const Page = ({ title }) => <h2 className="text-3xl p-6">{title}</h2>;

const ClientSidebar= ()=> {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const res = await fetch("");
    const data = await res.json();
    setUser(data.data);
  };

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    
    <div className="flex w-full min-h-screen">
    {isLoggedIn && <Sidebar onLogout={handleLogout} />}
    <div className="flex-1 flex items-center justify-center">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="w-full max-w-3xl text-center">
          <Routes>
            <Route path="/profile" element={<Page title="My Profile" />} />
            <Route path="/dashboard" element={<Page title="dasboard" />} />
            <Route path="/help" element={<Page title="Help & Support" />} />
            <Route path="/notifications" element={<Page title="Notifications" />} />
          </Routes>
        </div>
      )}
    </div>
  </div>
  
    
  );
}
export default Lawyersidebar;
