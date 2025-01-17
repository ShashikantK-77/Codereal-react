import React, { useState, useEffect, useContext } from "react";
import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import EditDeleteButton from "components/table/EditDeleteButton";
import ActiveInActiveButton from "components/table/ActiveInActiveButton";
import BrokerEditDeleteButton from "components/table/BrokerEditDeleteButton";
import BrokerModal from "components/table/BrokerModal";
import { AdminContext } from "context/AdminContext";
import useBrokerData from "hooks/useBrokerData";
import BrokerActiveButton from "components/table/BrokerActiveButton";
import { useBrokerContext } from "context/BrokerContext";
import { BaseUrl } from "utils/Constants";

const BrokerTable = () => {
//   const [brokerData, setBrokerData] = useState([]);
//   const [brokerInfo, setBrokerInfo] = useState({});
  const [selectedBroker, setSelectedBroker] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { state } = useContext(AdminContext);
  const { zenithQuark } = state;


  const { brokerData, brokerInfo, loading, error, refetch } = useBrokerContext();

//   const { brokerData, brokerInfo, loading, error, refetch } = useBrokerData();

  

  


  const handleOpenModal = (broker) => {
    setSelectedBroker(broker);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBroker(null);
  };

  const handleDelete = async (brokerId) => {
    try {
      const response = await fetch(`${BaseUrl}broker/deleteBroker`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${zenithQuark}`,
        },
        body: JSON.stringify({ brokerId }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log(data.message); // Log the success message
        refetch();
        setIsModalOpen(false);
      } else {
        console.error(data.message); // Log any error message from the API
      }
    } catch (error) {
      console.error("Error deleting broker:", error);
    }
  };

  return (
    <>
      <TableBody className="dark:bg-gray-900">
        {brokerData.length > 0 ? (
          brokerData.map((broker, index) => (
           
            <TableRow key = {`${broker.broker_id}-${broker.account_number}-${Math.random().toString(36).substr(2, 9)}`} >

              <TableCell>
                <span className="text-sm">{index + 1}</span>
              </TableCell>

              <TableCell>
                <span className="text-sm">
                  {brokerInfo[broker.broker_id] ? brokerInfo[broker.broker_id] : "Loading..."}
                </span>
              </TableCell>

              <TableCell>
                <span className="text-sm">
                  {new Date(broker.connected_date).toLocaleString()}
                </span>
              </TableCell>

              <TableCell>
                <BrokerActiveButton
                  id={broker.user_bro_acc_id}
                  status={broker.status}
                  option="broker"
                />
            
              </TableCell>

              <TableCell>
                <BrokerEditDeleteButton
                  id={broker}
                  onOpenModal={handleOpenModal} // Pass the handleOpenModal function
                />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5}>
              <span className="text-sm">No data available</span>
            </TableCell>
          </TableRow>
        )}
      </TableBody>

      <BrokerModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        broker={selectedBroker || {}}
        onDelete={handleDelete}
      />
    </>
  );
};

export default BrokerTable;
