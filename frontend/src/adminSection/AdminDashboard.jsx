import React, { useState, useEffect } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdPending } from "react-icons/md";
import { useNavigate, Outlet } from "react-router-dom";
import api from "../apiCalls/axios";


const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("All Profiles");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoutConfirm,setLogoutConfirm]=useState(false);
  const [lawyers, setLawyers] = useState([]);

  const fetchAllLawyers = async () => {
    try {
      const res = await api.get("/userapi/all-lawyers/");
      setLawyers(res.data);
      console.log("💡 API Lawyer Response:", res.data);
    } catch (err) {
      console.error("Failed to fetch lawyers", err);
    }
  };


  const getFilteredProfiles = () => {
    switch (activeLink) {
      case "Pending Profiles":
        return lawyers.filter(
          (profile) => profile.profile_status?.toLowerCase() === "pending"
        );
      case "Approved Profiles":
        return lawyers.filter(
          (profile) => profile.profile_status?.toLowerCase() === "approved"
        );
      case "Rejected Profiles":
        return lawyers.filter(
          (profile) => profile.profile_status?.toLowerCase() === "rejected"
        );
      default:
        return lawyers;
    }
  };

  const handleReviewClick = (profile) => {
    navigate(`/admin/info`, { state: { profile } });
  };

  useEffect(() => {
    fetchAllLawyers();
    
  }, []);

  const filteredProfiles = getFilteredProfiles();

  return (
    <div className="relative min-h-screen text-base">
      {/* Toggle Button */}
      <button
        className="text-white absolute top-4 left-4 z-50"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`absolute top-0 left-0 z-40 bg-[#0D163D] w-64 h-full text-white p-4 shadow-lg space-y-4
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex justify-end">
          <button onClick={() => setSidebarOpen(false)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <ul className="space-y-6 pl-2 mt-2">
          <li>
            <button onClick={() => { setActiveLink("All Profiles"); setSidebarOpen(false); }} className="flex items-center gap-2 px-2 py-2 rounded hover:bg-[#1e2c3c] transition">
              <span>All Profiles</span>
            </button>
          </li>
          <li>
            <button onClick={() => { setActiveLink("Pending Profiles"); setSidebarOpen(false); }} className="flex items-center gap-2">
              <span>Pending Profiles</span>
              <MdPending className="text-yellow-400" />
            </button>
          </li>
          <li>
            <button onClick={() => { setActiveLink("Approved Profiles"); setSidebarOpen(false); }} className="flex items-center gap-2">
              <span>Approved Profiles</span>
              <FaCheckCircle className="text-green-400" />
            </button>
          </li>
          <li>
            <button onClick={() => { setActiveLink("Rejected Profiles"); setSidebarOpen(false); }} className="flex items-center gap-2">
              <span>Rejected Profiles</span>
              <FaTimesCircle className="text-red-500" />
            </button>
          </li>
          <li>
            <button className="flex items-center gap-2" onClick={() => setLogoutConfirm(true)}>
              <span>Logout</span>
              <FaSignOutAlt className="text-blue-400" />
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <main className="pt-12 pl-6 pr-6 bg-[#17245c] min-h-screen">
          <div className="bg-white shadow-md overflow-hidden">
            <div className="max-h-[400px] overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200 text-xs">
                <thead className="bg-[#141f52] text-white sticky top-0">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium uppercase">No</th>
                    <th className="px-3 py-2 text-left font-medium uppercase">Profile ID</th>
                    <th className="px-3 py-2 text-left font-medium uppercase">Name</th>
                    <th className="px-3 py-2 text-left font-medium uppercase">Email</th>
                    <th className="px-3 py-2 text-left font-medium uppercase">CNIC</th>
                    <th className="px-3 py-2 text-left font-medium uppercase">Status</th>
                    <th className="px-3 py-2 text-left font-medium uppercase">Signup Date</th>
                    <th className="px-3 py-2 text-left font-medium uppercase">Profile Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProfiles.map((profile, index) => {
                    const status = profile.profile_status?.toLowerCase();
                    return (
                      <tr key={profile.id || index} className="hover:bg-gray-50">
                        <td className="px-3 py-2 whitespace-nowrap text-gray-900">{index + 1}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-gray-600">Adv#{100+profile.id}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-gray-600">{profile.user_name}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-gray-600">{profile.user_email}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-gray-600">{profile.cnic}</td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-semibold rounded-full text-black">
                            {status === "pending" && (<><MdPending className="text-yellow-800 text-[12px]" />Pending</>)}
                            {status === "approved" && (<><FaCheckCircle className="text-green-800 text-[12px]" />Approved</>)}
                            {status === "rejected" && (<><FaTimesCircle className="text-red-800 text-[12px]" />Rejected</>)}
                          </span>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-gray-600">
                          {profile.signup_date?.slice(0, 10)}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap font-medium text-xs">
                          {status === "approved" && <span className="font-semibold">Yes</span>}
                          {status === "rejected" && <span className="font-semibold">No</span>}
                          {status === "pending" && (
                            <span
                              className="font-semibold flex items-center gap-1 cursor-pointer text-blue-600 hover:underline"
                              onClick={() => handleReviewClick(profile)}
                            >
                              Review
                              <FaSearch className="inline" />
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
        <Outlet />
      </div>
      {logoutConfirm && (
        <LogoutModal
          onCancel={() => setLogoutConfirm(false)}
          onConfirm={() => {
            localStorage.clear();
            navigate("/admin/login");
          }}
        />
      )}
    </div>
  );
};
const LogoutModal = ({ onCancel, onConfirm }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
      <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
      <p>Are you sure you want to logout?</p>
      <div className="mt-6 flex justify-center gap-4">
        <button className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400" onClick={onCancel}>Cancel</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={onConfirm}>Logout</button>
      </div>
    </div>
  </div>
);

export default AdminDashboard;


// import React, { useState } from "react";
// import {
//   FaCheckCircle,
//   FaTimesCircle,
//   FaSearch,
//   FaSignOutAlt,
//   FaSyncAlt,
// } from "react-icons/fa";
// import { MdPending } from "react-icons/md";
// import { useNavigate } from 'react-router-dom';
// import { Outlet } from "react-router-dom";


// const AdminDashboard = () => {

//   const navigate = useNavigate();

//   const [activeLink, setActiveLink] = useState("All Profiles");
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const profiles = [
//     {
//       no: 1,
//       profileId: "#L-0101",
//       name: "Ashan",
//       email: "ashan@gmail.com",
//       cnic: "35978-0667999-0",
//       status: "Pending",
//       signupDate: "9 June 2025",
//     },
//     {
//       no: 2,
//       profileId: "#L-0101",
//       name: "Ashan",
//       email: "ashan@gmail.com",
//       cnic: "35978-0667999-0",
//       status: "Pending",
//       signupDate: "9 June 2025",
//     },
//     {
//       no: 3,
//       profileId: "#L-0101",
//       name: "Ashan",
//       email: "ashan@gmail.com",
//       cnic: "35978-0667999-0",
//       status: "Approved",
//       signupDate: "9 June 2025",
//     },
//     {
//       no: 4,
//       profileId: "#L-0101",
//       name: "Ashan",
//       email: "ashan@gmail.com",
//       cnic: "35978-0667999-0",
//       status: "Rejected",
//       signupDate: "9 June 2025",
//     },
//     {
//       no: 5,
//       profileId: "#L-0101",
//       name: "Ashan",
//       email: "ashan@gmail.com",
//       cnic: "35978-0667999-0",
//       status: "Pending",
//       signupDate: "9 June 2025",
//     },
//     {
//       no: 6,
//       profileId: "#L-0101",
//       name: "Ashan",
//       email: "ashan@gmail.com",
//       cnic: "35978-0667999-0",
//       status: "Pending",
//       signupDate: "9 June 2025",
//     },
//     {
//       no: 7,
//       profileId: "#L-0101",
//       name: "Ashan",
//       email: "ashan@gmail.com",
//       cnic: "35978-0667999-0",
//       status: "Pending",
//       signupDate: "9 June 2025",
//     },
//   ];

//   const getFilteredProfiles = () => {
//     switch (activeLink) {
//       case "Pending Profiles":
//         return profiles.filter(
//           (profile) => profile.status.toLowerCase() === "pending"
//         );
//       case "Approved Profiles":
//         return profiles.filter(
//           (profile) => profile.status.toLowerCase() === "approved"
//         );
//       case "Rejected Profiles":
//         return profiles.filter(
//           (profile) => profile.status.toLowerCase() === "rejected"
//         );
//       default:
//         return profiles;
//     }
//   };

//   const filteredProfiles = getFilteredProfiles();

  

//   return (
//     <div className="text-base">

//       {/* ⭐ Hamburger Button for all screens */}
//       <button
//         className="text-white absolute z-50"
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//       >
//         <svg
//           className="w-8 h-8"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
//         </svg>
//       </button>
      
//       <div className="flex flex-col md:flex-row bg-[#0D163D] h-auto">
//         {/* <aside className="w-full md:w-60 text-white p-4 shadow-lg space-y-4 mt-2 md:mt-4"> */}
//         {/* ⭐ Sidebar (collapsible on all screens) */}
//         {/* ⭐ Sidebar (collapsible on all screens) */}
//         <aside
//           className={`
//             fixed z-40 bg-[#0D163D] w-64 h-full text-white p-4 shadow-lg space-y-4
//             transition-transform duration-300 ease-in-out
//             ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
//           `}
//         >
//           {/* ⭐ Close button inside sidebar */}
//           <div className="flex justify-end mb-4">
//             <button onClick={() => setSidebarOpen(false)} className="text-white">
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
//           <ul className="space-y-8 pl-2">
//             <li>
//               <button
//                 onClick={() => setActiveLink("All Profiles")}
//                 className="flex items-center gap-2 px-2 py-2 rounded hover:bg-[#1e2c3c] transition"
//               >
//                 <span>All Profiles</span>
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setActiveLink("Pending Profiles")}
//                 className="flex items-center gap-2"
//               >
//                 <span>Pending Profiles</span>
//                 <MdPending className="text-yellow-400" />
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setActiveLink("Approved Profiles")}
//                 className="flex items-center gap-2"
//               >
//                 <span>Approved Profiles</span>
//                 <FaCheckCircle className="text-green-400" />
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setActiveLink("Rejected Profiles")}
//                 className="flex items-center gap-2"
//               >
//                 <span>Rejected Profiles</span>
//                 <FaTimesCircle className="text-red-500" />
//               </button>
//             </li>
//             <li>
//               <button className="flex items-center gap-2">
//                 <span>Logout</span>
//                 <FaSignOutAlt className="text-blue-400" />
//               </button>
//             </li>
//           </ul>
//         </aside>

//         <main className={`transition-all duration-300 bg-[#c9a66c] p-4 ${sidebarOpen ? 'md:ml-64' : 'md:ml-0'}`}>
//           <div className="bg-white shadow-md overflow-hidden">
//             <div className="max-h-[400px] overflow-y-auto">
//               <table className="min-w-full divide-y divide-gray-200 text-xs">
//                 <thead className="bg-[#0D163D] text-white sticky top-0">
//                   <tr>
//                     <th className="px-3 py-2 text-left font-medium uppercase">No</th>
//                     <th className="px-3 py-2 text-left font-medium uppercase">Profile ID</th>
//                     <th className="px-3 py-2 text-left font-medium uppercase">Name</th>
//                     <th className="px-3 py-2 text-left font-medium uppercase">Email</th>
//                     <th className="px-3 py-2 text-left font-medium uppercase">CNIC</th>
//                     <th className="px-3 py-2 text-left font-medium uppercase">Status</th>
//                     <th className="px-3 py-2 text-left font-medium uppercase">Signup Date</th>
//                     <th className="px-3 py-2 text-left font-medium uppercase">Profile Action</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredProfiles.map((profile) => (
//                     <tr key={profile.no} className="hover:bg-gray-50">
//                       <td className="px-3 py-2 whitespace-nowrap text-gray-900">{profile.no}</td>
//                       <td className="px-3 py-2 whitespace-nowrap text-gray-600">{profile.profileId}</td>
//                       <td className="px-3 py-2 whitespace-nowrap text-gray-600">{profile.name}</td>
//                       <td className="px-3 py-2 whitespace-nowrap text-gray-600">{profile.email}</td>
//                       <td className="px-3 py-2 whitespace-nowrap text-gray-600">{profile.cnic}</td>
//                       <td className="px-3 py-2 whitespace-nowrap">
//                         <span className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-semibold rounded-full text-black">
//                           {profile.status === "Pending" && (<><MdPending className="text-yellow-800 text-[12px]" />Pending</>)}
//                           {profile.status === "Approved" && (<><FaCheckCircle className="text-green-800 text-[12px]" />Approved</>)}
//                           {profile.status === "Rejected" && (<><FaTimesCircle className="text-red-800 text-[12px]" />Rejected</>)}
//                         </span>
//                       </td>
//                       <td className="px-3 py-2 whitespace-nowrap text-gray-600">{profile.signupDate}</td>
//                       <td className="px-3 py-2 whitespace-nowrap font-medium text-xs">
//                         {profile.status === "Approved" && <span className="font-semibold">Yes</span>}
//                         {profile.status === "Rejected" && <span className="font-semibold">No</span>}
//                         {profile.status === "Pending" && (
//                           <span
//                             className="font-semibold flex items-center gap-1 cursor-pointer text-blue-600 hover:underline"
//                             onClick={() => navigate('/admin/dashboard/info', { state: { profile } })}
//                           >
//                             Review
//                             <FaSearch className="inline" />
//                           </span>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </main>


//         {/* <main className="flex-1 p-4 bg-[#c9a66c]">
//           <div className="bg-white shadow-md overflow-hidden">
//             <div className="max-h-[400px] overflow-y-auto">
//               <table className="min-w-full divide-y divide-gray-200 text-xs">
//                 <thead className="bg-[#0D163D] text-white sticky top-0">
//                   <tr>
//                     <th className="px-3 py-2 text-left font-medium uppercase">
//                       No
//                     </th>
//                     <th className="px-3 py-2 text-left font-medium uppercase">
//                       Profile ID
//                     </th>
//                     <th className="px-3 py-2 text-left font-medium uppercase">
//                       Name
//                     </th>
//                     <th className="px-3 py-2 text-left font-medium uppercase">
//                       Email
//                     </th>
//                     <th className="px-3 py-2 text-left font-medium uppercase">
//                       CNIC
//                     </th>
//                     <th className="px-3 py-2 text-left font-medium uppercase">
//                       Status
//                     </th>
//                     <th className="px-3 py-2 text-left font-medium uppercase">
//                       Signup Date
//                     </th>
//                     <th className="px-3 py-2 text-left font-medium uppercase">
//                       Profile Action
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredProfiles.map((profile) => (
//                     <tr key={profile.no} className="hover:bg-gray-50">
//                       <td className="px-3 py-2 whitespace-nowrap text-gray-900">
//                         {profile.no}
//                       </td>
//                       <td className="px-3 py-2 whitespace-nowrap text-gray-600">
//                         {profile.profileId}
//                       </td>
//                       <td className="px-3 py-2 whitespace-nowrap text-gray-600">
//                         {profile.name}
//                       </td>
//                       <td className="px-3 py-2 whitespace-nowrap text-gray-600">
//                         {profile.email}
//                       </td>
//                       <td className="px-3 py-2 whitespace-nowrap text-gray-600">
//                         {profile.cnic}
//                       </td>
//                       <td className="px-3 py-2 whitespace-nowrap">
//                         <span
//                           className={`inline-flex items-center gap-1 px-2 py-1 text-[10px] font-semibold rounded-full
//                             ${
//                               profile.status === "Pending"
//                                 ? " text-black-800"
//                                 : ""
//                             }
//                             ${
//                               profile.status === "Approved"
//                                 ? "text-black-800"
//                                 : ""
//                             }
//                             ${
//                               profile.status === "Rejected"
//                                 ? "text-black-800"
//                                 : ""
//                             }`}
//                         >
//                           {profile.status === "Pending" && (
//                             <>
//                               <MdPending className="text-yellow-800 text-[12px]" />
//                               Pending
//                             </>
//                           )}
//                           {profile.status === "Approved" && (
//                             <>
//                               <FaCheckCircle className="text-green-800 text-[12px]" />
//                               Approved
//                             </>
//                           )}
//                           {profile.status === "Rejected" && (
//                             <>
//                               <FaTimesCircle className="text-red-800 text-[12px]" />
//                               Rejected
//                             </>
//                           )}
//                         </span>
//                       </td>

//                       <td className="px-3 py-2 whitespace-nowrap text-gray-600">
//                         {profile.signupDate}
//                       </td>
//                       <td className="px-3 py-2 whitespace-nowrap font-medium text-xs">
//                         {profile.status === "Approved" && (
//                           <span className="font-semibold">Yes</span>
//                         )}
//                         {profile.status === "Rejected" && (
//                           <span className="font-semibold">No</span>
//                         )}
//                         {profile.status === "Pending" && (
//                           <span 
//                             className="font-semibold flex items-center gap-1"
//                               onClick={() => navigate('/admin/dashboard/info', { state: { profile } })}
//                           >
//                             Review
//                             <FaSearch className="inline" />
//                           </span>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </main> */}
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
