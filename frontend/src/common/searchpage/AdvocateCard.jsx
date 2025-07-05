import React from 'react'
// import footer from'../footer'
// import { useState } from 'react'

const AdvocateCard = () => {
  // const[lawyers,setLawyers]=useState([])
  // const [mode, setMode] = useState("Meeting");
  // const [location, setLocation] = useState("Lucknow");
  // const [duration, setDuration] = useState("30 min");
  // const [date, setDate] = useState("2025-04-18");
  // const [timeFrom, setTimeFrom] = useState("07:00");
  // const [timeTo, setTimeTo] = useState("07:30");

  // const handleCreate = () => {
  //   // Handle the create button action
  //   console.log({
  //     mode,
  //     location,
  //     duration,
  //     date,
  //     timeFrom,
  //     timeTo,
  //   });
  // };

  // useEffect(()=>{
  //   fetch(``)
  //   .then((res)=res.json())
  //   .then((data)=setLawyers.data())
  //   .catch((err)=>console.error(err));
  // },[])

  
  return (
    <div className='w-100% '>
      {/* <div>filters</div>
      <div className='bg-[#C9A66CB2] w-[1116px] h-[489px] mt-[252px] ml-[162px] rounded-[25px]'>
        <div>{lawyers.image}</div>
        <div><h1>{lawyers.name}</h1></div>
              <h4>{lawyers.type}</h4>
              <h4>Languages:{lawyers.languages}</h4>
              <h4>Experience:{lawyers.experience}Years</h4>
              <h4>Fee:{lawyers.Fee}/Session</h4>
      </div>
      <div>
      <div className="bg-black text-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Schedule an appointment</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Select Mode</label>
            <select
              name="mode"
              className="w-full p-2 rounded text-black"
              value={formData.mode}
              onChange={handleChange}
            >
              <option>Meeting</option>
              <option>Call</option>
              <option>Video Call</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Add Location</label>
            <input
              type="text"
              name="location"
              className="w-full p-2 rounded text-black"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Time</label>
            <div className="flex space-x-2">
              {["30 min", "45 min", "1 hour"].map((dur) => (
                <button
                  type="button"
                  key={dur}
                  onClick={() => setFormData({ ...formData, duration: dur })}
                  className={`px-3 py-1 rounded ${
                    formData.duration === dur
                      ? "bg-blue-700 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {dur}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Date</label>
            <input
              type="text"
              name="date"
              className="w-full p-2 rounded text-black"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm mb-1">From</label>
              <input
                type="time"
                name="from"
                className="w-full p-2 rounded text-black"
                value={formData.from}
                onChange={handleChange}
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm mb-1">To</label>
              <input
                type="time"
                name="to"
                className="w-full p-2 rounded text-black"
                value={formData.to}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="px-4 py-2 rounded bg-yellow-500 text-black"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-800 text-white">
              Create
            </button>
          </div>
        </form>
        </div>    
    </div>
    <footer/> */}
    </div> 
  )
};

export default AdvocateCard
