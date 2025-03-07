// **Peer Support Chat Component**
// File: app/components/PeerSupport.tsx

import { useState, useEffect } from 'react';

const PeerSupport = () => {
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch('/api/peerSupport');
      const data = await response.json();
      setMessages(data);
    };
    fetchMessages();
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;
    const newMessage = { user: 'You', text: message };
    setMessages([...messages, newMessage]);
    setMessage('');
    await fetch('/api/peerSupport', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMessage),
    });
  };

  return (
    <div className="p-4 border rounded-xl bg-gray-100 w-full max-w-md">
      <h2 className="text-lg font-semibold">Peer Support Chat</h2>
      <div className="h-48 overflow-y-auto border p-2 bg-white">
        {messages.map((msg, index) => (
          <p key={index}><strong>{msg.user}:</strong> {msg.text}</p>
        ))}
      </div>
      <input
        type="text"
        className="w-full p-2 border rounded mt-2"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="mt-2 w-full bg-blue-500 text-white p-2 rounded"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
};

export default PeerSupport;