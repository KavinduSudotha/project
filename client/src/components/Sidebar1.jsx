import React, { useState } from 'react';
import { FaBars, FaCubes, FaDollyFlatbed, FaClipboardList, FaUserCog, FaBox, FaAddressCard } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const sections = [
  {
    title: 'Raw',
    icon: <FaCubes />,
  },
  {
    title: 'Jobs',
    icon: <FaDollyFlatbed />
  },
  {
    title: 'Price List',
    icon: <FaClipboardList />
  },
  {
    title: 'Inventory',
    icon: <FaBox />
  },
  {
    title: 'Employee',
    icon: <FaAddressCard />
  },
  {
    title: 'Admins',
    icon: <FaUserCog />
  }
];

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleSectionClick = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="fixed z-10 bg-gray-800 h-screen flex items-center justify-start text-white"
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}>
      <div className={`overflow-hidden transition-all duration-300 ${isHovered ? 'w-36' : 'w-12'}`}>
        {sections.map((section, index) => (
          <div key={index} className="mb-1">
            <button className={`w-full p-2 flex items-center justify-start ${activeSection === index ? 'bg-blue-500' : 'hover:bg-gray-700'}`}
                    onClick={() => handleSectionClick(index)}>
             <Link to={section.link}>         
              <div className="flex items-center">
                {section.icon}
                {isHovered && <span className="ml-2">{section.title}</span>}
              </div>
              </Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
