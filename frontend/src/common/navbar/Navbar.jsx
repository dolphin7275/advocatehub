import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Assets from "../../assets/assets.js";

const Navbar = () => {
  const [openC, setOpenC] = useState(false);
  const [openA, setOpenA] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const closeAllMenus = () => {
    setOpenC(false);
    setOpenA(false);
    setMenuOpen(false);
  };

  return (
    <div className="bg-[#010922] shadow-md px-4 py-3 sm:px-6 lg:px-10 relative z-50">
      <div className="flex justify-between items-center">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            navigate("/");
            closeAllMenus();
          }}
        >
          <img className="w-12 h-12 mt-2 ml-2" src={Assets.logoIcon} alt="logo" />
          <img className="h-8 mt-4" src={Assets.logoText} alt="text" />
        </div>

        {/* Hamburger Toggle Button (visible on screens smaller than lg) */}
        <div className="lg:hidden">
          <button
            onClick={() => {
              setMenuOpen(!menuOpen);
              setOpenC(false);
              setOpenA(false);
            }}
            className="text-white focus:outline-none p-2 rounded-md hover:bg-[#6E7582]"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Main navigation and buttons container */}
        <div
          className={`${
            menuOpen
              ? "block absolute top-full left-0 w-full bg-[#010922] shadow-lg py-4 flex flex-col items-center gap-4 mt-4"
              : "hidden"
          } lg:flex lg:items-center lg:flex-grow lg:justify-end lg:gap-10 mt-4 sm:mt-0 lg:pr-10`}
        >
          {/* Nav Links (Home, Listing) */}
          <ul className="flex flex-col lg:flex-row lg:gap-6 text-[#F8F8F5] text-center w-full lg:w-auto mb-4 lg:mb-0">
            <li>
              <NavLink
                to="/"
                className="text-xl font-semibold block py-2 px-4 rounded-[10px] hover:bg-[#6E7582] hover:text-[#F8F8F5] transition-colors duration-200"
                onClick={closeAllMenus}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/advocate-list"
                className="text-xl font-semibold block py-2 px-4 rounded-[10px] hover:bg-[#6E7582] hover:text-[#F8F8F5] transition-colors duration-200"
                onClick={closeAllMenus}
              >
                Listing
              </NavLink>
            </li>
          </ul>

          {/* Buttons Section (CLIENT, ADVOCATE) */}
          {/* Changed this div:
              - `flex-col`: always stacked by default (for mobile/tablet).
              - `lg:flex-row`: only switches to horizontal at 'lg' breakpoint.
              - `gap-3`: for vertical spacing on mobile/tablet.
              - `lg:gap-4`: for horizontal spacing on desktop.
          */}
          <div className="flex flex-col gap-3 w-full lg:w-auto px-4 lg:px-0 justify-center lg:flex-row lg:gap-4">
            {/* Client Dropdown */}
            <div className="relative w-full sm:w-auto">
              <button
                onClick={() => {
                  setOpenC(!openC);
                  setOpenA(false);
                }}
                className="bg-[#aad9d9] text-[#010922] text-md font-semibold px-10 py-2 rounded-md hover:scale-105 transition-transform duration-200 cursor-pointer w-full text-center"
              >
                CLIENT
              </button>
              {openC && (
                <div className="absolute top-full left-0 mt-2 bg-[#aad9d9] rounded-md shadow-lg z-10 w-full sm:w-36 p-2">
                  <button
                    onClick={() => {
                      navigate("/client/signup");
                      closeAllMenus();
                    }}
                    className="block px-4 py-2 font-semibold text-left text-[#010922] hover:bg-[#010922] hover:text-[#F8F8F5] rounded-sm cursor-pointer w-full transition-colors duration-200"
                  >
                    SignUp
                  </button>
                  <button
                    onClick={() => {
                      navigate("/client/login");
                      closeAllMenus();
                    }}
                    className="block px-4 py-2 font-semibold text-left text-[#010922] hover:bg-[#010922] hover:text-[#F8F8F5] rounded-sm cursor-pointer w-full transition-colors duration-200"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>

            {/* Advocate Dropdown */}
            <div className="relative w-full sm:w-auto">
              <button
                onClick={() => {
                  setOpenA(!openA);
                  setOpenC(false);
                }}
                className="bg-[#aad9d9] text-[#010922] text-md font-semibold px-6 py-2 rounded-md cursor-pointer hover:scale-105 transition-transform duration-200 w-full text-center"
              >
                ADVOCATE
              </button>
              {openA && (
                <div className="absolute top-full left-0 mt-2 bg-[#aad9d9] shadow-lg rounded-md p-2 z-20 w-full sm:w-36">
                  <button
                    onClick={() => {
                      navigate("/advocate/signup");
                      closeAllMenus();
                    }}
                    className="block px-4 py-2 font-semibold text-left text-[#010922] hover:bg-[#010922] hover:text-[#F8F8F5] rounded-sm cursor-pointer w-full transition-colors duration-200"
                  >
                    SignUp
                  </button>
                  <button
                    onClick={() => {
                      navigate("/advocate/login");
                      closeAllMenus();
                    }}
                    className="block px-4 py-2 font-semibold text-left text-[#010922] hover:bg-[#010922] hover:text-[#F8F8F5] rounded-sm cursor-pointer w-full transition-colors duration-200"
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