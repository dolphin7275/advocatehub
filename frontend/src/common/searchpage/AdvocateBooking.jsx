import React from 'react'
import { Link } from 'react-router-dom';
import api from '../../apiCalls/axios.js';

const AdvocateBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [expandedBookingId, setExpandedBookingId] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await api.get('/userapi/lawyer-bookings/');
      setBookings(res.data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const confirmBooking = async (bookingId) => {
    try {
      setActionLoading(true);
      await api.post(`/userapi/bookings/${bookingId}/confirm/`);
      setMessage('Booking confirmed successfully.');
      setMessageType('success');
      fetchBookings();
    } catch (err) {
      setMessage('Failed to confirm booking.');
      setMessageType('error', err);
    } finally {
      setActionLoading(false);
    }
  };

  const rejectBooking = async (bookingId) => {
    try {
      setActionLoading(true);
      await api.post(`/userapi/reject-booking/${bookingId}/`);
      setMessage('Booking rejected successfully.');
      setMessageType('success');
      fetchBookings();
    } catch (err) {
      setMessage('Failed to reject booking.');
      setMessageType('error', err);
    } finally {
      setActionLoading(false);
    }
  };

  const filteredBookings =
    filter === 'all' ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div className="max-w-5xl mx-auto p-6 mt-8 bg-[#fdf3e6] rounded shadow">
      <h2 className="text-2xl font-bold text-[#0a043c] mb-4 text-center">Booking History</h2>

      {message && (
        <div
          className={`text-center mb-4 text-sm ${
            messageType === 'success' ? 'text-green-700' : 'text-red-600'
          }`}
        >
          {message}
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {['all', 'confirmed', 'pending', 'rejected', 'cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-1 rounded-full border font-semibold text-sm ${
              filter === status
                ? 'bg-[#0a043c] text-white'
                : 'bg-white text-[#0a043c] border-[#0a043c]'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : filteredBookings.length === 0 ? (
        <p className="text-center text-gray-600">No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="p-4 rounded-lg shadow bg-[#f1d2a9]">
              <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div>
                  <p className="font-semibold text-[#0a043c]">
                    Client: {booking.client?.user?.name || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-700">
                    Scheduled For: {new Date(booking.scheduled_for).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-700">Mode: {booking.mode || 'N/A'}</p>
                  <p className="text-sm text-gray-700">Location: {booking.location || 'N/A'}</p>
                  <p className="text-sm text-gray-700">Duration: {booking.duration || 'N/A'} minutes</p>
                  <p className="text-sm text-gray-700">
                    Status:{' '}
                    <span
                      className={`ml-2 font-bold ${
                        booking.status === 'confirmed'
                          ? 'text-green-800'
                          : booking.status === 'pending'
                          ? 'text-yellow-700'
                          : 'text-red-600'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                  <button
                    className="bg-[#0a043c] text-white px-3 py-1 rounded hover:bg-[#030224]"
                    onClick={() =>
                      setExpandedBookingId(expandedBookingId === booking.id ? null : booking.id)
                    }
                  >
                    {expandedBookingId === booking.id ? 'Hide Profile' : 'See Profile'}
                  </button>

                  {booking.status === 'pending' && (
                    <>
                      <button
                        onClick={() => confirmBooking(booking.id)}
                        disabled={actionLoading}
                        className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => rejectBooking(booking.id)}
                        disabled={actionLoading}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {booking.status === 'confirmed' && (
                    <Link to={`/chat/${booking.id}`}>
                      <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                        Chat Now
                      </button>
                    </Link>
                  )}
                </div>
              </div>

              {expandedBookingId === booking.id && booking.client && (
                <div className="mt-6 p-6 rounded-lg bg-[#f9dcc4] shadow flex flex-col md:flex-row items-center gap-6">
                  <img
                    src={
                      booking.client.user?.profile
                        ? `http://localhost:8000${booking.client.user.profile}`
                        : 'https://via.placeholder.com/100'
                    }
                    alt="Client"
                    className="w-32 h-32 rounded-xl object-cover border-4 border-white shadow-md"
                  />

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#0a043c] mb-1 capitalize">
                      {booking.client.user?.name || 'Client'}
                    </h3>
                    <p className="text-sm text-gray-700 mb-1">
                      <span className="font-semibold">Email:</span> {booking.client.user?.email || 'N/A'}
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      <span className="font-semibold">Phone:</span> {booking.client.user?.phone || 'N/A'}
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      <span className="font-semibold">Languages:</span> {booking.client.language || 'N/A'}
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      <span className="font-semibold">DOB:</span> {booking.client.dob || 'N/A'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default AdvocateBooking