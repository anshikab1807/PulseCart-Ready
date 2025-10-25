import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import '../Styles/swiper-custom.css';

const slides = [
  {
    src: 'https://cdn.igp.com/f_auto,q_auto:eco,t_pnopt32prodlp/banners/bhai_dooj_d_banners_5_1760102300293',
    title: 'Trending Menswear',
    subtitle: 'Up to 50% off on latest styles'
  },
  {
    src: 'https://cdn.igp.com/f_auto,q_auto:eco,t_pnopt32prodlp/banners/diwali_gifts_d_banners_5_1759759994997',
    title: 'Fragrance Affair',
    subtitle: 'Smell exquisite, feel confident'
  },
  {
    src: 'https://cdn.igp.com/f_auto,q_auto:eco,t_pnopt32prodlp/banners/cakes_at_low_price_d_banners_5_1759921247015',
    title: 'Summer Collection',
    subtitle: 'Fresh looks for sunny days'
  },
  {
    src: 'https://cdn.igp.com/f_auto,q_auto:eco,t_pnopt32prodlp/banners/30_mins_delivery_d_banners_5_1752565544129',
    title: 'Makeup Essentials',
    subtitle: 'Glow like never before'
  },
  {
    src: 'https://cdn.igp.com/f_auto,q_auto:eco,t_pnopt32prodlp/banners/anniversary_d_banners_5_20240521142743.jpg',
    title: 'Colour Pop',
    subtitle: 'Add vibrant hues to your style'
  }
];

const PromoSlider = () => {
  return (
    <section className="w-full py-8">
      <Swiper
        className="mySwiper"
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        loop={true}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination, EffectCoverflow]}
      >
        {slides.map((slide, i) => (
          <SwiperSlide
            key={i}
            className="flex justify-center items-center w-[300px] h-[400px] rounded-2xl overflow-hidden relative"
          >
            <img
              src={slide.src}
              alt={slide.title}
              className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            {/* Text overlay */}
            <div className="absolute bottom-5 left-5 text-white z-10">
              <h2 className="text-xl md:text-2xl font-bold drop-shadow-lg">{slide.title}</h2>
              <p className="text-sm md:text-base drop-shadow-md">{slide.subtitle}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Dots */}
      <style>
        {`
          .swiper-pagination-bullet {
            width: 12px;
            height: 12px;
            background: #FF6347; 
            opacity: 0.7;
            transition: all 0.3s;
          }
          .swiper-pagination-bullet-active {
            transform: scale(1.5);
            opacity: 1;
            background: #FFD700;
          }
        `}
      </style>
    </section>
  );
};

export default PromoSlider;