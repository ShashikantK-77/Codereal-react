import React, { useContext, useEffect } from 'react'
import {
    Button,
    Card,
    CardBody,
    Input,
    Pagination,
    Table,
    TableCell,
    TableContainer,
    TableFooter,
    TableHeader,
  } from "@windmill/react-ui";
  import { useTranslation } from "react-i18next";
  import { FiPlus } from 'react-icons/fi';
import { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory from React Router
import { CreateStrategyContext } from 'context/CreateStrategyContext';
import { AdminContext } from 'context/AdminContext';
import { useStepperContext } from 'context/StepperContext';
import { useListContext } from 'context/ListContext';
import useStepperRecord from 'hooks/useStepperRecord';

const Filter = () => { 
  const {  SetUniqueID,SetStrategyID,setSelectedStrategy } = useContext(CreateStrategyContext);


const [strategyData, setStrategyData] = useState([]);
const [filteredStrategies, setFilteredStrategies] = useState([]);
const { setWorkingStrategy } = useListContext();


// Retrieve the stepper context
const { setCurrentStep} = useStepperContext();

// useEffect(() => {
//   const fetchStrategyData = async () => {
//     try {
//       const storedStrategyData = localStorage.getItem('strategycreation');
      
//       if (storedStrategyData) {
//         const strategies = JSON.parse(storedStrategyData);
        
//         const filteredStrategies = strategies.filter(
//           strategy => strategy.UserID === zenithQuark.UserID // Replace with the UserID you have
//         );

//         setStrategyData(strategies);
//         setFilteredStrategies(filteredStrategies)
//         console.log("filteredStrategies in createstratcontext",filteredStrategies);
//       }
//     } catch (error) {
//       console.error('Error fetching strategy data:', error);
//     }
//   };
//   setCurrentStep(0)
//   fetchStrategyData();
// }, []);

useEffect(() => {
  const fetchStrategyData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/strategyData');
      if (!response.ok) {
        throw new Error('Failed to fetch strategy data');
      }
      const data = await response.json();
      
      // Filter strategies for the current user
      const filteredStrategies = data.filter(
        strategy => strategy.UserID === zenithQuark.UserID // Replace with the UserID you have
      );

      setStrategyData(data);
      setFilteredStrategies(filteredStrategies);
      console.log("filteredStrategies in createstratcontext", filteredStrategies);
    } catch (error) {
      console.error('Error fetching strategy data:', error);
    }
  };

  setCurrentStep(0);
  fetchStrategyData();
}, []);




const { state } = useContext(AdminContext);
const { zenithQuark } = state;

const lastStrategy = filteredStrategies[filteredStrategies.length - 1];

const [searchName, setSearchName] = useState("");
const history = useHistory();
const { t } = useTranslation();


  
const handleCreateClick = async () => {
  SetStrategyID("");
  setSelectedStrategy(null);

  history.push('/makestrategy');


};

return (
    <div>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            // onSubmit={handleSubmitUser}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                // ref={userRef}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                onChange={(e) => setSearchName(e.target.value)}
                placeholder= "Search by Strategies"
              />
              <button type="submit" className="absolute right-0 top-0 mt-5 mr-1"></button>
            </div>
            <div className="w-full md:w-56 lg:w-56 xl:w-56">
              <Button 
              onClick={handleCreateClick} 
              className="w-full rounded-md h-12">
                <span className="mr-3">
                  <FiPlus/>
                </span>
               Create Strategy
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}

export default Filter