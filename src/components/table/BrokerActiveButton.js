import React, { useContext } from "react";
import Switch from "react-switch";

//internal import

import AdminServices from "services/AdminServices";
import { SidebarContext } from "context/SidebarContext";
import { notifyError, notifySuccess } from "utils/toast";
import useBrokerData from "hooks/useBrokerData";
import { AdminContext } from "context/AdminContext";
import { useBrokerContext } from "context/BrokerContext";
import { BaseUrl } from "utils/Constants";




const BrokerActiveButton = ({ id, status, option, staff }) => {
    const { brokerData, brokerInfo, loading, error, refetch } = useBrokerContext();
 
    const { state } = useContext(AdminContext);
    const { zenithQuark } = state;
    
    const handleChangeStatus = async (id, currentStatus) => {
        console.log("id, currentStatus in handleChangeStatus:", id, currentStatus);
        try {
          // Determine the new status based on the current status
          const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
      
          // Make a request to update the broker status
          const response = await fetch(`${BaseUrl}broker/updatebrokerstatus/${id}/${newStatus}`, {
            method: "POST", // Use POST as per your API setup
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${zenithQuark}`,
            },
          });
      
          // Parse the JSON response
          const data = await response.json();
      
          // Check if the response is OK
          if (response.ok) {
            notifySuccess(data.message);
            refetch(); // Refetch the broker data after updating status
          } else {
            notifyError(data.message);
          }
        } catch (err) {
          notifyError("Failed to update broker status.");
        }
      };
      
      
      

  return (
    <>
      <Switch
        onChange={() => handleChangeStatus(id, status)}
        checked={status === "Active" ? true : false}
        className="react-switch md:ml-0"
        uncheckedIcon={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              width: 120,
              fontSize: 14,
              color: "white",
              paddingRight: 22,
              paddingTop: 1,
            }}
          ></div>
        }
        width={30}
        height={15}
        handleDiameter={13}
        offColor="#E53E3E"
        onColor={"#2F855A"}
        checkedIcon={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 73,
              height: "100%",
              fontSize: 14,
              color: "white",
              paddingLeft: 20,
              paddingTop: 1,
            }}
          ></div>
        }
      />
    </>
  );
};

export default BrokerActiveButton;
