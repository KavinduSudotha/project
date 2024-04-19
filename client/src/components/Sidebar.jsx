import React, { useState } from 'react';
import { FaBars, FaCubes, FaDollyFlatbed, FaClipboardList, FaUserCog, FaBox, FaAddressCard } from 'react-icons/fa'; // Import necessary icons

const sections = [
  {
    title: 'Raw',
    icon: <FaCubes />,
    subSections: ['Buy', 'Use']
  },
  {
    title: 'Jobs',
    icon: <FaDollyFlatbed />,
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
    icon: <FaAddressCard />,
    subSections: ['Add', 'Update']
  },
  {
    title: 'Admins',
    icon: <FaUserCog />,
    subSections: []
  }
];

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const handleSectionClick = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <div
      className="fixed z-10 bg-gray-800 h-screen flex items-center justify-start text-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
    
      <div className={`overflow-hidden transition-all duration-300 ${isHovered ? 'w-64' : 'w-12'}`}>
        {sections.map((section, index) => (
          <div key={index}>
            <button
              className="w-full p-2 flex items-center justify-start"
              onClick={() => handleSectionClick(index)}
            >
              <div className="flex items-center"> {/* Added a container div for each icon */}
                {section.icon}
                {isHovered && <span className="ml-2">{section.title}</span>}
              </div>
            </button>
            {activeSection === index && section.subSections.length > 0 && (
              <ul>
                {section.subSections.map((subSection, subIndex) => (
                  <li key={subIndex}>
                    <button className="w-full p-2 flex items-center justify-start">{subSection}</button>
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
