import React from 'react'
import Assets from '../../assets/assets';

const Practice = () => {

  const items = [
    { icon: Assets.propertyCases, title: "Property Cases" },
    { icon: Assets.criminalDefense, title: "Criminal Defense" },
    { icon: Assets.spousalIssues, title: "Spousal Issues" },
    { icon: Assets.legalDefense, title: "Legal Cases" },
    { icon: Assets.businessLaw, title: "Business law" },
  ];


  return (
    <section className="bg-[#f6f0e8] py-16 px-4 text-center font-sans">
      <h2 className="text-2xl md:text-3xl text-gray-900 mb-2 font-serif">
        Our Areas of <span className="text-[#b48a48] font-bold">Practice</span>
      </h2>
      <p className="text-gray-700 text-sm md:text-base mb-12">
        Taking any range of case for maintaining law.
      </p>

      <div className="bg-[#0e1a3c] max-w-6xl mx-auto p-6 rounded-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#d6b47a] w-40 h-40 rounded-xl flex flex-col items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <img src={item.icon} alt={item.title} className="w-12 h-12 mb-3" />
            <p className="text-white font-semibold text-sm text-center">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Practice;
