import ClientDrawer from 'components/drawer/ClientDrawer'
import MainDrawer from 'components/drawer/MainDrawer'
import React from 'react'
import {
    Button,
    Card,
    CardBody,
    Input,
    Pagination,
    Table,
    TableCell,
    TableContainer,
    TableFooter,
    TableHeader,
  } from "@windmill/react-ui";
  import UploadManyTwo from "components/common/UploadManyTwo";
  import ClientTable from "components/customer/ClientTable";
  import CustomerTable from "components/customer/CustomerTable";

  import TableLoading from "components/preloader/TableLoading";
  import NotFound from "components/table/NotFound";
  import PageTitle from "components/Typography/PageTitle";
  import { SidebarContext } from "context/SidebarContext";
  import useAsync from "hooks/useAsync";
  import useFilter from "hooks/useFilter";
  import  { useContext, useEffect, useState } from "react";
  import { FiPlus } from 'react-icons/fi';
    
  import { useTranslation } from "react-i18next";
  import CustomerServices from "services/CustomerServices";
  import useLocalStorage from "hooks/useLocalStorage";
import MasterDrawer from "components/drawer/MasterDrawer";

  

   

const AddcliDrawer = () => {
    const { data, loading } = useAsync(CustomerServices.getAllCustomers);
    const { toggleDrawer, lang , toggleClientDrawer, toggleMasterDrawer } = useContext(SidebarContext);
  return (
    <div>
      <MainDrawer>
          <ClientDrawer/>
        </MainDrawer>


      {/* <div className="w-full md:w-56 lg:w-56 xl:w-56"> */}
        <Button 
       onClick={toggleDrawer} 
        className="w-full rounded-md h-12">
          <span className="mr-3">
            <FiPlus />
          </span>
         Add Client
        </Button>
      {/* </div> */}

    </div>
  )
}

export default AddcliDrawer