// import {
//   Button,
//   Table,
//   TableContainer,
//   TableHeader,
//   Pagination,
// } from "@windmill/react-ui";
// import { useEffect, useState } from "react";
// import { IoCloudDownloadOutline } from "react-icons/io5";
// import { useTranslation } from "react-i18next";
// import exportFromJSON from "export-from-json";

// // internal imports
// import TableLoading from "components/preloader/TableLoading";
// import NotFound from "components/table/NotFound";
// import PositionTable from "components/order/PositionTable";
// import PageTitle from "components/Typography/PageTitle";

// const PositionList = () => {
//   const [positions, setPositions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingExport, setLoadingExport] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1); // Set the initial page number to 1
//   const resultsPerPage = 3;
//   const totalResults = positions.length;
//   const { t } = useTranslation();

//   useEffect(() => {
//     const fetchPositions = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/order/positions");
//         const data = await response.json();
//         if (data.is_success) {
//           setPositions(data.details);
//         }
//       } catch (err) {
//         console.error("Error fetching positions:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPositions();
//   }, []);

//   // Handle page change
//   const handleChangePage = (page) => {
//     setCurrentPage(page); // Update the current page
//   };

//   // Handle export functionality
//   const handleDownloadOrders = async () => {
//     try {
//       setLoadingExport(true);

//       const exportData = positions.map((position) => ({
//         trading_symbol: position.trading_symbol,
//         net_quantity: position.net_quantity,
//         total_investment: position.total_investment,
//       }));

//       exportFromJSON({
//         data: exportData,
//         fileName: "positions",
//         exportType: exportFromJSON.types.csv,
//       });
//       setLoadingExport(false);
//     } catch (err) {
//       setLoadingExport(false);
//       console.error("Error exporting positions:", err);
//     }
//   };

//   return (
//     <>
//       <PageTitle>Positions</PageTitle>

//       <div className="flex justify-between items-center mb-4">
//         <Button onClick={handleDownloadOrders} className="rounded-md h-12">
//           <IoCloudDownloadOutline className="text-lg" />
//           <span>{t("Export")}</span>
//         </Button>
//       </div>

//       {loading ? (
//         <TableLoading />
//       ) : positions.length === 0 ? (
//         <NotFound title="Positions" />
//       ) : (
//         <TableContainer className="mb-8 dark:bg-gray-900">
//           <Table>
//             <TableHeader>
//               <tr>
//                 <th className="text-center">Trading Symbol</th>
//                 <th className="text-center">Net Qty</th>
//                 <th className="text-center">Total Investment</th>
//               </tr>
//             </TableHeader>

//             <PositionTable orders={positions} />
//           </Table>
//         </TableContainer>
//       )}

//       <div className="flex justify-end mt-4">
//         <Pagination
//           totalResults={totalResults}
//           resultsPerPage={resultsPerPage}
//           onChange={handleChangePage}
//           label="Position Table Navigation"
//         />
//       </div>
//     </>
//   );
// };

// export default PositionList;


// import {
//   Button,
//   Card,
//   CardBody,
//   Input,
//   Table,
//   TableCell,
//   TableContainer,
//   TableHeader,
//   Pagination,
// } from "@windmill/react-ui";
// import { useEffect, useState } from "react";
// import { IoCloudDownloadOutline } from "react-icons/io5";
// import exportFromJSON from "export-from-json";
// import { useTranslation } from "react-i18next";
// import OrderTable from "components/order/OrderTable";
// import NotFound from "components/table/NotFound";
// import PageTitle from "components/Typography/PageTitle";
// import TableLoading from "components/preloader/TableLoading";
// import { notifyError } from "utils/toast";
// import PositionTable from "components/order/PositionTable";

// const PositionList = () => {
//   const [orders, setOrders] = useState([]);
//   const [paginatedOrders, setPaginatedOrders] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchName, setSearchName] = useState("");
//   const [totalResults, setTotalResults] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [loadingExport, setLoadingExport] = useState(false);

//   const resultsPerPage = 4; // Update to 4
//   const { t } = useTranslation();

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/python/get-all-orders', {
//           headers: {
//             'Content-Type': 'application/json',
//             'access-token': 'your-access-token',
//           },
//         });
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();

//         if (data.success && Array.isArray(data.orders)) {
//           const reversedOrders = data.orders.reverse(); // Reverse the orders
//           setOrders(reversedOrders);
//           const entryOrders = orders.filter((order) => order.order_category === "Entry");
//           setTotalResults(entryOrders.length); // Update total results for pagination
//         } else {
//           console.error('Unexpected response format:', data);
//           setOrders([]);
//           setTotalResults(0); // Ensure total results is zero if no orders
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   useEffect(() => {
//     const filteredOrders = orders.filter((order) =>
//       order.order_id.toString().includes(searchName.toLowerCase())
//     );

//     const startIndex = (currentPage - 1) * resultsPerPage;
//     const endIndex = startIndex + resultsPerPage;
//     setPaginatedOrders(filteredOrders.slice(startIndex, endIndex));
//   }, [orders, searchName, currentPage]);

//   const handleChangePage = (page) => {
//     setCurrentPage(page);
//   };

//   const handleDownloadOrders = async () => {
//     try {
//       setLoadingExport(true);
//       const exportData = orders.map((order) => ({
//         order_id: order.order_id,
//         trading_symbol: order.trading_symbol,
//         quantity: order.quantity,
//         execution_price: order.execution_price,
//         order_status: order.order_status,
//         broker_order_id: order.broker_order_id || "",
//         product_type: order.product_type || "",
//         security_id: order.security_id || "",
//         filled_qty: order.filled_qty || "",
//         order_category: order.order_category || "",
//       }));

//       exportFromJSON({
//         data: exportData,
//         fileName: "orders",
//         exportType: exportFromJSON.types.csv,
//       });
//       setLoadingExport(false);
//     } catch (err) {
//       setLoadingExport(false);
//       console.error("Error exporting orders:", err);
//       notifyError(err.message);
//     }
//   };
  

//   return (
//     <>
//       <PageTitle>Positions</PageTitle>

//       <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
//         <CardBody>
//           <div className="grid gap-4 lg:gap-6 xl:gap-6 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 py-2">
//             <Input
//               type="search"
//               name="search"
//               onChange={(e) => setSearchName(e.target.value)}
//               className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
//               placeholder="Search by trading_symbol"
//             />
//           </div>
//         </CardBody>
//       </Card>

//       <div className="flex justify-between items-center mb-4">
//         <Button onClick={handleDownloadOrders} className="rounded-md h-12">
//           <IoCloudDownloadOutline className="text-lg" />
//           <span>{t("Export")}</span>
//         </Button>
//       </div>

//       {loading ? (
//         <TableLoading />
//       ) : paginatedOrders.length === 0 ? (
//         <NotFound title="Order" />
//       ) : (
//         <TableContainer className="mb-8 dark:bg-gray-900">
//           <Table>
//             <TableHeader>
//               <tr>
//               <TableCell className="text-center"></TableCell>
//                 {/* <TableCell className="text-center">Order ID</TableCell> */}
//                 <TableCell className="text-center">Symbol</TableCell>
//                 <TableCell className="text-center">Type</TableCell>
//                 <TableCell className="text-center">Qty</TableCell>
//                 <TableCell className="text-center">Avg.Price</TableCell>
//                 <TableCell className="text-center">LTP</TableCell>
//                 <TableCell className="text-center">PnL</TableCell>
//                 <TableCell className="text-center">PnL%</TableCell>
//                 <TableCell className="text-center">Actions</TableCell>
//               </tr>
//             </TableHeader>
//             {/* <OrderTable orders={orders} />  */}
//             <PositionTable orders={orders} /> 
//           </Table>
//         </TableContainer>
//       )}

//       <div className="flex justify-end mt-4">
//         <Pagination
//           totalResults={totalResults}
//           resultsPerPage={resultsPerPage}
//           onChange={handleChangePage}
//           label="Order Table Navigation"
//         />
//       </div>
//     </>
//   );
// };

// export default PositionList;

// import {
//   Button,
//   Card,
//   CardBody,
//   Input,
//   Table,
//   TableCell,
//   TableContainer,
//   TableHeader,
//   Pagination,
// } from "@windmill/react-ui";
// import { useEffect, useState } from "react";
// import { IoCloudDownloadOutline } from "react-icons/io5";
// import exportFromJSON from "export-from-json";
// import { useTranslation } from "react-i18next";
// import PositionTable from "components/order/PositionTable";
// import NotFound from "components/table/NotFound";
// import PageTitle from "components/Typography/PageTitle";
// import TableLoading from "components/preloader/TableLoading";
// import { notifyError } from "utils/toast";

// // Fetch LTP for a given security ID
// const fetchLtp = async (securityId) => {
//   if (!securityId) return 0;
//   try {
//     const response = await fetch(`http://localhost:5000/python/getltp/${securityId}`);
//     if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//     const data = await response.json();
//     return parseFloat(data.matchedRow.LTP);
//   } catch (error) {
//     console.error("Error fetching LTP:", error);
//     return 0;
//   }
// };

// // Calculate average price for each trading symbol
// const calculateAvgPrice = (orders) => {
//   const symbolOrders = orders.reduce((acc, order) => {
//     if (!acc[order.trading_symbol]) acc[order.trading_symbol] = [];
//     acc[order.trading_symbol].push(order.execution_price);
//     return acc;
//   }, {});

//   const avgPrice = {};
//   for (const symbol in symbolOrders) {
//     const prices = symbolOrders[symbol];
//     const total = prices.reduce((sum, price) => sum + price, 0);
//     avgPrice[symbol] = total / prices.length;
//   }

//   return avgPrice;
// };

// // Calculate PnL and net PnL percentage for each order
// const calculatePnL = (orders, avgPrice, ltp) => {
//   return orders.map(order => {
//     const avg = avgPrice[order.trading_symbol];
//     const currentLtp = ltp[order.trading_symbol];
//     const pnl = (currentLtp * order.quantity) - (avg * order.quantity);
//     const netPnl = pnl;
//     const netPnlPercentage = (netPnl / (avg * order.quantity)) * 100;

//     return {
//       trading_symbol: order.trading_symbol,
//       price: currentLtp,
//       avg_price: avg,
//       pnl: pnl,
//       net_pnl: netPnl,
//       net_pnl_percentage: netPnlPercentage
//     };
//   });
// };

// const PositionList = () => {
//   const [orders, setOrders] = useState([]);
//   const [paginatedOrders, setPaginatedOrders] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchName, setSearchName] = useState("");
//   const [totalResults, setTotalResults] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [loadingExport, setLoadingExport] = useState(false);

//   const resultsPerPage = 4; // Update to 4
//   const { t } = useTranslation();

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/python/get-all-orders', {
//           headers: {
//             'Content-Type': 'application/json',
//             'access-token': 'your-access-token',
//           },
//         });
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();

//         if (data.success && Array.isArray(data.orders)) {
//           const reversedOrders = data.orders.reverse(); // Reverse the orders
//           const entryOrders = reversedOrders.filter((order) => order.order_category === "Entry");
//           const uniqueSymbols = [...new Set(entryOrders.map(order => order.security_id))];
//           const ltpPromises = uniqueSymbols.map(symbol => fetchLtp(symbol));
//           const ltpResults = await Promise.all(ltpPromises);

//           const ltp = uniqueSymbols.reduce((acc, symbol, index) => {
//             acc[symbol] = ltpResults[index];
//             return acc;
//           }, {});

//           const avgPrice = calculateAvgPrice(entryOrders);
//           const positionData = calculatePnL(entryOrders, avgPrice, ltp);

//           setOrders(positionData);
//           setTotalResults(positionData.length); // Update total results for pagination
//         } else {
//           console.error('Unexpected response format:', data);
//           setOrders([]);
//           setTotalResults(0); // Ensure total results is zero if no orders
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   useEffect(() => {
//     const filteredOrders = orders.filter((order) =>
//       order.trading_symbol.toLowerCase().includes(searchName.toLowerCase())
//     );

//     const startIndex = (currentPage - 1) * resultsPerPage;
//     const endIndex = startIndex + resultsPerPage;
//     setPaginatedOrders(filteredOrders.slice(startIndex, endIndex));
//   }, [orders, searchName, currentPage]);

//   const handleChangePage = (page) => {
//     setCurrentPage(page);
//   };

//   const handleDownloadOrders = async () => {
//     try {
//       setLoadingExport(true);
//       const exportData = orders.map((order) => ({
//         trading_symbol: order.trading_symbol,
//         price: order.price,
//         avg_price: order.avg_price,
//         pnl: order.pnl,
//         net_pnl: order.net_pnl,
//         net_pnl_percentage: order.net_pnl_percentage,
//       }));

//       exportFromJSON({
//         data: exportData,
//         fileName: "orders",
//         exportType: exportFromJSON.types.csv,
//       });
//       setLoadingExport(false);
//     } catch (err) {
//       setLoadingExport(false);
//       console.error("Error exporting orders:", err);
//       notifyError(err.message);
//     }
//   };

//   return (
//     <>
//       <PageTitle>Positions</PageTitle>

//       <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
//         <CardBody>
//           <div className="grid gap-4 lg:gap-6 xl:gap-6 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 py-2">
//             <Input
//               type="search"
//               name="search"
//               onChange={(e) => setSearchName(e.target.value)}
//               className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
//               placeholder="Search by trading_symbol"
//             />
//           </div>
//         </CardBody>
//       </Card>

//       <div className="flex justify-between items-center mb-4">
//         <Button onClick={handleDownloadOrders} className="rounded-md h-12">
//           <IoCloudDownloadOutline className="text-lg" />
//           <span>{t("Export")}</span>
//         </Button>
//       </div>

//       {loading ? (
//         <TableLoading />
//       ) : paginatedOrders.length === 0 ? (
//         <NotFound title="Order" />
//       ) : (
//         <TableContainer className="mb-8 dark:bg-gray-900">
//           <Table>
//             <TableHeader>
//               <tr>
//                 <TableCell className="text-center">Symbol</TableCell>
//                 <TableCell className="text-center">Price</TableCell>
//                 <TableCell className="text-center">Avg Price</TableCell>
//                 <TableCell className="text-center">PnL</TableCell>
//                 <TableCell className="text-center">PnL (%)</TableCell>
//                 <TableCell className="text-center">Actions</TableCell>
//               </tr>
//             </TableHeader>
//             <PositionTable orders={paginatedOrders} />
//           </Table>
//         </TableContainer>
//       )}

//       <div className="flex justify-end mt-4">
//         <Pagination
//           totalResults={totalResults}
//           resultsPerPage={resultsPerPage}
//           onChange={handleChangePage}
//           label="Position Table Navigation"
//         />
//       </div>
//     </>
//   );
// };

// export default PositionList;

// import {
//   Button,
//   Card,
//   CardBody,
//   Input,
//   Table,
//   TableCell,
//   TableContainer,
//   TableHeader,
//   Pagination,
// } from "@windmill/react-ui";
// import { useEffect, useState } from "react";
// import { IoCloudDownloadOutline } from "react-icons/io5";
// import exportFromJSON from "export-from-json";
// import { useTranslation } from "react-i18next";
// import PositionTable from "components/order/PositionTable";
// import NotFound from "components/table/NotFound";
// import PageTitle from "components/Typography/PageTitle";
// import TableLoading from "components/preloader/TableLoading";
// import { notifyError } from "utils/toast";

// // Fetch LTP for a given security ID
// const fetchLtp = async (securityId) => {
//   if (!securityId) return 0;
//   try {
//     const response = await fetch(`http://localhost:5000/python/getltp/${securityId}`);
//     if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//     const data = await response.json();
//     return parseFloat(data.matchedRow.LTP);
//   } catch (error) {
//     console.error("Error fetching LTP:", error);
//     return 0;
//   }
// };

// // Calculate average price for each trading symbol
// const calculateAvgPrice = (orders) => {
//   const symbolOrders = orders.reduce((acc, order) => {
//     if (!acc[order.trading_symbol]) acc[order.trading_symbol] = [];
//     acc[order.trading_symbol].push(order.execution_price);
//     return acc;
//   }, {});

//   const avgPrice = {};
//   for (const symbol in symbolOrders) {
//     const prices = symbolOrders[symbol];
//     const total = prices.reduce((sum, price) => sum + price, 0);
//     avgPrice[symbol] = total / prices.length;
//   }

//   return avgPrice;
// };

// // Calculate PnL and net PnL percentage for each order
// const calculatePnL = (orders, avgPrice, ltp) => {
//   return orders.map(order => {
//     const avg = avgPrice[order.trading_symbol];
//     const currentLtp = ltp[order.trading_symbol];
//     const pnl = (currentLtp * order.quantity) - (avg * order.quantity);
//     const netPnl = pnl;
//     const netPnlPercentage = (netPnl / (avg * order.quantity)) * 100;

//     return {
//       trading_symbol: order.trading_symbol,
//       price: currentLtp,
//       avg_price: avg,
//       pnl: pnl,
//       net_pnl: netPnl,
//       net_pnl_percentage: netPnlPercentage
//     };
//   });
// };

// const PositionList = () => {
//   const [orders, setOrders] = useState([]);
//   const [paginatedOrders, setPaginatedOrders] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchName, setSearchName] = useState("");
//   const [totalResults, setTotalResults] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [loadingExport, setLoadingExport] = useState(false);
//   const [ltpMap, setLtpMap] = useState(new Map());
//   const resultsPerPage = 4;
//   const { t } = useTranslation();

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/python/get-all-orders', {
//           headers: {
//             'Content-Type': 'application/json',
//             'access-token': 'your-access-token',
//           },
//         });
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();

//         if (data.success && Array.isArray(data.orders)) {
//           const reversedOrders = data.orders.reverse(); // Reverse the orders
//           const entryOrders = reversedOrders.filter((order) => order.order_category === "Entry");
//           const uniqueSymbols = [...new Set(entryOrders.map(order => order.security_id))];
//           const ltpPromises = uniqueSymbols.map(symbol => fetchLtp(symbol));
//           const ltpResults = await Promise.all(ltpPromises);

//           const ltp = uniqueSymbols.reduce((acc, symbol, index) => {
//             acc[symbol] = ltpResults[index];
//             return acc;
//           }, {});

//           const avgPrice = calculateAvgPrice(entryOrders);
//           const positionData = calculatePnL(entryOrders, avgPrice, ltp);

//           setOrders(positionData);
//           setTotalResults(positionData.length); // Update total results for pagination
//         } else {
//           console.error('Unexpected response format:', data);
//           setOrders([]);
//           setTotalResults(0); // Ensure total results is zero if no orders
//         }
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   useEffect(() => {
//     const filteredOrders = orders.filter((order) =>
//       order.trading_symbol.toLowerCase().includes(searchName.toLowerCase())
//     );

//     const startIndex = (currentPage - 1) * resultsPerPage;
//     const endIndex = startIndex + resultsPerPage;
//     setPaginatedOrders(filteredOrders.slice(startIndex, endIndex));
//   }, [orders, searchName, currentPage]);

//   const handleChangePage = (page) => {
//     setCurrentPage(page);
//   };

//   const handleDownloadOrders = async () => {
//     try {
//       setLoadingExport(true);
//       const exportData = orders.map((order) => ({
//         trading_symbol: order.trading_symbol,
//         price: order.price,
//         avg_price: order.avg_price,
//         pnl: order.pnl,
//         net_pnl: order.net_pnl,
//         net_pnl_percentage: order.net_pnl_percentage,
//       }));

//       exportFromJSON({
//         data: exportData,
//         fileName: "positions",
//         exportType: exportFromJSON.types.csv,
//       });
//     } catch (err) {
//       notifyError(err.message);
//       console.error("Error exporting positions:", err);
//     } finally {
//       setLoadingExport(false);
//     }
//   };

//   return (
//     <>
//       <PageTitle>Positions</PageTitle>

//       <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
//         <CardBody>
//           <div className="grid gap-4 lg:gap-6 xl:gap-6 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 py-2">
//             <Input
//               type="search"
//               name="search"
//               onChange={(e) => setSearchName(e.target.value)}
//               className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
//               placeholder="Search by trading_symbol"
//             />
//           </div>
//         </CardBody>
//       </Card>

//       <div className="flex justify-between items-center mb-4">
//         <Button onClick={handleDownloadOrders} className="rounded-md h-12">
//           <IoCloudDownloadOutline className="text-lg" />
//           <span>{t("Export")}</span>
//         </Button>
//       </div>

//       {loading ? (
//         <TableLoading />
//       ) : paginatedOrders.length === 0 ? (
//         <NotFound title="Positions" />
//       ) : (
//         <TableContainer className="mb-8 dark:bg-gray-900">
//           <Table>
//             <TableHeader>
//               <tr>
//                 <TableCell className="text-center">Symbol</TableCell>
//                 <TableCell className="text-center">Price</TableCell>
//                 <TableCell className="text-center">Avg Price</TableCell>
//                 <TableCell className="text-center">PnL</TableCell>
//                 <TableCell className="text-center">PnL (%)</TableCell>
//                 <TableCell className="text-center">Actions</TableCell>
//               </tr>
//             </TableHeader>
//             <PositionTable orders={paginatedOrders} />
//           </Table>
//         </TableContainer>
//       )}

//       <div className="flex justify-end mt-4">
//         <Pagination
//           totalResults={totalResults}
//           resultsPerPage={resultsPerPage}
//           onChange={handleChangePage}
//           label="Position Table Navigation"
//         />
//       </div>
//     </>
//   );
// };

// export default PositionList;



import {
  Button,
  Card,
  CardBody,
  Input,
  Table,
  TableCell,
  TableContainer,
  TableHeader,
  Pagination,
} from "@windmill/react-ui";
import { useEffect, useState } from "react";
import { IoCloudDownloadOutline } from "react-icons/io5";
import exportFromJSON from "export-from-json";
import { useTranslation } from "react-i18next";
import PositionTable from "components/order/PositionTable";
import NotFound from "components/table/NotFound";
import PageTitle from "components/Typography/PageTitle";
import TableLoading from "components/preloader/TableLoading";
import { notifyError } from "utils/toast";

const PositionList = () => {
  const [orders, setOrders] = useState([]);
  const [positionData, setPositionData] = useState([]); // State for the consolidated data
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingExport, setLoadingExport] = useState(false);
  const [ltpMap, setLtpMap] = useState(new Map());
  const resultsPerPage = 4;
  const { t } = useTranslation();

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/python/get-all-orders', {
          headers: {
            'Content-Type': 'application/json',
            'access-token': 'your-access-token',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if (isMounted) { // Check if the component is still mounted
          if (data.success && Array.isArray(data.orders)) {
            const reversedOrders = data.orders.reverse(); // Reverse the orders
            setOrders(reversedOrders);
            setTotalResults(reversedOrders.length); // Update total results for pagination
          } else {
            console.error('Unexpected response format:', data);
            setOrders([]);
            setTotalResults(0); // Ensure total results is zero if no orders
          }
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        if (isMounted) setLoading(false); // Update loading only if mounted
      }
    };

    fetchOrders();

    return () => {
      isMounted = false; // Cleanup function to set isMounted to false
    };
  }, []);

  useEffect(() => {
    const fetchLtpData = async () => {
      if (orders.length === 0) return;

      const uniqueSymbols = [...new Set(orders.map(order => order.trading_symbol))];
      const ltpPromises = uniqueSymbols.map(symbol =>
        fetch(`${BaseUrl}api/ltp?symbol=${symbol}`) // Replace with your LTP API endpoint
          .then(response => response.json())
          .then(data => ({ symbol, ltp: data.ltp }))
          .catch(error => console.error(`Error fetching LTP for ${symbol}:`, error))
      );

      try {
        const ltpData = await Promise.all(ltpPromises);
        const ltpMap = new Map(ltpData.map(item => [item.symbol, item.ltp]));
        setLtpMap(ltpMap);
      } catch (error) {
        console.error('Error fetching LTP data:', error);
      }
    };

    fetchLtpData();
  }, [orders]);

  useEffect(() => {
    const calculatePositionData = () => {
      const uniqueSymbols = [...new Set(orders.map(order => order.trading_symbol))];
      const positionData = uniqueSymbols.map(symbol => {
        const symbolOrders = orders.filter(order => order.trading_symbol === symbol);
        const totalQuantity = symbolOrders.reduce((acc, order) => acc + order.qty, 0);
        const totalPrice = symbolOrders.reduce((acc, order) => acc + (order.execution_price * order.qty), 0);
        const averagePrice = totalQuantity ? totalPrice / totalQuantity : 0;
        const currentLTP = ltpMap.get(symbol) || 0;
        const pnl = (currentLTP * totalQuantity) - (averagePrice * totalQuantity);
        const pnlPercentage = (averagePrice * totalQuantity) ? (pnl / (averagePrice * totalQuantity)) * 100 : 0;

        return {
          symbol,
          averagePrice: averagePrice.toFixed(2),
          ltp: currentLTP.toFixed(2),
          pnl: pnl.toFixed(2),
          pnlPercentage: pnlPercentage.toFixed(2),
          actions: "Actions Placeholder" // Placeholder for action buttons or links
        };
      });
      setPositionData(positionData);
    };

    calculatePositionData();
  }, [orders, ltpMap]);

  return (
    <>
      <PageTitle>Positions</PageTitle>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <div className="grid gap-4 lg:gap-6 xl:gap-6 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 py-2">
            <Input
              type="search"
              name="search"
              onChange={(e) => setSearchName(e.target.value)}
              className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
              placeholder="Search by trading_symbol"
            />
          </div>
        </CardBody>
      </Card>

      {loading ? (
        <TableLoading />
      ) : positionData.length === 0 ? (
        <NotFound title="Positions" />
      ) : (
        <TableContainer className="mb-8 dark:bg-gray-900">
          <Table>
            <TableHeader>
              <tr>
                <TableCell className="text-center">Symbol</TableCell>
                <TableCell className="text-center">LTP</TableCell>
                <TableCell className="text-center">Avg Price</TableCell>
                <TableCell className="text-center">PnL</TableCell>
                <TableCell className="text-center">PnL (%)</TableCell>
                <TableCell className="text-center">Actions</TableCell>
              </tr>
            </TableHeader>
            <PositionTable positionData={positionData} />
          </Table>
        </TableContainer>
      )}

      <div className="flex justify-end mt-4">
        <Pagination
          totalResults={totalResults}
          resultsPerPage={resultsPerPage}
          onChange={(page) => setCurrentPage(page)}
          label="Position Table Navigation"
        />
      </div>
    </>
  );
};

export default PositionList;
