import { Link } from "react-router-dom";

const categories = [
  { id: 1, name: "Fashion", image: "https://i.pinimg.com/originals/7f/be/92/7fbe92da60f274ce850b00e5fefb73e4.jpg", category: "Fashion" },
  { id: 2, name: "Electronics", image: "https://tse4.mm.bing.net/th/id/OIP.8KtbJ7YwV2tav2239_tmUQAAAA?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3", category: "Electronics" },
  { id: 3, name: "Furniture", image: "https://th.bing.com/th/id/R.0a95fad0aa00fdb4a28c2f8036b86fb0?rik=iWlbwqkX%2bC6npg&riu=http%3a%2f%2fdesignbump.com%2fwp-content%2fuploads%2f2015%2f08%2fLiving-Room-Furniture.jpg&ehk=AD3SlPiEYdFIApYTky%2bj3HSbgbO%2feLCkm%2b%2fjY%2baZUjk%3d&risl=&pid=ImgRaw&r=0", category: "Furniture" },
  { id: 4, name: "Appliances", image: "https://img.freepik.com/premium-photo/smart-refrigerator-white-background_1111059-10097.jpg", category: "Appliances" },
  { id: 5, name: "Toys", image: "https://tse4.mm.bing.net/th/id/OIP.xHeAwQmehfagfXCYvlPaOAHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3", category: "Toys" },
  { id: 6, name: "Cosmetics", image: "https://d2gg9evh47fn9z.cloudfront.net/1600px_COLOURBOX3684969.jpg", category: "Cosmetics" },
  { id: 7, name: "Kilos", image: "https://c8.alamy.com/comp/2RWT2C2/kilos-of-beef-tomatoes-in-a-vegetable-crate-2RWT2C2.jpg", category: "Kilos" },
  { id: 8, name: "Sports", image: "https://th.bing.com/th/id/R.5bd0391972869105cdcf6f520827c215?rik=S5nJHKDTmtetQA&riu=http%3a%2f%2fcdn.ttgtmedia.com%2frms%2feditorial%2fsports-290px.jpg&ehk=JqI92co6MzMyS%2fnQks92KfSXTxyYnA0li2rVL3498fw%3d&risl=&pid=ImgRaw&r=0", category: "Sports" },
  { id: 9, name: "Books", image: "https://i.pinimg.com/originals/1b/38/f3/1b38f3ade75e9d3717e9a60cef8e9c25.jpg", category: "Books" },
  { id: 10, name: "Gaming", image: "https://tse2.mm.bing.net/th/id/OIP.AffXpaHrd5c0CgyLRAk7lgAAAA?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3", category: "Gaming" },
  { id: 11, name: "Pets", image: "https://tse3.mm.bing.net/th/id/OIP.Qi2mS11Ml1PRAYV2cZYJAQHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3", category: "Pets" },
  { id: 12, name: "Stationery", image: "https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v530-nunoon-13-planners_2_1.jpg?w=1200&h=1200&dpr=1&fit=clip&crop=default&fm=jpg&q=75&vib=3&con=3&usm=15&cs=srgb&bg=F4F4F3&ixlib=js-2.2.1&s=62301c6ab64bf06696b2799b15bd1a1d", category: "Stationery" },
  { id: 13, name: "Travel", image: "https://wallpapers.com/images/file/travel-pictures-jx6196zv3rpsmez5.jpg", category: "Travel" },
  { id: 14, name: "Music", image: "https://tse3.mm.bing.net/th/id/OIP.LfjSr6lLnH0nq5xR6gOvGwHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3", category: "Music" },
  { id: 15, name: "Health", image: "https://static.vecteezy.com/system/resources/thumbnails/029/545/059/small_2x/pharmaceutical-medicine-pills-and-capsules-on-wooden-table-in-dark-room-ai-generated-pro-photo.jpg", category: "Health" },
  { id: 16, name: "Gardening", image: "https://www.birdsandblooms.com/wp-content/uploads/2021/04/lush-patio-variety-pots-scaled.jpg", category: "Gardening" },
];

function CategoryCircles() {
  return (
    <section className="bg-gradient-to-b from-[#FFF1E0] to-[#FFE1D6] px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#FF8C42] mb-8">
        Explore Categories
      </h2>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-5 xl:grid-cols-8 gap-8 place-items-center">
        {categories.map((cat) => (
          <Link
            to={`/category?cat=${cat.category}`}
            key={cat.id}
            className="group relative flex flex-col items-center transition-transform duration-500 hover:scale-110 hover:-translate-y-2"
          >
            {/* Circle Image with gradient border */}
            <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-lg">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-tr from-[#FFD5B6] via-[#FFB085] to-[#FF8C42] opacity-0 group-hover:opacity-80 transition-opacity duration-500 mix-blend-overlay"></div>
            </div>

            <span className="text-sm mt-3 font-semibold text-gray-700 group-hover:text-[#FF8C42] transition-colors text-center">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden -mx-4 px-4 overflow-x-auto flex gap-5 snap-x snap-mandatory pb-6 scrollbar-thin scrollbar-thumb-[#FF8C42]/70">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/category?cat=${cat.category}`}
            className="snap-start flex flex-col items-center w-24 group transition-transform duration-500 hover:scale-110 hover:-translate-y-2"
          >
            <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-lg">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-tr from-[#FFD5B6] via-[#FFB085] to-[#FF8C42] opacity-0 group-hover:opacity-80 transition-opacity duration-500 mix-blend-overlay"></div>
            </div>
            <span className="text-sm mt-2 font-semibold text-gray-700 group-hover:text-[#FF8C42] text-center">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CategoryCircles;
