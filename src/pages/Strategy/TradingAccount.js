import React, { useState, useEffect, useContext } from "react";
import { Button, Input, Modal } from "@windmill/react-ui";
import PageTitle from "components/Typography/PageTitle";
import useAlpaca from "BrokerHooks/useAlpaca";
import { AdminContext } from "context/AdminContext";
import { notifyError, notifySuccess } from "utils/toast";
import { FiX } from "react-icons/fi";
import logError from "hooks/useErrorLogger";

import BrokerList from "pages/Tread/BrokerList";
import useBrokerData from "hooks/useBrokerData";
import { BaseUrl } from "utils/Constants";

const TradingAccount = () => {
  const [brokers, setBrokers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBroker, setSelectedBroker] = useState(null);
  const [formData, setFormData] = useState({});
  const [apiResponse, setApiResponse] = useState(null);

  const { refetch,fetchBrokerData } = useBrokerData();

  const { state } = useContext(AdminContext);
  const { zenithQuark } = state;

  const { connectToBroker } = useAlpaca();

  useEffect(() => {
    // Fetch data from API endpoint
    const fetchBrokersData = async () => {
      try {
        const response = await fetch(`${BaseUrl}broker/available-brokers`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setBrokers(data);
      } catch (error) {
        console.error("Error fetching broker data:", error);
        logError(error.message, 'TradingAccount.js');
      }
    };

    fetchBrokersData();
  }, []);

  const handleLogoClick = (broker) => {
    setSelectedBroker(broker);
    setIsModalOpen(true);
    setFormData({});
    setApiResponse(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({});
    setApiResponse(null);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("IN LOG handleSubmit - selectedBroker, formData: ",selectedBroker, formData);
  
    try {
      if (selectedBroker) {
        const isConnected = await connectToBroker(selectedBroker, formData);
        if (isConnected) {
          refetch();
          console.log("Success"); // Log "success" if connection is successful
          closeModal();
          // notifySuccess("Successfully connected to broker");
        } else {
          // console.log("Connection failed"); // Log "connection failed" if connection fails
          // notifyError("Connection failed");
        }
      } else {
        console.log('No broker selected. Skipping API call.');
      }
    } catch (error) {
      console.error("Error connecting to broker:", error);
      notifyError("Connection failed");
    }
  
    console.log("IN LOG handleSubmit - End");
  };
  
  const handleInputChange = (e) => {
    // Update formData when input values change
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      UserID: zenithQuark.UserID,
    });
  };

  // Group brokers by market
  const groupedBrokers = brokers.reduce((acc, broker) => {
    if (!acc[broker.market]) {
      acc[broker.market] = [];
    }
    acc[broker.market].push(broker);
    return acc;
  }, {});

  return (
    <div>
      <PageTitle>Trading Account</PageTitle>

      {Object.entries(groupedBrokers).map(([market, brokers]) => (
        <div key={market} className="mb-4">
       
          <h1 className="my-4 text-base font-semibold text-gray-700 dark:text-gray-300">{market} ({brokers.length})</h1>
          <div className="flex flex-wrap">
            {brokers.map((broker) => (
              <div
                key={broker.avail_broker_id}
                className="logo-container m-2"
                onClick={() => handleLogoClick(broker)}
              >
                <img
                  src={broker.logo_url}
                  alt={broker.name}
                  className="w-20 h-20 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedBroker && (
          <div>
            <div className="flex items-center justify-between">
              <h1>
                You selected{" "}
                <span className="text-bold text-lg">{selectedBroker.name}</span>{" "}
                broker
              </h1>
              <Button onClick={closeModal}>
                <FiX className="h-5 w-5" />
              </Button>
            </div>
            <form onSubmit={handleSubmit}>
              {selectedBroker.input_fields.map((field, idx) => (
                <div key={idx} className="mb-4">
                  <label
                    htmlFor={field.id}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {field.label}
                  </label>
                  <Input
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    value={formData[field.id] || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full"
                  />
                </div>
              ))}

              <div className="mt-4">
                <Button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </Button>
              </div>
            </form>
            {/* {apiResponse && (
              <div>
                <h2>API Response:</h2>
                <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
              </div>
            )} */}
          </div>
        )}
      </Modal>


      <div>

        <BrokerList/>
      </div>
    </div>
  );
};

export default TradingAccount;
