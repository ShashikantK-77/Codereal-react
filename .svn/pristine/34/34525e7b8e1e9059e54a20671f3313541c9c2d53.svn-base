// import React, { useState } from 'react';
// import MultiStep from 'react-multistep';

// import PersonalDetails from './PersonalDetails';
// import IDProof from './IDProof';
// import AddressProof from './AddressProof';
// import BankDetails from './BankDetails';
// import NomineeDetails from './NomineeDetails';
// import './stepper.css';

// const ParentStepper = () => {
//   const [currentStep, setCurrentStep] = useState(0);

//   const handleNext = () => {
//     setCurrentStep((prevStep) => prevStep + 1);
//   };

//   const handlePrevious = () => {
//     setCurrentStep((prevStep) => prevStep - 1);
//   };

//   const steps = [
//     { name: 'Personal Details', component: PersonalDetails },
//     { name: 'ID Proof', component: IDProof },
//     { name: 'Address Proof', component: AddressProof },
//     { name: 'Bank Details', component: BankDetails },
//     { name: 'Nominee Details', component: NomineeDetails },
//   ];

//   const ActiveComponent = steps[currentStep].component;

//   return (
//     <div className="custom-multistep-container">
//       <div className="container">
//         <div className="form-container custom-multistep-container">
//           <div className="step-indicator-container">
//             {steps.map((step, index) => (
//               <div
//                 key={index}
//                 className={`step-indicator ${index === currentStep ? 'active' : ''}`}
//               >
//                 {step.name}
//               </div>
//             ))}
//           </div>
          
//           <ActiveComponent handleNext={handleNext} handlePrevious={handlePrevious} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ParentStepper;



import React, { useState } from 'react';
import MultiStep from 'react-multistep';

import PersonalDetails from './PersonalDetails';
import IDProof from './IDProof';
import AddressProof from './AddressProof';
import BankDetails from './BankDetails';
import NomineeDetails from './NomineeDetails';
import './stepper.css';

const ParentStepper = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const steps = [
    { name: 'Personal Details', component: PersonalDetails },
    { name: 'ID Proof', component: IDProof },
    { name: 'Address Proof', component: AddressProof },
    { name: 'Bank Details', component: BankDetails },
    { name: 'Nominee Details', component: NomineeDetails },
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
