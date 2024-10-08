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
import { useContext, useEffect, useState } from "react";
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
import TradeSettingTable from "components/customer/TradeSettingTable";
import TradeLogTable from "components/customer/TradeLogTable";
import { useLocation } from "react-router-dom";

const TradeLogs = () => {
  const [orders, setOrders] = useState([]);
  const [activeButton, setActiveButton] = useState('Open');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("orderId");

  
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

  // useEffect(() => {
  //   const fetchOrderList = async () => {
  //     try {
  //       const response = await fetch('http://localhost:7000/api/order-list');
  //       if (response.ok) {
  //         const data = await response.json();
  //         setOrders(data);
  //       } else {
  //         console.error('Error fetching order list');
  //       }
  //     } catch (error) {
  //       console.error('An error occurred while fetching order list:', error);
  //     }
  //   };

  //   fetchOrderList();
  // }, []);

  useEffect(()=>{
    const existingDataString = localStorage.getItem('orderlog');
    let existingData = existingDataString ? JSON.parse(existingDataString) : [];
   
    console.log("orderId orderId orderId",orderId);

    // const filteredOrders = orderId ? existingData.filter(order => order.id === orderId) : existingData;
    const filteredOrders = orderId ? existingData.filter((order) => order.OrderId === orderId) : existingData;
 console.log("filteredOrders filteredOrders filteredOrders",filteredOrders);
    // Reverse the filteredOrders array to display the list in reverse order
  const reversedOrders = filteredOrders.reverse();

    setOrders(reversedOrders);
  },[]);

  // const { dataTable, serviceData, globalSetting } = useFilter(data?.orders);

  const {serviceData, globalSetting } = useFilter(data?.orders);
  

const dataTable = orders;
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
      // const res = orders;

      // console.log("handleDownloadOrders", res);
      const exportData = res?.orders?.map((order) => {
        return {
          _id: order.clientId,
          invoice: order.clientName,
          subTotal: order.symbol,
          shippingCost: order.ordertype,
          discount: order.price,
          total: order.orderdate,
          paymentMethod: order.quantity,
          status: order.status,
          // user_info: order?.user_info?.name,
          // createdAt: order.createdAt,
          // updatedAt: order.updatedAt,
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

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };


  // console.log("data in orders page", data);

  return (
    <>
      <PageTitle>{t("TradeLogs")}</PageTitle>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form onSubmit={handleSubmitForAll}>
            <div className="grid gap-4 lg:gap-6 xl:gap-6 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 py-2">
              <div>
                <Input
                  ref={searchRef}
                  type="search"
                  name="search"
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                  placeholder="Search by Order ID"
                  value={orderId || ''}
                />
              </div>

              <div>
                {/* <Select
                  onChange={(e) => setStatus(e.target.value)}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                >
                  <option value="Status" defaultValue hidden>
                    {t("Status")}
                  </option>
                  <option value="Delivered">{t("PageOrderAll")}</option>
                  <option value="Pending">{t("PageOrderOpen")}</option>
                  <option value="Processing">{t("PageOrderCompleted")}</option>
                  <option value="Cancel">{t("OrderCancel")}</option>
                </Select> */}

                <div className="flex space-x-2 justify-around">
      <button
        className={`py-2 px-4 rounded-md ${
          activeButton === 'Open'
            ? 'bg-green-600 text-white'
            : 'bg-gray-200 text-gray-700'
        } hover:bg-green-400 hover:text-white focus:outline-none`}
        onClick={() => handleButtonClick('Open')}
      >
        Open
      </button>
      <button
        className={`py-2 px-4 rounded-md ${
          activeButton === 'Close'
            ? 'bg-green-600 text-white'
            : 'bg-gray-200 text-gray-700'
        } hover:bg-green-400 hover:text-white focus:outline-none`}
        onClick={() => handleButtonClick('Close')}
      >
        Close
      </button>
      <button
        className={`py-2 px-4 rounded-md ${
          activeButton === 'Complete'
            ? 'bg-green-600 text-white'
            : 'bg-gray-200 text-gray-700'
        } hover:bg-green-400 hover:text-white focus:outline-none`}
        onClick={() => handleButtonClick('Complete')}
      >
        Complete
      </button>
      <button
        className={`py-2 px-4 rounded-md ${
          activeButton === 'Cancel'
            ? 'bg-green-600 text-white'
            : 'bg-gray-200 text-gray-700'
        } hover:bg-green-400 hover:text-white focus:outline-none`}
        onClick={() => handleButtonClick('Cancel')}
      >
        Cancel
      </button>
    </div>

              </div>

              <div>
                <Select
                  onChange={(e) => setTime(e.target.value)}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                >
                  <option value="Order limits" defaultValue hidden>
                    {t("Orderlimits")}
                  </option>
                  <option value="5">{t("DaysOrders5")}</option>
                  <option value="7">{t("DaysOrders7")}</option>
                  <option value="15">{t("DaysOrders15")}</option>
                  <option value="30">{t("DaysOrders30")}</option>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 lg:gap-6 xl:gap-6 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 py-2">
              <div>
                <Label>Start Date</Label>
                <Input
                  type="date"
                  name="startDate"
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div>
                <Label>End Date</Label>
                <Input
                  type="date"
                  name="startDate"
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              <div className="w-8/12 mx-auto">
                <Label style={{ visibility: "hidden" }}>{t("Download")}</Label>
                {loadingExport ? (
                  <Button disabled={true} type="button" className="h-12 w-full">
                    <img
                      src={spinnerLoadingImage}
                      alt="Loading"
                      width={20}
                      height={10}
                    />{" "}
                    <span className="font-serif ml-2 font-light">
                      Processing
                    </span>
                  </Button>
                ) : (
                  <button
                    onClick={handleDownloadOrders}
                    disabled={data?.orders?.length <= 0 || loadingExport}
                    type="button"
                    className={`${
                      (data?.orders?.length <= 0 || loadingExport) &&
                      "opacity-50 cursor-not-allowed bg-red-300"
                    } flex items-center justify-center text-sm leading-5 h-12 w-full text-center transition-colors duration-150 font-medium focus:outline-none px-6 py-2 rounded-md text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 focus:ring focus:ring-purple-300`}
                  >
                    Download All Orders
                    <span className="ml-2 text-base">
                      <IoCloudDownloadOutline />
                    </span>
                  </button>
                )}
              </div>
            </div>
          </form>
        </CardBody>
      </Card>

      {loading ? (
        <TableLoading row={12} col={7} width={160} height={20} />
      ) : serviceData?.length !== 0 ? (
        <TableContainer className="mb-8 dark:bg-gray-900">
          <Table>
          <TableHeader>
              <tr>
                <TableCell className="text-right">{t("ClientId")}</TableCell>
                <TableCell className="text-left">{t("ClientName")}</TableCell>
                <TableCell className="text-left">{t("ScripName")}</TableCell>
                <TableCell className="text-left">{t("OrderType")}</TableCell>
                <TableCell className="text-right">{t("Price")}</TableCell>
                <TableCell className="text-center">{t("OrderDate")}</TableCell>
                <TableCell className="text-right">{t("Quantity")}</TableCell>
                
                <TableCell className="text-center">{t("OrderStatus")}</TableCell>
              </tr>
            </TableHeader>
        
            <TradeLogTable  orders={dataTable}/>
      
          </Table>

          <TableFooter>
            <Pagination
              totalResults={data?.totalDoc}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Sorry, There are no orders right now." />
      )}
    </>
  );
};

export default TradeLogs;
