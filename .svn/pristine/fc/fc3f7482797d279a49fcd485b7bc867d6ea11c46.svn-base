import React, { useRef, useState } from "react";
import {
  Card,
  CardBody,
  Button
} from "@windmill/react-ui";
import HeadKyc from 'components/KYC/HeadKyc';
import useKycSubmit from 'hooks/useKycSubmit';
import Inputfields from './Inputfields';

import PincodeInput from 'components/form/PincodeInput ';
import LabelArea from 'components/form/LabelArea';
import TextAreaCom from 'components/form/TextAreaCom';
import Error from 'components/form/Error';

import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';

import ImageUpload from "./ImageUpload";
import { notifyError, notifySuccess } from 'utils/toast';

const AddressProof = ({ handleNext, handlePrevious }) => {
  const [pincodeData, setPincodeData] = useState({});
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [file, setFile] = useState(null);
  const [photoURL, setPhotoURL] = useState('');
  const [openCrop, setOpenCrop] = useState(false);

  const { errors, register, handleSubmit, onSubmit, } = useKycSubmit();
  const inputFileRef = useRef(null);



  const handleFormSubmit = (data) => {



    // console.log("***************in handleFormSubmit", data);
    const formData = {
      ...data,
      ...pincodeData,
    
    };

    console.log("***************in AddressProof Step:", formData);

    onSubmit(formData);
    notifySuccess("Address Proof Details Submited");
    handleNext(); // Move to the next step after form submission
  };

  const handlePincodeSubmit = (formData) => {
    setPincodeData(formData);
  };

  const handleImageUpload = () => {
    const file = inputFileRef.current.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);

      };
      reader.readAsDataURL(file);
      setSelectedImage(file); // Set the selected image here
      // console.log(file);
      const formData = new FormData();
      formData.append('image', file);

    }
  };

  const imagewidth = 400;
  const imageheight = 400;


  return (
    <div className='p-2'>
      <Card className='w-min' >
        <CardBody>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <HeadKyc title='Address Proof ' />
            <div className="grid lg:grid-cols-2 sm:grid-cols-1">
              <div className="flex flex-col justify-center">

                <PincodeInput register={register} errors={errors} handlePincodeSubmit={handlePincodeSubmit} />
                <LabelArea label="Street/Landmark/Building" />
                <TextAreaCom
                  register={register}
                  type="text"
                  placeholder="Street/Landmark/Building"
                  name="Address"
                  label="Address"
                  rows="2"
                />
                {/* <Error  errorName={errors.Address} /> */}




                <Error errorName={errors.AddressProofimg} />
              </div>

            </div>

            <div className='flex justify-center m-3 '>
              <Button className="px-4" onClick={handlePrevious}>
                <MdOutlineNavigateBefore />   Previous
              </Button>
              <Button type="submit" className="mx-4" >
                Next <MdOutlineNavigateNext />
              </Button>
            </div>
          </form>
        </CardBody>
        {errors.pincode && <Error errorName={errors.pincode} />}
        {!errors.pincode && errors.select && <Error errorName={errors.select} />}
        {!errors.pincode && !errors.select && errors.otherArea && <Error errorName={errors.otherArea} />}
        {!errors.pincode && !errors.select && !errors.otherArea && errors.Address && <Error errorName={errors.Address} />}

      </Card>
    </div>
  )
}

export default AddressProof