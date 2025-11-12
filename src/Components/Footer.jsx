import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gradient-to-r from-[#1A1A1A] to-[#2E2E2E] text-white font-sans">
      <div className="flex flex-wrap justify-between px-10 pt-8 pb-4 border-b border-[#3d3d3d]">

        <div className="min-w-[160px] mb-6">
          <h4 className="text-sm text-[#b0b0b0] mb-3 font-semibold">ABOUT</h4>
          <div className="text-xs leading-6 space-y-1">
            <Link to="/contact" className="block hover:text-[#fdd835] transition-colors">Contact Us</Link>
            <Link to="/about" className="block hover:text-[#fdd835] transition-colors">About Us</Link>
          </div>
        </div>

        <div className="min-w-[160px] mb-6">
          <h4 className="text-sm text-[#b0b0b0] mb-3 font-semibold">COMPANIES</h4>
          <div className="text-xs leading-6 space-y-1">
            <a href="https://www.meesho.com/" target="_blank" rel="noopener noreferrer" className="block hover:text-[#fdd835] transition-colors">Meesho</a>
            <a href="https://www.flipkart.com/" target="_blank" rel="noopener noreferrer" className="block hover:text-[#fdd835] transition-colors">Flipkart</a>
          </div>
        </div>

        <div className="min-w-[160px] mb-6">
          <h4 className="text-sm text-[#b0b0b0] mb-3 font-semibold">HELP</h4>
          <div className="text-xs leading-6 space-y-1">
            <Link to="/faq" className="block hover:text-[#fdd835] transition-colors">FAQ</Link>
            <Link to="/support" className="block hover:text-[#fdd835] transition-colors">Support</Link>
          </div>
        </div>

        <div className="min-w-[250px] mb-6 border-l border-[#444] pl-8">
          <h4 className="text-sm text-[#b0b0b0] mb-3 font-semibold">Mail Us:</h4>
          <div className="text-xs leading-[1.7] text-[#e0e0e0]">
            PulseCart Limited,<br />
            Office No. 5, 1st Floor, Building No. 10<br />
            Agra, India
          </div>
        </div>

        <div className="min-w-[250px] mb-6">
          <h4 className="text-sm text-[#b0b0b0] mb-3 font-semibold">Registered Office Address:</h4>
          <div className="text-xs leading-[1.7] text-[#e0e0e0]">
            PulseCart Limited,<br />
            Office No. 5, 1st Floor, Building No. 10<br />
            Uttar Pradesh, India<br />
            Telephone:{' '}
            <a href="tel:+919305601570" className="text-[#fdd835] hover:underline">
              +91 9305601570
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center px-10 py-4 text-sm bg-[#111111]">
        <div className="flex flex-wrap gap-8">
          <Link to="/seller-onboarding" className="flex items-center gap-2 hover:text-[#fdd835] transition-all duration-200">
            <span className="text-yellow-400 text-lg">&#128188;</span> Become a Seller
          </Link>
        </div>

        <div className="text-[#b0b0b0]">© PulseCart. All Rights Reserved.</div>

        <div className="flex gap-2">
          <img src="https://img.icons8.com/color/36/visa.png" alt="Visa" />
          <img src="https://img.icons8.com/color/36/mastercard-logo.png" alt="Mastercard" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
