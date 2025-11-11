import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import HeroBanner from "../Components/HeroBanner";
import CategoryCircles from "../Components/CategoryCircles";
import BestSellers from "../Components/BestSeller";
import CustomerReviews from "../Components/CustomerReviews";
import Footer from "../Components/Footer";
import ProductGrid from "../Components/ProductGrid";
import BrandMarquee from "./BrandMarquee";

function LandingPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gray-100 transition-all duration-500">
      <Navbar />
      <HeroBanner />
      <CategoryCircles />
      <BestSellers />

      {/* Coupon banner removed */}

      <ProductGrid />
      <BrandMarquee />
      <CustomerReviews />
      <Footer />
    </div>
  );
}

export default LandingPage;
