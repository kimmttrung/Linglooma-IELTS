import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#f8fafc] py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-5xl font-normal font-['Inria_Sans'] text-black mb-4">
              Connect with Linglooma for your IELTS success!
            </h2>
          </div>
          <div className="text-center md:text-right">
            <p className="text-2xl font-normal font-['Inria_Sans'] text-black mb-2">
              144 Xuân Thủy, Cầu Giấy, Hà Nội
            </p>
            <p className="text-2xl font-normal font-['Inria_Sans'] text-black mb-2">
              +1 234 567 8901
            </p>
            <p className="text-2xl font-normal font-['Inria_Sans'] text-black mb-4">
              support@linglooma.com
            </p>
            <img 
              src="/images/img_logo_140x196.png" 
              alt="Linglooma Logo" 
              className="h-[140px] mx-auto md:ml-auto md:mr-0"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;