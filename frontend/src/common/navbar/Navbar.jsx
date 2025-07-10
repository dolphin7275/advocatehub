import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Assets from "../../assets/assets.js";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [openC, setOpenC] = useState(false);
  const [openA, setOpenA] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-row justify-between items-center bg-[#1A1F2B] shadow-md p-4">
      
      {/* Logo */}
      <div className="flex flex-row gap-2 cursor-pointer">
        {/* <img className="w-12 h-12 mt-2 ml-6" src={Assets.logoIcon} alt="logo" /> */}
        {/* <img className="h-8 mt-4" src={Assets.logoText} alt="text" /> */}
      </div>


      {/* Links */}
      <div>
        <ul className="flex flex-row gap-10 mr-6 text-[#F8F8F5]">
          <li>
            <NavLink to="/" className='text-xl font-semibold p-3 rounded-[10px] hover:bg-[#6E7582]'> Home </NavLink> 
          </li>
          <li>
            <NavLink to="/advocate-list" className='text-xl font-semibold p-3 rounded-[10px] hover:bg-[#6E7582]'> Listing </NavLink>
          </li>
        </ul>
      </div>




      {/* Logins and Signups */}
      <div className="flex flex-row gap-8 p-4">
        {/* Client Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpenC(!openC)}
            className="bg-[#C4A552] text-[#F8F8F5] text-md font-semibold px-10 py-2 rounded-md hover:scale-105 cursor-pointer"
          >
            CLIENT
          </button>

          {openC && (
            <div className="absolute top-12 left-0 px-6 bg-[#F8F8F5] shadow-md rounded-md p-3 z-20">
              <button
                onClick={() => {
                  navigate("/client/signup");
                  setOpenC(false);
                }}
                className="block w-full text-left px-4 py-2 font-semibold hover:bg-[#C4A552] hover:text-[#F8F8F5] rounded-sm cursor-pointer"
              >
                SignUp
              </button>
              <button
                onClick={() => {
                  navigate("/client/login");
                  setOpenC(false);
                }}
                className="block w-full text-left px-4 py-2 font-semibold hover:bg-[#C4A552] hover:text-[#F8F8F5] rounded-sm cursor-pointer"
              >
                Login
              </button>
            </div>
          )}
        </div>

        {/* Advocate Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpenA(!openA)}
            className="bg-[#C4A552] text-[#F8F8F5] text-md font-semibold px-6 py-2 rounded-md cursor-pointer hover:scale-105"
          >
            ADVOCATE
          </button>

          {openA && (
            <div className="absolute top-12 left-0 px-5 bg-[#F8F8F5] shadow-md rounded-md p-3 z-20">
              <button
                onClick={() => {
                  navigate("/advocate/signup");
                  setOpenA(false);
                }}
                className="block w-full font-semibold text-left px-4 py-2 hover:bg-[#C4A552] hover:text-[#F8F8F5] rounded-sm cursor-pointer"
              >
                SignUp
              </button>
              <button
                onClick={() => {
                  navigate("/advocate/login");
                  setOpenA(false);
                }}
                className="block w-full font-semibold text-left px-4 py-2 hover:bg-[#C4A552] hover:text-[#F8F8F5] rounded-sm cursor-pointer"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

