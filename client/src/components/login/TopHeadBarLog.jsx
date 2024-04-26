import React from 'react';
import Logo from '../../asset/Logo.png';

const TopHeadBar = () => {
  return (
    <div>
      <div className="h-16 flex items-center justify-between px-4" style={{ backgroundColor: 'rgba(38, 35, 41)' }}>
        {/* Logo */}
        <div className="flex items-center">
          <div className="bg-white rounded-full p-2 mr-2">
            <img src={Logo} alt="COCOSYS Logo" className="h-10" />
          </div>
          {/* Application Name */}
          <h1 className="text-white text-xl font-semibold">COCOSYS</h1>
        </div>
      </div>
      {/* Separator Line */}
      <div className="bg-white h-1"></div>
    </div>
  );
};

export default TopHeadBar;
