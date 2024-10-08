import React from "react";
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
import { useForm } from "react-hook-form";
import SelectGender from "components/form/SelectGender";

const SignUp = () => {
  const { t } = useTranslation();
  const { onSubmit, register, handleSubmit, errors, loading, watch } =
    useLoginSubmit();

  // const { register, handleSubmit, formState: { errors } } = useForm(); // Add this line

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
                {t("CreateAccount")}
              </h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <LabelArea label="Full Name" />
                <InputArea
                  register={register}
                  label="Name"
                  name="name"
                  type="text"
                  errors={errors} // Pass the 'errors' object to InputArea

                  // placeholder="Full Name"
                />
                <Error errorName={errors.name} />

                <LabelArea label="Mobile No" />
                <InputArea
                  register={register}
                  label="Mobile_No"
                  name="Mobile_No"
                  type="number"
                  // placeholder="Mobile No"
                />
                <Error errorName={errors.Mobile_No} />

                <Error errorName={errors.name} />
                <LabelArea label="Email" />
                <InputArea
                  register={register}
                  label="Email"
                  name="email"
                  type="email"
                  // placeholder="Email"
                />
                <Error errorName={errors.email} />

                <LabelArea label="Password" />
                <InputArea
                  register={register}
                  label="Password"
                  name="password"
                  type="password" // Ensure this is set to "password" for password validation
                  errors={errors}
                />
                <Error errorName={errors.password} />

                <LabelArea label="Confirm Password" />
                <InputArea
                  register={register}
                  label="cpassword"
                  name="cpassword"
                  type="password"
                  errors={errors}
                  // placeholder="Email"
                  password={watch("password")}
                />
                <Error errorName={errors.cpassword} />

         
                <div className="col-span-8 sm:col-span-4">
       
                


                  <LabelArea label="Gender" />
             
                  {/* <SelectRole register={register} label="Role" name="Account_Type"  errors={errors}/> */}
                  <SelectGender
                    register={register}
                    label="Gender"
                    name="Gender"
                    errors={errors}
                  />

                </div>


                <Label className="mt-6" check>
                  <Input type="checkbox" required />
                  <span className="ml-2">
                    {t("Iagree")}
                    <Link to="/termscoundition">
                      <span className="underline">{t("privacyPolicy")}</span>
                    </Link>
                  </span>
                </Label>

                <Button
                  disabled={loading}
                  type="submit"
                  className="mt-4 h-12 w-full"
                  to="/login"
                  block
                >
                  {t("CreateAccountTitle")}
                </Button>
              </form>

              <hr className="my-10" />

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

          <Error errorName={errors.name} />
          {!errors.name && <Error errorName={errors.Mobile_No} />}

          {!errors.name && !errors.Mobile_No && (
            <Error errorName={errors.email} />
          )}

          {!errors.name && !errors.Mobile_No && !errors.email && (
            <Error errorName={errors.password} />
          )}

          {!errors.name &&
            !errors.Mobile_No &&
            !errors.email &&
            !errors.password && <Error errorName={errors.cpassword} />}
            
          {!errors.name &&
            !errors.Mobile_No &&
            !errors.email &&
            !errors.password &&
            !errors.cpassword && <Error errorName={errors.Account_Type} />}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
