import React from "react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    title: "Shockproof Crystal Clear iPhone Case",
    mainImage:
      "https://i5.walmartimages.com/asr/dc695fb4-b0d3-4dbc-84ff-6f7a0d6d92a6.098622c3e2fee0c7658dc2b654ebf916.jpeg",
    price: 299,
    mrp: 799,
    smallImages: [
      "https://tse4.mm.bing.net/th/id/OIP.vIp9BKDHK69RP9Dij2ZA8AHaHa?cb=12&pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3",
      "https://tse1.mm.bing.net/th/id/OIP.wHVwxruQgjwKiA8QOSpT_QAAAA?cb=12&pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3",
      "https://tse1.mm.bing.net/th/id/OIP.QkPW2uW2W0xytcUeTP9ZMAHaKi?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    ],
    heading: "Trending Electronics",
  },
  {
    title: "Gorilla Grip Cutting Board Set of 3",
    mainImage:
      "https://tse2.mm.bing.net/th/id/OIP.PL5cmq5pAcoqrO7yVzd_cAHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    price: 699,
    mrp: 1999,
    smallImages: [
      "https://tse4.mm.bing.net/th/id/OIP.r4cBc2LA04VRZdP-YdaJDgHaHa?cb=12&pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3",
      "https://tse4.mm.bing.net/th/id/OIP.f592G7SHtZnTE-JuRIgu5gHaHa?cb=12&pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3",
      "https://tse4.mm.bing.net/th/id/OIP.Y4XvF75-lb3MsSfjIu33ZwHaHw?cb=12&pid=ImgDet&w=184&h=193&c=7&dpr=1.3&o=7&rm=3",
    ],
    heading: "Kitchen Essentials",
  },
  {
    title: "Women Floral Print Cotton Midi Dress",
    mainImage:
      "https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_100,w_1080/v1/assets/images/28593082/2024/3/30/8132cbeb-0bd7-409a-8168-203fff4c808d1711810668456KALINIFloralPrintA-LineMidiDress1.jpg",
    price: 849,
    mrp: 1999,
    smallImages: [
      "https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_100,w_1080/v1/assets/images/29367038/2024/5/6/99e953eb-7d2a-4feb-89f5-15911dc4c8db1714961961852VishudhFloralPrintEmpireMidiDress1.jpg",
      "https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_100,w_1080/v1/assets/images/29503938/2024/5/13/52d1dd1e-bab7-4492-b4ec-d8a5cf9f280c1715601815695KALINIWomenPrintedKeyholeNeckSequinnedFloralKurta1.jpg",
      "https://tse2.mm.bing.net/th/id/OIP.KdzTsIZX9NFeqZcKgApF-AHaJ4?cb=12&pid=ImgDet&w=184&h=245&c=7&dpr=1.3&o=7&rm=3",
    ],
    heading: "Fashion & Apparel",
  },
  // ... (other products)
];

const ProductGrid = () => {
  const navigate = useNavigate();

  const handleCardClick = (product) => {
    const query = new URLSearchParams({
      title: product.title,
      mainImage: product.mainImage,
      price: product.price,
      mrp: product.mrp,
      smallImages: product.smallImages.join(","),
    }).toString();
    navigate(`/product_detail?${query}`); // ✅ FIXED TEMPLATE STRING
  };

  return (
    <section className="bg-gradient-to-b from-[#FFE5D4] to-[#FFDAB9] py-16 px-4 relative font-inter">
      <h2 className="text-4xl font-extrabold text-center text-[#FF8C42] mb-16 drop-shadow-lg">
        Top Picks For You
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {products.map((product, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(product)}
            className="relative bg-gradient-to-tr from-white to-[#FFE5CC] rounded-3xl shadow-2xl p-6 cursor-pointer transform hover:-translate-y-3 hover:rotate-1 transition-all duration-500 flex flex-col justify-between border-2 border-transparent hover:border-[#FF8C42]"
          >
            <h3 className="font-bold text-[#FF8C42] mb-4 text-center text-lg hover:text-[#FFCBA4] transition-colors">
              {product.heading}
            </h3>

            {/* Product Image */}
            <div className="h-44 flex justify-center items-center rounded-xl overflow-hidden mb-4 relative group">
              <img
                src={product.mainImage}
                alt={product.title}
                className="max-h-full object-contain transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FFCBA4]/20 to-transparent opacity-0 group-hover:opacity-70 rounded-xl transition-all duration-500"></div>
            </div>

            {/* Price */}
            <div className="text-center mb-4">
              <span className="text-lg font-bold text-[#FF8C42]">₹{product.price}</span>
              {product.mrp && (
                <span className="text-sm text-gray-400 line-through ml-2">₹{product.mrp}</span>
              )}
            </div>

            {/* Small Thumbnails */}
            <div className="flex gap-2 justify-center flex-wrap mb-4">
              {product.smallImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`thumb-${i}`}
                  className="w-12 h-12 rounded-lg border border-gray-200 hover:border-[#FF8C42] hover:scale-125 transition-all duration-300"
                />
              ))}
            </div>

            <button className="mt-auto bg-[#FF8C42] text-white font-semibold py-2 px-4 rounded-xl hover:bg-[#FFCBA4] hover:text-[#FF8C42] transition-colors duration-300 w-full">
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Background glow effects */}
      <div className="absolute -top-20 -left-10 w-40 h-40 bg-[#FFCBA4]/20 rounded-full mix-blend-multiply animate-pulse"></div>
      <div className="absolute -bottom-24 -right-10 w-60 h-60 bg-[#FF8C42]/20 rounded-full mix-blend-multiply animate-pulse"></div>
    </section>
  );
};

export default ProductGrid;
