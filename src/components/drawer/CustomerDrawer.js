import { Textarea } from "@windmill/react-ui";
import DrawerButton from "components/form/DrawerButton";
import Error from "components/form/Error";
import InputArea from "components/form/InputArea";
import LabelArea from "components/form/LabelArea";
import Title from "components/form/Title";
import useCustomerSubmit from "hooks/useCustomerSubmit";
import React from "react";
import Scrollbars from "react-custom-scrollbars-2";

const CustomerDrawer = ({ id }) => {
  const { register, handleSubmit, onSubmit, errors } = useCustomerSubmit(id);

  // console.log('##CustomerDrawer',)
  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title={"Update Customer"}
            description={"Update your Client necessary information from here"}
          />
        ) : (
          <Title
            title={"Add Client"}
            description={"Add your Client necessary information from here"}
          />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Name"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Name"
                  name="name"
                  type="text"
                  placeholder={"Name"}
                />
                <Error errorName={errors.name} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Email"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Email"
                  name="email"
                  type="email"
                  placeholder={"Email"}
                />
                <Error errorName={errors.email} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Phone"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required
                  register={register}
                  label="Phone"
                  name="phone"
                  type="text"
                  placeholder={"Phone"}
                />
                <Error errorName={errors.phone} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Address"} />
              <div className="col-span-8 sm:col-span-4">
              <Textarea 
                required
                  register={register}
                  label="Address"
                  name="address"
                  type="text"
                  placeholder={"Address"}
              />
                {/* <InputArea
                  
                /> */}
                <Error errorName={errors.address} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"ClientId"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required
                  register={register}
                  label="ClientId"
                  name="ClientId"
                  type="text"
                  placeholder={"ClientId"}
                />
                <Error errorName={errors.ClientId} />
              </div>
            </div>

            
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"apiKey"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required
                  register={register}
                  label="apiKey"
                  name="apiKey"
                  type="text"
                  placeholder={"Api Key"}
                />
                <Error errorName={errors.apiKey} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"SecretKey"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required
                  register={register}
                  label="SecretKey"
                  name="SecretKey"
                  type="text"
                  placeholder={"Secret Key"}
                />
                <Error errorName={errors.SecretKey} />
              </div>
            </div>
          </div>

          <DrawerButton id={id} title="Client" />
        </form>
      </Scrollbars>
    </>
  );
};

export default CustomerDrawer;
