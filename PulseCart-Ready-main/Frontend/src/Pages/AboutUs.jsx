import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // import useNavigate
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const AboutUs = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // useNavigate hook

  const darkPeach = "#FF8C42"; // darker peach for buttons

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);


  const coreValues = [
    { icon: "💡", title: "Innovation", desc: "Tech-driven products for modern lifestyles." },
    { icon: "❤️", title: "Customer First", desc: "Every purchase is an experience." },
    { icon: "🌱", title: "Sustainability", desc: "Eco-conscious choices for urban living." },
    { icon: "🤝", title: "Community", desc: "Connecting people with products that matter." },
    { icon: "⭐", title: "Quality", desc: "Premium, tested, and reliable products." },
  ];

  const milestones = [
    { year: "2023", desc: "Launched PulseCart with 100+ products" },
    { year: "2024", desc: "Reached 10,000 happy customers" },
    { year: "2025", desc: "Expanded to 50+ categories with AI recommendations" },
  ];

  return (
    <div className="font-sans text-gray-800">

      <Navbar />

      {/* Hero */}
      <section className="text-center py-24 px-5 bg-[#fff8f0]">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to PulseCart</h1>
        <p className="text-gray-600 max-w-xl mx-auto mb-8">
          Discover innovative products crafted for modern urban lifestyles.
        </p>
        <button
          onClick={() => navigate("/")} // navigate to home page
          className="px-8 py-3 rounded-full bg-[${darkPeach}] text-white font-semibold hover:bg-[#e07030] transition"
          style={{ backgroundColor: darkPeach }}
        >
          Explore PulseCart
        </button>
      </section>

      {/* Core Values */}
      <section className="max-w-6xl mx-auto py-16 px-5">
        <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {coreValues.map((val, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-lg transition"
            >
              <div className="text-3xl mb-3">{val.icon}</div>
              <h3 className="font-semibold mb-2">{val.title}</h3>
              <p className="text-gray-500 text-sm">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Milestones */}
      <section className="bg-[#fff8f0] py-16 px-5">
        <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 max-w-5xl mx-auto">
          {milestones.map((m, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-sm text-center flex-1 hover:shadow-md transition"
            >
              <h3 className="text-2xl font-bold mb-2">{m.year}</h3>
              <p className="text-gray-500">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16 px-5 bg-[#FFDAB9]">
        <h2 className="text-3xl font-bold mb-6 text-white">Ready to Explore PulseCart?</h2>
        <button
          onClick={() => navigate("/")} // navigate to home page
          className="px-8 py-3 rounded-full bg-white text-[#FF8C42] font-semibold hover:bg-gray-100 transition"
        >
          Explore Now
        </button>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
