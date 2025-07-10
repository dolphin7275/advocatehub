import React from 'react';
import { useParams } from 'react-router-dom';
import ChatRoom from '../chat/ChatRoom';
import { useAuth } from '../common/AuthContext';

const ChatRoomWrapper = () => {
  const { bookingId } = useParams();
  const auth = useAuth();

  if (!auth) {
    return <div className="text-center mt-10 text-gray-600">Loading authentication...</div>;
  }

  if (!auth.user) {
    return <div className="text-center mt-10 text-red-600">Please login to join the chat.</div>;
  }

  return <ChatRoom bookingId={bookingId} user={auth.user} />;
};

export default ChatRoomWrapper;
