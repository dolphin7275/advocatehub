import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Query:', formData);
    toast.success('Your message has been sent!');
    setFormData({ name: '', email: '', contact: '', subject: '', message: '' });
  };

  return (
    <section id='contact-us' name='contact-us' className='w-[100%] bg-[#6E7582] p-10'>
      <div className="max-w-xl mx-auto p-6 rounded-lg">
        <h2 className="text-4xl font-bold mb-4 text-[#8c2b32] text-center">Contact Us</h2>
        
        <p className="text-[#F8F8F5] text-lg mb-12 text-center">
          Facing issues with our advocates?
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full px-4 py-2 border bg-[#bbbbbb] rounded focus:outline-none hover:bg-white"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full px-4 py-2 border bg-[#bbbbbb] rounded focus:outline-none focus:bg-white"
          />
          <input
            type="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Your Contact no."
            required
            className="w-full px-4 py-2 border bg-[#bbbbbb] rounded focus:outline-none focus:bg-white"
          />
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full px-4 py-2 border bg-[#bbbbbb] rounded focus:outline-none focus:bg-white"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="4"
            required
            className="w-full px-4 py-2 border bg-[#bbbbbb] rounded focus:outline-none focus:bg-white"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-[#8c2b32] text-[#fff0d7] py-2 rounded hover:bg-[#621E23] cursor-pointer"
          > 
            Send Message
          </button>
        </form>
      </div>
      
      {/* Toast Notification */}
      <ToastContainer position="top-center" autoClose={3000} />
    </section>
  )
}

export default ContactUs
