import React, { useState } from 'react';
import MultiStep from 'react-multistep';

// import AssetsSelection from './Strategy/AssetsSelection';
// import ConditionDefination from './Strategy/ConditionDefination';
// import ActionDefination from './Strategy/ActionDefination';
// import Confirmation from './Strategy/Confirmation';

import AssetsSelection from './Components/Strategy/AssetsSelection';
import ConditionDefination from './Components/Strategy/ConditionDefination';
import ActionDefination from './Components/Strategy/ActionDefination';
import Confirmation from './Components/Strategy/Confirmation';
import '../../components/KYC/stepper.css'
// import './stepper.css';
import { useStepperContext } from 'context/StepperContext';

const ParentStepper = () => {
  const { currentStep, setCurrentStep,} = useStepperContext();

  console.log("currentStep:",currentStep);
  
  // const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const steps = [
    { name: 'Scrip', component: AssetsSelection },
    { name: 'Action', component: ActionDefination },
    { name: 'Condition', component: ConditionDefination},
    // { name: 'Risk', component: RiskManagement },
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

          <ActiveComponent handleNext={handleNext} handlePrevious={handlePrevious} />
        </div>
      </div>
    </div>
  );
};

export default ParentStepper;
