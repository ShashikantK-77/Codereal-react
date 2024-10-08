// Messaging.js
import React, { useState, useEffect } from 'react';
// import {  Button, Input, Textarea } from 'windmill-react-ui';
import { Input, Button, Textarea } from '@windmill/react-ui';
import PageTitle from 'components/Typography/PageTitle';
const Messaging = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Mock data for messages (replace it with actual data)
  const initialMessages = [
    { id: 1, sender: 'Admin', content: 'Welcome to our platform!' },
    { id: 2, sender: 'User', content: 'Thank you!' },
    // Add more mock messages as needed
  ];

  useEffect(() => {
    // Fetch messages from the server or other data source
    setMessages(initialMessages);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMessageObject = {
        id: messages.length + 1,
        sender: 'User', // Assuming the user sends the message
        content: newMessage.trim(),
      };

      setMessages([...messages, newMessageObject]);
      setNewMessage('');
    }
  };

  return (
    <div>
      <PageTitle>Messaging</PageTitle>

      <div className="mb-4">
        {messages.map((message) => (
          <div key={message.id} className="mb-2">
            <strong>{message.sender}:</strong> {message.content}
          </div>
        ))}
      </div>

      <div className="mb-4 w-3/6">
        <Textarea
          className=""
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
      </div>

      <Button onClick={handleSendMessage}>Send Message</Button>
    </div>
  );
};

export default Messaging;
