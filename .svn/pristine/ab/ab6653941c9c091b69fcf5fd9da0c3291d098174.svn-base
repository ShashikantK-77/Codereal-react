

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { AdminContext } from './AdminContext';
// import { useHistory } from 'react-router-dom';

// const StepperContext = createContext();

// export const useStepperContext = () => useContext(StepperContext);

// export const StepperProvider = ({ children }) => {
//   const history = useHistory();
//   const [currentStep, setCurrentStep] = useState(0);
//   const [strategyData, setStrategyData] = useState([]);

//   const { state } = useContext(AdminContext);
  
//   const { adminInfo } = state;
//   // console.log("adminInfo:",adminInfo);

//   useEffect(() => {
//     const loadCurrentStep = async () => {
//       try {
//         const storedStep = await getLocalStorageData('currentStep');
//         if (storedStep !== null && !isNaN(parseInt(storedStep))) {
//           setCurrentStep(parseInt(storedStep));
//         }
//       } catch (error) {
//         console.error('Error loading current step:', error);
//       }
//     };

//     const loadStrategyData = async () => {
//       try {
//         if (adminInfo && adminInfo.UserID) {
//           const storedStrategyData = await getLocalStorageData('strategycreation');
          
//           // Filter strategies based on the email
//           const filteredStrategies = storedStrategyData.filter(
//             strategy => strategy.UserID === adminInfo.UserID
//           );
          
//           setStrategyData(filteredStrategies);
//           checkStepCompletion(currentStep, filteredStrategies);
//         } else {
//           // Handle the case when adminInfo or adminInfo.UserID is null or undefined
//         }
//       } catch (error) {
//         console.error('Error loading strategy data:', error);
//       }
//     };
    
//     loadCurrentStep();
//     loadStrategyData();
//   }, [history,currentStep,adminInfo]);

//   const getLocalStorageData = async (tableName) => {
//     try {
//       const storedData = await new Promise((resolve) => {
//         const data = localStorage.getItem(tableName);
//         if (data) {
//           resolve(JSON.parse(data));
//         } else {
//           resolve([]); // Return an empty array if no data found
//         }
//       });
//       return storedData;
//     } catch (error) {
//       throw new Error(`Error retrieving data from ${tableName} in local storage`);
//     }
//   };
  

//   const checkStepCompletion = (stepIndex, strategyCreationData) => {
//     const lastIncompleteStrategy = strategyCreationData.find(strategy => !strategy.isComplete);

//     console.log("lastIncompleteStrategy found in steppercontext:",lastIncompleteStrategy);

//     if (lastIncompleteStrategy) {
//       const { UniqueID } = lastIncompleteStrategy;

//       switch (stepIndex) {
//         case 0:
//           checkAndSetStep(UniqueID, 'assetselection');
//           break;
//         case 1:
//           checkAndSetStep(UniqueID, 'Actionselection');
//           break;
//         case 2:
//           checkAndSetStep(UniqueID, 'indicators');
//           break;
//         case 3:
//             if (currentStep === 2) {
//               // Check if indicators exist for the current UniqueID
//               const indicatorsData = getLocalStorageData('indicators');
//               const hasIndicators = indicatorsData.some(data => data.uniqueID === UniqueID && data.conditions.length > 0);
    
//               if (hasIndicators) {
//                 setCurrentStep(3); // Move to step 3 if indicators exist for the current UniqueID
//               }
//             }
//             break;
//         default:
//           break;
//       }
//     }
//   };

//   const checkAndSetStep = async (uniqueID, localStorageKey) => {
//     try {
//       const stepData = await getLocalStorageData(localStorageKey);
//       const isStepCompleted = stepData.some(step => step.UniqueID === uniqueID);
//       if (isStepCompleted) setCurrentStep(prevStep => prevStep + 1);
//     } catch (error) {
//       console.error('Error checking step completion:', error);
//     }
//   };

//   // const checkAndSetStep = async (uniqueID, localStorageKey) => {
//   //   try {
//   //     const stepData = await getLocalStorageData(localStorageKey);
//   //     const isStepCompleted = stepData.some(step => step.UniqueID === uniqueID);
  
//   //     if (isStepCompleted) {
//   //       const steps = ['assetselection', 'Actionselection', 'indicators']; // Add other step names here if any
        
//   //       const currentIndex = steps.findIndex(stepName => stepName === localStorageKey);
//   //       if (currentIndex !== -1 && currentIndex + 1 < steps.length) {
//   //         setCurrentStep(currentIndex + 1); // Set to the next step index
//   //       }
//   //     }
//   //   } catch (error) {
//   //     console.error('Error checking step completion:', error);
//   //   }
//   // };

//   return (
//     <StepperContext.Provider value={{ currentStep, setCurrentStep, strategyData, setStrategyData }}>
//       {children}
//     </StepperContext.Provider>
//   );
// };


import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminContext } from './AdminContext';
import { useHistory } from 'react-router-dom';

const StepperContext = createContext();

export const useStepperContext = () => useContext(StepperContext);

export const StepperProvider = ({ children }) => {
  const history = useHistory();
  const [currentStep, setCurrentStep] = useState(0);
  const [strategyData, setStrategyData] = useState([]);

  const { state } = useContext(AdminContext);
  
  const { zenithQuark } = state;

  // console.log("adminInfo in StepperProvider:",adminInfo);

  const getLocalStorageData = async (tableName) => {
    try {
      const storedData = await new Promise((resolve) => {
        const data = localStorage.getItem(tableName);
        if (data) {
          resolve(JSON.parse(data));
        } else {
          resolve([]); // Return an empty array if no data found
        }
      });
      return storedData;
    } catch (error) {
      throw new Error(`Error retrieving data from ${tableName} in local storage`);
    }
  };

  const checkAndSetStep = async (uniqueID, localStorageKey) => {
    try {
      const stepData = await getLocalStorageData(localStorageKey);
      const isStepCompleted = stepData.some(step => step.UniqueID === uniqueID);
      if (isStepCompleted) setCurrentStep(prevStep => prevStep + 1);
    } catch (error) {
      console.error('Error checking step completion:', error);
    }
  };

  useEffect(() => {
    const loadCurrentStep = async () => {
      // ... (unchanged)
    };

    const loadStrategyData = async () => {
      // ... (unchanged)
    };
    
    loadCurrentStep();
    loadStrategyData();
  }, [history,currentStep,zenithQuark]);

  // ... (unchanged)

  return (
    <StepperContext.Provider value={{ currentStep, setCurrentStep, strategyData, setStrategyData }}>
      {children}
    </StepperContext.Provider>
  );
};
