import React from 'react'
import LabelArea from './LabelArea'
import { useState, useEffect } from 'react';
import Error from './Error';
import InputAreacompo from './InputAreacompo';
import Loaderinput from './Loaderinput';
import { formValidationRules } from './formValidationRules';



const ValidateReferral = ({ register, errors, handleValidateReferralSubmit, disabled,setVerifyResult }) => {

  const [result, setResult] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false); // Track loading state
  const [buttonClicked, setButtonClicked] = useState(false);
  const [verifyid, setVerifyid] = useState('');

  useEffect(() => {

    setInputValue('');
    setResult('');
    setLoading(false);

  }, [disabled]);




  const handleInputChange = (e) => {
    if (!disabled) {
      setInputValue(e.target.value);
      setLoading(false);
      setVerifyid('');
      const Referral = e.target.value;
      const formData = {
        Referral
      };

      //   if (!result) {
      //     // Show validation error message
      //     // setResult('Please verify the referral ID');
      //   } else {
      handleValidateReferralSubmit(formData);
      setResult('');
      //   }
    }
  };








  const validateReferral = async (e) => {
    e.preventDefault();
    setButtonClicked(true);
    setLoading(true); // Start the loader

    const url = "https://services.directsellingbooster.com/api/MyReferences/GetVerifyReferenceID";
    const body = {
      StrSponsorID: "vt10000",
      StrReferenceID: inputValue
    };
    const headers = {
      "Content-Type": "application/json",
      companyid: "100"
    };

    let isTimeout = false;

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => {
        isTimeout = true;
        reject(new Error('Request timeout'));
      }, 5000)
    );

    try {
      const response = await Promise.race([
        fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify(body)
        }),
        timeoutPromise
      ]);

      if (!isTimeout) {
        if (response.ok) {
          const data = await response.json();

          if (data.issuccess) {
            const name = data.result[0].Name;
            const referenceID = data.result[0].ReferenceID || ""; // Handle undefined case
            console.log("Name:", name);
            // Set the name and verifyid in the state or do something else with them
            setLoading(false); // Stop the loader
            setResult(name);
            setVerifyResult(name);
            setVerifyid(referenceID);
          } else {
            console.log("Validation failed:", data.message);
            setResult(data.message);
            // Handle the validation failure or show an error message
          }
        } else {
          console.log("Request failed with status:", response.status);
          setResult("Request failed");
          // Handle the error or show an error message
        }
      } else {
        console.log("Request timed out");
        setResult("Request timed out");
      }
    } catch (error) {
      console.log("Request error:", error);
      setResult(error.message);
      // Handle the error or show an error message
    }
  };



  return (
    <div>


      <LabelArea label="Referral Id" />

      <div className="flex">
        <input
          {...register('ReferenceId', {
            validate: (value) => {
              if (!disabled) {
                // Apply the validation rules if not disabled
                return formValidationRules.ReferenceId.validate(value);
              }
            },
          })}
          label="ReferenceId"
          name="ReferenceId"
          placeholder="Enter the Referral Id"
          type="text"
          value={inputValue}
          // className="w-1/2 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          className={`w-1/2 bg-gray-100 rounded border ${disabled ? 'bg-opacity-50 text-gray-400' : 'border-gray-300'
            } focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
          onChange={handleInputChange}
          disabled={disabled}
        />






        {!result && (
          <div className="w-1/2">
            {!loading && (
              <span><button className=" underline ml-3" onClick={validateReferral} disabled={disabled}>
                Verify
              </button></span>
            )}
            {loading && <Loaderinput />} {/* Show the loader when loading is true */}

          </div>
        )}
        {result && <span className={`text-xs ml-3 ${result === 'StrReference ID must not be empty.' || result === 'Invalid Upline ID.' || result === 'Please verify the referral ID' ? 'text-red-500' : ''}`}>
          {result}
        </span>}
      </div>
      {/* {!disabled && !result &&
        <Error errorName={errors.ReferenceId} />
      } */}

    
    </div>

  )
}

export default ValidateReferral