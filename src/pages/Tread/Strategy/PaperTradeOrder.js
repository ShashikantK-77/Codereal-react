
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
  import { useLocation } from 'react-router-dom';
  
  // internal imports
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
  import { useListContext } from "context/ListContext";
import PaperOrder from "components/order/PaperOrder";
  
  const PaperTradeOrder = () => {
    const [orders, setOrders] = useState([]);
    const [activeButton, setActiveButton] = useState('Open');
    const [currentPage, setCurrentPage] = useState(1); // Set the initial page number to 1
    const [searchName, setSearchName] = useState("");
    const [totalResults, setTotalResults] = useState([]);
    const { masterorderList } = useListContext();
    
    masterorderList.reverse();
    const resultsPerPage = 3;
  
    const {
      time,
      setTime,
      searchText,
      searchRef,
      status,
      setStatus,
      handleSubmitForAll,
      startDate,
      setStartDate,
      endDate,
      setEndDate,
      lang,
    } = useContext(SidebarContext);
  
    const { t } = useTranslation();
    const [loadingExport, setLoadingExport] = useState(false);
    const [masterAccounts, setMasterAccounts] = useState([]);
    const [master, SetMaster] = useState();
    const [loading, setLoading] = useState(true);
  
    // Fetch data from the API
    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/paperorders', {
            headers: {
              'Content-Type': 'application/json',
               },
          });
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setOrders(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching trades:', error);
          setLoading(false);
        }
      };
      fetchOrders();
    }, []);
  
    useEffect(() => {
      const filteredOrders = masterorderList.filter((order) => {
        // Apply search text filter
        if (searchName && !order.orderno.includes(searchName.toLowerCase())) {
          return false;
        }
  
        // Apply date range filter
        if (startDate && endDate) {
          const orderDate = new Date(order.createdAt).getTime();
          const startTimestamp = new Date(startDate).getTime();
          const endTimestamp = new Date(endDate).getTime();
          if (orderDate < startTimestamp || orderDate > endTimestamp) {
            return false;
          }
        }
  
        // Apply master filter
        if (master && master !== "All" && order.UniqueKey !== master) {
          return false;
        }
  
        // If all filters pass, include the order
        return true;
      });
  
      const startIndex = (currentPage - 1) * resultsPerPage;
      const endIndex = startIndex + resultsPerPage;
  
      const paginatedOrders = filteredOrders.slice(startIndex, endIndex);
      setOrders(paginatedOrders);
  
      setTotalResults(filteredOrders.length);
  
      const fetchMasterAccounts = async () => {
        try {
          const data = localStorage.getItem('masterlist');
          const list = data ? JSON.parse(data) : [];
          setMasterAccounts(list);
        } catch (error) {
          // Handle error
        }
      };
      fetchMasterAccounts();
  
    }, [masterorderList, currentPage, resultsPerPage, searchName, startDate, endDate, master]);
  
    const handleChangePage = (page) => {
      setCurrentPage(page); // Update the currentPage when the page changes
      setSearchName("");
    };
  
    const handleDownloadOrders = async () => {
      try {
        setLoadingExport(true);
  
        // Use the filteredOrders array that was constructed for display
        const exportData = masterorderList.map((order) => {
          return {
            _id: order.orderno,
            orderdate: order.orderdate,
            symbol: order.symbol,
            quantity: order.status,
            status: order.status,
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
    
      // Filter orders based on the button clicked
      let filteredOrders = [];
      switch (buttonName) {
        case 'Open':
          filteredOrders = masterorderList.filter(order => order.orderStatus === 'OPEN');
          break;
        case 'Close':
          filteredOrders = masterorderList.filter(order => order.orderStatus === 'TRADED');
          break;
        case 'Complete':
          filteredOrders = masterorderList.filter(order => order.orderStatus === 'TRADED');
          break;
        case 'Cancel':
          filteredOrders = masterorderList.filter(order => order.orderStatus === 'CANCELLED' || order.orderStatus === 'REJECTED');
          break;
        default:
          // For 'All' button or any other case, display all orders
          filteredOrders = masterorderList;
          break;
      }
    
      // Update the state with filtered orders
      setOrders(filteredOrders);
    
      // Reset current page to 1 when filtering changes
      setCurrentPage(1);
    };
    // console.log("Filtered Orders:", filteredOrders); // Log filtered orders here
  
    return (
      <>
        <PageTitle>Paper Trades</PageTitle>
  
        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
          <CardBody>
            <form onSubmit={handleSubmitForAll}>
              <div className="grid gap-4 lg:gap-6 xl:gap-6 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 py-2">
                <div>
                  <Input
                    ref={searchRef}
                    type="search"
                    name="search"
                    onChange={(e) => setSearchName(e.target.value)}
                    className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                    placeholder="Search by Order ID"
                  />
                </div>
  
                <div>
                  <div className="flex space-x-2 justify-around">
                    <button
                      className={`py-2 px-4 rounded-md ${
                        activeButton === 'All'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200 text-gray-700'
                      } hover:bg-green-400 hover:text-white focus:outline-none`}
                      onClick={() => handleButtonClick('All')}
                    >
                      All
                    </button>
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
  
                {/* <div className="w-1/2 flex justify-end">
    <Select
      onChange={(e) => SetMaster(e.target.value)}
      className="border h-12 text-sm focus:outline-none block w-1/2 bg-gray-100 border-transparent focus:bg-white"
      placeholder="Select Master"
    >
      <option value="All">All</option>
      {masterAccounts.map((account) => (
        <option key={account.UniqueKey} value={account.UniqueKey}>
          {account.Account_Name}
        </option>
      ))}
    </Select>
  </div> */}
  
              </div>
  
              <div className="flex flex-col lg:flex-row xl:flex-row md:flex-row sm:flex-col mb-4">
                <div className="flex flex-col lg:flex-row xl:flex-row md:flex-row sm:flex-col w-full gap-4 lg:gap-6 xl:gap-6 py-2 lg:pr-8">
                  <Label className="block text-sm">
                    <span>{t("Date from")}</span>
                    <Input
                      type="date"
                      className="mt-1 border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                      name="startDate"
                      placeholder="mm/dd/yyyy"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </Label>
                  <Label className="block text-sm">
                    <span>{t("Date to")}</span>
                    <Input
                      type="date"
                      className="mt-1 border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                      name="endDate"
                      placeholder="mm/dd/yyyy"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </Label>
                </div>
                <div className="w-full">
                  <Button
                    className="w-full rounded-md h-12"
                    type="submit"
                  >
                    {t("Filter")}
                  </Button>
                </div>
              </div>
            </form>
          </CardBody>
        </Card>
  
        <div className="flex justify-between items-center mb-4">
          <Button onClick={handleDownloadOrders} className="rounded-md h-12">
            <IoCloudDownloadOutline className="text-lg" />
            <span>{t("Export")}</span>
          </Button>
        </div>
  
        {loading ? (
          <TableLoading />
        ) : orders.length === 0 ? (
          <NotFound title="Order" />
        ) : (
         
  
          <TableContainer className="mb-8 dark:bg-gray-900">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell className="text-center">Order ID</TableCell>
                  <TableCell className="text-center">Symbol</TableCell>
                  <TableCell className="text-center">date</TableCell>
                 
                  <TableCell className="text-center">Exchange</TableCell>
                  <TableCell className="text-center">Quantity</TableCell>
            
                  <TableCell className="text-center">Order Type</TableCell>
                  <TableCell className="text-center">Status</TableCell>
                  <TableCell className="text-center">Actions</TableCell>
                </tr>
              </TableHeader>
        
              {/* <OrderTable orders={orders} /> */}
              <PaperOrder orders={orders} />
          
            </Table>
          </TableContainer>
        )}
  
        <div className="flex justify-end mt-4">
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={handleChangePage}
            label="Order Table Navigation"
          />
        </div>
      </>
    );
  };
  
  export default PaperTradeOrder;
  
  
  