import React from 'react';

const Tabs = () => {
  return (
    <div className="flex">
      <TabButton label="Raw">
        <div className="flex flex-col">
          <SubsectionButton>Buy</SubsectionButton>
          <SubsectionButton>Use</SubsectionButton>
        </div>
      </TabButton>
      <TabButton label="Jobs">
        <div className="flex flex-col">
          <SubsectionButton>View</SubsectionButton>
          <SubsectionButton>Add</SubsectionButton>
        </div>
      </TabButton>
      <TabButton label="Price List">
        {/* Subsections for Price List */}
      </TabButton>
      <TabButton label="Inventory">
        {/* Subsections for Inventory */}
      </TabButton>
      <TabButton label="Employee">
        <div className="flex flex-col">
          <SubsectionButton>Add</SubsectionButton>
          <SubsectionButton>Edit</SubsectionButton>
        </div>
      </TabButton>
      <TabButton label="Admins">
        {/* Subsections for Admins */}
      </TabButton>
    </div>
  );
};

const TabButton = ({ children, label }) => {
  return (
    <div className="relative group">
      <button className="py-2 px-4 mb-2 rounded-md bg-gray-200 text-gray-800 hover:bg-blue-400 hover:text-white">
        {label}
      </button>
      <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 z-10">
        {children}
      </div>
    </div>
  );
};

const SubsectionButton = ({ children }) => {
  return (
    <button className="block w-full px-4 py-2 text-left bg-gray-200 text-gray-800 hover:bg-gray-300">
      {children}
    </button>
  );
};

export default Tabs;
