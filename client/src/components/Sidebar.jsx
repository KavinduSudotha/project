import React, { useState } from 'react';
import { FaBars, FaShoppingCart, FaUser, FaClipboardList, FaUserCog, FaBox } from 'react-icons/fa'; // Import necessary icons

const sections = [
  {
    title: 'Raw',
    icon: <FaShoppingCart />,
    subSections: ['Buy', 'Use']
  },
  {
    title: 'Jobs',
    icon: <FaUser />,
    subSections: ['View', 'Add']
  },
  {
    title: 'Price List',
    icon: <FaClipboardList />,
    subSections: []
  },
  {
    title: 'Inventory',
    icon: <FaBox />,
    subSections: []
  },
  {
    title: 'Employee',
    icon: <FaUserCog />,
    subSections: ['Add', 'Update']
  },
  {
    title: 'Admins',
    icon: <FaUserCog />,
    subSections: []
  }
];

const Sidebar = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  const handleSectionClick = (index) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div
      className="fixed z-10 bg-gray-800 h-screen flex flex-col items-center justify-center text-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <FaBars className="mb-4 cursor-pointer" />
      <div className={`overflow-hidden transition-all duration-300 ${isHovered ? 'w-64' : 'w-16'}`}>
        {sections.map((section, index) => (
          <div key={index}>
            <button
              className="w-full p-2 flex items-center justify-center"
              onClick={() => handleSectionClick(index)}
            >
              {section.icon}
              <span className="ml-2">{section.title}</span>
            </button>
            {expandedSections[index] && section.subSections.length > 0 && (
              <ul>
                {section.subSections.map((subSection, subIndex) => (
                  <li key={subIndex}>
                    <button className="w-full p-2 flex items-center justify-center">{subSection}</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
