// ListContext.js

import React, { createContext, useContext, useState } from 'react';

const ListContext = createContext();

export const useListContext = () => {
  return useContext(ListContext);
};

export const ListContextProvider = ({ children }) => {

    const existingClientDataString = localStorage.getItem('clientlist');
    let existingClientData = existingClientDataString ? JSON.parse(existingClientDataString) : [];

    const existingMasterDataString = localStorage.getItem('masterlist');
    let existingMasterData = existingMasterDataString ? JSON.parse(existingMasterDataString) : [];

    const existingMasterOrderDataString = localStorage.getItem('masterorder');
    let existingMasterOrderData = existingMasterOrderDataString ? JSON.parse(existingMasterOrderDataString) : [];

    const existingfeatures = localStorage.getItem('features');
    let fetchedfeatures = existingfeatures ? JSON.parse(existingfeatures) : [];

    const existingtradelogs = localStorage.getItem('orderlog');
    let existingtrades = existingtradelogs ? JSON.parse(existingtradelogs) : [];


  const [masterList, setMasterList] = useState(existingMasterData);
  const [clientList, setClientList] = useState(existingClientData);
  const [masterorderList, setMasterorderList] = useState(existingMasterOrderData);
  const [features, setfeatures] = useState(fetchedfeatures);
  const [tradelogs, setTradelogs] = useState(existingtrades);
  const [formData, updateFormData] = useState({}); // Change the name of the update function
  const [conditions, setConditions] = useState([]); // Initialize conditions array

  const [WorkingStrategy, setWorkingStrategy] = useState([]);
  const [Assets,setAssets] = useState([]);
  const [Action,setAction] = useState([]);
  const [indicators,setIndicators] = useState([]);

 

  const setMasterListData = (data) => {
    setMasterList(data);
  };

  const setClientListData = (data) => {
    setClientList(data);
  };

  const setFormData = (data) => {
    updateFormData(data); // Update formData using the update function
  };

  return (
    <ListContext.Provider
      value={{
        masterList,
        setMasterListData,
        clientList,
        setClientListData,
        masterorderList,
        setMasterorderList,
        tradelogs,
        features, setfeatures,
        formData, // Include formData in the context
        setFormData, // Include the update function for formData
        conditions, // Include conditions in the context
        setConditions, // Include the update function for conditions
        WorkingStrategy, setWorkingStrategy,
        Assets,setAssets,Action,setAction,indicators,setIndicators
      }}
    >
      {children}
    </ListContext.Provider>
  );
};
