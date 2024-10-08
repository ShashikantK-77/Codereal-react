import React, { useState, useRef } from 'react';
import axios from 'axios';
import {
  Card,
  CardBody,
  Button
} from "@windmill/react-ui";
import HeadKyc from 'components/KYC/HeadKyc';
import useKycSubmit from 'hooks/useKycSubmit';
import Inputfields from './Inputfields';
import Error from 'components/form/Error';
import { formValidationRules } from "components/form/formValidationRules";

import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';

import ImageUpload from './ImageUpload';
import { notifyError, notifySuccess } from 'utils/toast';

import { FiCheck, FiRefreshCw, FiShoppingCart, FiTruck } from "react-icons/fi";


const PersonalDetails = ({ handleNext, handlePrevious }) => {
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [file, setFile] = useState(null);
  const [photoURL, setPhotoURL] = useState('');
  const [openCrop, setOpenCrop] = useState(false);

  const { errors, register, handleSubmit, onSubmit, defaultBirthdate } = useKycSubmit();


  const imagewidth = 300;
  const imageheight = 400;

  const handleFormSubmit = (data) => {
    const { Birthdate, ...restData } = data;

    const formattedData = {
      ...restData,
      Birthdate: formatDate(Birthdate), // Format the birthdate
      uploadphoto: photoURL,
    };

    if (photoURL) {
      // Submit the form
      console.log("***************in Personal Details Step:", formattedData);
      onSubmit(formattedData);
      notifySuccess("Personal Details Submitted");
      handleNext(); // Move to the next step after form submission
    } else {
      notifyError("Please upload a photo");
    }
  };



  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };



  return (
    <div className='p-2'>
      <Card className='w-min' >

        <CardBody>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <HeadKyc title='Personal Details ' />
            <div className="grid lg:grid-cols-2 sm:grid-cols-1">
              <div className="flex flex-col justify-center">
                <Inputfields register={register} label={"User Name"} name={"Username"} placeholder={"Enter User Name"} />
                {/* <Error  errorName={errors.Username} /> */}
                <div className='flex items-start lg:items-center  m-2 lg:m-2 sm:m-0 flex-col sm:flex-row'>
                  <label className="block text-sm  font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0" style={{ width: '155px' }}>
                    Birth Date:
                  </label>
                  <div className=' w-full lg:flex-grow sm:w-full'>
                    <input
                      type='date'
                      {...register('Birthdate', { ...formValidationRules.Birthdate })}
                      label="Birthdate"
                      name='Birthdate'
                      className="block w-full px-3 text-gray-400 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white placeholder-gray-500"
                      placeholder='Enter Birth Date'
                      // defaultValue={defaultBirthdate}
                    />


                  </div>
                </div>
                {/* <Error errorName={errors.Birthdate} /> */}
                <Inputfields maxLength={14} register={register} label={"Mobile No."} name={"MobileNo"} placeholder={"Enter Mobile No."} type={"number"} />
                {/* <Error errorName={errors.MobileNo} /> */}
                <Inputfields register={register} label={"Email ID"} name={"EmailID"} placeholder={"Enter Email ID"} />
                {/* <Error errorName={errors.EmailID} /> */}

                <ImageUpload {...{ photoURL, setOpenCrop, setPhotoURL, setFile, openCrop, label: 'Upload Photo', imagewidth, imageheight }} />





              </div></div>
            <div className='flex justify-center mx-3 '>
              <Button type='submit' className="mx-4 text-white" >
                Submit & Next  <MdOutlineNavigateNext className='font-bold' />
              </Button>
            </div>
          </form>
        </CardBody>
        {errors.Username && <Error style={{ marginTop: '-2rem' }} errorName={errors.Username} />}
        {!errors.Username && errors.Birthdate && <Error errorName={errors.Birthdate} />}
        {!errors.Username && !errors.Birthdate && errors.MobileNo && <Error errorName={errors.MobileNo} />}
        {!errors.Username && !errors.Birthdate && !errors.MobileNo && errors.EmailID && <Error errorName={errors.EmailID} />}
        {!errors.Username && !errors.Birthdate && !errors.MobileNo && !errors.EmailID && errors.uploadphoto && <Error errorName={errors.uploadphoto} />}

      </Card>
    </div>
  )
}

export default PersonalDetails