import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@windmill/react-ui";

import Error from "components/form/Error";
import useLoginSubmit from "hooks/useLoginSubmit";
import LabelArea from "components/form/LabelArea";
import InputArea from "components/form/InputArea";
import ImageLight from "assets/img/forgot-password-office.jpeg";
import ImageDark from "assets/img/forgot-password-office-dark.jpeg";
import ReCAPTCHA from "react-google-recaptcha";

const ChangePass = () => {
  const { onSubmit, register, handleSubmit, errors, loading } = useLoginSubmit();

  const recaptchaRef = useRef(null);

  const handleRecaptchaChange = (value) => {
    console.log("Captcha value:", value);
  };


  

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
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
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
              Change Password
              </h1>

              <form onSubmit={handleSubmit(onSubmit)}>
                <LabelArea label="Old Password" />
                <InputArea
                  register={register}
                  label="Oldpassword"
                  name="Oldpassword"
                  type="number"
                  placeholder="Old Password"
                />
                {/* <Error errorName={errors.ChangepasuserId} /> */}

                <LabelArea label="New Password" />
                <InputArea
                  register={register}
                  label="ChangePassword"
                  name="ChangePassword"
                  maxlength="6"
                  type="text"
                  placeholder="New Password"
                />
                {/* <Error errorName={errors.ChangePassword} /> */}

                <LabelArea label="Verify New Password" />
                <InputArea
                  register={register}
                  label="VerChangePas"
                  name="VerChangePas"
                  type="text"
                  placeholder="Verify New Password"
                />
                {/* <Error errorName={errors.VerChangePas} /> */}

                <ReCAPTCHA
                  sitekey="6Lcu6CwmAAAAAKgKI09aW41jXfGbXHNieDcxzZx4"
                  size="invisible"
                  ref={recaptchaRef}
                  onChange={handleRecaptchaChange}
                />

        {errors.Oldpassword && <Error errorName={errors.Oldpassword} />}
        {!errors.Oldpassword && errors.ChangePassword && <Error errorName={errors.ChangePassword} />}
        {!errors.Oldpassword && !errors.ChangePassword && errors.VerChangePas && <Error errorName={errors.VerChangePas} />}
                <Button disabled={loading} type="submit" block className="mt-4 h-12">
                  Change password
                </Button>
              </form>
            
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ChangePass;
