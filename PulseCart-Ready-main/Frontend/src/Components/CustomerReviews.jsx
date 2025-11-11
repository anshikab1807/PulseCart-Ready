import React from "react";

const reviews = [
  {
    name: "Aarav Mehta",
    text: "PulseCart always delivers quality products quickly. The prices are fair and the experience is smooth!",
    image:
      "https://r2.erweima.ai/imgcompressed/img/compressed_6a27743ae08d87119836833f791c69ad.webp",
  },
  {
    name: "Ananya Iyer",
    text: "Shopping from PulseCart feels effortless. I love the product variety and beautiful interface!",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.yqZ8EQiqJ8bH_FDFFVs3ygHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    name: "Rohan Kapoor",
    text: "Fast delivery and responsive customer support. Definitely one of the best online stores in India!",
    image:
      "https://r2.erweima.ai/imgcompressed/img/compressed_b21dfa1818627cfdbffca2635bf1ccc8.webp",
  },
  {
    name: "Diya Sharma",
    text: "Excellent experience every time! The design and color theme make shopping feel luxurious.",
    image:
      "https://media.istockphoto.com/id/1163306517/photo/happy-successful-businesswoman-smiling-at-camera.jpg?s=612x612&w=0&k=20&c=Imb_CPf70upPoAWZo9QrlQGIRcE86WeKUWPRX489G90=",
  },

];

const ReviewCard = ({ name, text, image }) => (
  <div className="bg-white text-[#4A0E4E] rounded-[18px] w-[22vw] min-w-[260px] max-w-[340px] h-[280px] relative flex flex-col items-center justify-end mb-10 shadow-lg hover:scale-[1.03] transition-transform duration-300">
    <div className="absolute -top-[73px] left-1/2 transform -translate-x-1/2 w-[110px] h-[110px] bg-white rounded-full border-[4px] border-[#fcd5b5] flex items-center justify-center overflow-hidden shadow-md z-10">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover rounded-full"
      />
    </div>
    <div className="font-semibold text-[1.1rem] mt-[70px] mb-1 text-center text-[#6A1B4D]">
      {name}
    </div>
    <div className="text-sm text-[#333] mb-3 text-center px-3">{text}</div>
    <div className="mb-8 mt-6 text-center text-[#fdd835] text-[1.8rem] drop-shadow">
      {"★★★★★"}
    </div>
  </div>
);

const CustomerReviews = () => {
  return (
    <section className="bg-[#FFDAB9] pt-4 pb-12 w-full font-sans relative">
      <h2 className="text-[2.5rem] font-semibold text-center mb-[20px] text-[#6A1B4D]">
        Customer Reviews
      </h2>

      <div className="flex flex-wrap justify-around gap-6 px-8 mt-12">
        {reviews.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;