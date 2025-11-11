import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../Styles/Product.css";

const ProductDetails = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    amount: "",
    price: "",
    image: "",
    delivery: ""
  });
  const [isAddBtnDisabled, setIsAddBtnDisabled] = useState(true);

  const requiredFields = ["name", "category", "description", "amount", "price"];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);

    fetch("http://localhost:3000/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("❌ Fetch error:", err));

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);
    const filled = requiredFields.every((field) => updatedForm[field].trim() !== "");
    setIsAddBtnDisabled(!filled);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAddBtnDisabled) return;

    fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts((prev) => [...prev, data]);
        setFormData({
          name: "",
          category: "",
          description: "",
          amount: "",
          price: "",
          image: "",
          delivery: ""
        });
        setIsAddBtnDisabled(true);
      })
      .catch((err) => console.error("❌ Error:", err));
  };

  const handleRemoveProduct = (productToRemove) => {
    setProducts((prev) => prev.filter((product) => product !== productToRemove));
  };

  const handleFinish = () => {
    if (products.length === 0) {
      alert("Please add at least one product before finishing.");
      return;
    }
    window.location.href = "/dashboard";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <p className="text-[#FF8C42] text-lg font-semibold">Loading products...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#fff5f0] px-4 py-10">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 mt-6">
          <h2 className="text-2xl font-semibold text-[#FF8C42] mb-6">
            Add Products — PulseCart
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/** Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 border border-[#FFCC99] rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF8C42] outline-none transition"
                />
              </div>

              {/** Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 border border-[#FFCC99] rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF8C42] outline-none transition"
                >
                  <option value="">-- Select Category --</option>
                  <option value="fashion">Fashion</option>
                  <option value="electronic">Electronic</option>
                  <option value="furniture">Furniture</option>
                  <option value="kitchen">Kitchen</option>
                  <option value="toys">Toys</option>
                  <option value="cosmetic">Cosmetic</option>
                  <option value="food">Food</option>
                  <option value="sports">Sports</option>
                  <option value="appliances">Appliances</option>
                </select>
              </div>

              {/** Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 border border-[#FFCC99] rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF8C42] outline-none transition"
                />
              </div>

              {/** Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  min="1"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 border border-[#FFCC99] rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF8C42] outline-none transition"
                />
              </div>

              {/** Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 border border-[#FFCC99] rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF8C42] outline-none transition"
                />
              </div>

              {/** Image URL */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 border border-[#FFCC99] rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF8C42] outline-none transition"
                />
              </div>

              {/** Delivery */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Delivery Charge
                </label>
                <input
                  type="text"
                  name="delivery"
                  value={formData.delivery}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 border border-[#FFCC99] rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF8C42] outline-none transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isAddBtnDisabled}
              className={`w-full py-2 rounded-lg text-white font-semibold mt-4 ${
                isAddBtnDisabled
                  ? "bg-[#FFB98C] cursor-not-allowed"
                  : "bg-[#FF8C42] hover:bg-[#e67b38]"
              }`}
            >
              + Add more item
            </button>
          </form>

          {/** Product List */}
          <div className="mt-8 space-y-4">
            {products.map((prod, index) => (
              <div
                key={index}
                className="bg-[#fff0e6] border border-[#FFCC99] rounded-lg p-4 shadow"
              >
                <p><strong>Product:</strong> {prod.name}</p>
                <p><strong>Category:</strong> {prod.category}</p>
                <p><strong>Description:</strong> {prod.description}</p>
                <p><strong>Amount:</strong> {prod.amount}</p>
                <p><strong>Price:</strong> ₹{prod.price}</p>
                {prod.image && (
                  <img
                    src={prod.image}
                    alt="Product"
                    className="mt-2 max-w-[80px] max-h-[80px] rounded"
                  />
                )}
                <p><strong>Delivery:</strong> {prod.delivery}</p>
                <button
                  type="button"
                  className="mt-2 bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1 rounded"
                  onClick={() => handleRemoveProduct(prod)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleFinish}
            className="w-full mt-4 py-2 rounded-lg bg-[#FF8C42] hover:bg-[#e67b38] text-white font-semibold"
          >
            Finish
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
