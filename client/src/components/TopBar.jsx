import React from 'react'
import Logo from '../asset/Logo.png';
import AfLogin from '../components/AfLogin';

function TopBar() {
  return (
    <div>
        <div className="h-16 flex items-center justify-between px-4" style={{ backgroundColor: 'rgba(38, 35, 41)' }}>
        {/* Logo */}
        <div className="flex items-center">
          <div className="bg-white rounded-full p-2 mr-2">
            <img src={Logo} alt="Logo" className="h-10" />
          </div>
          {/* COCOSYS Name */}
          <h1 className="text-white text-4xl font-bold" > C O C O S Y S</h1>

        </div>

        <AfLogin />

       
      </div>
      {/* White line */}
      <div className="bg-white h-1"></div>
    </div>
  )
}

export default TopBar
