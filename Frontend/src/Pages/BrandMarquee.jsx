import React, { useState } from 'react';
import "../Styles/BrandMarquee.css";

const innovators = [
  {
    name: 'LuminAI',
    logo: 'https://assets-global.website-files.com/633eca9ef5936405a2224b4d/635e7a273ea93590b706df9f_63572b42f197569fdb23a85c_luminai-logo.png',
    url: 'https://luminai.io',
  },
  {
    name: 'QuantumWear',
    logo: 'https://nebula.wsimg.com/532eec1a22b6f904d7ec42018f9d1234?AccessKeyId=0062E4483BE45519BE30&disposition=0&alloworigin=1',
    url: 'https://quantumwear.com',
  },
  {
    name: 'NeoCanvas',
    logo: 'https://static.vecteezy.com/system/resources/previews/028/132/889/original/neo-logo-design-inspiration-for-a-unique-identity-modern-elegance-and-creative-design-watermark-your-success-with-the-striking-this-logo-vector.jpg',
    url: 'https://neocanvas.art',
  },
  {
    name: 'SkyPulse',
    logo: 'https://yt3.googleusercontent.com/q3OnFQbuAMDZvILCqrd8iIEGk-RXUjILGb5RTvweYSCeJOkeLHaTTrw5QwRpSCREddAnLztYFw=s900-c-k-c0x00ffffff-no-rj',
    url: 'https://skypulse.tech',
  },
  {
    name: 'EcoFusion',
    logo: 'https://tse4.mm.bing.net/th/id/OIP.yrMWiSKRiqmQLW8Wc9eAJwHaHa?cb=12&pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3',
    url: 'https://ecofusion.io',
  },
  {
    name: 'Aurora Synth',
    logo: 'https://img.freepik.com/premium-vector/aurora-logo-design-icon-illustration-vector-template_661040-4281.jpg',
    url: 'https://aurorasynth.com',
  },
  {
    name: 'PixelAlchemy',
    logo: 'https://dcassetcdn.com/profile_pics/16358/16358_image.jpg',
    url: 'https://pixelalchemy.io',
  },
  {
    name: 'NovaThreads',
    logo: 'https://tse2.mm.bing.net/th/id/OIP.EzCCVya_01cPHTiaww5CjAHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3',
    url: 'https://novathreads.com',
  },
  {
    name: 'CelestiGlow',
    logo: 'https://mir-s3-cdn-cf.behance.net/projects/404/b0f473203392913.Y3JvcCwxMzgwLDEwODAsMzAsMA.png',
    url: 'https://celestiglow.art',
  },
];

const BrandMarquee = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState('');

  const handleClick = (innovator) => {
    setToastText(`🚀 Exploring ${innovator.name}...`);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      window.open(innovator.url, '_blank');
    }, 1000);
  };

  return (
    <div className="bg-gradient-to-r from-[#FFDAB9] to-[#FFE5D4] px-4 py-12 font-inter rounded-2xl shadow-[inset_0_0_30px_rgba(255,140,66,0.15)] relative overflow-hidden">
      <h2 className="text-3xl font-bold text-[#FF8C42] text-center mb-6 drop-shadow-lg">
        Top Innovators & Visionaries
      </h2>

      {showToast && <div className="custom-toast">{toastText}</div>}

      <div className="brand-marquee-container">
        <div className="brand-marquee-row">
          <div className="brand-marquee-track">
            {innovators.concat(innovators).map((innovator, index) => (
              <img
                key={index}
                src={innovator.logo}
                alt={innovator.name}
                className="brand-logo hover:scale-110 transition-transform duration-500 cursor-pointer"
                onClick={() => handleClick(innovator)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative peach-glow elements */}
      <div className="absolute -top-16 -left-10 w-40 h-40 bg-[#FF8C42]/20 rounded-full mix-blend-multiply animate-pulse"></div>
      <div className="absolute -bottom-16 -right-10 w-60 h-60 bg-[#FF8C42]/30 rounded-full mix-blend-multiply animate-pulse"></div>
    </div>
  );
};

export default BrandMarquee;
