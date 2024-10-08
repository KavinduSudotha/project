import React from 'react';

function AfLogin({ username, role, profileImage }) {
  return (
    <div>
      {/* Search bar */}
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-700 text-white px-3 py-1 rounded mr-2"
        />
        {/* User profile */}
        <div className="flex items-center">
          <img src={profileImage} alt="User Profile" className="h-8 rounded-full" />
          <div className="ml-2">
            <h3 className="text-white">{username}</h3>
            <h4 className="text-gray-400 text-sm">{role}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AfLogin;
