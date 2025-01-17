import React, {  useState,useContext } from 'react'
import {
  Card,
  CardBody,
  Button
} from "@windmill/react-ui";
import HeadKyc from 'components/KYC/HeadKyc';
import useKycSubmit from 'hooks/useKycSubmit';
import Inputfields from '../Inputfields';
import Error from 'components/form/Error';
import { MdOutlineNavigateBefore,MdOutlineNavigateNext } from 'react-icons/md';

import { notifyError, notifySuccess } from 'utils/toast';

import { CreateStrategyContext } from 'context/CreateStrategyContext';
import useStepperRecord from 'hooks/useStepperRecord';

const ActionDefination = ({ handleNext, handlePrevious }) => {
  const { UniqueID } = useContext(CreateStrategyContext); 

  const { updateCurrentStepForUniqueID } = useStepperRecord();
  

  const [Action, setAction] = useState('');
  const [ActionType, setActionType] = useState('');
  
  const { errors, register, handleSubmit, onSubmit, } = useKycSubmit();
 

  const handleFormSubmit = (data) => {

   

    console.log("***************in handleFormSubmit", data);
    const formData = {
      ...data,
      Action,
      ActionType,
      UniqueID
    };

    console.log("***************in Action Defination Step:", formData);

    const existingData = localStorage.getItem('Actionselection');

  if (existingData) {
    // If 'assetselection' exists, append filteredData to it
    const parsedData = JSON.parse(existingData);
    const updatedData = [...parsedData, formData];

    // Update 'assetselection' in local storage with the updated data
    localStorage.setItem('Actionselection', JSON.stringify(updatedData));
  } else {
    // If 'assetselection' doesn't exist, create a new table with filteredData
    localStorage.setItem('Actionselection', JSON.stringify([formData]));
  }




    // onSubmit(formData);
    notifySuccess("Action Defination Submited");
    handleNext(); // Move to the next step after form submission
    // updateCurrentStepForUniqueID(UniqueID);
  };

  return (
    <div className='p-2'>
      <Card className='w-min' >
        {/* <Card className="w-10/12 sm:w-screen"> */}
        <CardBody>
          <form onSubmit={handleSubmit(handleFormSubmit)}  >
            <HeadKyc title='Action Definition' />
          

            <div className='flex items-start lg:items-center  m-2 lg:m-2 sm:m-0 flex-col sm:flex-row'>
                  
                  <label className="block text-sm  font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0" style={{ width: '155px' }}>
                  Action:
                  </label>
                  <div className=' w-full lg:flex-grow sm:w-full'>
                  <select
                      name="Action"
                      label="Action"
                    
                    value={Action}
                  onChange={(e) => setAction(e.target.value)}
                      className="border px-4  h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border">
                      <option value="">-- Select --</option>
                      <option value="buy">Buy</option>
                      <option value="sell">Sell</option>
                    </select>

                  </div>
                </div>


                <div className='flex items-start lg:items-center  m-2 lg:m-2 sm:m-0 flex-col sm:flex-row'>
                  
                  <label className="block text-sm  font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0" style={{ width: '155px' }}>
                  Action Type:
                  </label>
                  <div className=' w-full lg:flex-grow sm:w-full'>
                  <select
                      name="ActionType"
                      label="ActionType"
                      value={ActionType}
                  onChange={(e) => setActionType(e.target.value)}
                      className="border px-4  h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border"
                    // className="block w-full px-3 text-gray-400 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white placeholder-gray-500"

                    >
                      <option value="">-- Select --</option>
                      <option value="trailing_stop">Trailing Stop</option>
                      <option value="market">Market</option>
                      <option value="limit">Limit</option>
                    </select>

                  </div>
                </div>
                

               
         
            <div className='flex justify-center m-3  '>
              <Button className="px-4" onClick={handlePrevious}>
                <MdOutlineNavigateBefore />  Previous
              </Button>
              <Button type="submit" className="mx-4" >
                Next <MdOutlineNavigateNext />
              </Button>
            </div>
          </form>
        </CardBody>
        {errors.pannumber && <Error errorName={errors.pannumber} />}
        {!errors.pannumber && errors.AadharCard && <Error errorName={errors.AadharCard} />}
      </Card>
    </div>
  )
}

export default ActionDefination



