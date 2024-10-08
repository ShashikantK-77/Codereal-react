import React, { useRef, useState } from 'react';
import {
  Card,
  CardBody,
  Button
} from "@windmill/react-ui";
import HeadKyc from 'components/KYC/HeadKyc';
import useKycSubmit from 'hooks/useKycSubmit';
import Inputfields from './Inputfields';
import IMG from '../../assets/img/create-account-office.jpeg'
import { MdOutlineNavigateBefore } from 'react-icons/md';
import { formValidationRules } from "components/form/formValidationRules";
import { notifyError, notifySuccess } from 'utils/toast';

import Error from 'components/form/Error';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
const NomineeDetails = ({ handleNext, handlePrevious }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [nomineeRel, setNomineeRel] = useState('');
  const { errors, register, handleSubmit, onSubmit, defaultBirthdate } = useKycSubmit();
  const fileInputRef = useRef(null);
  const handleFileSelect = (event) => {
    // fileInputRef.current && fileInputRef.current.click();
    const file = event.target.files[0];
    setSelectedPhoto(URL.createObjectURL(file));
  };
  const handleUploadPhoto = () => {
    fileInputRef.current.click();
  };

 

  const handleFormSubmit = (data) => {
    const { NomineeBirthdate, ...restData } = data;
    const formattedData = {
      ...restData,
      NomineeBirthdate: formatDate(NomineeBirthdate),
      NomineeRel: nomineeRel,
    };

    console.log("***************in Nominee Details Step:", formattedData);

    onSubmit(formattedData);
    notifySuccess("Nominee Details Submitted");

    // Set a flag in localStorage to indicate successful form submission
    localStorage.setItem('kycSubmissionSuccess', 'true');

    // Redirect to the dashboard page
    window.location.href = '/dashboard';
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const handleNomineeRelChange = (e) => {
    const selectedValue = e.target.value;
    setNomineeRel(selectedValue);
    // You can also call the register function here if needed
    // register('NomineeRel');
  };

  return (
    <div className='p-2'>
      <Card className='w-min' >
        <CardBody>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <HeadKyc title='Nominee Details  ' />
            <div className="grid lg:grid-cols-2 sm:grid-cols-1">
              <div className="flex flex-col justify-center">
                <Inputfields register={register} label={"Nominee Name"} name={"Nomineename"} placeholder={"Enter Nominee Name"} />
                {/* <Error errorName={errors.Nomineename} /> */}
                <div className='flex items-start lg:items-center  m-2 lg:m-2 sm:m-0 flex-col sm:flex-row'>
                  {/* <Inputfields register={register} label={"Nominee Relation:"} name={"BirthDate"} placeholder={"Enter Nominee Relation"} /> */}
                  <label className="block text-sm  font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0" style={{ width: '155px' }}>
                    Nominee Relation:
                  </label>

                  {/* <div className="block mx-2 lg:mx-2 sm:m-0"> */}
                  <div className="w-full lg:flex-grow sm:w-full">

                    <select
                      name="NomineeRel"
                      label="NomineeRel"

                      {...register('NomineeRel', { ...formValidationRules.NomineeRel })}
                      onChange={handleNomineeRelChange}
                      value={nomineeRel}
                      className="border px-4  h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border"
                    // className="block w-full px-3 text-gray-400 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white placeholder-gray-500"

                    >
                      <option value="">-- Select --</option>
                      <option value="Aunty">Aunty</option>
                      <option value="Brother">Brother</option>
                      <option value="Cousin">Cousin</option>
                      <option value="Daughter">Daughter</option>
                      <option value="Father">Father</option>

                      <option value="Husband">Husband</option>
                      <option value="Mother">Mother</option>
                      <option value="Sister">Sister</option>
                      <option value="Son">Son</option>
                      <option value="Uncle">Uncle</option>
                      <option value="Wife">Wife</option>
                      <option value="Owner">Owner</option>
                    </select>

                  </div>


                </div>   
                {/* <Error errorName={errors.NomineeRel} /> */}



                <Inputfields register={register} label={"Nominee Contact No."} name={"Nominecontact"} placeholder={"Enter Nominee Contact No."} />
                {/* <Error errorName={errors.Nominecontact} /> */}
                <div className='flex items-start lg:items-center  m-2 lg:m-2 sm:m-0 flex-col sm:flex-row'>
                  <label className="block text-sm  font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0 placeholder-gray-500" style={{ width: '155px' }}>
                    Nominee Birth Date.:
                  </label>

                  {/* <div className='mx-2 lg:mx-2 sm:m-0'> */}
                  <div className=' w-full lg:flex-grow sm:w-full'>

                    <input
                      type='date'

                      {...register('NomineeBirthdate', { ...formValidationRules.NomineeBirthdate })}
                      name='NomineeBirthdate'
                      // defaultValue={defaultBirthdate}
                      className="block w-full px-3 text-gray-400 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white  "
                    />


                  </div>
                </div>
                {/* <Error errorName={errors.NomineeBirthdate} /> */}
                {/* <Button className='w-6/12  align-middle mt-4 mx-auto' type='submit'>Submit</Button> */}
              </div>

            </div>

            <div className='flex justify-center mt-8 '>

              <Button className="mx-4" onClick={handlePrevious}>
                <MdOutlineNavigateBefore /> Previous
              </Button>

              <Button className="mx-4" type='submit'>Submit</Button>


            </div>
          </form>
        </CardBody>
       {errors.Nomineename && <Error errorName={errors.Nomineename} />}
       {!errors.Nomineename && errors.NomineeRel && <Error errorName={errors.NomineeRel} />}
       {!errors.Nomineename && !errors.NomineeRel && errors.Nominecontact && <Error errorName={errors.Nominecontact} />}
       {!errors.Nomineename && !errors.NomineeRel && !errors.Nominecontact && errors.NomineeBirthdate &&   <Error errorName={errors.NomineeBirthdate} />}

      </Card>
    </div>
  )
}

export default NomineeDetails