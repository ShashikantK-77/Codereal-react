// import React, {  useState,useEffect,useContext } from 'react'
// import {
//   Card,
//   CardBody,
//   Button
// } from "@windmill/react-ui";
// import HeadKyc from 'components/KYC/HeadKyc';
// import useStrategySubmit from 'hooks/useStrategySubmit';
// import Inputfields from '../Inputfields';
// import { useListContext } from 'context/ListContext';
// import Error from 'components/form/Error';
// import { MdOutlineNavigateBefore,MdOutlineNavigateNext } from 'react-icons/md';

// import { notifyError, notifySuccess } from 'utils/toast';
// import Counditioncard from './Counditioncard';
// import { CreateStrategyContext } from 'context/CreateStrategyContext';
// import useStepperRecord from 'hooks/useStepperRecord';

// const indicatorParameters = {
//   "Simple Moving Average": [
//     {  name: 'min_ma', Datatype: 'number' },
//     {  name: 'max_ma', Datatype: 'number' },
//     {  name: 'period', Datatype: 'number' },

//   ],
//   "Relative Strength Index": [
//     {name: 'overbought', Datatype: 'text' },
//     {  name: 'oversold', Datatype: 'text' },
//     {  name: 'period', Datatype: 'text' },
    
//     // Add other RSI parameters
//   ],
//   "Parabolic SAR": [
//     {  name: 'acceleration', Datatype: 'text' },
//     {  name: 'maximum', Datatype: 'text' },
//     // Add other PSR parameters
//   ],

//   "Moving Average Convergence Divergence": [
//     {  name: 'short_period', Datatype: 'number' },
//     {  name: 'long_period', Datatype: 'number' },
//     {  name: 'signal_period', Datatype: 'number' },
//     // Add other PSR parameters
//   ],
//   // Add parameters for other indicators
// };

// const ConditionDefination = ({ handleNext, handlePrevious }) => {

//   const [indicator,setIndicator] = useState('')
//   const [selectedParams, setSelectedParams] = useState([]);

//   const { updateCurrentStepForUniqueID } = useStepperRecord();


//   const { UniqueID } = useContext(CreateStrategyContext); 

//   const { setConditions, formData, setFormData,conditions } = useListContext();
//   const { errors, register, handleSubmit, onStratSubmit,reset } = useStrategySubmit();
//   const handleFormSubmit = (data) => {

//     const formData = {
//       ...data,
//     };

//     const filteredData = Object.fromEntries(
//       Object.entries(formData).filter(([_, value]) => value !== '')
//     );
  



//     // Create a new condition object
//   const newCondition = {
//     // ConditionType: formData.ConditionType,
//     // Indicator: formData.Indicator,
//     // Operator: formData.Operator,
//     // IndicatorValue: formData.IndicatorValue,
//     // Actiontype: formData.Actiontype,
//     // Actiondetails: formData.Actiondetails,
//     ...data,
//   };

//    // Add the new condition to the conditions array
//   //  setConditions((prevConditions) => [...prevConditions, newCondition]);

//   // setConditions((prevConditions) => [ filteredData]);
//   setConditions((prevConditions) => [...prevConditions, filteredData]);


//   // Add the new condition to the conditions array
//   // setConditions([...conditions, newCondition]);

//   console.log('Data to be stored in local storage:', filteredData);

//     // console.log("***************in Condition Defination Step:", formData); 
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       conditions: [...conditions, newCondition],
//     }));



//  // Define a data structure for indicator parameters

    


//     notifySuccess("Condition Definition Saved");
//     // Clear the form fields
//   reset(); // This will clear all input fields

//   setIndicator('');

//   };

//   useEffect(() => {
//     setSelectedParams(indicatorParameters[indicator] || []);
//   }, [indicator]);

//   const handleNextbtn =()=>{
   

//     const existingData = localStorage.getItem('indicators');

//     const dataToSave = {
//       conditions,
//       uniqueID: UniqueID, // Replace 'yourUniqueIDHere' with the actual unique identifier
//     };

//     if (existingData) {
//       // If 'indicators' exists, append new data with a unique identifier
//       const parsedData = JSON.parse(existingData);
//       const updatedData = [...parsedData, dataToSave];
  
//       // Update 'indicators' in local storage with the updated data
//       localStorage.setItem('indicators', JSON.stringify(updatedData));
//     } else {
//       // If 'indicators' doesn't exist, create a new table with the data
//       localStorage.setItem('indicators', JSON.stringify([dataToSave]));
//     }

//     handleNext();
//     // updateCurrentStepForUniqueID(UniqueID);
//   }

//   return (
//     <div className='p-2'>
//       <Card className='w-min' >
//         {/* <Card className="w-10/12 sm:w-screen"> */}
//         <CardBody>
//           <form onSubmit={handleSubmit(handleFormSubmit)}>
//             <HeadKyc title='Indicator Selection ' />
//             <div className="grid lg:grid-cols-2 sm:grid-cols-1">
//               <div className="flex flex-col justify-center">

//                 <div className='flex items-start lg:items-center  m-2 lg:m-2 sm:m-0 flex-col sm:flex-row'>
//                   <label className="block text-sm  font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0" style={{ width: '155px' }}>
//                     Indicator:
//                   </label>
//                   <div className=' w-full lg:flex-grow sm:w-full'>
//                   <select
//                       name="Indicator"
//                       label="Indicator"

//                       // {...register('Indicator')}
//                       {...register('Indicator', { required: 'Indicator is required' })}
//                       onChange={(e) => setIndicator(e.target.value)}
//                       value={indicator}
//                       className="border px-4  h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border"
//                     // className="block w-full px-3 text-gray-400 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white placeholder-gray-500"
//                     >
//                       <option value="">-- Select --</option>
//                       <option value="Simple Moving Average">Simple Moving Average</option>
//                       <option value="Relative Strength Index">Relative Strength Index</option>
//                       <option value="Parabolic SAR">Paranolic Sar</option>
//                       <option value="Moving Average Convergence Divergence">MACD</option>
//                     </select>
//                   </div>
//                 </div>

              

//                {/* Dynamic rendering of input fields */}
//             {selectedParams.map((param, index) => (
//               <div key={index} className='grid lg:grid-cols-1 sm:grid-cols-1'>
//                 <div className='flex flex-col justify-center'>
//                   <Inputfields
//                     register={register}
//                     label={param.name}
//                     name={param.name}
//                     placeholder={`Enter ${param.name}`}
//                     type={param.Datatype}
//                     // Add necessary props for input fields
//                   />
//                   {/* Error handling */}
//                   {errors.strategyName && (
//                     <Error style={{ marginTop: '-2rem' }} errorName={errors.strategyName} />
//                   )}
//                 </div>
//               </div>
//             ))}




//                 <Button className='w-2/6 my-2' type="submit">
//               Add Indicator
//               </Button>
//                 {/* <Error errorName={errors.AadharCard} /> */}

//               </div>
//               <div>
//                <Counditioncard conditions={conditions} />
//                {/* <Counditioncard/> */}
//               </div>
//             </div>
        
         
//             <div className='flex justify-center m-3  '>
//               <Button className="px-4" onClick={handlePrevious}>
//                 <MdOutlineNavigateBefore />  Previous
//               </Button>
//               <Button  className="mx-4" onClick={handleNextbtn}>
//                 Next <MdOutlineNavigateNext />
//               </Button>
//             </div>
//           </form>
//         </CardBody>
//         {errors.ConditionType && <Error errorName={errors.ConditionType} />}
//         {!errors.ConditionType && errors.Indicator && <Error errorName={errors.Indicator} />}
//         {!errors.ConditionType && !errors.Indicator && errors.Operator && <Error errorName={errors.Operator} />}
//         {!errors.ConditionType && !errors.Indicator && !errors.Operator && errors.IndicatorValue && <Error errorName={errors.IndicatorValue} />}
//         {!errors.ConditionType && !errors.Indicator && !errors.Operator && !errors.IndicatorValue && errors.Actiontype && <Error errorName={errors.Actiontype} />}
//         {!errors.ConditionType && !errors.Indicator && !errors.Operator && !errors.IndicatorValue && !errors.Actiontype && errors.Actiondetails && <Error errorName={errors.Actiondetails} />}
//       </Card>
//     </div>
//   )
// }

// export default ConditionDefination



import React, { useState, useEffect, useContext } from 'react';
import {
  Card,
  CardBody,
  Button
} from "@windmill/react-ui";
import HeadKyc from 'components/KYC/HeadKyc';
import useStrategySubmit from 'hooks/useStrategySubmit';
import Inputfields from '../Inputfields';
import { useListContext } from 'context/ListContext';
import Error from 'components/form/Error';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';
import Counditioncard from './Counditioncard';
import { CreateStrategyContext } from 'context/CreateStrategyContext';
import useStepperRecord from 'hooks/useStepperRecord';
import { notifySuccess } from 'utils/toast';

const indicatorParameters = {
  "Simple Moving Average": [
    { name: 'min_ma', Datatype: 'number' },
    { name: 'max_ma', Datatype: 'number' },
    { name: 'period', Datatype: 'number' },
  ],
  "Relative Strength Index": [
    { name: 'overbought', Datatype: 'text' },
    { name: 'oversold', Datatype: 'text' },
    { name: 'period', Datatype: 'text' },
  ],
  "Parabolic SAR": [
    { name: 'acceleration', Datatype: 'text' },
    { name: 'maximum', Datatype: 'text' },
  ],
  "Moving Average Convergence Divergence": [
    { name: 'short_period', Datatype: 'number' },
    { name: 'long_period', Datatype: 'number' },
    { name: 'signal_period', Datatype: 'number' },
  ],
};

const ConditionDefination = ({ handleNext, handlePrevious }) => {
  const [indicator, setIndicator] = useState('');
  const [selectedParams, setSelectedParams] = useState([]);

  const { updateCurrentStepForUniqueID } = useStepperRecord();

  const { UniqueID } = useContext(CreateStrategyContext);
  const { setConditions, formData, setFormData, conditions } = useListContext();
  const { errors, register, handleSubmit, reset } = useStrategySubmit();

  const handleFormSubmit = (data) => {
    const newCondition = {
      ...data,
      Indicator: indicator,
      Parameters: selectedParams,
    };

    setConditions((prevConditions) => [...prevConditions, newCondition]);
    setFormData((prevFormData) => ({
      ...prevFormData,
      conditions: [...conditions, newCondition],
    }));

    reset();
    setIndicator('');
    setSelectedParams([]);

    notifySuccess("Condition Definition Saved");
    
  };

  useEffect(() => {
    setSelectedParams(indicatorParameters[indicator] || []);
  }, [indicator]);

  const handleNextbtn = () => {
    const existingData = localStorage.getItem('indicators');
    const dataToSave = {
      conditions,
      uniqueID: UniqueID,
    };

    if (existingData) {
      const parsedData = JSON.parse(existingData);
      const updatedData = [...parsedData, dataToSave];
      localStorage.setItem('indicators', JSON.stringify(updatedData));
    } else {
      localStorage.setItem('indicators', JSON.stringify([dataToSave]));
    }

    handleNext();
  };

  return (
    <div className='p-2'>
      <Card className='w-min'>
        <CardBody>
        <HeadKyc title='Indicator Selection ' />
            <div className="grid lg:grid-cols-2 sm:grid-cols-1">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
           
              <div className="flex flex-col justify-center">
                <div className='flex items-start lg:items-center  m-2 lg:m-2 sm:m-0 flex-col sm:flex-row'>
                  <label className="block text-sm  font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0" style={{ width: '155px' }}>
                    Indicator:
                  </label>
                  <div className=' w-full lg:flex-grow sm:w-full'>
                    <select
                      name="Indicator"
                      {...register('Indicator', { required: 'Indicator is required' })}
                      onChange={(e) => setIndicator(e.target.value)}
                      value={indicator}
                      className="border px-4  h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border"
                    >
                      <option value="">-- Select --</option>
                      <option value="Simple Moving Average">Simple Moving Average</option>
                      <option value="Relative Strength Index">Relative Strength Index</option>
                      <option value="Parabolic SAR">Paranolic Sar</option>
                      <option value="Moving Average Convergence Divergence">MACD</option>
                    </select>
                  </div>
                </div>
                {selectedParams.map((param, index) => (
                  <div key={index} className='grid lg:grid-cols-1 sm:grid-cols-1'>
                    <div className='flex flex-col justify-center'>
                      <Inputfields
                        register={register}
                        label={param.name}
                        name={param.name}
                        placeholder={`Enter ${param.name}`}
                        type={param.Datatype}
                      />
                      {errors.strategyName && (
                        <Error style={{ marginTop: '-2rem' }} errorName={errors.strategyName} />
                      )}
                    </div>
                  </div>
                ))}
                <Button className='w-2/6 my-2' type="submit">Add Indicator</Button>
              </div>
              <div>
                <Counditioncard conditions={conditions} />
              </div>
         
            <div className='flex justify-center m-3  '>
              <Button className="px-4" onClick={handlePrevious}>
                <MdOutlineNavigateBefore />  Previous
              </Button>
              <Button className="mx-4" onClick={handleNextbtn}>
                Next <MdOutlineNavigateNext />
              </Button>
            </div>
          </form>

          </div>
        </CardBody>
        {errors.ConditionType && <Error errorName={errors.ConditionType} />}
        {!errors.ConditionType && errors.Indicator && <Error errorName={errors.Indicator} />}
        {!errors.ConditionType && !errors.Indicator && errors.Operator && <Error errorName={errors.Operator} />}
        {!errors.ConditionType && !errors.Indicator && !errors.Operator && errors.IndicatorValue && <Error errorName={errors.IndicatorValue} />}
        {!errors.ConditionType && !errors.Indicator && !errors.Operator && !errors.IndicatorValue && errors.Actiontype && <Error errorName={errors.Actiontype} />}
        {!errors.ConditionType && !errors.Indicator && !errors.Operator && !errors.IndicatorValue && !errors.Actiontype && errors.Actiondetails && <Error errorName={errors.Actiondetails} />}
      </Card>
    </div>
  );
}

export default ConditionDefination;



