import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function ContactUs() {
  const peachLight = "#FFE5D4";
  const peachDark = "#FFDAB9";

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center font-sans py-20" style={{ backgroundColor: peachLight }}>
        <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md text-center space-y-4">
          <h2 className="text-3xl font-bold mb-2" style={{ color: peachDark }}>
            Contact Us
          </h2>
          <p className="text-gray-600 mb-2">
            We’re here to help! Reach out to us via email, phone, or visit our office.
          </p>

          {/* Email */}
          <p className="text-lg font-medium text-gray-800 mb-2">
            📧 Email: PulseCart@gmail.com
          </p>

          {/* Phone */}
          <p className="text-lg font-medium text-gray-800 mb-2">
            📞 Phone: 930-560-1570
          </p>

          {/* Office Address */}
          <p className="text-gray-700 text-sm">
             PulseCart Limited,<br />
            Office No. 5, 1st Floor, Building No. 10<br />
            Agra, India
          </p>

          {/* Business Hours */}
          <p className="text-gray-700 text-sm">
            ⏰ Business Hours: Mon-Fri: 9 AM - 6 PM, Sat: 10 AM - 4 PM
          </p>

          {/* Social Media */}
          <p className="text-gray-700 text-sm">
            🌐 Follow us on: 
            <a href="https://www.linkedin.com" className="text-blue-600 underline ml-1">LinkedIn</a>, 
          </p>

          <p className="text-sm text-gray-500 mt-2">
            We are here to assist you with any questions or support you need. Expect a reply within 24 hours.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
