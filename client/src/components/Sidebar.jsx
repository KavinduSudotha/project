import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiMenu, FiPackage, FiShoppingCart, FiBarChart2, FiUser, FiSettings, FiUsers } from 'react-icons/fi'; // Import icons from react-icons library

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsSidebarOpen(true);
  };

  const handleMouseLeave = () => {
    setIsSidebarOpen(false);
  };

  const sections = [
    { name: 'Home', icon: FiHome, link: '/' },
    { name: 'Price List', icon: FiShoppingCart, subSections: ['Add', 'View', 'Records'] },
    { name: 'RAW', icon: FiPackage, subSections: ['Buy', 'Use'] },
    { name: 'Inventory', icon: FiPackage, subSections: ['Live', 'Records'] },
    { name: 'Jobs', icon: FiBarChart2, subSections: ['Add', 'Update'] },
    { name: 'Reports', icon: FiBarChart2 },
    { name: 'Admins', icon: FiSettings },
    { name: 'Employees', icon: FiUsers }
  ];

  return (
    <div
      className="fixed left-0 top-0 h-screen bg-gray-800 text-white flex flex-col justify-between transition-all duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Sidebar content */}
      <div
        className={`flex flex-col items-center justify-start w-20 bg-gray-800 text-white overflow-hidden transition-all duration-300`}
        style={{ width: isSidebarOpen ? '240px' : '60px' }}
      >
        {/* Sidebar sections */}
        <div className={`flex flex-col items-start space-y-2 transition-all duration-300 ${isSidebarOpen ? 'w-full' : 'w-0'}`}>
          {sections.map((section, index) => (
            <div key={index} className="group">
              <button className="p-2 group-hover:bg-gray-700 flex items-center" onClick={() => setIsSidebarOpen(true)}>
                <section.icon size={20} />
                {isSidebarOpen && <span className="ml-2">{section.name}</span>}
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'block' : 'hidden'}`}>
                {section.subSections && section.subSections.map((subSection, subIndex) => (
                  <div key={subIndex} className={`ml-4 text-xs group-hover:text-white ${isSidebarOpen ? 'block' : 'hidden'}`}>
                    <Link to={`/${section.name}/${subSection}`} className="">{subSection}</Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar toggle button */}
      <button className="p-2">
        <FiMenu size={20} />
      </button>
    </div>
  );
};

export default Sidebar;
