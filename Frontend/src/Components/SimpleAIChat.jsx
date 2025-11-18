import React, { useState } from "react";
import "./SimpleAIChat.css"; 

const SimpleAIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hello! I am your AI assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text: input }]);
    const aiReply = generateAIReply(input);
    setMessages((prev) => [...prev, { from: "ai", text: aiReply }]);
    setInput("");
  };

  const generateAIReply = (msg) => {
    const message = msg.toLowerCase();
    if (message.includes("hello") || message.includes("hi")) return "Hi there! How are you?";
    if (message.includes("help")) return "Sure! What do you need help with?";
    return "I am still learning. Can you ask something else?";
  };

  return (
    <div className="ai-chat-wrapper">
      {!isOpen && (
        <button className="ai-chat-logo" onClick={toggleChat}>
          🤖 AI Chat
        </button>
      )}

      {isOpen && (
        <div className="ai-chat">
          <div className="ai-chat-header" onClick={toggleChat}>
            AI Assistant &#x2715; {/* X to close */}
          </div>
          <div className="ai-chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`ai-chat-message ${msg.from}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="ai-chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleAIChat;
