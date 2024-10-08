import {
    Button,
    Card,
    CardBody,
    Input,
    Label,
    Pagination,
    Select,
    Table,
    TableCell,
    TableContainer,
    TableFooter,
    TableHeader,
  } from "@windmill/react-ui";
  import { useContext, useState } from "react";
  import { IoCloudDownloadOutline } from "react-icons/io5";
  import { useTranslation } from "react-i18next";
  import exportFromJSON from "export-from-json";
  
  //internal import
  import useAsync from "hooks/useAsync";
  import useFilter from "hooks/useFilter";
  import OrderServices from "services/OrderServices";
  import NotFound from "components/table/NotFound";
  import PageTitle from "components/Typography/PageTitle";
  import { SidebarContext } from "context/SidebarContext";
  import OrderTable from "components/order/OrderTable";
  import TableLoading from "components/preloader/TableLoading";
  import { notifyError } from "utils/toast";
  import spinnerLoadingImage from "assets/img/spinner.gif";
import BrokerTable from "components/order/BrokerTable";
  
  const BrokerList = () => {
    const {
      time,
      setTime,
      currentPage,
      searchText,
      searchRef,
      status,
      setStatus,
      handleChangePage,
      handleSubmitForAll,
      resultsPerPage,
      startDate,
      setStartDate,
      endDate,
      setEndDate,
      lang,
    } = useContext(SidebarContext);
  
    const { t } = useTranslation();
    const [loadingExport, setLoadingExport] = useState(false);
  
    const { data, loading } = useAsync(() =>
      OrderServices.getAllOrders({
        customerName: searchText,
        status,
        page: currentPage,
        limit: resultsPerPage,
        day: time,
        startDate,
        endDate,
      })
    );
  
    const { dataTable, serviceData, globalSetting } = useFilter(data?.orders);
  
    const handleDownloadOrders = async () => {
      try {
        setLoadingExport(true);
        const res = await OrderServices.getAllOrders({
          customerName: "",
          status: null,
          page: null,
          limit: null,
          day: null,
          startDate: null,
          endDate: null,
        });
  
        console.log("handleDownloadOrders", res);
        const exportData = res?.orders?.map((order) => {
          return {
            _id: order._id,
            invoice: order.invoice,
            subTotal: order.subTotal,
            shippingCost: order.shippingCost,
            discount: order?.discount,
            total: order.total,
            paymentMethod: order.paymentMethod,
            status: order.status,
            user_info: order?.user_info?.name,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
          };
        });
  
        exportFromJSON({
          data: exportData,
          fileName: "orders",
          exportType: exportFromJSON.types.csv,
        });
        setLoadingExport(false);
      } catch (err) {
        setLoadingExport(false);
        console.log("err on orders download", err);
        notifyError(err ? err?.response?.data?.message : err.message);
      }
    };
    // console.log("data in orders page", data);
  
    return (
      <>
      
        <h1 className="my-4 text-base font-semibold text-gray-700 dark:text-gray-300">Connected Brokers</h1>
       
  
        {loading ? (
          <TableLoading row={12} col={7} width={160} height={20} />
        ) : serviceData?.length !== 0 ? (
          <TableContainer className="mb-8 dark:bg-gray-900">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Broker</TableCell>
                  <TableCell>Broker UserId</TableCell>
                  <TableCell>Token Date</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell className="text-right">ACTIONS</TableCell>
                
                </tr>
              </TableHeader>
  
              {/* <OrderTable
                lang={lang}
                orders={dataTable}
                globalSetting={globalSetting}
                currency={globalSetting?.default_currency || "$"}
              /> */}

         
              <BrokerTable/>
            </Table>
  
            {/* <TableFooter>
              <Pagination
                totalResults={data?.totalDoc}
                resultsPerPage={resultsPerPage}
                onChange={handleChangePage}
                label="Table navigation"
              />
            </TableFooter> */}
          </TableContainer>
        ) : (
          <NotFound title="Sorry, There are no orders right now." />
        )}
      </>
    );
  };
  
  export default BrokerList;
  