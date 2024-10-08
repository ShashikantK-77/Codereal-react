import React, {  useState } from 'react'
import {
  Card,
  CardBody,
  Button
} from "@windmill/react-ui";
import HeadKyc from 'components/KYC/HeadKyc';
import useKycSubmit from 'hooks/useKycSubmit';
import Inputfields from './Inputfields';
import Error from 'components/form/Error';
import { MdOutlineNavigateBefore,MdOutlineNavigateNext } from 'react-icons/md';
import ImageUpload from './ImageUpload';
import { notifyError, notifySuccess } from 'utils/toast';

const IDProof = ({ handleNext, handlePrevious }) => {



  const [panURL, setPanURL] = useState('');
  const [openCroppan, setOpenCroppan] = useState(false);

  const [adharBackURL, setAdharBack] = useState('');
  const [openCropbackAdhar, setOpenCropbackAdhar] = useState(false);

  const [panfile, setPanFile] = useState(null);
  const [frontaadharfile, setFrontAadharFile] = useState(null);
  const [backaadharfile, setBackAadharFile] = useState(null);


  const [aadharFrontURL, setAadharFrontURL] = useState('');
  const [openCropAadharFront, setOpenCropAadharFront] = useState(false);




  const { errors, register, handleSubmit, onSubmit, } = useKycSubmit();
  const imagewidth = 378;
  const imageheight = 252;

  const handleFormSubmit = (data) => {

    // if (!panURL) {
    //   notifyError("Please select PAN Card Image");
    //   return;
    // }
  
    // if (!aadharFrontURL) {
    //   notifyError("Please select AadharCard Front Image");
    //   return;
    // }
  
    // if (!adharBackURL) {
    //   notifyError("Please select AadharCard Back Image");
    //   return;
    // }

    console.log("***************in handleFormSubmit", data);
    const formData = {
      ...data,
      uploadpan: panURL,
      AadharFront: aadharFrontURL,
      AadharBack: adharBackURL,

    };

    console.log("***************in IDProof Step:", formData);

    onSubmit(formData);
    notifySuccess("IDProof Details Submited");
    handleNext(); // Move to the next step after form submission
  };

  return (
    <div className='p-2'>
      <Card className='w-min' >
        {/* <Card className="w-10/12 sm:w-screen"> */}
        <CardBody>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <HeadKyc title='ID Proof ' />
            <div className="grid lg:grid-cols-2 sm:grid-cols-1">
              <div className="flex flex-col justify-center">
                <Inputfields register={register} label={"PAN"} name={"pannumber"} placeholder={"Enter Pan number"} maxLength={10} className={"uppercase"}  />
                {/* <Error errorName={errors.pannumber} /> */}

                <ImageUpload
                  photoURL={panURL}
                  setPhotoURL={setPanURL}
                  label='Upload Pan'
                  setFile={setPanFile}
                  setOpenCrop={setOpenCroppan}
                  openCrop={openCroppan}
                  imagewidth={imagewidth} 
                  imageheight={imageheight}
                />

                <Inputfields register={register} label={" Aadhar Card No."} name={"AadharCard"} placeholder={"Enter Aadhar Card No.:"} maxLength={12} />

                {/* <Error errorName={errors.AadharCard} /> */}

              </div>
            </div>
            <div className='flex flex-col lg:flex-col w-11/12'>
              <ImageUpload
                photoURL={aadharFrontURL}
                setPhotoURL={setAadharFrontURL}
                label='Upload Aadhar Front'
                setFile={setFrontAadharFile}
                setOpenCrop={setOpenCropAadharFront}
                openCrop={openCropAadharFront}
                imagewidth={imagewidth} 
                  imageheight={imageheight}
              />
              <ImageUpload
                photoURL={adharBackURL}
                setPhotoURL={setAdharBack}
                label='Upload Aadhar Back'
                setFile={setBackAadharFile}
                setOpenCrop={setOpenCropbackAdhar}
                openCrop={openCropbackAdhar}
                imagewidth={imagewidth} 
                  imageheight={imageheight}
              />
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

export default IDProof



