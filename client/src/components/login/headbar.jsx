import React from 'react'

function headbar() {
  return (
        <div className="fixed top-0 left-0 right-0 h-16 bg-blue-500 flex items-center justify-between px-4">
    <div className="flex items-center">
      <img src="logo.png" alt="Logo" className="h-8 mr-2" />
      <span className="text-white text-lg font-bold ">cocosys</span>
    </div>
  </div>
  )
}

export default headbar
