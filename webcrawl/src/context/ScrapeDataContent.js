"use client"
import React, { createContext, useState} from 'react';

const ScrapDataContext = createContext({
  products: [],
  setProducts: () => {},
});

function ScrapDataProvider({ children }) {
  const [products, setProducts] = useState([]);

  const handleSetData = (newProducts) => {
    setProducts(newProducts);
  };

  return (
    <ScrapDataContext.Provider value={{ products, setProducts: handleSetData }}>
      {children}
    </ScrapDataContext.Provider>
  );
}

export { ScrapDataContext, ScrapDataProvider };