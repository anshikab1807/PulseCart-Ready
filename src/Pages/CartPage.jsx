import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Load cart items
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    fetch("http://localhost:3000/api/cart", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setCartItems(data.items || []);
        setSubtotal(data.subtotal || 0);
      })
      .catch(err => console.error('Cart load error:', err))
      .finally(() => setLoading(false));
  }, [token]);

  // Update total item count
  useEffect(() => {
    const count = cartItems.reduce((acc, item) => acc + item.qty, 0);
    setItemCount(count);
  }, [cartItems]);

  // Update quantity
  const updateQty = (itemId, qty) => {
    if (qty < 1) qty = 1;
    fetch("http://localhost:3000/api/cart/update", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ itemId, qty })
    })
      .then(res => res.json())
      .then(data => {
        setCartItems(data.cart.items || []);
        setSubtotal(data.subtotal || 0);
      })
      .catch(err => console.error('Update failed', err));
  };

  // Remove item
  const deleteItem = (itemId) => {
    fetch("http://localhost:3000/api/cart/remove", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ itemId })
    })
      .then(res => res.json())
      .then(data => {
        setCartItems(data.cart.items || []);
        setSubtotal(data.subtotal || 0);
      })
      .catch(err => console.error('Delete failed', err));
  };
  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto my-12 p-6 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Your Shopping Cart</h1>

        {!token ? (
          <p className="text-center text-gray-600 text-lg">Please login to view your cart.</p>
        ) : cartItems.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex flex-col md:flex-row items-center justify-between border-t pt-5">
                  <div className="flex items-center w-full md:w-auto mb-4 md:mb-0">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-gray-100 mr-4 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h2 className="font-semibold text-lg text-gray-900">{item.name}</h2>
                      <p className="text-blue-600 font-bold text-lg mt-1">₹{item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 md:space-x-4 flex-wrap justify-center md:justify-end w-full md:w-auto">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-3 py-1 rounded-l-md hover:bg-gray-100 transition">-</button>
                      <input type="number" value={item.qty} min={1} onChange={(e) => updateQty(item.id, parseInt(e.target.value))} className="w-12 text-center border-x border-gray-300 py-1 focus:outline-none" />
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-3 py-1 rounded-r-md hover:bg-gray-100 transition">+</button>
                    </div>
                    <button onClick={() => deleteItem(item.id)} className="flex items-center text-red-500 hover:text-red-700 transition mt-2 md:mt-0">
                      <span className="mr-1">🗑</span> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t mt-8 pt-6 text-right">
              <p className="text-xl font-semibold text-gray-800">
                Subtotal ({itemCount} items): <span className="text-blue-600">₹{subtotal.toFixed(2)}</span>
              </p>
              <button
                disabled={itemCount === 0}
                onClick={() => navigate('/checkout')}
                className="mt-6 px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
