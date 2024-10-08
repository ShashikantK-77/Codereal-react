import React, { useContext } from "react";
import { FiEdit, FiTrash2, FiZoomIn } from "react-icons/fi";

import Tooltip from "../tooltip/Tooltip";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { SidebarContext } from "context/SidebarContext";


const EditDeleteButton = ({
  id,
  title,
  handleUpdate,
  handleModalOpen,
  isCheck,
  product,
  customer,
  setSelectedCustomer,
  parent,
  children,
  toggleDrawer,
  toggleEditDrawer,
  setisEditDrawerOpen,
  // toggleEditDrawerLocal,
}) => {
  const { t } = useTranslation();
  // console.log('edit delete button', customer);
  const {  toggleEditDrawerLocal,isEditDrawerOpen,setIsEditDrawerOpen } = useContext(SidebarContext);
  
  

  const handleDeleteButtonClick = () => {
    handleModalOpen(id, title, product, customer); // Open the delete modal
    setSelectedCustomer(customer);

    console.log("Selected customer data for edit:", customer); // Log the specific customer data
  };

  const editCustomer = (customer) => {


    setSelectedCustomer(customer);
    // console.log("editCustomer setSelectedCustomer customer customer", customer);
    // handleModalOpen(id, title, product, customer);
    toggleEditDrawerLocal();

    // toggleEditDrawer(); // Open the edit drawer
    // isEditDrawerOpen();
    // setisEditDrawerOpen(true);
    // toggleDrawer();
    // handleUpdate(customer)
  };


  return (
    <>
      <div className="flex justify-end text-right">
        <button
          disabled={isCheck?.length > 0}
          onClick={() => editCustomer(customer)} // Use the correct function name here
          className="p-2 cursor-pointer text-gray-400 hover:text-green-600 focus:outline-none"
        >
          <Tooltip
            id="edit"
            Icon={FiEdit}
            title={t("Edit")}
            bgColor="#10B981"
          />
        </button>

        <button
          disabled={isCheck?.length > 0}
          onClick={handleDeleteButtonClick}
          className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
        >
          <Tooltip
            id="delete"
            Icon={FiTrash2}
            customer={customer}
            title={t("Delete")}
            bgColor="#EF4444"
          />
        </button>
      </div>
    </>
  );
};

export default EditDeleteButton;
