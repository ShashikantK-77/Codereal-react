import React from 'react'
import { Button, Card, CardBody } from '@windmill/react-ui';
import HeadKyc from 'components/KYC/HeadKyc';
import Inputfields from 'components/KYC/Inputfields';
import PageTitle from 'components/Typography/PageTitle'
import Error from 'components/form/Error';
import useKycSubmit from 'hooks/useKycSubmit';
import { formValidationRules } from 'components/form/formValidationRules';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';
import PincodeInput from 'components/form/PincodeInput ';
import { useState } from 'react';
import LabelArea from 'components/form/LabelArea';
import TextAreaCom from 'components/form/TextAreaCom';


const MyProfile = () => {
    const [pincodeData, setPincodeData] = useState({});
  const handlePincodeSubmit = (formData) => {
    setPincodeData(formData);
  };

const adminInfoCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('zenithQuark='));
const adminInfoValue = adminInfoCookie ? decodeURIComponent(adminInfoCookie.split('=')[1]) : '';
const adminInfo = JSON.parse(adminInfoValue);

    const { errors, register, handleSubmit, onSubmit, defaultBirthdate } = useKycSubmit();

  return (
    <div>
                <PageTitle>My Profile</PageTitle>
                <Card className='w-min' >

<CardBody>
  <form onSubmit={handleSubmit}>

    <div className="grid lg:grid-cols-2 sm:grid-cols-1">
      <div className="flex flex-col justify-center">
        <Inputfields register={register} label={"Name"} name={"Username"} placeholder={"Enter User Name"} 
        // defaultValue={adminInfo?.result[0]?.UserName} 
        disabled={true}/>
        {/* <Error  errorName={errors.Username} /> */}
        
         
        <Inputfields maxLength={14} register={register} label={"Mobile No."} name={"MobileNo"} placeholder={"Enter Mobile No."} type={"number"} 
        // defaultValue={adminInfo?.result[0]?.MobileNumber} 
        disabled={true}/>
        {/* <Error errorName={errors.MobileNo} /> */}
        <Inputfields register={register} label={"Email ID"} name={"EmailID"} placeholder={"Enter Email ID"} 
        // defaultValue={adminInfo?.result[0]?.Email}
        disabled={true} />
        {/* <Error errorName={errors.EmailID} /> */}

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

                





      </div></div>
    <div className='flex justify-center mx-3 my-4 '>
      <Button type='submit' className="mx-4 text-white" >
        Update 
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

export default MyProfile