import React, { useState } from 'react';
import { FaBars, FaShoppingCart, FaUser, FaClipboardList, FaUserCog } from 'react-icons/fa'; // Import necessary icons

const sections = [
  {
    title: 'Raw',
    subSections: ['Buy', 'Use']
  },
  {
    title: 'Jobs',
    subSections: ['View', 'Add']
  },
  {
    title: 'Price List',
    subSections: []
  },
  {
    title: 'Inventory',
    subSections: []
  },
  {
    title: 'Employee',
    subSections: ['Add', 'Update']
  },
  {
    title: 'Admins',
    subSections: []
  }
];

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const handleSectionClick = (sectionIndex) => {
    setActiveSection(activeSection === sectionIndex ? null : sectionIndex);
  };

  const handleSubSectionClick = (subSection) => {
    // navigate ('/subSection')
    console.log('Navigating to:', subSection);
  };

  return (
    <div>
      {/* Ellipse indicator */}
      <div
        className="fixed bg-gray-800 rounded-full w-12 h-32 flex flex-col items-center justify-around text-white text-lg shadow-md z-40"
        style={{
          top: '50%',
          left: sidebarOpen ? '235px' : '10px',
          transform: 'translateY(-50%)',
          transition: 'left 0.3s ease-in-out'
        }}
      >
        <FaShoppingCart onClick={() => setSidebarOpen(!sidebarOpen)} />
        <FaUser onClick={() => setSidebarOpen(!sidebarOpen)} />
        <FaClipboardList onClick={() => setSidebarOpen(!sidebarOpen)}  />
        <FaUserCog onClick={() => setSidebarOpen(!sidebarOpen)}  />
        {/* Add more icons as needed */}
      </div>
      <div
        className={`fixed z-10 bg-gray-800 h-screen w-64 transform transition-transform ease-in-out duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        
        <ul>
          {sections.map((section, index) => (
            <li key={index}>
              <button
                className="w-full text-left px-4 py-2 text-white"
                onClick={() => handleSectionClick(index)}
              >
                {section.title}
              </button>
              {activeSection === index && (
                <ul>
                  {section.subSections.map((subSection, subIndex) => (
                    <li key={subIndex}>
                      <button
                        className="w-full text-left px-8 py-2 text-gray-300 hover:bg-gray-700"
                        onClick={() => handleSubSectionClick(subSection)}
                      >
                        {subSection}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
