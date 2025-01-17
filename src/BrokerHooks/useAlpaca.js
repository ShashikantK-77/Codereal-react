import { AdminContext } from 'context/AdminContext';
import logError from 'hooks/useErrorLogger';

import { useState,useContext } from 'react';
import { notifyError, notifySuccess } from 'utils/toast';
import useBrokerData from "hooks/useBrokerData";
import { useBrokerContext } from 'context/BrokerContext';
import { BaseUrl } from 'utils/Constants';

const handleResponse = {
  Alpaca: (responseData, appKey, secretKey,id) => {
    // Process Alpaca response data
    return {
      account_number: responseData.account_number,
      id: id,
      apiKey: appKey,
      apiSecret: secretKey,
      UserID: responseData.UserID,
      IsActive: true,
    };
  },
  Dhan: (responseData, appKey, secretKey,id) => {
    // Process BrokerB response data

    return {
      account_number: responseData.accNumber,
      id: id,
      apiKey: appKey,
      apiSecret: secretKey,
      UserID: responseData.userId,
      IsActive: true,
    };
  },
  // Add more brokers as needed
};


const useAlpaca = () => {
  const [apiResponse, setApiResponse] = useState(null);
  const { state } = useContext(AdminContext);
  const { zenithQuark } = state;
  // const { brokerData, brokerInfo, loading, error, refetch  } = useBrokerData();
  const { brokerData, brokerInfo, loading, error, refetch } = useBrokerContext();

  const connectToBroker = async (selectedBroker, formData) => {
    console.log("in connectToBroker formData:", formData, "Broker API:", selectedBroker);
    try {
      if (!selectedBroker || !formData) {
        console.error('Selected broker or form data is missing.');
        notifyError("Selected broker or form data is missing.");
        return false;
      }

      const response = await fetch(selectedBroker.connection_api, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${zenithQuark}`,
          'APCA-API-KEY-ID': formData.appKey,
          'APCA-API-SECRET-KEY': formData.secretKey,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      setApiResponse(responseData);

      console.log('Parsed API Response:', responseData);

      const handler = handleResponse[selectedBroker.name];
      if (!handler) {
        console.error('No response handler for this broker');
        logError('No response handler for this broker', "useAlpaca.js");
        return false;
      }

      const brokerData = handler(responseData, formData.appKey, formData.secretKey, selectedBroker.avail_broker_id,selectedBroker.name );
      const saveResult = await saveBrokerData(brokerData, selectedBroker.name);

      if (saveResult.success) {
        notifySuccess("Broker data saved successfully!");
        refetch();
      
        return true;
      } else {
        notifyError(saveResult.message);
        return false;
      }
      
    } catch (error) {
      console.error('Error sending API request:', error);
      logError(error, "useAlpaca.js");
      notifyError('An unexpected error occurred. Please try again.');
      return false;
    }
  };

  const saveBrokerData = async (dataToSave,brokerName) => {
    console.log("dataToSave in saveBrokerData:", dataToSave);
    try {
      const response = await fetch(`${BaseUrl}broker/saveBrokerData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${zenithQuark}`,
        },
        // body: JSON.stringify(dataToSave),
        body: JSON.stringify({ ...dataToSave, brokerName }), // Add brokerName here
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `HTTP error! Status: ${response.status}`);
      }

      return { success: true };

    } catch (error) {
      console.error('Error saving broker data:', error.message);
      logError(error, "useAlpaca.js");
      return { success: false, message: error.message };
    }
  };

  return { apiResponse, connectToBroker };
};

export default useAlpaca;











