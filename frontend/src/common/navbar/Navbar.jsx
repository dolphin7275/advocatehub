import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Assets from "../../assets/assets.js"; // Ensure this path is correct for your assets

const Navbar = () => {
  const [openC, setOpenC] = useState(false);
  const [openA, setOpenA] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle mobile menu
  const navigate = useNavigate();

  // Function to close all dropdowns/menus
  const closeAllMenus = () => {
    setOpenC(false);
    setOpenA(false);
    setMenuOpen(false);
  };

  return (
    <div className="bg-[#010922] shadow-md px-4 py-3 sm:px-6 md:px-10"> {/* Original Navbar background color */}
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <img className="w-12 h-12 mt-2 ml-2" src={Assets.logoIcon} alt="logo" />
          <img className="h-8 mt-4" src={Assets.logoText} alt="text" />
        </div>

        {/* Hamburger Toggle Button (visible on small screens) */}
        <div className="md:hidden">
          <button
            onClick={() => {
              setMenuOpen(!menuOpen);
              setOpenC(false); // Close dropdowns when opening/closing main menu
              setOpenA(false);
            }}
            className="text-white focus:outline-none"
          >
            {/* Hamburger or Close icon */}
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Links and Buttons - responsive toggle controlled */}
        <div className={`${menuOpen ? "block absolute top-full left-0 w-full bg-[#010922] shadow-lg py-4 md:relative" : "hidden"} md:flex md:items-center md:justify-between flex-col md:flex-row gap-6 md:gap-10 mt-4 md:mt-0`}>
          {/* Nav Links */}
          <ul className="flex flex-col md:flex-row gap-4 text-[#F8F8F5] text-center mb-4 md:mb-0"> {/* Original text color */}
            <li>
              <NavLink
                to="/"
                className="text-xl font-semibold block py-2 px-4 rounded-[10px] hover:bg-[#6E7582] hover:text-[#F8F8F5]" // Original hover colors
                onClick={closeAllMenus}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/advocate-list"
                className="text-xl font-semibold block py-2 px-4 rounded-[10px] hover:bg-[#6E7582] hover:text-[#F8F8F5]" // Original hover colors
                onClick={closeAllMenus}
              >
                Listing
              </NavLink>
            </li>
          </ul>

          {/* Buttons Section */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto px-4 md:px-0">
            {/* Client Dropdown */}
            <div className="relative w-full">
              <button
                onClick={() => {
                  setOpenC(!openC);
                  setOpenA(false);
                }}
                className="bg-[#aad9d9] text-[#010922] text-md font-semibold px-10 py-2 rounded-md hover:scale-105 cursor-pointer w-full text-center" // Original button colors
              >
                CLIENT
              </button>
              {openC && (
                <div className="absolute top-full left-0 mt-2 bg-[#aad9d9] rounded-md shadow-md z-10 w-full sm:w-36 p-2"> {/* Original dropdown background */}
                  <button
                    onClick={() => {
                      navigate("/client/signup");
                      closeAllMenus();
                    }}
                    className="block px-4 py-2 font-semibold text-left hover:bg-[#010922] hover:text-[#F8F8F5] rounded-sm cursor-pointer w-full" // Original hover colors for dropdown items
                  >
                    SignUp
                  </button>
                  <button
                    onClick={() => {
                      navigate("/client/login");
                      closeAllMenus();
                    }}
                    className="block px-4 py-2 font-semibold text-left hover:bg-[#010922] hover:text-[#F8F8F5] rounded-sm cursor-pointer w-full" // Original hover colors for dropdown items
                  >
                    Login
                  </button>
                </div>
              )}
            </div>

            {/* Advocate Dropdown */}
            <div className="relative w-full">
              <button
                onClick={() => {
                  setOpenA(!openA);
                  setOpenC(false);
                }}
                className="bg-[#aad9d9] text-[#010922] text-md font-semibold px-6 py-2 rounded-md cursor-pointer hover:scale-105 w-full text-center" // Original button colors
              >
                ADVOCATE
              </button>
              {openA && (
                <div className="absolute top-full left-0 mt-2 bg-[#aad9d9] shadow-md rounded-md p-3 z-20 w-full sm:w-36 p-2"> {/* Original dropdown background */}
                  <button
                    onClick={() => {
                      navigate("/advocate/signup");
                      closeAllMenus();
                    }}
                    className="block px-4 py-2 font-semibold text-left hover:bg-[#010922] hover:text-[#F8F8F5] rounded-sm cursor-pointer w-full" // Original hover colors for dropdown items
                  >
                    SignUp
                  </button>
                  <button
                    onClick={() => {
                      navigate("/advocate/login");
                      closeAllMenus();
                    }}
                    className="block px-4 py-2 font-semibold text-left hover:bg-[#010922] hover:text-[#F8F8F5] rounded-sm cursor-pointer w-full" // Original hover colors for dropdown items
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;