
import React from 'react';

const DeviceFrame = ({ children, size = 'normal' }) => {
  const sizes = {
    small: 'w-[140px]',
    normal: 'w-[170px]',
    large: 'w-[210px]'
  };

  return (
    <div className={`relative ${sizes[size]} mx-auto`}>
      <div className="relative w-full aspect-[9/19.5] bg-[#1E1E1E] rounded-[55px] p-1 shadow-[0_0_60px_-15px_rgba(0,0,0,0.3)]">
        <div className="relative w-full h-full rounded-[45px] overflow-hidden border-4 border-[#121212] bg-black">
          <div className="absolute top-[100px] -left-[6px] w-[4px] h-8 bg-[#121212] rounded-l-xl"></div>
          <div className="absolute top-[180px] -left-[6px] w-[4px] h-12 bg-[#121212] rounded-l-xl"></div>
          <div className="absolute top-[240px] -left-[6px] w-[4px] h-12 bg-[#121212] rounded-l-xl"></div>
          <div className="absolute top-[180px] -right-[6px] w-[4px] h-16 bg-[#121212] rounded-r-xl"></div>
          <div className="relative w-full h-full overflow-hidden">
            {children}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceFrame;
