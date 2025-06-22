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
    <section className="bg-[#eeebe6] py-16 px-4 text-center">
      <h2 className="text-4xl font-bold text-[#0d163d] mb-4">
        Our Areas of Practice
      </h2>
      <p className="text-[#cc8e2a] text-lg mb-12">
        Taking any range of case for maintaining law.
      </p>

      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 gap-10">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#0e1a3c] p-10 rounded-[2rem] flex flex-col items-center transition-transform duration-300 hover:scale-105
            "
          >
            <div className="bg-gradient-to-b from-gray-100 to-gray-300 p-4 rounded-xl mb-6">
              <img src={item.icon} alt={item.title} className="w-20 h-20" />
            </div>
            <h3 className="text-white font-bold text-xl text-center">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
      
    </section>
  )
}

export default Practice;
