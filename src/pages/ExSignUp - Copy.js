import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input, Label, Button } from "@windmill/react-ui";
import { ImFacebook, ImGoogle } from "react-icons/im";
import { useTranslation } from "react-i18next";
import Error from "components/form/Error";
import InputArea from "components/form/InputArea";
import LabelArea from "components/form/LabelArea";
import SelectRole from "components/form/SelectRole";
import useLoginSubmit from "hooks/useLoginSubmit";
import ImageLight from "assets/img/create-account-office.jpeg";
import ImageDark from "assets/img/create-account-office-dark.jpeg";
import PincodeInput from "components/form/PincodeInput ";
import TextAreaCom from "components/form/TextAreaCom";

const ExSignUp = () => {
  const {t}=useTranslation()
  const [pincodeData, setPincodeData] = useState({});
  const { onSubmit, register, handleSubmit, errors, loading } = useLoginSubmit();

  const handleFormSubmit = (data) => {
    const formData = {
      ...data,
      ...pincodeData
    };

    console.log("Form data:", formData);
    onSubmit(formData);
  };

  const handlePincodeSubmit = (formData) => {
    setPincodeData(formData);
  };



  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                {t("CreateAccountForExecutive")}
              </h1>
              <form  onSubmit={handleSubmit(handleFormSubmit)}>
             
                <LabelArea label="Name" />
                <InputArea
                  register={register}
                  label="Name"
                  name="Name"
                  type="text"
                  placeholder="Admin"
                />
                <Error errorName={errors.Name} />

                <LabelArea label="Mobile Number" />
                <InputArea
                  register={register}
                  label="MobileNumber"
                  name="MobileNo"
                  type="tel"
                  placeholder="9876543210"
                />
                <Error errorName={errors.MobileNo} />


                <LabelArea label="Email" />
                <InputArea
                  register={register}
                  label="Email"
                  name="EmailID"
                  type="email"
                  placeholder="sheetal.jadhav@ventajatech.com"
                />
                <Error errorName={errors.EmailID} />

              


                <PincodeInput register={register} errors={errors} handlePincodeSubmit={handlePincodeSubmit} />

                <LabelArea label="Street/Landmark/Building" />
                <TextAreaCom
                    register={register}
                    type="text"
                    placeholder="Street/Landmark/Building"
                    name="Address"
                    rows="2"
                />
                <Error errorName={errors.Address} />

                <LabelArea label="RefranceID" />
                <InputArea
                  register={register}
                  label="RefranceID"
                  name="ReferenceId"
                  type="text"
                  placeholder="Enter the reference ID"
                />
                <Error errorName={errors.ReferenceId} />
                <br/>

                <Label className="mt-6" check>
                  <Input type="checkbox" />
                  <span className="ml-2">
                    {t("Iagree")} <span className="underline">{t("privacyPolicy")}</span>
                  </span>
                </Label>

                <Button
                  disabled={loading}
                  type="submit"
                  className="mt-4 h-12 w-full"
                  to="/masterdashboard"
                  block
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
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ExSignUp;
