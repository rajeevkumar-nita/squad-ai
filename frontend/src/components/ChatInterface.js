import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './ChatInterface.css';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { text: "Aur bhai! Main SquadBot hu. Kiske baare me janna hai aaj?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Auto-scroll to bottom
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // 1. User ka message add karo
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // 2. Backend ko call karo
      const response = await axios.post('http://localhost:5000/api/chat/message', {
        message: input
      });

      // 3. Bot ka response add karo
      const botMessage = { text: response.data.reply, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = { text: "Yaar server so gaya lagta hai...", sender: "bot" };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        🎓 Squad AI
      </div>

      <div className="messages-area">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            {msg.text}
          </div>
        ))}
        {isLoading && <div className="message bot-message">Typing...</div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <input 
          type="text" 
          placeholder="Pucho kuch..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={sendMessage} disabled={isLoading}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;