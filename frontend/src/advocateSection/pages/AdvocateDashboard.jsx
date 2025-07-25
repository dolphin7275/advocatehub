// import React, { useState, useEffect } from 'react';
// import { format } from 'date-fns';
// import api from '../../apiCalls/axios.js';
// import { AdvocateBookingHistory } from './AdvocateBookingHistory.jsx';

// const AdvocateDashboard = () => {
//   const [selectedDate, setSelectedDate] = useState('');
//   const [timeInput, setTimeInput] = useState('');
//   const [slots, setSlots] = useState({});
//   const [message, setMessage] = useState('');
//   const [messageType, setMessageType] = useState('success');
//   const [loading, setLoading] = useState(false);
//   const [editingSlot, setEditingSlot] = useState({ date: '', index: -1 });
//   const [editTime, setEditTime] = useState('');
//   const [activeTab, setActiveTab] = useState('dashboard');

//   const dummyData = [
//     {
//       profileId: 'Adv#101',
//       name: 'abc',
//       email: 'abc@gmail.com',
//       cnic: '345',
//       status: 'Approved',
//       signupDate: '02 July 20',
//     },
//     {
//       profileId: 'Adv#102',
//       name: 'sakshi',
//       email: 'sakshi@gmail.com',
//       cnic: '345',
//       status: 'Pending',
//       signupDate: '05 July 20',
//     },
//   ];

//   useEffect(() => {
//     const fetchSlots = async () => {
//       try {
//         const res = await api.get('/userapi/me/');
//         const lawyerData = res.data.details || {};
//         if (lawyerData.available_slots) {
//           const cleanedSlots = Object.entries(lawyerData.available_slots).reduce((acc, [date, times]) => {
//             acc[date] = Array.isArray(times) ? times : [];
//             return acc;
//           }, {});
//           setSlots(cleanedSlots);
//         }
//       } catch (err) {
//         console.error("Error fetching slots", err);
//         setMessage('Error loading slots.');
//         setMessageType('error');
//       }
//     };
//     fetchSlots();
//   }, []);

//   const addTimeSlot = () => {
//     if (!selectedDate || !timeInput) return;
//     setSlots((prev) => {
//       const updated = { ...prev };
//       if (!updated[selectedDate]) updated[selectedDate] = [];
//       if (!updated[selectedDate].includes(timeInput)) updated[selectedDate].push(timeInput);
//       return updated;
//     });
//     setTimeInput('');
//   };

//   const removeSlot = (date, time) => {
//     setSlots((prev) => {
//       const updated = { ...prev };
//       updated[date] = updated[date].filter((t) => t !== time);
//       if (updated[date].length === 0) delete updated[date];
//       return updated;
//     });
//   };

//   const startEdit = (date, index, time) => {
//     setEditingSlot({ date, index });
//     setEditTime(time);
//   };

//   const cancelEdit = () => {
//     setEditingSlot({ date: '', index: -1 });
//     setEditTime('');
//   };

//   const saveEdit = () => {
//     const { date, index } = editingSlot;
//     if (!editTime || index === -1) return;
//     setSlots((prev) => {
//       const updated = { ...prev };
//       updated[date][index] = editTime;
//       return updated;
//     });
//     cancelEdit();
//   };

//   const handleSave = async () => {
//     try {
//       setLoading(true);
//       await api.post('/userapi/update-lawyer-slots/', { available_slots: slots });
//       setMessage('Slots saved successfully!');
//       setMessageType('success');
//     } catch (err) {
//       setMessage('Failed to save slots.');
//       setMessageType('error');
//       console.error("Saving Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderTable = (data) => (
//     <div className="overflow-x-auto mt-4">
//       <table className="min-w-full bg-white border rounded shadow">
//         <thead className="bg-[#0a043c] text-white">
//           <tr>
//             <th className="px-4 py-2">NO</th>
//             <th className="px-4 py-2">PROFILE ID</th>
//             <th className="px-4 py-2">NAME</th>
//             <th className="px-4 py-2">EMAIL</th>
//             <th className="px-4 py-2">CNIC</th>
//             <th className="px-4 py-2">STATUS</th>
//             <th className="px-4 py-2">SIGNUP DATE</th>
//             <th className="px-4 py-2">PROFILE ACTION</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, idx) => (
//             <tr key={idx} className="text-center border-t">
//               <td className="px-4 py-2">{idx + 1}</td>
//               <td className="px-4 py-2">{item.profileId}</td>
//               <td className="px-4 py-2">{item.name}</td>
//               <td className="px-4 py-2">{item.email}</td>
//               <td className="px-4 py-2">{item.cnic}</td>
//               <td className="px-4 py-2">
//                 <span className={`px-2 py-1 rounded text-sm ${
//                   item.status === 'Approved'
//                     ? 'bg-green-100 text-green-800'
//                     : item.status === 'Rejected'
//                     ? 'bg-red-100 text-red-800'
//                     : 'bg-yellow-100 text-yellow-800'
//                 }`}>{item.status}</span>
//               </td>
//               <td className="px-4 py-2">{item.signupDate}</td>
//               <td className="px-4 py-2 text-blue-700 font-semibold">
//                 {item.status === 'Approved' ? 'Yes' : 'Review 🔍'}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

//   const renderContent = () => {
//     if (activeTab === 'dashboard') {
//       return (
//         <>
//           <h2 className="text-2xl font-bold mb-4 text-[#0a043c]">Manage Available Slots</h2>
//           <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
//             <input
//               type="date"
//               className="rounded px-3 py-2 border border-gray-300 w-full md:w-1/2"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               min={format(new Date(), 'yyyy-MM-dd')}
//             />
//             <input
//               type="time"
//               className="rounded px-3 py-2 border border-gray-300 w-full md:w-1/2"
//               value={timeInput}
//               onChange={(e) => setTimeInput(e.target.value)}
//             />
//             <button
//               onClick={addTimeSlot}
//               className="bg-[#0a043c] text-white px-4 py-2 rounded hover:bg-[#030224] w-full md:w-auto"
//             >
//               Add Slot
//             </button>
//           </div>
//           {Object.keys(slots).length === 0 ? (
//             <p className="text-gray-500 text-sm text-center">No slots added yet.</p>
//           ) : (
//             Object.entries(slots).map(([date, times]) => (
//               <div key={date} className="mb-6">
//                 <h4 className="text-lg font-semibold text-[#0a043c] mb-2">{date}</h4>
//                 <div className="flex flex-wrap gap-3">
//                   {times.map((time, index) => (
//                     <div key={index} className="bg-[#f1d2a9] text-black px-3 py-2 rounded-lg shadow flex items-center gap-2">
//                       {editingSlot.date === date && editingSlot.index === index ? (
//                         <>
//                           <input
//                             type="time"
//                             value={editTime}
//                             onChange={(e) => setEditTime(e.target.value)}
//                             className="bg-white px-2 py-1 rounded border"
//                           />
//                           <button onClick={saveEdit} className="text-green-700 font-bold">✓</button>
//                           <button onClick={cancelEdit} className="text-red-700 font-bold">×</button>
//                         </>
//                       ) : (
//                         <>
//                           <span>{time}</span>
//                           <button onClick={() => startEdit(date, index, time)} className="text-blue-800 font-bold">✎</button>
//                           <button onClick={() => removeSlot(date, time)} className="text-red-700 font-bold">×</button>
//                         </>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))
//           )}
//           {message && (
//             <p className={`text-center mb-4 text-sm ${messageType === 'success' ? 'text-green-700' : 'text-red-600'}`}>{message}</p>
//           )}
//           <div className="text-center">
//             <button
//               onClick={handleSave}
//               disabled={loading}
//               className={`px-6 py-2 rounded-full bg-[#0a043c] text-white hover:bg-[#030224] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//             >
//               {loading ? 'Saving...' : 'Save All Slots'}
//             </button>
//           </div>
//           <div className="mt-10">
//             <AdvocateBookingHistory showReason={true} />
//           </div>
//         </>
//       );
//     }
//     const filtered = dummyData.filter((d) => {
//       if (activeTab === 'pending') return d.status === 'Pending';
//       if (activeTab === 'success') return d.status === 'Approved';
//       return true;
//     });
//     return renderTable(filtered);
//   };

//   return (
    
//     <div className="flex min-h-screen bg-gray-100 font-sans">
//       <aside className="w-full md:w-64 bg-[#0a043c] text-white p-6 space-y-4">
//         <h2 className="text-xl font-bold mb-4">ADVOCATE HUB</h2>
//         <button onClick={() => setActiveTab('dashboard')} className="block w-full text-left hover:text-yellow-400">Dashboard</button>
//         <button onClick={() => setActiveTab('totalCases')} className="block w-full text-left hover:text-yellow-400">Total Cases</button>
//         <button onClick={() => setActiveTab('activeClients')} className="block w-full text-left hover:text-yellow-400">Active Clients</button>
//         <button onClick={() => setActiveTab('pending')} className="block w-full text-left hover:text-yellow-400">Pending Approvals</button>
//         <button onClick={() => setActiveTab('success')} className="block w-full text-left hover:text-yellow-400">Successful Cases</button>
//         <button onClick={() => setActiveTab('ongoing')} className="block w-full text-left hover:text-yellow-400">Ongoing Cases</button>
//         <button onClick={() => setActiveTab('hearings')} className="block w-full text-left hover:text-yellow-400">Hearings This Week</button>
//       </aside>
      
//       <main className="flex-1 p-6 bg-[#fdf3e6]">
//         <div className="max-w-4xl mx-auto bg-white p-6 shadow rounded">
//           {renderContent()}
//         </div>
//       </main>

//     </div>
//   );
// };

// export default AdvocateDashboard;


import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from '../../apiCalls/axios.js';
import { AdvocateBookingHistory } from './AdvocateBookingHistory.jsx';


const AdvocateDashboard = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [slots, setSlots] = useState({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [loading, setLoading] = useState(false);
  const [editingSlot, setEditingSlot] = useState({ date: '', index: -1 });
  const [editTime, setEditTime] = useState('');

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await api.get('/userapi/me/');
        const lawyerData = res.data.details || {};
        if (lawyerData.available_slots) {
          const cleanedSlots = Object.entries(lawyerData.available_slots).reduce((acc, [date, times]) => {
            acc[date] = Array.isArray(times) ? times : [];
            return acc;
          }, {});
          setSlots(cleanedSlots);
          console.log("Fetched Slots from Backend:", cleanedSlots);
        }
      } catch (err) {
        console.error("Error fetching slots", err);
        setMessage('Error loading slots.');
        setMessageType('error');
      }
    };
    fetchSlots();
  }, []);

  const addTimeSlot = () => {
    if (!selectedDate || !timeInput) return;
    setSlots((prev) => {
      const updated = { ...prev };
      if (!updated[selectedDate]) updated[selectedDate] = [];
      if (!updated[selectedDate].includes(timeInput)) updated[selectedDate].push(timeInput);
      return updated;
    });
    setTimeInput('');
  };

  const removeSlot = (date, time) => {
    setSlots((prev) => {
      const updated = { ...prev };
      updated[date] = updated[date].filter((t) => t !== time);
      if (updated[date].length === 0) delete updated[date];
      return updated;
    });
  };

  const startEdit = (date, index, time) => {
    setEditingSlot({ date, index });
    setEditTime(time);
  };

  const cancelEdit = () => {
    setEditingSlot({ date: '', index: -1 });
    setEditTime('');
  };

  const saveEdit = () => {
    const { date, index } = editingSlot;
    if (!editTime || index === -1) return;
    setSlots((prev) => {
      const updated = { ...prev };
      updated[date][index] = editTime;
      return updated;
    });
    cancelEdit();
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await api.post('/userapi/update-lawyer-slots/', { available_slots: slots });
      setMessage('Slots saved successfully!');
      setMessageType('success');
    } catch (err) {
      setMessage('Failed to save slots.');
      setMessageType('error');
      console.error("Saving Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-[#fdf3e6] shadow rounded mt-6">
      <h2 className="text-2xl font-bold text-center text-[#0a043c] mb-6">
        Manage Your Available Slots
      </h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <input
          type="date"
          className="rounded px-3 py-2 border border-gray-300 w-full md:w-1/2"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={format(new Date(), 'yyyy-MM-dd')}
        />
        <input
          type="time"
          className="rounded px-3 py-2 border border-gray-300 w-full md:w-1/2"
          value={timeInput}
          onChange={(e) => setTimeInput(e.target.value)}
        />
        <button
          onClick={addTimeSlot}
          className="bg-[#0a043c] text-white px-4 py-2 rounded hover:bg-[#030224] w-full md:w-auto"
        >
          Add Slot
        </button>
      </div>

      {Object.keys(slots).length === 0 ? (
        <p className="text-gray-500 text-sm text-center">No slots added yet.</p>
      ) : (
        Object.entries(slots).map(([date, times]) => (
          <div key={date} className="mb-6">
            <h4 className="text-lg font-semibold text-[#0a043c] mb-2">{date}</h4>
            <div className="flex flex-wrap gap-3">
              {times.map((time, index) => (
                <div
                  key={index}
                  className="bg-[#f1d2a9] text-black px-3 py-2 rounded-lg shadow flex items-center gap-2"
                >
                  {editingSlot.date === date && editingSlot.index === index ? (
                    <>
                      <input
                        type="time"
                        value={editTime}
                        onChange={(e) => setEditTime(e.target.value)}
                        className="bg-white px-2 py-1 rounded border"
                      />
                      <button onClick={saveEdit} className="text-green-700 font-bold">✓</button>
                      <button onClick={cancelEdit} className="text-red-700 font-bold">×</button>
                    </>
                  ) : (
                    <>
                      <span>{time}</span>
                      <button onClick={() => startEdit(date, index, time)} className="text-blue-800 font-bold">✎</button>
                      <button onClick={() => removeSlot(date, time)} className="text-red-700 font-bold">×</button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      {message && (
        <p
          className={`text-center mb-4 text-sm ${
            messageType === 'success' ? 'text-green-700' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      )}

      <div className="text-center">
        <button
          onClick={handleSave}
          disabled={loading}
          className={`px-6 py-2 rounded-full bg-[#0a043c] text-white hover:bg-[#030224] ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Saving...' : 'Save All Slots'}
        </button>
      </div>

      {/* <div className="mt-10">
        <BookingConfirm showReason={true} />
      </div> */}
      <div className="mt-10">
        <AdvocateBookingHistory showReason={true} />
      </div>
      
    </div>
  );
};

export default AdvocateDashboard;