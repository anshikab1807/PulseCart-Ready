import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function Dashboard() {
  const navigate = useNavigate();

  // Seller Name
  const [sellerName, setSellerName] = useState("Seller");

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("sellerUser");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setSellerName(user.fullName || user.name || user.username || user.email?.split("@")[0] || "Seller");
      }
    } catch (err) {
      console.error("Failed to load seller info:", err);
    }
  }, []);

  // Notification State
  const [showNotificationInput, setShowNotificationInput] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationStatus, setNotificationStatus] = useState("");

  const handleSendNotification = () => {
    if (!notificationMessage.trim()) {
      setNotificationStatus("Message cannot be empty!");
      return;
    }
    const newNotification = {
      id: `notif-${Date.now()}`,
      message: notificationMessage.trim(),
      type: "seller_message",
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    try {
      const existing = JSON.parse(localStorage.getItem("userNotifications")) || [];
      existing.unshift(newNotification);
      localStorage.setItem("userNotifications", JSON.stringify(existing));
      const unreadCount = existing.filter((n) => !n.isRead).length;
      localStorage.setItem("notificationCount", unreadCount);
      setNotificationStatus("Notification sent successfully!🔔");
      setNotificationMessage("");
      setShowNotificationInput(false);
    } catch (err) {
      console.error(err);
      setNotificationStatus("Failed to send notification.");
    }
  };

  const salesData = [
    { year: "2018", sales: 25 },
    { year: "2019", sales: 40 },
    { year: "2020", sales: 30 },
    { year: "2021", sales: 50 },
    { year: "2022", sales: 60 },
    { year: "2023", sales: 70 },
  ];

  const topProducts = [
    { name: "EcoSmart Water Bottle", sales: 45, available: true },
    { name: "UrbanFit Yoga Mat", sales: 30, available: true },
    { name: "Lumina LED Desk Lamp", sales: 22, available: true },
  ];

  const [orders, setOrders] = useState([
    { id: "#1001", product: "EcoSmart Water Bottle", date: "Oct 1, 10:30 AM", price: "₹899", payment: "Card", status: "Delivered" },
    { id: "#1002", product: "UrbanFit Yoga Mat", date: "Oct 2, 11:00 AM", price: "₹1,299", payment: "UPI", status: "Shipped" },
    { id: "#1003", product: "Lumina LED Desk Lamp", date: "Oct 3, 02:15 PM", price: "₹1,799", payment: "Card", status: "Confirmed" },
  ]);

  const statusColor = {
    Delivered: "bg-green-500 text-white",
    Shipped: "bg-blue-500 text-white",
    Confirmed: "bg-yellow-400 text-black",
  };

  const handleStatusChange = (index, newStatus) => {
    const updated = [...orders];
    updated[index].status = newStatus;
    setOrders(updated);
  };

  const addedProducts = [
    {
      name: "NeoSmart Headphones",
      desc: "High-fidelity wireless headphones.",
      price: "₹5,499",
      stock: "12 pcs",
      img: "https://i.pinimg.com/736x/0a/34/6f/0a346f6ed2c8c8b1e1c34f6b92b4a2f9.jpg",
    },
    {
      name: "Eco Bamboo Laptop Stand",
      desc: "Sustainable ergonomic laptop stand.",
      price: "₹2,199",
      stock: "20 pcs",
      img: "https://i.pinimg.com/736x/28/54/1d/28541d0b0cf41eb7e5b9f20a2c5b1b87.jpg",
    },
    {
      name: "HydroGlow Smart Mug",
      desc: "Keeps beverages at perfect temperature.",
      price: "₹1,999",
      stock: "15 pcs",
      img: "https://i.pinimg.com/736x/6d/98/43/6d9843efdbb1e2d1b9e4d329f9d37aa7.jpg",
    },
    {
      name: "AuraDesk Organizer",
      desc: "Minimalist desk organization solution.",
      price: "₹999",
      stock: "30 pcs",
      img: "https://i.pinimg.com/736x/71/89/5b/71895b64f9f6a4b8cd4a71a9d2b8b24b.jpg",
    },
    {
      name: "VibeFit Smartwatch",
      desc: "Track your fitness in style.",
      price: "₹3,999",
      stock: "18 pcs",
      img: "https://i.pinimg.com/736x/55/bf/0c/55bf0c6d87b6eb1dfd7eb1e233f887d3.jpg",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen p-6 md:p-10 font-sans space-y-8">

        {/* Header */}
        <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl p-6 shadow-md">
          <h1 className="text-3xl font-bold">Hello, {sellerName}</h1>
          <p className="text-lg mt-1">Let's make today productive! Check your stats and orders below.</p>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Total Earnings", value: "₹12,500" },
            { label: "Products Listed", value: "15" },
            { label: "Products Sold", value: "110" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl shadow hover:shadow-lg text-center transition">
              <h2 className="text-sm font-medium text-gray-500">{stat.label}</h2>
              <p className="text-3xl font-bold mt-2">{stat.value}</p>
            </div>
          ))}
        </section>

        {/* Charts & Top Products */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Sales Trend</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#7F00FF" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top Selling Products */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Top Products</h2>
            <div className="space-y-4">
              {topProducts.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.sales} units sold</p>
                  </div>
                  <span className={`text-sm font-semibold ${item.available ? "text-green-600" : "text-red-600"}`}>
                    {item.available ? "• In Stock" : "Out of Stock"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Orders */}
        <section className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-4">Order ID</th>
                  <th className="py-2 px-4">Product</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Price</th>
                  <th className="py-2 px-4">Payment</th>
                  <th className="py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 border-b">
                    <td className="py-2 px-4">{order.id}</td>
                    <td className="py-2 px-4">{order.product}</td>
                    <td className="py-2 px-4">{order.date}</td>
                    <td className="py-2 px-4">{order.price}</td>
                    <td className="py-2 px-4">{order.payment}</td>
                    <td className="py-2 px-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(idx, e.target.value)}
                        className={`px-2 py-1 rounded-full text-xs font-medium outline-none ${statusColor[order.status]}`}
                      >
                        <option value="Delivered">Delivered</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Confirmed">Confirmed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Added Products */}
        <section className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Products</h2>
          <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide">
            {addedProducts.map((item, idx) => (
              <div key={idx} className="min-w-[240px] bg-white border rounded-xl p-4 shadow hover:shadow-lg transition">
                <img src={item.img} alt={item.name} className="w-full h-56 object-cover rounded-lg mb-3"/>
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
                <p className="mt-2 text-purple-600 font-bold text-lg">{item.price}</p>
                <p className="text-sm text-gray-600">Stock: {item.stock}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Notifications & Add Product */}
        <div className="flex flex-col items-center gap-4 mt-8">
          <button
            onClick={() => setShowNotificationInput((prev) => !prev)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md shadow-md w-fit transition"
          >
            {showNotificationInput ? "Close Notification Sender" : "📢 Send Notification"}
          </button>

          {showNotificationInput && (
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows="4"
                placeholder="Type your message..."
                value={notificationMessage}
                onChange={(e) => setNotificationMessage(e.target.value)}
              />
              <button
                onClick={handleSendNotification}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md w-full"
              >
                Send
              </button>
              {notificationStatus && (
                <p className={`mt-3 text-center text-sm ${notificationStatus.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
                  {notificationStatus}
                </p>
              )}
            </div>
          )}

          <button
            onClick={() => navigate("/productdetails")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-purple-600 transition w-fit"
          >
            + Add Product
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
