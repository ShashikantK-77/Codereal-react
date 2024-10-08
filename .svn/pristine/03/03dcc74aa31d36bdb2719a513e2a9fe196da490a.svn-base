import React, { createContext, useContext, useState } from 'react';

// Step 1: Create a new context
const OrderContext = createContext();

// Step 2: Create a custom hook to access the context
export const useOrderContext = () => {
  return useContext(OrderContext);
};

// Step 3: Create a context provider component
export const OrderContextProvider = ({ children }) => {
  const [order, setOrder] = useState(null);

  const setOrderData = (orderData) => {
    setOrder(orderData);
    // console.log("order is here",order);
  };

  return (
    <OrderContext.Provider value={{ order, setOrderData }}>
      {children}
    </OrderContext.Provider>
  );
};
