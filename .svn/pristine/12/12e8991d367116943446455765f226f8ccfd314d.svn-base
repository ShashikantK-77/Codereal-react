import React,{useEffect,useState} from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Card, CardBody, Input,Select } from "@windmill/react-ui";
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
import useToggleDrawer from "hooks/useToggleDrawer";




const ClientDrawer = ({ id }) => {
  const [masterAccounts, setMasterAccounts] = useState([]);
  const [selectedMasterAccount, setSelectedMasterAccount] = useState("");
  const [formData,setFormData] = useState([]);

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
    reset
  } = useClientAdd();

  const handleFormSubmit = (data) => {
    const formData = {
      ...data,
      UniqueKey:selectedMasterAccount,
    };
  
    console.log("***************in client Form data:", formData);
  
    // Show the selected broker
    console.log("Selected Broker:", selectedMasterAccount);
  
    setFormData(formData);
    onSubmit(formData);
    reset();
  };
  
  const { t } = useTranslation();

  const {
    // title,
    // serviceId,
    Client,
    // handleModalOpen,
    // handleUpdate,
    // isSubmitting,
    // handleResetPassword,
  } = useToggleDrawer();
  console.log("in client drawer Client in first line---------->",Client);


  useEffect(() => {
    // Fetch master account data and store in state
    const fetchMasterAccounts = async () => {
      try {
        // const data = await CustomerServices.getMasterAccounts(); // Replace with your API call to get master accounts
        const data = localStorage.getItem('masterlist')
        const list = data ? JSON.parse(data) : [];
        setMasterAccounts(list);
      } catch (error) {
        // Handle error
      }
    };
    fetchMasterAccounts();
  }, []);


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
            title={"Add Client"}
            description={"Add your Client necessary information from here"}
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
          <CardBody>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
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
                  <LabelArea extraClassName="" label="Master Accounts" />
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
                    <option value="">{t("Please Select Master Account")}</option>
            {masterAccounts.map((account) => (
              <option key={account.id} value={account.UniqueKey}>
              {/* {`(${account.UniqueKey}) : ${account.Account_Name}`} */}
           {account.Account_Name}

              </option>
            ))}
                    </Select>
                    <Error errorName={errors.broker} />
                  </div>
                </div>


                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Name" />
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
                  <LabelArea label="Email" />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                    required
                      register={register}
                      label="Email"
                      name="email"
                      type="text"
                      pattern={
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                      }
                      placeholder="Email"
                    />
                    <Error errorName={errors.email} />
                  </div>
                </div>

                {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Password" />
                  <div className="col-span-8 sm:col-span-4">
                    {id ? (
                      <InputArea
                        required
                        register={register}
                        label="Password"
                        name="password"
                        type="password"
                        autocomplete="new-password"
                        placeholder="Password"
                      />
                    ) : (
                      <InputArea
                        register={register}
                        label="Password"
                        name="password"
                        type="password"
                        autocomplete="new-password"
                        placeholder="Password"
                      />
                    )}

                    <Error errorName={errors.password} />
                  </div>
                </div> */}

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Mobile No." />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      required
                      register={register}
                      label="Mobile No."
                      name="phone"
                      pattern={/^[+]?\d*$/}
                      minLength={6}
                      maxLength={15}
                      type="number"
                      placeholder="Mobile No."
                    />
                    <Error errorName={errors.phone} />
                  </div>
                </div>


               

               

                
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Client ID"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required
                  register={register}
                  label="Client ID"
                  name="ClientId"
                  type="text"
                  placeholder={"Client ID"}
                 
                />
                <Error errorName={errors.ClientId} />
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

export default ClientDrawer;
