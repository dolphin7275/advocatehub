import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../apiCalls/axios'

const ClientDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [rescheduleId, setRescheduleId] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [rescheduleReason, setRescheduleReason] = useState('');
  const [availableSlots, setAvailableSlots] = useState({});
  const [lawyersMap, setLawyersMap] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      const res = await api.get('/userapi/my-bookings/');
      setBookings(res.data);
      const lawyerIds = [...new Set(res.data.map(b => b.lawyer))];
      const lawyerData = {};
      await Promise.all(
        lawyerIds.map(async (id) => {
          const res = await api.get(`/userapi/lawyer/${id}/`);
          lawyerData[id] = res.data;
        })
      );
      setLawyersMap(lawyerData);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  const fetchAvailableSlots = async (lawyerId) => {
    try {
      if (!lawyerId) return;
      const res = await api.get(`/userapi/lawyer/${lawyerId}/`);
      setAvailableSlots(res.data.available_slots || {});
    } catch (err) {
      console.error('Error fetching available slots:', err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const cancelBooking = async (booking) => {
    try {
      setLoading(true);

      if (booking.status === 'confirmed') {
        const confirmPayment = window.confirm(
          `This booking is confirmed. Cancelling will require payment of ₹${lawyersMap[booking.lawyer]?.price / 2}. Proceed?`
        );

        if (!confirmPayment) {
          setLoading(false);
          return;
        }

        await api.post(`/userapi/bookings/${booking.id}/cancel/`, {
          payment_confirmed: true,
        });
      } else {
        await api.post(`/userapi/bookings/${booking.id}/cancel/`);
      }

      setMessage('Booking cancelled successfully.');
      fetchBookings();
    } catch (err) {
      console.error('Cancel error:', err);
      const msg = err.response?.data?.error || 'Failed to cancel.';
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const rescheduleBooking = async (bookingId) => {
    if (!selectedSlot) {
      alert('Please select a slot.');
      return;
    }

    if (!rescheduleReason.trim()) {
      alert('Please provide a reason for rescheduling.');
      return;
    }

    const [newDate, newTime] = selectedSlot.split(', ');
    const localTime = new Date(`${newDate}T${newTime}`);
    const utcTime = new Date(localTime.getTime() - localTime.getTimezoneOffset() * 60000);
    const newSlot = utcTime.toISOString();

    try {
      setLoading(true);
      await api.post(`/userapi/bookings/${bookingId}/reschedule/`, {
        new_slot: newSlot,
        reason: rescheduleReason,
      });
      setMessage('Booking rescheduled.');
      setRescheduleId(null);
      setSelectedSlot('');
      setRescheduleReason('');
      fetchBookings();
    } catch (err) {
      console.error('Reschedule error:', err);
      setMessage('Failed to reschedule.');
    } finally {
      setLoading(false);
    }
  };

  const handleChatNow = (bookingId) => {
    navigate(`/chat/${bookingId}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-8 bg-[#fdf3e6] rounded shadow">
      <h2 className="text-2xl font-bold text-[#0a043c] mb-6 text-center">Your Bookings</h2>

      {message && (
        <p className="text-center mb-4 text-sm text-green-700">{message}</p>
      )}

      {bookings.length === 0 ? (
        <p className="text-center text-gray-600">No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => {
            const isConfirmed = booking.status === 'confirmed';
            const scheduledTime = new Date(booking.scheduled_for);
            const isChatAvailable = isConfirmed && new Date() >= scheduledTime;

            return (
              <div key={booking.id} className="bg-[#f1d2a9] rounded-lg shadow p-4">
                <p className="font-semibold text-[#0a043c]">
                  Lawyer: {lawyersMap[booking.lawyer]?.user?.name || 'N/A'}
                </p>
                <p className="text-sm text-gray-700">
                  Scheduled For: {scheduledTime.toLocaleString()}
                </p>
                <p className="text-sm text-gray-700">Mode: {booking.mode}</p>
                <p className="text-sm text-gray-700">Location: {booking.location}</p>
                <p className="text-sm text-gray-700">Duration: {booking.duration} mins</p>
                <p className="text-sm text-gray-700">
                  Status: <span className={`font-bold ml-2 ${
                    booking.status === 'confirmed' ? 'text-green-800' :
                    booking.status === 'pending' ? 'text-yellow-700' :
                    'text-red-600'
                  }`}>{booking.status}</span>
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {(isConfirmed || booking.status === 'pending') && (
                    <button
                      onClick={() => cancelBooking(booking)}
                      disabled={loading}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Cancel
                    </button>
                  )}

                  {isConfirmed && (
                    <>
                      <button
                        onClick={() => {
                          setRescheduleId(booking.id);
                          fetchAvailableSlots(booking.lawyer);
                        }}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        Reschedule
                      </button>

                      <button
                        onClick={() => handleChatNow(booking.id)}
                        disabled={!isChatAvailable}
                        className={`px-3 py-1 rounded text-white font-medium ${
                          isChatAvailable
                            ? 'bg-[#0a043c] hover:bg-[#030224]'
                            : 'bg-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {isChatAvailable ? 'Chat Now' : 'Chat Unavailable'}
                      </button>
                    </>
                  )}
                </div>

                {rescheduleId === booking.id && (
                  <div className="mt-4 bg-white p-4 rounded shadow border">
                    <label className="block mb-2 text-sm font-semibold">Select New Slot:</label>
                    <select
                      className="border p-2 rounded w-full mb-3"
                      onChange={(e) => setSelectedSlot(e.target.value)}
                      value={selectedSlot}
                    >
                      <option value="">-- Select Slot --</option>
                      {availableSlots &&
                        Object.entries(availableSlots).map(([date, times]) =>
                          times.map((time, idx) => (
                            <option key={`${date}-${time}-${idx}`} value={`${date}, ${time}`}>
                              {new Date(`${date}T${time}`).toLocaleString('en-IN', {
                                dateStyle: 'long',
                                timeStyle: 'short',
                              })}
                            </option>
                          ))
                        )}
                    </select>

                    <label className="block mb-2 text-sm font-semibold">Reason for Rescheduling:</label>
                    <textarea
                      className="border p-2 rounded w-full mb-3"
                      placeholder="Enter reason..."
                      rows={3}
                      value={rescheduleReason}
                      onChange={(e) => setRescheduleReason(e.target.value)}
                    />

                    <div className="flex justify-between">
                      <button
                        onClick={() => rescheduleBooking(booking.id)}
                        className="bg-[#0a043c] text-white px-4 py-2 rounded hover:bg-[#030224]"
                      >
                        Submit
                      </button>
                      <button
                        onClick={() => setRescheduleId(null)}
                        className="text-sm text-gray-600 hover:underline"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;
