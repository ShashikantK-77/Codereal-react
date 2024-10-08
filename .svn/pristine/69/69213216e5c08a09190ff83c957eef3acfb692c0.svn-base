// import React, { useState,useEffect } from 'react';
// import AssetsSelection from './Strategy/AssetsSelection';
// import StrategySymbol from './Strategy/StrategySymbol';
// import ConditionDefination from './Strategy/ConditionDefination';
// import ActionDefination from './Strategy/ActionDefination';
// import Confirmation from './Strategy/Confirmation';
// import './stepper.css';
// import { useStepperContext } from 'context/StepperContext';

// const ParentStepper = () => {
//   const { currentStep, setCurrentStep } = useStepperContext();
//   const [openValue, setOpenValue] = useState("");
//   const [stepperformData, setStepperformData] = useState({}); // State to store form data from each step


//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const response = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AAPL&interval=5min&apikey=0UC55QN7W2GF7KNX');
//   //       if (!response.ok) {
//   //         throw new Error('Failed to fetch data');
//   //       }
//   //       const data = await response.json();
//   //       const timeSeriesData = data['Time Series (5min)'];
//   //       const firstEntryKey = Object.keys(timeSeriesData)[0];
//   //       const firstEntry = timeSeriesData[firstEntryKey];
//   //       const openValue = firstEntry['1. open'];
//   //       setOpenValue(openValue);
//   //       console.log('First open value:', openValue);
//   //     } catch (error) {
//   //       console.error('Error fetching data:', error);
//   //     }
//   //   };

//   //   fetchData();
//   // }, [stepperformData.symbol]);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       // Construct the URL with dynamic symbol
//   //       const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${encodeURIComponent(stepperformData.symbol)}&interval=5min&apikey=0UC55QN7W2GF7KNX`;
  
//   //       const response = await fetch(url);
//   //       if (!response.ok) {
//   //         throw new Error('Failed to fetch data');
//   //       }
//   //       const data = await response.json();
  
//   //       // Check if timeSeriesData is present and not null
//   //       const timeSeriesData = data['Time Series (5min)'];
//   //       if (!timeSeriesData) {
//   //         throw new Error('Time series data not found');
//   //       }
  
//   //       const firstEntryKey = Object.keys(timeSeriesData)[0];
//   //       const firstEntry = timeSeriesData[firstEntryKey];
//   //       const openValue = firstEntry['1. open'];
//   //       setOpenValue(openValue);
//   //       console.log('First open value:', openValue);
//   //     } catch (error) {
//   //       console.error('Error fetching data:', error);
//   //     }
//   //   };
  
//   //   fetchData();
//   // }, [stepperformData.symbol]);
  
  
 
  
  

//   // const handleNext = (data) => {
//   //   setStepperformData((prevData) => ({ ...prevData, ...data })); // Merge new data with existing data
//   //   setCurrentStep((prevStep) => prevStep + 1);
//   // };

//   const handleNext = (data) => {
//     setStepperformData((prevData) => ({
//       ...prevData,
//       ...data,
//       openValue: openValue // Include openValue in form data
//     }));
//     setCurrentStep((prevStep) => prevStep + 1);
//   };

//   const handlePrevious = () => {
//     setCurrentStep((prevStep) => prevStep - 1);
//   };

//   const steps = [
//     { name: 'Identification', component: AssetsSelection },
//     { name: 'Symbol', component: StrategySymbol },
//     { name: 'Action', component: ActionDefination },
//     { name: 'Condition', component: ConditionDefination },
//     { name: 'Confirmation and Execution', component: Confirmation },
//   ];

//   const ActiveComponent = steps[currentStep].component;



//   return (
//     <div className="stepper-wrapper">
//       <div className="container">
//         <div className="form-container custom-multistep-container">
//           <div className="step-indicator-container">
//             {steps.map((step, index) => (
//               <div
//                 key={index}
//                 className={`stepper-item ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
//               >
//                 <div className="step-counter">{index + 1}</div>
//                 <div className="step-name">{step.name}</div>
//               </div>
//             ))}
//           </div>

//           <ActiveComponent
//             handleNext={handleNext}
//             handlePrevious={handlePrevious}
//             stepperformData={stepperformData} // Pass formData to ActiveComponent
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ParentStepper;

import React, { useState, useEffect } from 'react';
import AssetsSelection from './Strategy/AssetsSelection';
import StrategySymbol from './Strategy/StrategySymbol';
import ConditionDefination from './Strategy/ConditionDefination';
import ActionDefination from './Strategy/ActionDefination';
import Confirmation from './Strategy/Confirmation';
import './stepper.css';
import { useStepperContext } from 'context/StepperContext';

const ParentStepper = ({ initialStep = 0, stepperData = {} }) => {
  const { currentStep, setCurrentStep } = useStepperContext();
  const [openValue, setOpenValue] = useState("");
  const [stepperformData, setStepperformData] = useState(stepperData); // State to store form data from each step

  useEffect(() => {
    setCurrentStep(initialStep);
  }, [initialStep, setCurrentStep]);

  const handleNext = (data) => {
    setStepperformData((prevData) => ({
      ...prevData,
      ...data,
      openValue: openValue // Include openValue in form data
    }));
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const steps = [
    { name: 'Identification', component: AssetsSelection },
    { name: 'Symbol', component: StrategySymbol },
    { name: 'Action', component: ActionDefination },
    { name: 'Condition', component: ConditionDefination },
    { name: 'Confirmation and Execution', component: Confirmation },
  ];

  const ActiveComponent = steps[currentStep].component;

  return (
    <div className="stepper-wrapper">
      <div className="container">
        <div className="form-container custom-multistep-container">
          <div className="step-indicator-container">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`stepper-item ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
              >
                <div className="step-counter">{index + 1}</div>
                <div className="step-name">{step.name}</div>
              </div>
            ))}
          </div>

          <ActiveComponent
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            stepperformData={stepperformData} // Pass formData to ActiveComponent
          />
        </div>
      </div>
    </div>
  );
};

export default ParentStepper;
