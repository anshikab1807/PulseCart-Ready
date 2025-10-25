import React from "react";
import { Heart, ShoppingBag } from "lucide-react";

// Product data
const bestSellers = [
  {
    brand: "CosmoTech",
    name: "Wireless Noise Cancelling Headphones",
    price: 3499,
    oldPrice: 4999,
    discount: 30,
    badge: "New Arrival",
    category: "Electronics",
    image:
      "https://www.bhphotovideo.com/images/images2000x2000/sony_wh1000xm2_b_1000x_wireless_noise_canceling_headphones_1361028.jpg",
  },
  {
    brand: "Pulse Styles",
    name: "Men's Slim Fit Denim Jacket",
    price: 1799,
    oldPrice: 2999,
    discount: 40,
    badge: "Limited Stock",
    category: "Fashion",
    image:
      "https://i.pinimg.com/736x/dc/91/27/dc91276214b9136114ef3a652996d2a4.jpg",
  },
  {
    brand: "EcoHome",
    name: "Reusable Bamboo Dinnerware Set",
    price: 1299,
    oldPrice: 1999,
    discount: 35,
    badge: "Bestseller",
    category: "Home & Kitchen",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.a6mRdHeHswmfMlxvjT3AVQHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    brand: "FitPro",
    name: "Smart Fitness Tracker Watch",
    price: 2499,
    oldPrice: 3499,
    discount: 28,
    badge: "New Arrival",
    category: "Fitness",
    image: "https://m.media-amazon.com/images/I/61SPoXa5gtL._AC_.jpg",
  },
  {
    brand: "Artisan",
    name: "Handcrafted Ceramic Vase",
    price: 799,
    oldPrice: 1199,
    discount: 33,
    badge: "Limited Stock",
    category: "Decor",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.Juzl2Dx-Et_r8HRD-oGNdQHaIv?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
];

// Format INR
const formatINR = (n) =>
  typeof n === "number"
    ? n.toLocaleString("en-IN", { maximumFractionDigits: 0 })
    : n;

// MAIN SECTION
const BestSellers = () => {
  return (
    <section className="px-4 py-16 bg-gradient-to-b from-[#FFF1E0] to-[#FFE1D6]">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#FF8C42] drop-shadow-sm">
          🌟 Trending Best Sellers
        </h2>
        <p className="mt-3 text-[#5A3E36] text-base md:text-lg">
          Unique handpicked products, just for you
        </p>
        <div className="w-20 h-1 bg-[#FF8C42] mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
        {bestSellers.map((item, i) => (
          <BestSellerCard key={i} item={item} />
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden -mx-4 px-4">
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-thin scrollbar-thumb-[#FF8C42]/70">
          {bestSellers.map((item, i) => (
            <div key={i} className="snap-start shrink-0 w-[220px]">
              <BestSellerCard item={item} compact />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CARD COMPONENT
const BestSellerCard = ({ item, compact = false }) => {
  const { brand, name, price, oldPrice, discount, image, badge, category } = item;
  const pct = discount ? `${discount}% OFF` : null;

  return (
    <article
      className={`relative bg-white rounded-2xl shadow-xl border border-[#FFD5B6] 
      hover:shadow-[0_4px_20px_rgba(255,140,66,0.3)] hover:scale-105 hover:-rotate-1
      transition-all duration-300 ease-out p-4`}
    >
      {/* Badge */}
      {badge && (
        <span className="absolute top-3 left-3 bg-gradient-to-r from-[#FFB085] to-[#FF8C42] text-white px-2 py-1 text-xs font-bold rounded-full">
          {badge}
        </span>
      )}

      {/* Category Tag */}
      {category && (
        <span className="absolute top-3 right-3 bg-[#FFF6EF] text-[#FF8C42] px-2 py-1 text-xs font-semibold rounded-full border border-[#FF8C42]">
          {category}
        </span>
      )}

      {/* Image */}
      <div className="relative w-full overflow-hidden rounded-xl mb-4 aspect-[3/4] bg-[#FFF4ED]">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          loading="lazy"
        />

        {/* Action icons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            aria-label="Add to cart"
            className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 transition"
          >
            <ShoppingBag className="w-4 h-4 text-[#FF8C42]" />
          </button>
          <button
            aria-label="Add to wishlist"
            className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 transition"
          >
            <Heart className="w-4 h-4 text-[#FF8C42]" />
          </button>
        </div>
      </div>

      {/* Text */}
      <h3 className="text-sm font-bold tracking-wide text-[#FF8C42] uppercase">{brand}</h3>
      <p
        className={compact ? "text-xs text-gray-500 mt-1 line-clamp-2" : "text-sm text-gray-600 mt-1 line-clamp-2"}
        title={name}
      >
        {name}
      </p>

      {/* Pricing */}
      <div className={compact ? "mt-2 text-sm font-semibold text-gray-900" : "mt-2 text-base font-semibold text-gray-900"}>
        ₹ {formatINR(price)}{" "}
        {oldPrice && <span className="text-gray-400 line-through ml-1 text-xs font-normal">₹ {formatINR(oldPrice)}</span>}{" "}
        {pct && <span className="ml-1 text-xs font-bold text-[#FF8C42]">{pct}</span>}
      </div>
    </article>
  );
};

export default BestSellers;
