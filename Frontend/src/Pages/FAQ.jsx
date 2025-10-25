import React, { useState } from 'react';

function FAQ() {
  // Example FAQ data
  const faqs = [
    {
      question: 'How do I create an account?',
      answer: 'Click on the "Register" button in the top menu and fill out the signup form.'
    },
    {
      question: 'How can I track my order?',
      answer: 'Go to the "Track Order" page and enter your order ID to see the status.'
    },
    {
      question: 'How do I become a seller?',
      answer: 'Click on "Seller Onboarding" and complete the form to start selling on PulseCart.'
    },
    {
      question: 'What payment methods are supported?',
      answer: 'We accept credit/debit cards, UPI, and major wallets for seamless checkout.'
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#fff7f2] py-16 px-4 md:px-20">
      <h1 className="text-4xl font-bold text-[rgb(255,140,66)] mb-12 text-center">
        Frequently Asked Questions
      </h1>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 cursor-pointer border border-[rgb(255,200,170)]"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">{faq.question}</h2>
              <span className="text-[rgb(255,140,66)] font-bold text-xl">
                {activeIndex === index ? '-' : '+'}
              </span>
            </div>
            {activeIndex === index && (
              <p className="mt-4 text-gray-700">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
