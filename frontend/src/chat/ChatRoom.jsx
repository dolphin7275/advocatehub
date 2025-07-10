// ✅ ChatRoom.jsx (Test mode: Chat always active, real logic commented)
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../apiCalls/axios";

const ChatRoom = ({ user }) => {
  const { bookingId } = useParams();
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [countdown, setCountdown] = useState("");
  const messagesEndRef = useRef();

  useEffect(() => {
    fetchMessages();
    checkBookingTime();
  }, [bookingId]);

  useEffect(() => {
    if (isActive) {
      const ws = new WebSocket(`ws://localhost:8000/ws/chat/${bookingId}/`);

      ws.onopen = () => console.log("✅ WebSocket connected");
      ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        setMessages((prev) => [...prev, data]);
      };
      ws.onerror = (e) => console.error("❌ WebSocket error:", e);
      ws.onclose = () => console.warn("🔌 WebSocket closed");

      setSocket(ws);
      return () => ws.close();
    }
  }, [isActive, bookingId]);

  const fetchMessages = async () => {
    const res = await api.get(`/userapi/history/${bookingId}/`);
    setMessages(res.data.map(msg => ({
      message: msg.message,
      sender: msg.sender_name,
      timestamp: msg.timestamp
    })));
  };

  // 🔥 For testing only: always activate chat
  const checkBookingTime = async () => {
    setIsActive(true);
  };

  // 📝 Save for production
  /*
  const checkBookingTime = async () => {
    try {
      const res = await api.get(`/userapi/lawyer-bookings/`);
      const booking = res.data.find((b) => b.id === parseInt(bookingId));
      if (booking) {
        const scheduledTime = new Date(booking.scheduled_for).getTime();
        const now = new Date().getTime();
        const diff = scheduledTime - now;

        if (diff <= 5 * 60 * 1000) {
          setIsActive(true);
        } else {
          const interval = setInterval(() => {
            const remaining = scheduledTime - new Date().getTime();
            if (remaining <= 5 * 60 * 1000) {
              setIsActive(true);
              clearInterval(interval);
            } else {
              const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
              const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
              const mins = Math.floor((remaining / (1000 * 60)) % 60);
              const secs = Math.floor((remaining / 1000) % 60);
              setCountdown(`${days}d ${hours}h ${mins}m ${secs}s`);
            }
          }, 1000);
        }
      }
    } catch (err) {
      console.error("Error checking booking:", err);
    }
  };
  */

  const handleSend = () => {
    if (socket?.readyState === WebSocket.OPEN && message.trim()) {
      socket.send(JSON.stringify({ message, sender: user.name }));
      setMessage("");
    } else {
      console.warn("WebSocket is not open. Message not sent.");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="max-w-4xl mx-auto bg-[#fdf3e6] p-6 rounded-lg shadow mt-8">
      <h2 className="text-2xl font-bold text-center text-[#0a043c] mb-4">Live Chat</h2>

      {!isActive && (
        <p className="text-center text-sm text-gray-700 mb-4">
          Chat will start in: <span className="font-semibold">{countdown}</span>
        </p>
      )}

      <div className="h-80 overflow-y-auto bg-white p-4 rounded border border-gray-300">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded ${
              msg.sender === user.name ? "bg-green-100 text-right ml-auto w-fit" : "bg-gray-100 text-left w-fit"
            }`}
          >
            <strong>{msg.sender}</strong>
            <p className="text-sm">{msg.message}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4 flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={!isActive}
          placeholder={isActive ? "Type your message..." : "Chat is inactive..."}
          className="flex-1 p-2 border rounded-l focus:outline-none"
        />
        <button
          onClick={handleSend}
          disabled={!isActive}
          className={`px-4 py-2 rounded-r font-semibold text-white ${
            isActive ? "bg-[#0a043c] hover:bg-[#030224]" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
