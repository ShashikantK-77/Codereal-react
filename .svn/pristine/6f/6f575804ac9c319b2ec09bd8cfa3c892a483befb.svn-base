import React, { useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Card, CardBody, Input, Select } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import useStaffSubmit from "hooks/useStaffSubmit";
import Title from "components/form/Title";
import LabelArea from "components/form/LabelArea";
import Uploader from "components/image-uploader/Uploader";
import InputArea from "components/form/InputArea";
import Error from "components/form/Error";
import SelectRole from "components/form/SelectRole";
import DrawerButton from "components/form/DrawerButton";
import useClientAdd from "hooks/useClientAdd";

const MasterDrawer = ({ id }) => {
  const [selectedMasterAccount,setSelectedMasterAccount] = useState('');
  // const {
  //   register,
  //   handleSubmit,
  //   onSubmit,
  //   errors,
  //   imageUrl,
  //   setImageUrl,
  //   selectedDate,
  //   setSelectedDate,
  //   handleSelectLanguage,
  // } = useStaffSubmit(id);

  const { register, handleSubmit, onSubmit, errors,reset } = useClientAdd();
  
  const handleCustomSubmit = (data) => {
    onSubmit(data);
    reset();
  };
  const { t } = useTranslation();
  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title={"Update Client"}
            description={"Update your Client necessary information from here"}
          />
        ) : (
          <Title
            title={t("AddMasterAccount")}
            description={"Add your Master necessary information from here"}
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
          <CardBody>
            <form onSubmit={handleSubmit(handleCustomSubmit)}>
              <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
                {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Staff Image" />
                  <div className="col-span-8 sm:col-span-4">
                    <Uploader
                      imageUrl={imageUrl}
                      setImageUrl={setImageUrl}
                      folder="admin"
                    />
                  </div>
                </div> */}

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Account Name" />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                         required
                      register={register}
                      label="Name"
                      name="name"
                      type="text"
                      placeholder="Name"
                    />
                    <Error errorName={errors.name} />
                  </div>
                </div>

             

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Client Id / Account No."} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required
                  register={register}
                  label="Client Id"
                  name="ClientId"
                  type="text"
                  placeholder={"Client ID"}
                 
                />
                <Error errorName={errors.ClientId} />
              </div>
            </div>


                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Broker" />
                  <div className="col-span-8 sm:col-span-4">
                    <Select
                         required
                         className="mt-1 block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border h-12 text-sm focus:outline-none block w-full bg-white-100 dark:bg-white border-transparent focus:bg-white"
                      register={register} // No need for validation on the "Broker" field
                      label="Broker"
                      name="broker"

                      value={selectedMasterAccount}
                      onChange={(e) => setSelectedMasterAccount(e.target.value)}
                    >
                      <option value="">{t("Please Select Broker")}</option>

                      <option value="one">Broker one</option>
                      <option value="two">Broker two</option>
                      <option value="three">Broker three</option>
                      <option value="four">Broker four</option>
                    </Select>
                    <Error errorName={errors.broker} />
                  </div>
                </div>

              

            
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"API Key"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required
                  register={register}
                  label="API Key"
                  name="apiKey"
                  type="text"
                  placeholder={"API Key"}
                />
                <Error errorName={errors.apiKey} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Secret Key"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required
                  register={register}
                  label="Secret Key"
                  name="SecretKey"
                  type="text"
                  placeholder={"Secret Key"}
                />
                <Error errorName={errors.SecretKey} />
              </div>
            </div>


                {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Joining Date" />
                  <div className="col-span-8 sm:col-span-4">
                    <Input
                      onChange={(e) => setSelectedDate(e.target.value)}
                      label="Joining Date"
                      name="joiningDate"
                      value={selectedDate}
                      type="date"
                      className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      placeholder={t("StaffJoiningDate")}
                    />
                    <Error errorName={errors.joiningDate} />
                  </div>
                </div> */}

                {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Staff Role" />
                  <div className="col-span-8 sm:col-span-4">
                    <SelectRole register={register} label="Role" name="role" />
                    <Error errorName={errors.role} />
                  </div>
                </div> */}
              </div>

              <DrawerButton id={id} title="Master" />
            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};

export default MasterDrawer;
