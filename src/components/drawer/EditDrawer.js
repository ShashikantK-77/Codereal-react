import React,{useEffect,useState,useContext} from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Card, CardBody, Input,Select } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";

import Title from "components/form/Title";
import LabelArea from "components/form/LabelArea";
import Uploader from "components/image-uploader/Uploader";
import InputArea from "components/form/InputArea";
import Error from "components/form/Error";

import DrawerButton from "components/form/DrawerButton";
import useClientAdd from "hooks/useClientAdd";
import useToggleDrawer from "hooks/useToggleDrawer";

import MineDrawebtn from "components/form/MineDrawebtn";
import { SidebarContext } from "context/SidebarContext";




const EditDrawer = ({ id , customer,}) => {

  const { toggleDrawer,toggleEditDrawerLocal  } = useContext(SidebarContext);
  const [masterAccounts, setMasterAccounts] = useState([]);

  // const [formData,setFormData] = useState([]);
  const [formData, setFormData] = useState(customer); // Initialize formData with customer data
const [masterAccountName,setMasterAccountName] = useState();
const [selectedMasterAccount, setSelectedMasterAccount] = useState("");

const [currentmasteraccount,setCurrentmasteraccount] = useState("")
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    reset
  } = useClientAdd();

  
  
  const handleFormSubmit = (data) => {
    // Initialize the formData with default values from "customer"

    console.log("changed in data in edit after onsubmit----------->",data);
    const formData = {
      UniqueKey: selectedMasterAccount,
      JoiningDate: customer.JoiningDate,
      SecretKey: data.SecretKey,
      apiKey: data.apiKey,
      email: data.email,
      name: data.name,
      phone: data.phone,
      ClientId: data.ClientId,
    };
  
    // Create a new object formDataRest with values from "customer" for any empty fields in formData
    const formDataRest = {
      UniqueKey: formData.UniqueKey || customer.UniqueKey,
      JoiningDate: customer.JoiningDate,
      SecretKey: formData.SecretKey || customer.secretKey,
      apiKey: formData.apiKey || customer.apiKey,
      email: formData.email || customer.email,
      name: formData.name || customer.name,
      phone: formData.phone || customer.phoneNumber,
      ClientId: formData.ClientId || customer.clientId,
    };
  
    // Combine the two objects to create the final formData
    const finalFormData = {
      ...formData,
      ...formDataRest,
    };
  
    console.log("***************in Edit client Form data:", finalFormData);
  
    // Show the selected broker
    console.log("Selected Broker:", selectedMasterAccount);
  
    setFormData(finalFormData); // Update the formData state with the merged values

    onSubmit(finalFormData); // Submit the form data

     // Clear all form fields after submission
     setFormData({});

     // Clear all form fields after submission
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
  // console.log("in Edit drawer customer in first line---------->",customer);





  useEffect(() => {
    const data = localStorage.getItem("masterlist");
    const list = data ? JSON.parse(data) : [];
    setMasterAccounts(list);

    const masterAccount = list.find(
      (account) => account.UniqueKey === customer.UniqueKey
    );

   

    // Set the initial value of selectedMasterAccount
    const masterAccountName = masterAccount ? masterAccount.Account_Name: "Account Not Found";
    setCurrentmasteraccount(masterAccountName);
    // setSelectedMasterAccount(masterAccountName);
    // setMasterAccountName(masterAccountName);
  }, [customer]);

  console.log("this is master name after useeefect",currentmasteraccount);

  return (
    <>
           <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {customer ? (
          <Title
            title={"Update Client"}
            description={"Add your Client necessary information from here"}
          />
        ) : (
          <Title
            title={"Update Client"}
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
                  <LabelArea label="Master Accounts" />
                  <div className="col-span-8 sm:col-span-4">
                    <Select
                        //  required
                      className="mt-1 block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border h-12 text-sm focus:outline-none block w-full bg-white-100 dark:bg-white border-transparent focus:bg-white"
                      register={register} // No need for validation on the "Broker" field
                      label="Broker"
                      name="broker"
                      // defaultValue={masterAccountName}
                      value={selectedMasterAccount } 
                  
                      onChange={(e) => setSelectedMasterAccount(e.target.value)}
                    >
                    <option className="text-gray-300" value="">{currentmasteraccount}</option>
                    
            {masterAccounts.map((account) => (
              <option key={account.id} value={account.UniqueKey}>
   
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
                    // required
                      register={register}
                      label="Name"
                      name="name"
                      type="text"
                      placeholder="Name"
                      // value
                      defaultValue={customer.name }
                   

                    />
                    <Error errorName={errors.name} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Email" />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                    // required
                      register={register}
                      label="Email"
                      name="email"
                      type="text"
                      pattern={
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                      }
                      placeholder="Email"
                      defaultValue={customer.email} // Bind the value to the "email" property in formData

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
                      // required
                      register={register}
                      label="Mobile No."
                      name="phone"
                      pattern={/^[+]?\d*$/}
                      minLength={6}
                      maxLength={15}
                      type="number"
                      placeholder="Mobile No."
                      defaultValue={customer.phoneNumber}
                    />
                    <Error errorName={errors.phone} />
                  </div>
                </div>


               

               

                
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Client ID"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  // required
                  register={register}
                  label="Client ID"
                  name="ClientId"
                  type="text"
                  placeholder={"Client ID"}
                  defaultValue={customer.clientId }
                />
                <Error errorName={errors.ClientId} />
              </div>
            </div>

            
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"API Key"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  // required
                  register={register}
                  label="API Key"
                  name="apiKey"
                  type="text"
                  placeholder={"API Key"}
                  defaultValue={customer.apiKey }
                />
                <Error errorName={errors.apiKey} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Secret Key"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  // required
                  register={register}
                  label="Secret Key"
                  name="SecretKey"
                  type="text"
                  placeholder={"Secret Key"}
                  defaultValue={customer.secretKey }
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

              {/* <DrawerButton id={id} title="Edited Client" /> */}
              {customer ? (
                
                
  <MineDrawebtn id={id} title="Update Client" toggleEditDrawerLocal={toggleEditDrawerLocal} />
) : (
  <MineDrawebtn id={id} title="Edit Client" toggleEditDrawerLocal={toggleEditDrawerLocal}/>
)}

            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};

export default EditDrawer;



