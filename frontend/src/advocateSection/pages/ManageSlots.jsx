import React, { useState,useEffect } from 'react'
import { format } from 'date-fns';
import api from '../../apiCalls/axios.js';
import avatarImage from '../../assets/images/avatarImage.jpg'; // Ensure the image path is correct


const ManageSlots = () => {
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
      
    </div>
  );
};
  

export default ManageSlots