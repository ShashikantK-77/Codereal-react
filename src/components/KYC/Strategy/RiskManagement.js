import React, {  useState } from 'react'
import {
  Card,
  CardBody,
  Button
} from "@windmill/react-ui";
import HeadKyc from 'components/KYC/HeadKyc';
import useStrategySubmit from 'hooks/useStrategySubmit';
import Inputfields from '../Inputfields';
import Error from 'components/form/Error';
import { useListContext } from 'context/ListContext';
import { MdOutlineNavigateBefore,MdOutlineNavigateNext } from 'react-icons/md';

import { notifyError, notifySuccess } from 'utils/toast';

const RiskManagement = ({ handleNext, handlePrevious }) => {
  const { errors, register, handleSubmit, onStratSubmit, } = useStrategySubmit();
  const { setFormData } = useListContext();


  const handleFormSubmit = (data) => {

    console.log("***************in handleFormSubmit", data);
    const formData = {
      ...data,
    };

    console.log("***************in Risk Management Step:", formData);

    // onStratSubmit({ data: formData });
    // setFormData(data)
    setFormData((prevData) => ({ ...prevData, ...data }));
    // onStratSubmit(data);
    notifySuccess("Risk Management Details Saved");
    handleNext(); // Move to the next step after form submission
  };

  return (
    <div className='p-2'>
      <Card className='w-min' >
        {/* <Card className="w-10/12 sm:w-screen"> */}
        <CardBody>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <HeadKyc title='Risk Management' />
            <div className="grid lg:grid-cols-2 sm:grid-cols-1">
              <div className="flex flex-col justify-center">
                <Inputfields register={register} label={"Risk Tolerance"} name={"RiskTolerance"} placeholder={"Enter Risk Tolerance"} maxLength={10} className={"uppercase"}  />
                {/* <Error errorName={errors.pannumber} /> */}

             

                <Inputfields register={register} label={"Position Size"} name={"PositionSize"} placeholder={"Enter Position Size.:"} maxLength={12} />

                  <div className='flex  w-12/12'>
                <Inputfields register={register} label={"Stop Loss"} name={"StopLoss"} placeholder={"Stop Loss.:"} maxLength={12} className={"w-full"}  />
                 <>
                 <div className='my-2   w-2/12 lg:w-2/12 '>
                  <select
                      // name="Indicator"
                      // label="Indicator"

                      // {...register('Indicator')}
                    //   onChange={handleNomineeRelChange}
                    //   value={nomineeRel}
                      className="border px-4  h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border"
                    // className="block w-full px-3 text-gray-400 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white placeholder-gray-500"

                    >
                      <option value="">-- Select --</option>
                      <option value="%">In percentage</option>
                      <option value="RSI"> </option>
                    </select>

                  </div>
                 </>
                  </div>
                  <div className='flex'>
                <Inputfields register={register} label={"Take Profit"} name={"TakeProfit"} placeholder={"Enter Take Profit.:"} maxLength={12} />
                <div className='my-2 w-2/12 lg:w-2/12 '>
                  <select
                      // name="Indicator"
                      // label="Indicator"

                      // {...register('Indicator')}
                    //   onChange={handleNomineeRelChange}
                    //   value={nomineeRel}
                      className="border px-4  h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border"
                    // className="block w-full px-3 text-gray-400 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white placeholder-gray-500"

                    >
                      <option value="">-- Select --</option>
                      <option value="%">In percentage</option>
                      <option value=""></option>
                    </select>

                  </div>
                  </div>
                {/* <Error errorName={errors.AadharCard} /> */}

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
        {errors.RiskTolerance && <Error errorName={errors.RiskTolerance} />}
        {!errors.RiskTolerance && errors.PositionSize && <Error errorName={errors.PositionSize} />}
        {!errors.RiskTolerance && !errors.PositionSize && errors.StopLoss && <Error errorName={errors.StopLoss} />}
        {!errors.RiskTolerance && !errors.PositionSize && !errors.StopLoss && errors.TakeProfit && <Error errorName={errors.TakeProfit} />}

      </Card>
    </div>
  )
}

export default RiskManagement



