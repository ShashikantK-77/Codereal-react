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
  import ClientDrawer from "components/drawer/ClientDrawer";
  import MainDrawer from "components/drawer/MainDrawer";
  import TableLoading from "components/preloader/TableLoading";
  import NotFound from "components/table/NotFound";
  import PageTitle from "components/Typography/PageTitle";
  import { SidebarContext } from "context/SidebarContext";
  import useAsync from "hooks/useAsync";
  import useFilter from "hooks/useFilter";
  import React, { useContext, useEffect, useState } from "react";
  import { FiPlus } from 'react-icons/fi';
  
  
  import { useTranslation } from "react-i18next";
  import CustomerServices from "services/CustomerServices";
  import useLocalStorage from "hooks/useLocalStorage";
import MasterDrawer from "components/drawer/MasterDrawer";
import AddcliDrawer from "./AddcliDrawer";
import AddmastDrawer from "./AddmastDrawer";
import MasterTable from "components/customer/MasterTable";
import ClientMasterDrawer from "components/drawer/ClientMasterDrawer";
import { useLocation } from 'react-router-dom';
import { notifySuccess } from "utils/toast";
import { useListContext } from "context/ListContext";
  
  const MasterOrder = () => {
    const { data, loading } = useAsync(CustomerServices.getAllCustomers);
    const { toggleDrawer, lang , toggleClientDrawer, toggleMasterDrawer } = useContext(SidebarContext);
    const { masterList } = useListContext();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const successMessage = queryParams.get('success');
    
  // const [dataTable,setDataTable]=useState([]);
  // const existingDataString = localStorage.getItem('masterlist');
  // useEffect(()=>{
  //   if (successMessage) {
  //     notifySuccess(successMessage);
  //   }
  // //   const existingDataString = localStorage.getItem('clientlist');
  //   const list = existingDataString ? JSON.parse(existingDataString) : [];
  //   setDataTable(list)
  // },[existingDataString])
  // console.log(dataTable);


  const [currentPage, setCurrentPage] = useState(1); // Set the initial page number to 1
  const [searchName, setSearchName] = useState("");

  const resultsPerPage = 2;

const [dataTable,setDataTable]=useState([]);

const [totalResults,seTotalResults] =useState([]);


// useEffect(()=>{
//   setDataTable(masterList);
// },[masterList])

useEffect(() => {
  const filteredList = masterList.filter(
    (client) =>
    client.Account_Name.toLowerCase().includes(searchName.toLowerCase()) ||
    client.Account_No.toLowerCase().includes(searchName.toLowerCase())
  );
  setDataTable(
    filteredList.slice(
      (currentPage - 1) * resultsPerPage,
      currentPage * resultsPerPage
    )
  );

  const totalres = filteredList.length;
  seTotalResults(totalres);
}, [masterList, currentPage, resultsPerPage, searchName]);


  const handleChangePage = (page) => {
    setCurrentPage(page); // Update the currentPage when the page changes
    setSearchName("");
  };
  
    // const {
    //   userRef,
    //   // handleChangePage,
    //   // totalResults,
    //   // resultsPerPage,
    //   // dataTable,
    //   serviceData,
    //   handleSubmitUser,
    //   filename,
    //   isDisabled,
    //   handleSelectFile,
    //   handleUploadMultiple,
    //   handleRemoveSelectFile,
    // } = useFilter(data);
  
    const { t } = useTranslation();

 
  
  
    return (
      <>
        <PageTitle> Master Accounts</PageTitle>
  
        {/* <MainDrawer>
          <ClientDrawer/>
          <ClientMasterDrawer/>
        </MainDrawer> */}

        <MainDrawer>
          <MasterDrawer/>
        </MainDrawer>
      
      
  
        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
          <CardBody>
           

            <form
      // onSubmit={handleSubmitUser}
      className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
    >
      <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
        <Input
          className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
          type="search"
          name="search"
          onChange={(e) => setSearchName(e.target.value)}
          placeholder={t("StaffSearchBy")}
        />
        <button type="submit" className="absolute right-0 top-0 mt-5 mr-1"></button>
      </div>

      
      {/* Add Master Account Button */}
      <div className="w-full md:w-56 lg:w-56 xl:w-56">
      <Button 
       onClick={toggleDrawer} 
        className="w-full rounded-md h-12">
          <span className="mr-3">
            <FiPlus />
          </span>
          {t("AddMasterAccount")}
        </Button> 
        {/* <AddcliDrawer/> */}
      </div> 
   
   

     

    </form>
          </CardBody>
        </Card>
      
  
        {loading ? (
          // <Loading loading={loading} />
          <TableLoading row={12} col={6} width={190} height={20} />
        ) : masterList?.length !== 0 ? (
          <TableContainer className="mb-8">
       
  
            <Table>
              <TableHeader>
                <tr>
                  {/* <TableCell className="text-center">{t("CustomersId")}</TableCell> */}
                  <TableCell className="text-center">Account Name</TableCell>
                  <TableCell className="text-center">Account No.</TableCell>
                  <TableCell className="text-center">Broker</TableCell>
                  <TableCell className="text-center">No. of Clients</TableCell>
                  <TableCell className="text-center">Created Date</TableCell>
                  <TableCell className="text-center">
                    {t("CustomersActions")}
                  </TableCell>
                </tr>
              </TableHeader>
              {/* <CustomerTable customers={dataTable} /> */}
              {/* <ClientTable customers={dataTable} /> */}
              <MasterTable customers={dataTable}/>
            </Table>
            <TableFooter>
              <Pagination
                totalResults={totalResults}
                resultsPerPage={resultsPerPage}
                onChange={handleChangePage}
                label="Table navigation"
              />
            </TableFooter>
          </TableContainer>
        ) : (
          <NotFound title="Sorry, There are no masters right now." />
        )}
      </>
    );
  };
  
  export default MasterOrder;
  