import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

function HelpCenter() {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage = { sender: 'user', text: query };
    setChatHistory((prev) => [...prev, userMessage]);
    setQuery('');
    setIsSubmitting(true);

    // Replace this with your actual AI API call
    setTimeout(() => {
      const aiResponse = { sender: 'ai', text: `AI Response: "${userMessage.text}"` };
      setChatHistory((prev) => [...prev, aiResponse]);
      setIsSubmitting(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6 md:p-10">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-900">
        pulseCart Help Center
        </h1>
        <p className="text-center text-gray-700 mb-8">
          Ask our AI assistant any question related to your shopping experience.
        </p>

        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 flex flex-col h-[60vh]">
          <div className="flex-1 overflow-y-auto mb-4 space-y-3">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg max-w-[80%] ${
                  msg.sender === 'user' ? 'bg-blue-600 text-white ml-auto' : 'bg-gray-200 text-gray-900'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? '...' : 'Send'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HelpCenter;
