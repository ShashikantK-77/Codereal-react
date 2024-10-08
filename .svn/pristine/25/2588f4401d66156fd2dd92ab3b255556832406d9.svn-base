

import React, { useState, useEffect, useContext } from 'react';
import { Button, TableBody, TableCell, TableRow } from "@windmill/react-ui";
import * as dayjs from "dayjs";
import EditDeleteButton from 'components/table/EditDeleteButton';
import useToggleDrawer from "hooks/useToggleDrawer";
import Tooltip from 'components/tooltip/Tooltip';
import { FiEdit, FiTrash2, FiZoomIn,FiPlus  } from "react-icons/fi";
import DeleteModal from 'components/modal/DeleteModal';
import MainDrawer from 'components/drawer/MainDrawer';
import ClientDrawer from 'components/drawer/ClientDrawer';
import SidebarContent from 'components/sidebar/SidebarContent';
import { SidebarContext } from 'context/SidebarContext';
import EditDrawer from 'components/drawer/EditDrawer';

import MainClienteditDrawer from 'components/drawer/MainClienteditDrawer';

import { SidebarProvider } from "context/SidebarContext";
import { useListContext } from 'context/ListContext';
import MainBrokerDrawer from 'components/drawer/MainBrokerDrawer';
import AccountBrokerDrawer from 'components/drawer/AccountBrokerDrawer';




const ClientTable = ({customers}) => {
  console.log("customers customers",customers);
  // Check if customers is an array, otherwise provide an empty array as default
  const [customerData, setCustomerData] = useState([]);
  // const [selectedCustomer, SetSelectedCustomer] = useState([]);

  const [selectedCustomer, setSelectedCustomer] = useState([]); // State to hold the selected customer data

  const { toggleEditDrawerLocal,isEditDrawerOpen,setIsEditDrawerOpen, toggleBrokerDrawer } = useContext(SidebarContext);

  const { masterList } = useListContext();
  

  useEffect(() => {
    // Retrieve existing data from local storage when the component mounts or whenever the data changes
    const existingDataString = localStorage.getItem('clientlist');
    const existingData = existingDataString ? JSON.parse(existingDataString) : [];
    setCustomerData(existingData);
  }, []);
  // const { toggleEditDrawer,toggleDrawer,isEditDrawerOpen,setisEditDrawerOpen , lang } = useContext(SidebarContext);

  // const { toggleEditDrawer, isEditDrawerOpen: sidebarIsEditDrawerOpen, lang } = useContext(SidebarContext);

  const {
    title,
    serviceId,
    handleModalOpen,
    handleUpdate,
    isSubmitting,
    handleResetPassword,
  } = useToggleDrawer();
  

  const FetchMasterName = (UniqueKey) =>{
    const Mastername = masterList.find((client) => client.UniqueKey === UniqueKey);
    return Mastername.Account_Name
  }



  return (
    <>
    {console.log("selectedCustomer in client table",selectedCustomer)}
      <DeleteModal 
      id={serviceId} 
      title={title} customer={selectedCustomer}  />


<MainClienteditDrawer isEditDrawerOpen={isEditDrawerOpen} setIsEditDrawerOpen={setIsEditDrawerOpen} toggleEditDrawerLocal={toggleEditDrawerLocal}>
<EditDrawer customer={selectedCustomer}  toggleEditDrawerLocal={toggleEditDrawerLocal}/>
</MainClienteditDrawer>


{/* <MainClienteditDrawer >
<EditDrawer />
</MainClienteditDrawer> */}

{/* <MainBrokerDrawer>
<AccountBrokerDrawer/>
</MainBrokerDrawer> */}

      



      
  
    <TableBody>
      {customers.map((customer) => (
        <TableRow key={customer.JoiningDate}>
          <TableCell className="text-left">{customer.name}</TableCell>
          <TableCell className="text-center">{customer.phoneNumber}</TableCell>
          <TableCell className="text-left">{customer.email}</TableCell>
          
          <TableCell className="text-center">
          {
      new Date(customer.JoiningDate).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      })
    }
          </TableCell>

      
 
          <TableCell className="text-left">{FetchMasterName(customer.UniqueKey)}</TableCell>
          <TableCell className="text-center">
            <button>
              1
            </button>         
          </TableCell>
          <TableCell className="text-center">
          <button
          // disabled={isCheck?.length > 0}
          onClick={toggleBrokerDrawer()}
          className="p-2 cursor-pointer text-gray-400 hover:text-green-600 focus:outline-none"
        >
          <Tooltip
            id="Add Account"
            
            Icon={FiPlus}
            customer={customer}
            title={"Add Account"}
            bgColor="#10B981"
          />
         
        </button>
    
         
          </TableCell>
        
           <TableCell className="text-center">
           
              <EditDeleteButton
                id={customer.name}
                customer={customer}
                setSelectedCustomer={setSelectedCustomer}
                // staff={staff}
                // handleModalOpen(id, title, product, customer);
                isSubmitting={isSubmitting}
                handleUpdate={handleUpdate}
                // setisEditDrawerOpen={setisEditDrawerOpen}
                toggleEditDrawerLocal={toggleEditDrawerLocal}
                // toggleDrawer={toggleDrawer}
                handleModalOpen={handleModalOpen}
                handleResetPassword={handleResetPassword}
                // title={showingTranslateValue(staff?.name, lang)}
                title={customer.name}
              />
        
            </TableCell>

        </TableRow>
      ))}
    </TableBody>
    </>
  );
};

export default ClientTable;

