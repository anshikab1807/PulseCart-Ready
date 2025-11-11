import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Category = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('cat');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category) {
      setError("Invalid category");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:3000/api/products/category/${category}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setError(null);
      })
      .catch(() => setError("Failed to fetch products"))
      .finally(() => setLoading(false));
  }, [category]);

  const addToCart = async (id, name, price, image) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to add items to cart.");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ item: { id, name, price, image, qty: 1 } }),
      });
      const data = await res.json();
      alert(data.msg || (res.ok ? "Added to cart!" : "Failed to add to cart."));
    } catch {
      alert("Server error");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#fff7f2]">
      </div>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <p className="text-red-600 text-xl mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[rgb(255,140,66)] hover:bg-[rgb(255,120,46)] text-white px-6 py-2 rounded transition"
          >
            Try Again
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#fff7f2] p-6 md:p-10">
        <h2 className="text-3xl font-bold mb-8 text-center capitalize text-[rgb(255,140,66)]">
          {category} Collection
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No products found in this category.
            </p>
          ) : (
            products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <div className="w-full h-56 overflow-hidden rounded-t-2xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {product.description}
                  </p>
                  {product.brand && (
                    <p className="text-xs text-gray-400">Brand: {product.brand}</p>
                  )}
                  {product.rating && (
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <span className="text-yellow-400">⭐</span> {product.rating}
                    </div>
                  )}
                  <p className="text-[rgb(255,140,66)] font-bold text-lg mt-2">
                    ₹{product.price.toLocaleString()}
                  </p>
                  {product.amount > 0 ? (
                    <button
                      onClick={() =>
                        addToCart(product._id, product.name, product.price, product.image)
                      }
                      className="w-full mt-3 bg-[rgb(255,140,66)] hover:bg-[rgb(255,120,46)] text-white py-2 rounded-lg transition"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full mt-3 bg-gray-400 text-white py-2 rounded-lg cursor-not-allowed"
                    >
                      Out of Stock
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Category;
