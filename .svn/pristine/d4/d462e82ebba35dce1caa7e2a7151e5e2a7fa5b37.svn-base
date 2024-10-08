import React, {  useState } from 'react'
import {
  Card,
  CardBody,
  Button,
  Label
} from "@windmill/react-ui";
import HeadKyc from 'components/KYC/HeadKyc';
import useKycSubmit from 'hooks/useKycSubmit';
import Inputfields from './Inputfields';
import Error from 'components/form/Error';
import { MdOutlineNavigateBefore,MdOutlineNavigateNext } from 'react-icons/md';
import ImageUpload from './ImageUpload';
import { notifyError, notifySuccess } from 'utils/toast';
import { AiOutlineCheck,AiOutlineClose } from "react-icons/ai";

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



    console.log("***************in handleFormSubmit", data);
    const formData = {
      ...data,
     

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
                {/* <Label className='text-green-400'><AiOutlineCheck /> Verified</Label> */}
                <Label className="text-green-500 flex items-center">
      <AiOutlineCheck className="mr-1" />
      Verified
    </Label>
          
{/* <Error errorName={errors.pannumber} /> */}

              

                <Inputfields register={register} label={" Aadhar Card No."} name={"AadharCard"} placeholder={"Enter Aadhar Card No.:"} maxLength={12} />
                {/* <Label className='text-red-700'><AiOutlineClose/>Rejected</Label> */}
                <Label className="text-red-700 flex items-center">
      <AiOutlineClose className="mr-1" />
      Invalid
    </Label>
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
        {errors.pannumber && <Error errorName={errors.pannumber} />}
        {!errors.pannumber && errors.AadharCard && <Error errorName={errors.AadharCard} />}
      </Card>
    </div>
  )
}

export default IDProof



