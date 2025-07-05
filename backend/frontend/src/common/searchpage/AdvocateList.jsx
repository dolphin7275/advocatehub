import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const AdvocateList = () => {
  
  const[lawyers,setLawyers]=useState([])

  // useEffect(()=>{
  //   fetch(``)
  //   .then((res)=res.json())
  //   .then((data)=setLawyers.data())
  //   .catch((err)=>console.error(err));
  // },[])

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {lawyers.map((lawyer) => (
        <div key={lawyer.id} className="bg-[#f5e4c5] rounded-lg shadow-md p-4 text-center">
          <img src={lawyer.image} alt={`${lawyer.name}`} className="rounded-full mb-4" />
          <h3 className="font-semibold mb-2">{lawyer.name}</h3>
          <div>Exp: {lawyer.experience}yrs</div>
          <div>Language(s): {lawyer.languages.join(', ')}</div>
          <div>Cost: {lawyer.cost} per hour</div>
          <button className="bg-blue-900 text-gray-50 px-4 py-2 rounded mt-4">
            See Profile
          </button> 
          </div>
        ))}
      </div>

    <Outlet />

    </>

  );
}
  
export default AdvocateList
  