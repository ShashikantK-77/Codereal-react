import React, { useRef, useState } from 'react'
import {
    Card,
    CardBody,
    Button,
    Label
} from "@windmill/react-ui";
import HeadKyc from 'components/KYC/HeadKyc';
import useKycSubmit from 'hooks/useKycSubmit';
import Inputfields from './Inputfields';
import IMG from '../../assets/img/create-account-office.jpeg'
import Error from 'components/form/Error';

import IfscDetails from './IfscDetails'
import { MdOutlineNavigateBefore,MdOutlineNavigateNext } from 'react-icons/md';
import { formValidationRules } from 'components/form/formValidationRules';

import ImageUpload from './ImageUpload';
import { notifyError, notifySuccess } from 'utils/toast';


const BankDetails = ({ handleNext, handlePrevious }) => {
    const [image, setImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const inputFileRef = useRef(null);

    const [file, setFile] = useState(null);
    const [photoURL, setPhotoURL] = useState('');
    const [openCrop, setOpenCrop] = useState(false);

    const [ifsccode, setIfsccode] = useState('');
    const [Bankname, setBankname] = useState('');

    const handleFormSubmit = async (data) => {
        if (!ifsccode) {
            notifyError("Please Verify IFSCode Number");
            return;
          }
     
      
      
        const formData = {
          ...data,
          ifsccode:ifsccode,
          
        };
      
        console.log("***************in Bank Details Step:", formData);
      
        await onSubmit(formData);
        notifySuccess("Bank Details Submitted");
        handleNext(); // Move to the next step after form submission
      };
      

    const { errors, register, handleSubmit, onSubmit } = useKycSubmit();
// console.log("Bankname",Bankname,"ifsccode:",ifsccode);

const imagewidth = 700;
const imageheight = 315;


    return (
        <div className='p-2'>
            <Card className='w-min' >
                <CardBody>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <HeadKyc title='Bank Details  ' />
                        <div className="grid lg:grid-cols-2 sm:grid-cols-1">
                            <div className="flex flex-col justify-center">
                                <Inputfields register={register} label={"Bank Account No"} name={"BankAccount"} placeholder={"Enter Bank Account No"} />
                                {/* <Error errorName={errors.BankAccount} /> */}
                                <IfscDetails setIfsccode={setIfsccode} setBankname={setBankname} />
                            
                                {/* <Error errorName={errors.verifyifsc} /> */}
                  
                            </div>
                            <div className="flex ml-4 mx-auto justify-around space-x-4">
                            </div>
                            <input
                                type="text"
                                label="verifyifsc"
                                name='verifyifsc'
                                className="hidden"
                                value={ifsccode}
                                // {...register('verifyifsc', { ...formValidationRules.verifyifsc })}
                              />
                            

                        </div>
                        {errors.BankAccount && <Error errorName={errors.BankAccount} />}
                {!errors.BankAccount && errors.IFSCode &&  <Error errorName={errors.IFSCode} />}
                        <div className='flex justify-center m-3 '>
                            <Button className="px-4" onClick={handlePrevious}>
                                <MdOutlineNavigateBefore />  Previous
                            </Button>
                            <Button type="submit" className="mx-4" >
                                Next <MdOutlineNavigateNext className="text-white" />
                            </Button>
                        </div>
                       
                    </form>
                </CardBody>
                
            </Card>
        </div>
    )
}

export default BankDetails