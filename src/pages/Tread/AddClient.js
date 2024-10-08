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
import { useLocation } from 'react-router-dom';
import { SidebarProvider } from "context/SidebarContext";


import { useTranslation } from "react-i18next";
import CustomerServices from "services/CustomerServices";
import useLocalStorage from "hooks/useLocalStorage";
import { notifySuccess } from "utils/toast";

import { useListContext } from "context/ListContext";

const Customers = () => {
  const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const successMessage = queryParams.get('success');
// Display the success message if it exists

  const { data, loading } = useAsync(CustomerServices.getAllCustomers);
  const { clientList } = useListContext();
  const { toggleDrawer, lang, } = useContext(SidebarContext);


  const [currentPage, setCurrentPage] = useState(1); // Set the initial page number to 1
  const [searchName, setSearchName] = useState("");

  const resultsPerPage = 2;

const [dataTable,setDataTable]=useState([]);

const [totalResults,seTotalResults] =useState([]);





useEffect(() => {
  const filteredList = clientList.filter(
    (client) =>
    client.name.toLowerCase().includes(searchName.toLowerCase()) ||
    client.email.toLowerCase().includes(searchName.toLowerCase())
  );
  setDataTable(
    filteredList.slice(
      (currentPage - 1) * resultsPerPage,
      currentPage * resultsPerPage
    )
  );

  const totalres = filteredList.length;
  seTotalResults(totalres);
}, [clientList, currentPage, resultsPerPage, searchName]);


  const handleChangePage = (page) => {
    setCurrentPage(page); // Update the currentPage when the page changes
    setSearchName("");
  };


  // const {
  //   userRef,
  //   // handleChangePage,
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
      <PageTitle> Clients</PageTitle>

      <MainDrawer>
        <ClientDrawer/>
      </MainDrawer>
    
    

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            // onSubmit={handleSubmitUser}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                // ref={userRef}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                onChange={(e) => setSearchName(e.target.value)}
                placeholder= "Search by Client Name / Mobile Number / Client Email"
              />
              <button type="submit" className="absolute right-0 top-0 mt-5 mr-1"></button>
            </div>
            {/* <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Select
                onChange={(e) => setRole(e.target.value)}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
              >
                <option value="All" defaultValue hidden>
                  {t("StaffRole")}
                </option>
                <option value="Admin">{t("StaffRoleAdmin")}</option>
                <option value="Cashier">{t("SelectCashiers")}</option>
                <option value="Super Admin">{t("SelectSuperAdmin")}</option>
              </Select>
            </div> */}

            <div className="w-full md:w-56 lg:w-56 xl:w-56">
              <Button onClick={toggleDrawer} className="w-full rounded-md h-12">
                <span className="mr-3">
                  <FiPlus />
                </span>
                {t("AddClient")}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    

      {loading ? (
        // <Loading loading={loading} />
        <TableLoading row={6} col={3} width={190} height={20} />
      ) : clientList?.length !== 0 ? (
        <TableContainer className="mb-8">
     

          <Table>
            <TableHeader>
              <tr>
                {/* <TableCell className="text-center">{t("CustomersId")}</TableCell> */}
                <TableCell className="text-center">{t("CustomersName")}</TableCell>
                <TableCell className="text-center">Mobile No.</TableCell>
                <TableCell className="text-center">{t("CustomersEmail")}</TableCell>
        
                {/* <TableCell className="text-center">Balance</TableCell> */}
                <TableCell className="text-center">{t("CustomersJoiningDate")}</TableCell>
                <TableCell className="text-center">Master Name</TableCell>
                <TableCell className="text-center">Accounts</TableCell>
                <TableCell className="text-center">Add Account</TableCell>
        
                
                <TableCell className="text-center">
                  {t("CustomersActions")}
                </TableCell>
              </tr>
            </TableHeader>
            {/* <CustomerTable customers={dataTable} /> */}
            <SidebarProvider>
            <ClientTable customers={dataTable} />
            </SidebarProvider>
            
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
        <NotFound title="Sorry, There are no Clients right now." />
      )}
    </>
  );
};

export default Customers;
