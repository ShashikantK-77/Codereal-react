import React from 'react'
import { useForm } from "react-hook-form";
import { notifyError, notifySuccess } from 'utils/toast';
import * as dayjs from "dayjs";
import { useHistory, useLocation } from 'react-router-dom';
import { useListContext } from 'context/ListContext';
import { useContext } from 'react';
import { SidebarContext } from 'context/SidebarContext';

const useClientAdd = () => {
  const { toggleDrawer,isEditDrawerOpen,setIsEditDrawerOpen,toggleEditDrawerLocal} = useContext(SidebarContext);
  const location = useLocation();
  const { setClientListData,setMasterListData } = useListContext(); // Get the setClientListData function from the ListContext
    const {
        register,
        handleSubmit,
        setValue,
        clearErrors,
        reset,
        formState: { errors },
      } = useForm();

      console.log("isEditDrawerOpen in useclient add:", isEditDrawerOpen);


      
      const history = useHistory();

      const onSubmit = async (data) => {

  
  if (location.pathname === '/clients') {
    // Check if all the required data is present
    if (data.name && data.email && data.phone && data.ClientId && data.SecretKey && data.apiKey) {
      // Retrieve existing data from local storage
      const existingDataString = localStorage.getItem('clientlist');
      let existingData = existingDataString ? JSON.parse(existingDataString) : [];
  
      // Ensure that existingData is an array
      if (!Array.isArray(existingData)) {
        existingData = [];
      }
  
      // Check if the received data name already exists in the existingData
      const existingClient = existingData.find((client) => client.JoiningDate === data.JoiningDate);
      console.log("existingClient existingClient existingClient filter",existingClient);
  
      if (existingClient) {
        // If the client with the same name exists, update its data
        existingClient.name = data.name;
        existingClient.email = data.email;
        existingClient.phoneNumber = data.phone;
        existingClient.clientId = data.ClientId;
        existingClient.secretKey = data.SecretKey;
        existingClient.apiKey = data.apiKey;
        existingClient.UniqueKey = data.UniqueKey;
        // You can update other properties if needed
  
        // Save the updated data back to local storage
        localStorage.setItem('clientlist', JSON.stringify(existingData));

        // existingData(existingData);
    
        toggleEditDrawerLocal();
        // setIsEditDrawerOpen(false);
      
        setClientListData(existingData);
   
        notifySuccess(` Client [ ${data.name}] updated.!`)
     
      } else {
        const newClientData = {
                    name: data.name,
                    email: data.email,
                    phoneNumber: data.phone,
                    clientId: data.ClientId,
                    secretKey: data.SecretKey,
                    apiKey: data.apiKey,
                    JoiningDate: dayjs().format("MMM D, YYYY HH:mm:ss"),
                    UniqueKey:data.UniqueKey,
                    // Add other properties as needed
                  };
  
        // Append the new client data to the existing data
        existingData.push(newClientData);
  
        // Save the updated data back to local storage
        localStorage.setItem('clientlist', JSON.stringify(existingData));
        
        toggleDrawer();
        setClientListData(existingData);

        notifySuccess(`New Client Added [${data.name}]`)
        
      }
    } else {
      // If any required data is missing, show an error message or take appropriate action
      notifyError('Please fill in all the required fields.');
    }
  }
  
  

     

      if (location.pathname === '/masteraccounts') {
        console.log("edit data in masteraccounts", data);
        const existingDataString = localStorage.getItem('masterlist');
        let existingData = existingDataString ? JSON.parse(existingDataString) : [];
      
        // Check if the received data name already exists in the existingData
        const existingMasterIndex = existingData.findIndex((client) => client.UniqueKey === data.UniqueKey);
        console.log("existingClient existingClient existingClient filter", existingMasterIndex);
      
        if (existingMasterIndex !== -1) {
          // If the client with the same name exists, update its data
          existingData[existingMasterIndex].Account_Name = data.name;
          existingData[existingMasterIndex].email = data.email;
          existingData[existingMasterIndex].phoneNumber = data.phone;
          existingData[existingMasterIndex].clientId = data.ClientId;
          existingData[existingMasterIndex].secretKey = data.SecretKey;
          existingData[existingMasterIndex].apiKey = data.apiKey;
          existingData[existingMasterIndex].UniqueKey = data.UniqueKey;
          // You can update other properties if needed
      
          // Save the updated data back to local storage
          localStorage.setItem('masterlist', JSON.stringify(existingData));
      
          toggleEditDrawerLocal();
             
          setMasterListData(existingData);
 
          notifySuccess(`Master [ ${data.name}] updated.!`);
          return;
        } else {
          const newClientData = {
            Account_Name: data.name,
            Account_No: data.ClientId,
            Broker: "Alpaca",
            Created_Date: dayjs().format("MMM D, YYYY HH:mm:ss"),
            UpdatedDAte: "",
            clientId: data.ClientId,
            secretKey: data.SecretKey,
            apiKey: data.apiKey,
            IsDeleted: false,
            UniqueKey: `${dayjs().format("YYYYMMDDHHmmss")}${dayjs().second()}${dayjs().minute()}`,
          };
      
          // Append the new client data to the existing data
          const updatedData = [...existingData, newClientData];
      
          // Save the updated data back to local storage
          localStorage.setItem('masterlist', JSON.stringify(updatedData));
          // console.log("newClientData",newClientData);
          toggleDrawer();
          setMasterListData(updatedData);
          notifySuccess(`Master Added [${data.name}]`);
        }
      } else {
 
      }
      
      
      }


  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    reset
  }
}

export default useClientAdd