import React, { useState } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
  FaSignOutAlt,
  FaSyncAlt,
} from "react-icons/fa";
import { MdPending } from "react-icons/md";

const AdminDashboard = () => {
  const [activeLink, setActiveLink] = useState("All Profiles");

  const profiles = [
    {
      no: 1,
      profileId: "#L-0101",
      name: "Ashan",
      email: "ashan@gmail.com",
      cnic: "35978-0667999-0",
      status: "Pending",
      signupDate: "9 June 2025",
    },
    {
      no: 2,
      profileId: "#L-0101",
      name: "Ashan",
      email: "ashan@gmail.com",
      cnic: "35978-0667999-0",
      status: "Pending",
      signupDate: "9 June 2025",
    },
    {
      no: 3,
      profileId: "#L-0101",
      name: "Ashan",
      email: "ashan@gmail.com",
      cnic: "35978-0667999-0",
      status: "Approved",
      signupDate: "9 June 2025",
    },
    {
      no: 4,
      profileId: "#L-0101",
      name: "Ashan",
      email: "ashan@gmail.com",
      cnic: "35978-0667999-0",
      status: "Rejected",
      signupDate: "9 June 2025",
    },
    {
      no: 5,
      profileId: "#L-0101",
      name: "Ashan",
      email: "ashan@gmail.com",
      cnic: "35978-0667999-0",
      status: "Pending",
      signupDate: "9 June 2025",
    },
    {
      no: 6,
      profileId: "#L-0101",
      name: "Ashan",
      email: "ashan@gmail.com",
      cnic: "35978-0667999-0",
      status: "Pending",
      signupDate: "9 June 2025",
    },
    {
      no: 7,
      profileId: "#L-0101",
      name: "Ashan",
      email: "ashan@gmail.com",
      cnic: "35978-0667999-0",
      status: "Pending",
      signupDate: "9 June 2025",
    },
  ];

  const getFilteredProfiles = () => {
    switch (activeLink) {
      case "Pending Profiles":
        return profiles.filter(
          (profile) => profile.status.toLowerCase() === "pending"
        );
      case "Approved Profiles":
        return profiles.filter(
          (profile) => profile.status.toLowerCase() === "approved"
        );
      case "Rejected Profiles":
        return profiles.filter(
          (profile) => profile.status.toLowerCase() === "rejected"
        );
      default:
        return profiles;
    }
  };

  const filteredProfiles = getFilteredProfiles();

  return (
    <div className="min-h-screen text-sm bg-[#F4EADE]">
      <header className="bg-gradient-to-r from-[#C9A66C] to-[#C9A66C] px-6 py-4 rounded-b-2xl shadow-md">
        <div className="max-w-full flex items-center justify-between">
          <div className="flex items-center space-x-20">
            <h1 className="text-2xl font-extrabold text-[#0e1a2b]">
              ADVOCATE<span className="text-yellow-500">HUB</span>
            </h1>
            <nav className="flex space-x-20">
              <a href="#home" className="text-lg font-bold text-[#0e1a2b]">
                Home
              </a>
              <a href="#about" className="text-lg font-bold text-[#0e1a2b]">
                About
              </a>
            </nav>

            <div className="relative ml-4">
              <input
                type="text"
                placeholder="Search by Lawyers"
                className="pl-5 pr-10 py-2 w-[280px] rounded-md border border-gray-400 bg-[#fdf7ed] text-sm text-gray-800 shadow-inner"
              />
              <button className="absolute right-1 top-[50%] translate-y-[-50%] px-3 bg-white border-l border-gray-400 rounded-md h-[80%] flex items-center justify-center">
                <FaSearch className="text-black" />
              </button>
            </div>
          </div>

          <button className="ml-6 bg-[#0e1a2b] text-white px-4 py-2 text-sm rounded-md shadow-md hover:bg-[#1a2a3b]">
            Refresh
          </button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row bg-[#f5e9dc] min-h-screen">
        <aside className="w-full md:w-60 bg-[#0D163D] text-white p-4 shadow-lg space-y-4 mt-2 md:mt-4">
          <ul className="space-y-8 pl-2">
            <li>
              <button
                onClick={() => setActiveLink("All Profiles")}
                className="flex items-center gap-2 px-2 py-2 rounded hover:bg-[#1e2c3c] transition"
              >
                <span>All Profiles</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveLink("Pending Profiles")}
                className="flex items-center gap-2"
              >
                <span>Pending Profiles</span>
                <MdPending className="text-yellow-400" />
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveLink("Approved Profiles")}
                className="flex items-center gap-2"
              >
                <span>Approved Profiles</span>
                <FaCheckCircle className="text-green-400" />
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveLink("Rejected Profiles")}
                className="flex items-center gap-2"
              >
                <span>Rejected Profiles</span>
                <FaTimesCircle className="text-red-500" />
              </button>
            </li>
            <li>
              <button className="flex items-center gap-2">
                <span>Logout</span>
                <FaSignOutAlt className="text-blue-400" />
              </button>
            </li>
          </ul>
        </aside>

        <main className="flex-1 p-4">
          <div className="bg-white shadow-md overflow-hidden">
            <div className="max-h-[400px] overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200 text-xs">
                <thead className="bg-[#0D163D] text-white sticky top-0">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium uppercase">
                      No
                    </th>
                    <th className="px-3 py-2 text-left font-medium uppercase">
                      Profile ID
                    </th>
                    <th className="px-3 py-2 text-left font-medium uppercase">
                      Name
                    </th>
                    <th className="px-3 py-2 text-left font-medium uppercase">
                      Email
                    </th>
                    <th className="px-3 py-2 text-left font-medium uppercase">
                      CNIC
                    </th>
                    <th className="px-3 py-2 text-left font-medium uppercase">
                      Status
                    </th>
                    <th className="px-3 py-2 text-left font-medium uppercase">
                      Signup Date
                    </th>
                    <th className="px-3 py-2 text-left font-medium uppercase">
                      Profile Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProfiles.map((profile) => (
                    <tr key={profile.no} className="hover:bg-gray-50">
                      <td className="px-3 py-2 whitespace-nowrap text-gray-900">
                        {profile.no}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-gray-600">
                        {profile.profileId}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-gray-600">
                        {profile.name}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-gray-600">
                        {profile.email}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-gray-600">
                        {profile.cnic}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 text-[10px] font-semibold rounded-full
                            ${
                              profile.status === "Pending"
                                ? " text-black-800"
                                : ""
                            }
                            ${
                              profile.status === "Approved"
                                ? "text-black-800"
                                : ""
                            }
                            ${
                              profile.status === "Rejected"
                                ? "text-black-800"
                                : ""
                            }`}
                        >
                          {profile.status === "Pending" && (
                            <>
                              <MdPending className="text-yellow-800 text-[12px]" />
                              Pending
                            </>
                          )}
                          {profile.status === "Approved" && (
                            <>
                              <FaCheckCircle className="text-green-800 text-[12px]" />
                              Approved
                            </>
                          )}
                          {profile.status === "Rejected" && (
                            <>
                              <FaTimesCircle className="text-red-800 text-[12px]" />
                              Rejected
                            </>
                          )}
                        </span>
                      </td>

                      <td className="px-3 py-2 whitespace-nowrap text-gray-600">
                        {profile.signupDate}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap font-medium text-xs">
                        {profile.status === "Approved" && (
                          <span className="font-semibold">Yes</span>
                        )}
                        {profile.status === "Rejected" && (
                          <span className="font-semibold">No</span>
                        )}
                        {profile.status === "Pending" && (
                          <span className="font-semibold flex items-center gap-1">
                            Review
                            <FaSearch className="inline" />
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
