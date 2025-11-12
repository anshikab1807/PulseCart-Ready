import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const supportTopics = [
  {
    title: "Customer Support",
    description: "Our support team is available 24/7 to assist with technical or general questions. Contact us at support@pulsecart.com."
  },
  {
    title: "Feedback and Suggestions",
    description: "We value your feedback! Share your ideas to help us improve our services and products."
  },
  {
    title: "Media Inquiries",
    description: "For media-related questions or partnerships, reach out to media@pulsecart.com."
  },
  {
    title: "Technical Assistance",
    description: "Facing technical issues? Our team will help resolve issues related to accounts, payments, or orders."
  },
  {
    title: "Order & Delivery Queries",
    description: "Check your order status, track shipments, or raise a complaint regarding delayed or damaged deliveries."
  }
];

export default function Support() {
  return (
    <>
      <Navbar />
      <div className="bg-[#fff8f0] min-h-screen font-sans py-20">
        <div className="max-w-4xl mx-auto px-5">
          <h1 className="text-4xl font-bold text-center mb-12">Support</h1>
          <div className="space-y-4">
            {supportTopics.map((topic, index) => (
              <details
                key={index}
                className="bg-white rounded-xl shadow p-5 cursor-pointer hover:shadow-lg transition"
              >
                <summary className="font-semibold text-lg">{topic.title}</summary>
                <p className="mt-2 text-gray-700">{topic.description}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
