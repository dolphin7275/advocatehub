
import React from 'react'

const AdvocateSidebar = () => {
  return (
    <div></div>
  )
}

export default AdvocateSidebar

// import React, { useEffect, useState } from "react";
// import { Navigate, useNavigate, useLocation, Route, Routes } from "react-router-dom";

// // Sidebar Component
// const Sidebar = ({ user, onLogout }) => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const menu = [
//     { name: "My Profile", path: "/" },
//     { name: "Dashboard", path: "/dashboard" },
//     { name: "Help & Support", path: "/" },
//     { name: "Notifications", path: "/" },
//     { name: "Slot Listing", path: "/" },
//   ];

//   return (
//     <div className="w-64 h-screen bg-white shadow-lg p-4">
//       <div className="flex items-center space-x-4 border-b pb-4 mb-4">
//         <img src={user.avatar} alt="User" className="w-12 h-12 rounded-full" />
//         <h2 className="font-semibold text-lg">
//           {user.first_name} {user.last_name}
//         </h2>
//       </div>
//       <ul className="space-y-3">
//         {menu.map((item) => (
//           <li
//             key={item.path}
//             onClick={() => navigate(item.path)}
//             className={`cursor-pointer px-3 py-2 rounded hover:bg-gray-200 ${
//               location.pathname === item.path ? "bg-gray-100 font-semibold" : ""
//             }`}
//           >
//             {item.name}
//           </li>
//         ))}
//         {/* <li
//           onClick={() => {
//             onLogout();
//             navigate("/");
//           }}
//           className="cursor-pointer px-3 py-2 rounded text-red-500 hover:bg-red-100"
//         >
//           Logout
//         </li> */}
//       </ul>
//     </div>
//   );
// };

// function AdvocateSidebar() {
//   const [isLogIn, setIsLogIn] = useState(false);
//   const [user, setuser] = useState(null);

//   //fetch lawyer data
//   const fetchlawyer = async () => {
//     const res = await fetch(``);
//     const data = await res.json();
//     setuser(data.data);
//   };

//   useEffect(() => {
//     if (isLogIn && !user) {
//       fetchlawyer();
//     }
//   }, [isLogIn]);
//   return (
    
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       {!isLogIn ? (
//         <button
//           onClick={() => {
//             setIsLogIn(true);
//           }}
//         >
//           Login
//         </button>
//       ) : null}

//       <div className="flex flex-1">
//         {isLogIn && user && (
//           <Sidebar user={user} onLogout={() => setIsLogIn(false)} />
//         )}

//         <div>
//             <Routes>
//           {!isLogIn ? (
//             <Route path="*" element={<div>Please login to continue.</div>} />
//           ) : (
//             <>
            
//               <Route path="/profile" element={<Profile />} />
//               <Route path="/dashboard" element={<AdvocateSidebar/>} />
//               <Route path="/help" element={<Help/>} />
//               <Route path="/notifications" element={<Notification/>} />
//               <Route path="/slots" element={<Slots/>} />
//             </>
//           )}
//           </Routes>
//         </div>
        
//       </div>
//     </div>
//   );
// }

// export default AdvocateSidebar;
