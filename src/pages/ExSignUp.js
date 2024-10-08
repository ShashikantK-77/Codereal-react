import React, { useRef,useState } from "react";
import { Link } from "react-router-dom";
import { Label, Button } from "@windmill/react-ui";
// import { ImFacebook, ImGoogle } from "react-icons/im";
import { useTranslation } from "react-i18next";
import Error from "components/form/Error";
import InputArea from "components/form/InputArea";
import LabelArea from "components/form/LabelArea";

import useLoginSubmit from "hooks/useLoginSubmit";
import ImageLight from "assets/img/create-account-office.jpeg";
import ImageDark from "assets/img/create-account-office-dark.jpeg";
import PincodeInput from "components/form/PincodeInput ";
import TextAreaCom from "components/form/TextAreaCom";
import ProgressBar from 'react-progress-bar-plus';
import 'react-progress-bar-plus/lib/progress-bar.css';

import ReCAPTCHA from "react-google-recaptcha";
import ValidateReferral from "components/form/ValidateReferral";
import CheckBox from "components/form/CheckBox";
import { formValidationRules } from "components/form/formValidationRules";
import { notifyError } from "utils/toast";


const ExSignUp = () => {
  const { t } = useTranslation()
  const [pincodeData, setPincodeData] = useState({});
  const [showReferenceId, setShowReferenceId] = useState(false);

  // const [showLabel, setShowLabel] = useState(false);
  const [Verified, setVerified] = useState('');
  const recaptchaRef = useRef(null);


  const [formData,setFormData] = useState([]);
  const [Referral,setReferral] = useState();
  const[Team,SetTeam] = useState();

  const [VerifyResult,setVerifyResult] = useState('');

  const { onSubmit, register, handleSubmit, errors, loading, progress } = useLoginSubmit();




  const handleFormSubmit = (data) => {
console.log("in this");
    console.log("***************in handleFormSubmit", data);
    const formData = {
      ...data,
      ...pincodeData,
      ...Referral,
    };

    console.log("***************in signup Form data:", formData);
    setFormData(formData)

    if (!showReferenceId && VerifyResult !== null && !VerifyResult) {
      notifyError("Please verify the referral ID.");
      return;
    }

      onSubmit(formData);
  
  };



  const handlePincodeSubmit = (formData) => {
    setPincodeData(formData);
  };

  const handleSelectTeam = (e) => {
    SetTeam(e.target.value);
  };
 


  const handleValidateReferralSubmit = (formData) => {
    if (showReferenceId && VerifyResult) {
      const referralData = {
        ReferenceId: formData.Referral
      };
      setReferral(referralData);
    } else {
      setReferral(''); // Clear the referral data by setting it to an empty string
    }
  };
  

  const handleCheckboxChange = () => {
    setShowReferenceId(!showReferenceId);
    setVerifyResult('');
    SetTeam('');
    // setReferral('');
  };


  

  const handleFormSubmitbtn = () => {
    // Perform form submission
    console.log("Form submitted");
    console.log("Input value:", formData);
  };

  const handleRecaptchaChange = (value) => {
    console.log("Captcha value:", value);
    setVerified(true);
    handleFormSubmitbtn(); // Call handleFormSubmit when reCAPTCHA is verified
  };

  // const handleButtonSubmit = () => {
  //     // loading=false;
  //   recaptchaRef.current.execute();

  // };


 




  return (
    <> <ProgressBar percent={progress} spinner={false}/>
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full lg:h-96 dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-96 dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                {t("CreateExecutiveAccount")}
              </h1>
              <form onSubmit={handleSubmit(handleFormSubmit)}>

                <LabelArea label="Full Name" />
                <InputArea
                  register={register}
                  // {...register("Name")}
                  label="Full Name"
                  name="Name"
                  type="text"
                  placeholder="Full Name"
              
                />
                {/* <Error errorName={errors.Name} /> */}


                <LabelArea label="Mobile Number" />
                <InputArea
                  register={register}
                  label="MobileNo"
                  name="MobileNo"
                  type="number"
                  placeholder="Mobile Number"
                />
                {/* <Error  errorName={errors.MobileNo} /> */}

                <LabelArea label="Email ID" />
                <InputArea
                  register={register}
                 
                  label="EmailID"
                  name="EmailID"
                  type="email"
                  placeholder="Email ID"
              
                />
                {/* <Error style={{ marginTop: '-2rem' }} errorName={errors.EmailID} /> */}




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
                {/* <Error style={{ marginTop: '-2rem' }} errorName={errors.Address} /> */}

                <br />

                <Label className="mt-6" check>
                  <CheckBox type="checkbox" onChange={handleCheckboxChange}  />
                  <span className="ml-2">
                    {t("Idnthave")} {t("ReferralId")}
                  </span>
                </Label>

                {/* {showReferenceId && (
                  <> */}
                    
                    <ValidateReferral 
                    register={register} 
                    errors={errors}  
                    handleValidateReferralSubmit={handleValidateReferralSubmit} 
                    setVerifyResult={setVerifyResult}
                    disabled={showReferenceId} 
                    />

                 

                    {/* <Error style={{ marginTop: '-2rem' }} errorName={errors.ReferenceId} /> */}

                  {/* </>
                )} */}


                <LabelArea label=" Team : " />

<select
  {...register('teamselect', {
    ...formValidationRules.select,
    // validate: (value) => value !== '-- Select --' || 'Please select an option',
  })}
  name="teamselect"
  label="teamselect"
  disabled={showReferenceId}
  value={Team}
  onChange={handleSelectTeam}
  // onChange={handleSelect}
  className="bg-gray-50 mr-2 rounded w-1/2 h-10 p-2 text-sm border border-gray-300 focus:bg-white focus:border-gray-300 focus:outline-none mb-4">
  <option>-- Select --</option>
  <option>Team 1</option>
  <option>Team 2</option>
</select>

{showReferenceId && <Error errorName={errors.teamselect} />}

              
          
                <Label className="mt-1" check>
                <input type="checkbox" name="chkterms"   
     {...register('chkterms', {
      validate: (value) => value === true || 'Please read and agree to the Terms and Conditions.',
    })}

/>
                  <span className="ml-2">
                    {t("Iagree")} <span className="underline">
                    <Link to="/termscoundition">
                    {t("privacyPolicy")}
                    </Link>
                    </span>
                  </span>
                </Label>
                <br/>
                {/* <Error style={{ marginTop: '-2rem' }} errorName={errors.chkterms} /> */}




                <ReCAPTCHA
                  sitekey="6Lcu6CwmAAAAAKgKI09aW41jXfGbXHNieDcxzZx4"
                  size="invisible"
                  ref={recaptchaRef}
                  onChange={handleRecaptchaChange}
                />

{errors.Name && <Error errorName={errors.Name} />}
                  {!errors.Name && errors.MobileNo && <Error errorName={errors.MobileNo} />}
                  {!errors.Name && !errors.MobileNo && errors.EmailID && <Error errorName={errors.EmailID} />}
                  {!errors.Name && !errors.MobileNo && !errors.EmailID && errors.pincode &&  <Error errorName={errors.pincode} />}
                  {!errors.Name && !errors.MobileNo && !errors.EmailID && !errors.pincode && errors.select && <Error errorName={errors.select} />}
                  {!errors.Name && !errors.MobileNo && !errors.EmailID && !errors.pincode && !errors.select && errors.otherArea && <Error  errorName={errors.otherArea}/>}
                  {!errors.Name && !errors.MobileNo && !errors.EmailID && !errors.pincode && !errors.select && !errors.otherArea && errors.Address && <Error errorName={errors.Address} />}
                  {!errors.Name && !errors.MobileNo && !errors.EmailID && !errors.pincode && !errors.select && !errors.otherArea && !errors.Address && errors.ReferenceId && <Error errorName={errors.ReferenceId} />}
                
                  {!errors.Name && !errors.MobileNo && !errors.EmailID && !errors.pincode && !errors.select && !errors.otherArea && !errors.Address && !errors.ReferenceId && errors.teamselect &&  <Error errorName={errors.teamselect} />}

                  {!errors.Name && !errors.MobileNo && !errors.EmailID && !errors.pincode && !errors.select && !errors.otherArea && !errors.Address && !errors.ReferenceId && !errors.teamselect && errors.chkterms && <Error errorName={errors.chkterms} />}

                <Button
                  // disabled={loading}
                  type="submit"
                  className="mt-4 h-12 w-full"
                  to="/dashboard"
                  block
                  // onClick={handleButtonSubmit}
                >
                  {t("CreateAccountTitle")}
                </Button>
              </form>

              <hr className="my-10" />

              {/* <button
                disabled
                className="text-sm inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center rounded-md focus:outline-none text-gray-700 bg-gray-100 shadow-sm my-2 md:px-2 lg:px-3 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-blue-600 h-11 md:h-12 w-full mr-2"
              >
                <ImFacebook className="w-4 h-4 mr-2" /> <span className="ml-2"> {t("LoginWithFacebook")} </span>
              </button>
              <button
                disabled
                className="text-sm inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center rounded-md focus:outline-none text-gray-700 bg-gray-100 shadow-sm my-2  md:px-2 lg:px-3 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-red-500 h-11 md:h-12 w-full"
              >
                <ImGoogle className="w-4 h-4 mr-2" /> <span className="ml-2">{t("LoginWithGoogle")}</span>
              </button> */}

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-green-500 dark:text-green-400 hover:underline"
                  to="/login"
                >
                  {t("AlreadyAccount")}
                </Link>
              </p>
              {/* <p className="mt-1">
                <Link
                  className="text-sm font-medium text-green-500 dark:text-green-400 hover:underline"
                  to="/exsignup"
                >
                  {t("CreateExecutiveAccount")}
                </Link>
              </p> */}
            </div>
          </main>
        </div>
      </div>
    </div>
    </>
  );
};

export default ExSignUp;
