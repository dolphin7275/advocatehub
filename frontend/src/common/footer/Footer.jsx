import React from 'react'
import Assets from '../../assets/assets'
import { Link } from 'react-router'

const Footer = () => {
  return (
    <footer className="bg-[#1A1F2B] pt-10 pb-2 px-6 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8 py-4 text-lg">
        
        {/* Left Column - Logo & Quote */}
        <div className="flex-1 space-y-4">
          <img
            src={Assets.logo}
            alt="Advocate Hub Logo"
            className="w-78"
          />
          <p className="text-[#C4A552] text-sm text-center leading-snug">
            Everything is law — or nothing.
            We turn logic into winning arguments.
          </p>
        </div>

        {/* Center Column - Navigation */}
        <div className="flex-3 flex flex-col items-center justify-start space-y-6 text-left">
          <h2 className="font-bold text-xl text-[#C4A552]">A Trusted Law Firm</h2>
          <ul className="space-y-2 text-lg text-[#ceb571] text-center">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">Featured Lawyers</Link></li>
            <li><Link to="/">Testimonials</Link></li>
            <li><Link to="/">Contact Us</Link></li>
          </ul>
          
          <div className="h-px w-69 bg-neutral-600" />
          <p className="text-[#F8F8F5] text-sm">
            © 2025 All Rights Reserved
          </p>
        </div>

        {/* Right Column - Contact Info */}
        <div className="flex flex-col justify-center space-y-5">
          <div className='flex flex-row gap-2'>
            <h3 className="font-semibold text-[#ceb571]">Call us at: </h3>
            <h3 className="text-[#F8F8F5]">0309-XXXXXX</h3>
          </div>
          <div className='flex flex-row gap-2'>
            <h3 className="font-semibold text-[#ceb571]">Email: </h3>
            <h3 className="text-[#F8F8F5]">contact@advocatehub.com</h3>
          </div>
          <div className='flex flex-row gap-2'>
            <h3 className="font-semibold text-[#ceb571]">Support Hours: </h3>
            <h3 className="text-[#F8F8F5]">10 AM to 5 PM</h3>
          </div>  
        </div>

      </div>
    </footer>
  )
}

export default Footer
