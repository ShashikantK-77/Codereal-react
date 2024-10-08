


import React, { useState, createContext,useEffect,useContext } from 'react';
import { AdminContext } from './AdminContext';


const CreateStrategyContext = createContext(); // Create a context

const CreateStrategyProvider = ({ children }) => {
    const [strategyData, setStrategyData] = useState([]);
    const [filteredStrategies, setFilteredStrategies] = useState([]);
    const [UniqueID, SetUniqueID] = useState(0);
    const [StrategyID, SetStrategyID] = useState(0);

    const [selectedStrategy, setSelectedStrategy] = useState(null); // New state for selected strategy


    const { state } = useContext(AdminContext);
  
    const { zenithQuark } = state;
    
console.log("adminInfo in CreateStrategyProvider:",zenithQuark);

    useEffect(() => {
      const fetchStrategyData = async () => {
        try {
          const storedStrategyData = localStorage.getItem('strategycreation');
          
          if (storedStrategyData) {
            const strategies = JSON.parse(storedStrategyData);
            
            const filteredStrategies = strategies.filter(
              strategy => strategy.UserID === zenithQuark.UserID // Replace with the UserID you have
            );
    
            setStrategyData(strategies);
            setFilteredStrategies(filteredStrategies)
            console.log("filteredStrategies in createstratcontext",filteredStrategies);
          }
        } catch (error) {
          console.error('Error fetching strategy data:', error);
        }
      };
    
      fetchStrategyData();
    }, []);




    return (
      <CreateStrategyContext.Provider value={{ strategyData, setStrategyData,UniqueID, SetUniqueID,filteredStrategies,StrategyID, SetStrategyID,selectedStrategy, setSelectedStrategy  }}>
        {children}
      </CreateStrategyContext.Provider>
    );
  };
  
  export { CreateStrategyContext, CreateStrategyProvider };