import {
  Card,
  Button,
  CardBody,
  Input,
  Pagination,
  Table,
  Select,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";
import UploadManyTwo from "components/common/UploadManyTwo";
import CustomerTable from "components/customer/CustomerTable";
import TableLoading from "components/preloader/TableLoading";
import NotFound from "components/table/NotFound";
import PageTitle from "components/Typography/PageTitle";
import useAsync from "hooks/useAsync";
import useFilter from "hooks/useFilter";
import React from "react";

import MainDrawer from "components/drawer/MainDrawer";


import { useTranslation } from "react-i18next";
import CustomerServices from "services/CustomerServices";
import { useContext } from "react";
import { SidebarContext } from "context/SidebarContext";
import { FiPlus } from "react-icons/fi";
import ClientDrawer from "components/drawer/ClientDrawer";
import TradeSettingTable from "components/customer/TradeSettingTable";

const CopyTread = () => {
  const { data, loading } = useAsync(CustomerServices.getAllCustomers);

  // console.log('customer',data)

  const {
    userRef,
    setRole,
    handleChangePage,
    totalResults,
    resultsPerPage,
    dataTable,
    serviceData,
    handleSubmitUser,
    filename,
    isDisabled,
    handleSelectFile,
    handleUploadMultiple,
    handleRemoveSelectFile,
  } = useFilter(data);

  const { t } = useTranslation();
  const { toggleDrawer, lang } = useContext(SidebarContext);
  
  return (
    <>
      <PageTitle>{t("CopyTradeSettings")}</PageTitle>

      {/* <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            onSubmit={handleSubmitUser}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="items-center">
              <UploadManyTwo
                title="Customers"
                exportData={data}
                filename={filename}
                isDisabled={isDisabled}
                handleSelectFile={handleSelectFile}
                handleUploadMultiple={handleUploadMultiple}
                handleRemoveSelectFile={handleRemoveSelectFile}
              />
            </div>
          </form>
        </CardBody>
      </Card> */}

      {/* <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            onSubmit={handleSubmitUser}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                ref={userRef}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder={t("CustomersPageSearchPlaceholder")}
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-5 mr-1"
              ></button>
            </div>
          </form>
        </CardBody>
      </Card> */}

      <MainDrawer>
        {/* <StaffDrawer /> */}
        <ClientDrawer/>
      </MainDrawer>

      {/* <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            onSubmit={handleSubmitUser}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                ref={userRef}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder={t("StaffSearchBy")}
              />
              <button type="submit" className="absolute right-0 top-0 mt-5 mr-1"></button>
            </div>
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
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
            </div>

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
      </Card> */}

      {loading ? (
        // <Loading loading={loading} />
        <TableLoading row={12} col={6} width={190} height={20} />
      ) : serviceData?.length !== 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell className="text-center">{t("ClientId")}</TableCell>
                <TableCell className="text-center">{t("ClientName")}</TableCell>
                <TableCell className="text-center">{t("Balance")}</TableCell>
                <TableCell className="text-center">{t("Nifty Multiplier")}</TableCell>
                <TableCell className="text-center">{t("BankNifty Multiplier")}</TableCell>
                <TableCell className="text-center">{t("FinNifty Multiplier")}</TableCell>
                {/* <TableCell className="text-right">
                  {t("CustomersActions")}
                </TableCell> */}
              </tr>
            </TableHeader>
            {/* <CustomerTable customers={dataTable} /> */}
            <TradeSettingTable customers={dataTable} />
          </Table>
          <TableFooter>

          <div className="flex justify-center">
          <Button>
            Save
          </Button>
</div>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Sorry, There are no customers right now." />
      )}
    </>
  );
};

export default CopyTread;
