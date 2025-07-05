import React from 'react';
import { Link } from 'react-router';

const Hero = () => {
  return (
    <section id='home' name='home' className="bg-[#6E7582] py-18 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">

        {/* Left - Content */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-6xl text-center font-bold leading-tight text-[#8C2B32] drop-shadow">
            Justice Is Just a Click Away
          </h1>

          <p className="mt-4 text-center text-lg text-[#fff0d7]">
            Talk to verified lawyers anytime, anywhere.
          </p>
          <p className="mt-2 text-center text-lg text-[#fff0d7] pb-3">
            No queues, No complications — just real legal help, instantly.
          </p>

          <div className="mt-6 space-y-3">
            {[
              '100% Verified Advocates Across India',
              'Chat or Video Call Instantly',
              'Support for Civil, Criminal, Family & More',
            ].map((item, index) => (
              <div key={index} className="flex items-start ml-8 gap-2 text-[#fff0d7] text-base">
                <span className="text-[#8C2B32] mt-1">✔</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col justify-center sm:flex-row gap-4">
            <button className="bg-[#8C2B32] hover:bg-[#621E23] text-[#fff0d7] cursor-pointer px-6 py-3 rounded-xl text-lg font-semibold transition-all shadow-md">
              <Link to = '/advocate-list'>
                Book a Session
              </Link>
            </button>
          </div>
        </div>

        {/* Right - Illustration */}
        <div className="flex-1 hidden md:flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
            alt="Legal Help"
            className="w-full max-w-sm object-contain drop-shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
