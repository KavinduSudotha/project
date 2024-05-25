// PageNameContext.js

import React, { createContext, useState, useContext } from 'react';

// Creating a context
const PageNameContext = createContext();

// Custom hook to use the context
export const usePageName = () => useContext(PageNameContext);

// Provider component to wrap your app with
export const PageNameProvider = ({ children }) => {
  const [pageName, setPageName] = useState('');

  const setPage = (name) => {
    setPageName(name);
  };

  return (
    <PageNameContext.Provider value={{ pageName, setPage }}>
      {children}
    </PageNameContext.Provider>
  );
};
