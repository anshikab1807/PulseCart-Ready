import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  User as UserIcon,
  Search as SearchIcon,
  LogOut,
  UserCircle2,
  PackageSearch,
} from "lucide-react";

// Navbar categories
const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Fashion", href: "/category?cat=fashion", links: ["Men", "Women", "Kids", "Accessories", "Luggages"] },
  { label: "Electronics", href: "/category?cat=electronic", links: ["Laptops", "Tablets", "Cameras", "Headphones", "Smartwatches"] },
  { label: "Home & Furniture", href: "/category?cat=furniture", links: ["Living Room", "Bedroom", "Kitchen", "Office", "Outdoor"] },
  { label: "Appliances", href: "/category?cat=kitchen" },
  { label: "Toys", href: "/category?cat=toys", links: ["Action Figures", "Dolls", "Puzzles", "Board Games"] },
  { label: "Cosmetics", href: "/category?cat=cosmetic" },
  { label: "Kilos", href: "/category?cat=food" },
  { label: "Sports", href: "/category?cat=sports" },
  { label: "Books", href: "/category?cat=books", links: ["Fiction", "Non-Fiction", "Comics", "Education"] },
  { label: "Gaming", href: "/category?cat=gaming", links: ["Consoles", "PC Games", "Accessories"] },
  { label: "Stationery", href: "/category?cat=stationery" },
];

// Helper: get category from href
const getCatFromHref = (href = "") => {
  const m = href.match(/cat=([^&#]+)/i);
  return m ? decodeURIComponent(m[1]) : undefined;
};

// Utility: classNames
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Profile dropdown menu
function ProfileMenu({ user, onLogin, onLogout }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex items-center gap-2">
      {user?.name && <span className="text-peach-500 font-medium hidden sm:inline">Hi, {user.name}</span>}

      <button
        onClick={() => setOpen((v) => !v)}
        className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:scale-105 transition overflow-hidden"
      >
        {user?.profileImage ? (
          <img src={user.profileImage} alt="User avatar" className="w-full h-full object-cover rounded-full" />
        ) : (
          <UserIcon className="w-5 h-5 text-white" strokeWidth={2} />
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-12 w-48 bg-gray-900 text-white rounded-md shadow-lg p-1 text-sm z-50">
          {user ? (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-800"
                onClick={() => setOpen(false)}
              >
                <UserCircle2 className="w-4 h-4" /> Profile
              </Link>
              <Link
                to="/trackorder"
                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-800"
                onClick={() => setOpen(false)}
              >
                <PackageSearch className="w-4 h-4" /> Orders
              </Link>
              <button
                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-800 text-left"
                onClick={() => {
                  setOpen(false);
                  onLogout?.();
                }}
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <button
              className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-800 text-left"
              onClick={() => {
                setOpen(false);
                onLogin?.();
              }}
            >
              <UserCircle2 className="w-4 h-4" /> Login / Sign Up
            </button>
          )}
        </div>
      )}
    </div>
  );
}



// ✨✨✨ NEW SEARCH BAR WITH LIVE SUGGESTIONS ✨✨✨
function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Fetch suggestions
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/products/search?q=${query}`
        );
        const data = await res.json();
        setResults(data);
        setShowDropdown(true);
      } catch (err) {
        console.log(err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Submit search
  function submit(e) {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${query}`);
    setShowDropdown(false);
  }

  // Hide dropdown on click outside
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest(".search-container")) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);


  return (
    <div className="relative w-full max-w-2xl search-container">
      <form onSubmit={submit} className="relative w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          placeholder="Search products..."
          className="w-full pl-12 pr-12 py-3 border border-gray-600 rounded-full bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-peach-500"
        />

        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-peach-500 hover:bg-peach-600 px-3 py-1 rounded-full text-black text-sm"
        >
          Go
        </button>
      </form>

      {/* Suggestions */}
      {showDropdown && results.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-gray-900 border border-gray-700 mt-2 rounded-xl shadow-xl max-h-72 overflow-y-auto z-50 text-white">
          {results.map((item) => (
            <li
              key={item._id}
              onClick={() => navigate(`/product/${item._id}`)}
              className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-800"
            >
              <img
                src={item.image}
                alt=""
                className="w-12 h-12 object-cover rounded-md border border-gray-700"
              />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-peach-500 text-sm">₹{item.price}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* No results */}
      {showDropdown && query && results.length === 0 && (
        <div className="absolute top-full left-0 w-full mt-2 bg-gray-900 border border-gray-700 rounded-xl p-4 text-center text-gray-300">
          No products found
        </div>
      )}
    </div>
  );
}



// Badge component
function Badge({ count }) {
  if (!count || count <= 0) return null;
  const display = count > 99 ? "99+" : String(count);
  return (
    <span className="absolute -top-1 -right-1 min-w-[1.125rem] h-4 px-1 rounded-full bg-red-600 text-[10px] leading-4 text-white text-center font-bold">
      {display}
    </span>
  );
}



// Navbar main
const Navbar = ({ cartCount, onSearch }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (storedUser && token) setUser(storedUser);
  }, []);

  const cartQty = cartCount || Number(localStorage.getItem("cartCount") || 0);

  const handleLogin = () => navigate("/login");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-black shadow-md font-inter px-6">

      {/* TOP ROW */}
      <div className="h-20 flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">

        {/* Center Search Bar */}
        <div className="w-full sm:flex-1 flex justify-center order-2 sm:order-1">
          <SearchBar onSearch={onSearch} />
        </div>

        {/* Right-side icons */}
        <div className="flex items-center gap-4 order-1 sm:order-2">
          <ProfileMenu user={user} onLogin={handleLogin} onLogout={handleLogout} />

          <Link
            to="/cartpage"
            className="relative w-10 h-10 flex items-center justify-center rounded-full text-white bg-gray-800 hover:bg-gray-900 hover:scale-105 transition"
          >
            <ShoppingCart className="w-5 h-5" />
            <Badge count={cartQty} />
          </Link>
        </div>
      </div>



      {/* CATEGORY ROW */}
      <div className="pb-3">
        <div className="bg-black text-white text-center py-2 px-4 rounded-full font-semibold shadow-md">
          <ul className="flex flex-wrap justify-center items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.href}
                  className="px-2 py-1 text-white hover:text-peach-500"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
