

import React, { useState, useEffect,useContext } from 'react';
import { Button, TableBody, TableCell, TableRow } from "@windmill/react-ui";
import * as dayjs from "dayjs";
import EditDeleteButton from 'components/table/EditDeleteButton';
import useToggleDrawer from "hooks/useToggleDrawer";
import Tooltip from 'components/tooltip/Tooltip';
import { FiEdit, FiTrash2, FiZoomIn } from "react-icons/fi";
import DeleteModal from 'components/modal/DeleteModal';
import { SidebarContext } from 'context/SidebarContext';
import MainClienteditDrawer from 'components/drawer/MainClienteditDrawer';
import EditDrawer from 'components/drawer/EditDrawer';
import EditMaster from 'components/drawer/EditMaster';


const MasterTable = ({customers}) => {
  // Check if customers is an array, otherwise provide an empty array as default
  const [customerData, setCustomerData] = useState([]);
  // const [selectedCustomer, SetSelectedCustomer] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState([]); // State to hold the selected customer data
  const { toggleDrawer, toggleEditDrawerLocal,isEditDrawerOpen,setIsEditDrawerOpen } = useContext(SidebarContext);





  const {
    title,
    serviceId,
    handleModalOpen,
    handleUpdate,
    isSubmitting,
    handleResetPassword,
  } = useToggleDrawer();

  // Function to calculate the cell value
function calculateCellValue(customer) {
  // console.log(customer);
  const UniqueKey = customer.UniqueKey;

  const data = localStorage.getItem('clientlist');
  const accounts = data ? JSON.parse(data) : [];
  const filteredAccounts = accounts.filter(account => account.UniqueKey === UniqueKey);
  // console.log("filteredAccounts",filteredAccounts);
  // ... Your logic to calculate the cell value ...
  return filteredAccounts.length; // For example, the value to display is 42
}


  return (
    <>
  

      <DeleteModal id={serviceId} title={title} customer={selectedCustomer} />

      <MainClienteditDrawer
        isEditDrawerOpen={isEditDrawerOpen}
        setIsEditDrawerOpen={setIsEditDrawerOpen}
        toggleEditDrawerLocal={toggleEditDrawerLocal}
      >
        <EditMaster
          customer={selectedCustomer}
          toggleEditDrawerLocal={toggleEditDrawerLocal}
        />
        
      </MainClienteditDrawer>

      

      <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer.UniqueKey}>
            <TableCell className="text-left">{customer.Account_Name}</TableCell>
            <TableCell className="text-left">{customer.Account_No}</TableCell>
            <TableCell className="text-left">{customer.Broker}</TableCell>
            <TableCell className="text-right">
              {calculateCellValue(customer)}
            </TableCell>

            <TableCell className="text-center">
              {new Date(customer.Created_Date).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
              })}
            </TableCell>
            {/* <TableCell className="text-center">{customer.secretKey}</TableCell> */}
            {/* <TableCell className="text-center">{customer.apiKey}</TableCell> */}
            {/* <TableCell className="text-center">
    
            <button
             
            //  onClick={() => deleteClientFromLocalStorage(customer)
              onClick={() =>handleModalOpen(customer.name, title,customer)
             }
            
              className="p-2 cursor-pointer text-gray-400 text-center hover:text-green-600 focus:outline-none"
            >
              <Tooltip
                id={customer.name}
             
                isSubmitting={isSubmitting}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                // id="delete"
                Icon={FiTrash2}
                title={("Delete")}
                bgColor="#EF4444"
              />
            </button>
            
          </TableCell> */}

            <TableCell className='text-center"'>
              <EditDeleteButton
                id={customer.Account_Name}
                customer={customer}
                setSelectedCustomer={setSelectedCustomer}
                // staff={staff}
                // handleModalOpen(id, title, product, customer);
                toggleEditDrawerLocal={toggleEditDrawerLocal}
                isSubmitting={isSubmitting}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                handleResetPassword={handleResetPassword}
                // title={showingTranslateValue(staff?.name, lang)}
                title={customer.Account_Name}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default MasterTable;

