import React,{useState} from "react";
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


const ClientMasterDrawer = ({ id }) => {
  const [selectedMasterAccount, setSelectedMasterAccount] = useState("");
  const [selectedClients, setSelectedClients] = useState([]);
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

  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
  } = useClientAdd();
  
  const { t } = useTranslation();

  const handleSelectClients = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedClients(selectedValues);
  };
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
            title={"Add Client in Master Account"}
            description={"Add your Client in Master Account from here"}
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                  <LabelArea label="Select Master Account" />
                  <div className="col-span-8 sm:col-span-4">
                  <Select
            className="mt-1"
            value={selectedMasterAccount}
            onChange={(e) => setSelectedMasterAccount(e.target.value)}
          >
            <option value="">{t("Please Select Master Account")}</option>
            {/* {masterAccounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))} */}
            <option value="sdcd">Master Account one</option>
            <option value="sdcd">Master Account two</option>
            <option value="sdcd">Master Account three</option>
            <option value="sdcd">Master Account four</option>
          </Select>
                    <Error errorName={errors.name} />
                  </div>
                </div>


                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Select Clients For Selected Master Account" />
                  <div className="col-span-8 sm:col-span-4">
                  <Select
        className="mt-1"
        multiple
        value={selectedClients}
        onChange={handleSelectClients}
      >
        <option value="">{t('Please Select Clients')}</option>
       
        <option value="client1">Client One</option>
        {/* <option value="client2">Client Two</option>
        <option value="client3">Client Three</option>
        <option value="client4">Client Four</option> */}
      </Select>
                    <Error errorName={errors.name} />
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

              <DrawerButton id={id} title="Client" />
            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};

export default ClientMasterDrawer;
