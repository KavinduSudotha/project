import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiMenu, FiPackage, FiShoppingCart, FiBarChart2, FiSettings, FiUsers } from 'react-icons/fi'; // Import icons from react-icons library

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [activeSubSection, setActiveSubSection] = useState(null);

  const handleMouseEnter = () => {
    setIsSidebarOpen(true);
  };

  const handleMouseLeave = () => {
    setIsSidebarOpen(false);
  };

  const handleSectionClick = (index) => {
    if (activeSection === index) {
      setActiveSection(null);
    } else {
      setActiveSection(index);
      setActiveSubSection(null);
    }
  };

  const handleSubSectionClick = (index) => {
    setActiveSubSection(index);
  };

  const sections = [
    { name: 'Home', icon: FiHome, link: '/homepage' },
    { name: 'Price List', icon: FiShoppingCart, subSections: [{ name: 'Add', link: '/AddPriceList' },{ name: 'View', link: '/viewpricelist' }, { name: 'Records', link: '/RecordsPricelist' }] },
    { name: 'RAW', icon: FiPackage, subSections: [{ name: 'Buy', link: '/rawbuypage' }, { name: 'Use', link: '/rawuse'}, { name: 'Sell', link: '/sell'}] },
    { name: 'Inventory', icon: FiPackage, subSections: ['Live', 'Records'] },
    { name: 'Jobs', icon: FiBarChart2, subSections: [{ name: 'Add', link: '/AddJobPage' }, { name: 'Records and Update', link: '/updatejob' }] },
    { name: 'Reports', icon: FiBarChart2 },
    { name: 'Admins', icon: FiSettings },
    { name: 'Employee', icon: FiUsers , link: '/employeepage'}
  ];

  return (
    <div
      className="fixed left-0 top-0 h-screen bg-gray-800 text-white transition-all duration-300 z-10"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
   
      {/* Company Details */}
      <div className={`p-4 ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <div className="text-2xl font-bold mb-2">Thuselco Pvt Ltd</div>
        <div className="text-sm mb-4 text-left">Coco Sheet Manufacturing <br></br> Management System</div>
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gray-500 rounded-full mr-2"></div> {/* Placeholder for user avatar */}
          <div>
            <div className="text-sm font-medium">John Doe</div>
            <div className="text-xs text-gray-400">User ID: 12345</div>
            <div className="text-xs text-gray-400">Job Role: Admin</div>
          </div>
        </div>
      </div>

      {/* Sidebar content */}
      <div
        className={`flex flex-col items-center bg-gray-800 text-white overflow-hidden `}
        style={{ width: isSidebarOpen ? '240px' : '60px' }} >

        {/* Sidebar sections */}
        <div className={`flex flex-col items-start space-y-2 w-full`}>
          {sections.map((section, index) => (
            <div key={index} className="group">
              <Link
                to={section.link}
                className={`p-2 flex items-center w-full ${activeSection === index ? 'bg-gray-700' : ''}`}
                onClick={() => handleSectionClick(index)}
              >
                <div className="flex items-center">
                  <section.icon size={20} />
                  {isSidebarOpen && <span className="ml-2">{section.name}</span>}
                </div>
              </Link>
              {activeSection === index && section.subSections && (
                <div className={`overflow-hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>
                  {section.subSections.map((subSection, subIndex) => (
                    <Link
                      key={subIndex}
                      to={typeof subSection === 'object' ? subSection.link : `/${section.name}/${subSection}`}
                      className={`ml-4 text-base ${activeSubSection === subIndex ? 'text-white' : 'text-gray-300'} ${isSidebarOpen ? 'block' : 'hidden'}`}
                      onClick={() => handleSubSectionClick(subIndex)}
                      style={{ transition: 'opacity 0.5s ease', opacity: isSidebarOpen ? 1 : 0 }}
                    >
                      <div
                        className={`hover:text-white hover:bg-gray-700 px-2 py-1 rounded transition-colors duration-300 ${activeSubSection === subIndex ? 'bg-gray-700' : ''}`}
                      >
                        {typeof subSection === 'object' ? subSection.name : subSection}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
