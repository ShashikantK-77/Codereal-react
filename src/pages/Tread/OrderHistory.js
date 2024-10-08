
import {
  Button,
  Card,
  CardBody,
  Input,
  Table,
  TableCell,
  TableContainer,
  TableHeader,
  Select,
} from "@windmill/react-ui";
import { RiFileExcel2Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { FaHistory } from "react-icons/fa"; // Import the history icon
import exportFromJSON from "export-from-json";
import { useTranslation } from "react-i18next";
import OrderTable from "components/order/OrderTable";
import NotFound from "components/table/NotFound";
import PageTitle from "components/Typography/PageTitle";
import TableLoading from "components/preloader/TableLoading";
import { notifyError } from "utils/toast";
import { Link } from "react-router-dom";
import { BaseUrl } from "utils/Constants";

const OrderHistoryList = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingExport, setLoadingExport] = useState(false);
  const [selectedRange, setSelectedRange] = useState("");
  const [customStartDate, setCustomStartDate] = useState(null);
const [customEndDate, setCustomEndDate] = useState(null);
  const dateRanges = [
    { label: "Last 7 Days", value: "last7days" },
    { label: "Last 15 Days", value: "last15days" },
    { label: "Last Month", value: "lastMonth" },
    { label: "Custom", value: "Custom" },
  ];

  const { t } = useTranslation();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${BaseUrl}order/get-all-historyorders`,
          {
            headers: {
              "Content-Type": "application/json",
              "access-token": "your-access-token",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if (data.success && Array.isArray(data.orders)) {
          const reversedOrders = data.orders.reverse(); // Reverse the orders
          setOrders(reversedOrders);
          setFilteredOrders(reversedOrders); // Set initial filtered orders to all fetched orders
        } else {
          console.error("Unexpected response format:", data);
          setOrders([]);
          setFilteredOrders([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders(); // Apply filters whenever search name or selected range changes
  }, [searchName, selectedRange]);

  const handleRangeChange = (event) => {
    const value = event.target.value;
    setSelectedRange(value);
    filterOrders(); // Reapply filters when date range changes
  };
  const handleCustomDateChange = (event, type) => {
    const value = event.target.value;
    if (type === "start") {
      setCustomStartDate(value);
    } else if (type === "end") {
      setCustomEndDate(value);
    }
    filterOrders(); // Reapply filters when custom dates change
  };

  const filterOrders = () => {
    let filtered = orders;

    // Filter by date range
    if (selectedRange) {
      const now = new Date();
      let startDate;

      let endDate = new Date(); // Define endDate here for all cases
      switch (selectedRange) {
        case "last7days":
          startDate = new Date(now.setDate(now.getDate() - 7));
          break;
        case "last15days":
          startDate = new Date(now.setDate(now.getDate() - 15));
          break;
        case "lastMonth":
          startDate = new Date(now.setMonth(now.getMonth() - 1));
          break;
          case "Custom":
        startDate = customStartDate ? new Date(customStartDate) : null;
        endDate = customEndDate ? new Date(customEndDate) : null;
        break;
        default:
          startDate = null;
      }

      if (startDate) {
        filtered = filtered.filter((order) => {
          const orderDate = new Date(order.create_time);
          return orderDate >= startDate;
        });
      }
    }

    // Filter by search name
    if (searchName) {
      filtered = filtered.filter((order) =>
        order.trading_symbol.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  };

  const handleDownloadOrders = async () => {
    try {
      setLoadingExport(true);
      const exportData = filteredOrders.map((order) => ({
        order_id: order.order_id,
        trading_symbol: order.trading_symbol,
        quantity: order.quantity,
        execution_price: order.execution_price,
        order_status: order.order_status,
        broker_order_id: order.broker_order_id || "",
        product_type: order.product_type || "",
        security_id: order.security_id || "",
        filled_qty: order.filled_qty || "",
        order_category: order.order_category || "",
      }));

      exportFromJSON({
        data: exportData,
        fileName: "orders",
        exportType: exportFromJSON.types.csv,
      });
      setLoadingExport(false);
    } catch (err) {
      setLoadingExport(false);
      console.error("Error exporting orders:", err);
      notifyError(err.message);
    }
  };

  return (
    <>
      <PageTitle>Orders History</PageTitle>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <div className="grid gap-4 lg:gap-6 xl:gap-6 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 py-2">
            <Input
              type="search"
              name="search"
              onChange={(e) => setSearchName(e.target.value)}
              className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
              placeholder="Search by Symbol"
            />

            <Select
              placeholder="Search by Date"
              value={selectedRange}
              onChange={handleRangeChange}
              className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
            >
              <option value="" disabled hidden>
                Search by Date
              </option>
              {dateRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </Select>

            {selectedRange === "Custom" && (
              <div className="flex flex-row gap-x-4">
                <Input
                  type="date"
                  name="customStartDate"
                  onChange={(e) => handleCustomDateChange(e, "start")}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white "
                  placeholder="Start Date"
                />

                <Input
                  type="date"
                  name="customEndDate"
                  onChange={(e) => handleCustomDateChange(e, "end")}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white "
                   placeholder="End Date"
                />
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <RiFileExcel2Line
            onClick={handleDownloadOrders}
            className="text-lg cursor-pointer text-green-500"
          />
        </div>

        {/* <div className="flex items-center">
          <Link to="/orderhistory">
            <Button className="rounded-md h-12">Order History <FaHistory className="ml-2 text-lg" /></Button>
          </Link>
        </div> */}
      </div>

      {loading ? (
        <TableLoading />
      ) : filteredOrders.length === 0 ? (
        <NotFound title="Order" />
      ) : (
        <TableContainer className="mb-8 dark:bg-gray-900">
          <Table>
            <TableHeader>
              <tr>
                <TableCell className="text-center"></TableCell>
                {/* <TableCell className="text-center"></TableCell> */}
                <TableCell className="text-center">Order ID</TableCell>
                {/* <TableCell className="text-center">Status</TableCell> */}
                <TableCell className="text-center">Symbol</TableCell>
                <TableCell className="text-center">Type</TableCell>
                <TableCell className="text-center">Qty</TableCell>
                <TableCell className="text-center">Avg. Price</TableCell>
                {/* <TableCell className="text-center">LTP</TableCell> */}
                <TableCell className="text-center">PnL</TableCell>
                <TableCell className="text-center">PnL(%)</TableCell>
                {/* <TableCell className="text-center">Actions</TableCell> */}
              </tr>
            </TableHeader>
            <OrderTable orders={filteredOrders} /> {/* Pass filtered orders */}
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default OrderHistoryList;
