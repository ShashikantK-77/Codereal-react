// import React, { useState, useEffect, useContext } from "react";
// import {
//   Button,
//   Card,
//   CardBody,
//   Input,
//   Label,
//   Pagination,
//   Select,
//   Table,
//   TableCell,
//   TableContainer,
//   TableFooter,
//   TableHeader,
// } from "@windmill/react-ui";
// import { IoCloudDownloadOutline } from "react-icons/io5";
// import { useTranslation } from "react-i18next";
// import exportFromJSON from "export-from-json";
// import NotFound from "components/table/NotFound";
// import TableLoading from "components/preloader/TableLoading";
// import { notifyError } from "utils/toast";
// import { useListContext } from "context/ListContext";
// import PaperOrder from "components/order/PaperOrder";
// import PageTitle from "components/Typography/PageTitle";
// import PLTable from "components/order/PLTable";
// import BarChart from "components/chart/BarChart/BarChart";
// import LineChart from "components/chart/LineChart/LineChart";
// import { Link } from "@react-pdf/renderer";
// import DonutChart from "components/chart/DonutChart/DonutChart";
// import GroupBarChart from "components/chart/GroupBarChart/GroupBarChart";
// import { AdminContext } from "context/AdminContext";

// const PnLReport = () => {
//   const [orders, setOrders] = useState([]);
//   const [selectedStrategy, setSelectedStrategy] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalResults, setTotalResults] = useState([]);
//   const { masterorderList } = useListContext();
//   const resultsPerPage = 10; // Number of results per page
//   const { t } = useTranslation();
//   const [loading, setLoading] = useState(true);
//   const [orderDetails, setOrderDetails] = useState([]);
 
//   const [strategyDetails, setStrategyDetails] = useState([]);
//   const [ltpMap, setLtpMap] = useState(new Map());

//   const [strategyorders, setStrategyOrders] = useState([]);


//   const [pnl, setPnl] = useState(0);
//   const [netPnl, setNetPnl] = useState(0);
//   const transactionCosts = 0.01; // Example transaction cost per unit

//   const { state } = useContext(AdminContext);
//   const { zenithQuark } = state;

 
//   // Static data for strategy dropdown (replace with actual data)

//   const [securityId, setSecurityId] = useState("");
//   const [ltp, setLtp] = useState(0); // Assuming LTP is a number


//   const salesReport = [
//     { date: "2024-01-01", total: 1000, order: 20 },
//     { date: "2024-01-02", total: 1500, order: 30 },
//     { date: "2024-01-03", total: 1200, order: 25 },
//     { date: "2024-01-04", total: 1800, order: 35 },
//     { date: "2024-01-05", total: 2000, order: 40 },
//     { date: "2024-01-06", total: 2200, order: 45 },
//     { date: "2024-01-07", total: 2500, order: 50 },
//   ];

//   const salesReport2 = [
//     { date: "January", totalSales: 1500 },
//     { date: "February", totalSales: 1800 },
//     { date: "March", totalSales: 2000 },
//     { date: "April", totalSales: 2200 },
//     { date: "May", totalSales: 1900 },
//     { date: "June", totalSales: 2300 },
//     { date: "July", totalSales: 900 },
//   ];

//   const [chartData, setChartData] = useState(null);

//   const transformDataForChart = (orders) => {
//     const labels = orders.map((order) => order.transactionType); // assuming each order has a date field
//     const dataset1 = orders.map((order) => order.quantity); // replace with actual data field
//     const dataset2 = orders.map((order) => order.price); // replace with actual data field
//     const dataset3 = orders.map((order) => order.filled_qty); // replace with actual data field

//     return {
//       labels,
//       datasets: [
//         {
//           label: "Quantity",
//           data: dataset1,
//           backgroundColor: "rgb(255, 99, 132)",
//           stack: "Stack 0",
//         },
//         {
//           label: "Price",
//           data: dataset2,
//           backgroundColor: "rgb(75, 192, 192)",
//           stack: "Stack 1",
//         },
//         {
//           label: "filled_qty",
//           data: dataset3,
//           backgroundColor: "rgb(53, 162, 235)",
//           stack: "Stack 2",
//         },
//       ],
//     };
//   };

//   // Add the following useEffect inside your PnLReport component
//   useEffect(() => {
//     setChartData(transformDataForChart(strategyorders)); // Transform and set chart data
//   }, [strategyorders]);



 
 

 
//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         setLoading(true); // Set loading to true before fetching
  
//         const response = await fetch(`http://localhost:5000/order/orders/${selectedStrategy}`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             // Add any other necessary headers here, such as authorization if required
//           },
//         });
  
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
  
//         const data = await response.json();
        
//         // Combine orders and histories into a single array
//         const allOrders = [...data.orders, ...data.histories];
  
//         // Set state with the combined data
//         setOrderDetails(allOrders); // Assuming you want to store this in orderDetails
//         if (allOrders.length > 0) {
//           setStrategyOrders(allOrders); // Set combined orders to strategyOrders
//           setSecurityId(allOrders[0].security_id); // Set securityId based on the first item, if available
//         }
  
//         setLoading(false); // Set loading to false after fetching
//       } catch (error) {
//         console.error("Error fetching order details:", error);
//         setLoading(false); // Set loading to false on error
//         // Handle error notification or logging here
//       }
//     };
  
//     fetchOrderDetails(); // Call fetchOrderDetails immediately
//   }, [selectedStrategy]);
  


//   useEffect(() => {
//     const fetchLtp = async () => {
//       if (!securityId) return;
  
//       try {
//         const response = await fetch(`http://localhost:5000/python/getltp/${securityId}`);
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
  
//         const data = await response.json();
//         setLtp(data.matchedRow.LTP); // Assuming API returns LTP in this structure
//       } catch (error) {
//         console.error("Error fetching LTP:", error);
//         // Handle error
//       }
//     };
  
//     fetchLtp();
//   }, [securityId]); // Run when securityId changes
  

//   useEffect(() => {
//     const filteredOrders = masterorderList.filter((order) => {
//       // Apply strategy filter
//       if (selectedStrategy && order.strategy !== selectedStrategy) {
//         return false;
//       }

//       // Apply date filter
//       if (selectedDate) {
//         const orderDate = new Date(order.createdAt).toDateString();
//         const filterDate = new Date(selectedDate).toDateString();
//         if (orderDate !== filterDate) {
//           return false;
//         }
//       }

//       // If all filters pass, include the order
//       return true;
//     });

//     const startIndex = (currentPage - 1) * resultsPerPage;
//     const endIndex = startIndex + resultsPerPage;

//     const paginatedOrders = filteredOrders.slice(startIndex, endIndex);
//     setOrders(paginatedOrders);

//     setTotalResults(filteredOrders.length);
//   }, [
//     masterorderList,
//     currentPage,
//     resultsPerPage,
//     selectedStrategy,
//     selectedDate,
//   ]);

//   useEffect(() => {
//     const fetchAllLtp = async () => {
//       const uniqueSecurityIds = [
//         ...new Set(orders.map((order) => order.security_id)),
//       ];

//       try {
//         const ltpResponses = await Promise.all(
//           uniqueSecurityIds.map((securityId) =>
//             fetchLtp(securityId).then((ltp) => ({ securityId, ltp }))
//           )
//         );

//         const ltpMap = new Map();
//         ltpResponses.forEach(({ securityId, ltp }) => {
//           ltpMap.set(securityId, ltp);
//         });
//         setLtpMap(ltpMap);
//       } catch (error) {
//         console.error("Error fetching LTP:", error);
//       }
//     };

//     fetchAllLtp(); // Fetch LTP initially

//     const intervalId = setInterval(fetchAllLtp, 2000); // Set interval to fetch LTP every 2 seconds

//     return () => {
//       clearInterval(intervalId); // Cleanup interval on unmount
//     };
//   }, []);
//   const fetchLtp = async (securityId) => {
//     if (!securityId) return;

//     try {
//       const response = await fetch(
//         `http://localhost:5000/python/getltp/${securityId}`
//       );
//       if (!response.ok)
//         throw new Error(`HTTP error! Status: ${response.status}`);

//       const data = await response.json();
//       return parseFloat(data.matchedRow.LTP);
//     } catch (error) {
//       console.error("Error fetching LTP:", error);
//       return 0;
//     }
//   };



//   useEffect(() => {
//     // Fetch strategy details from the API
//     const fetchStrategyDetails = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:5000/strategy/getpnlstartegies",
//           {
//             method: "get", // Change to POST method
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${zenithQuark}`, // Replace zenithQuark with your actual token variable
//             },
//           }
//         );

//         const data = await response.json();

//         if (data.is_success) {
//           // Set the fetched strategy details to state
//           console.log("details in pnl:", data.details);
//           setStrategyDetails(data.details);
//         } else {
//           console.error("Failed to fetch strategies");
//         }
//       } catch (error) {
//         console.error("Error fetching strategies:", error);
//       }
//     };

//     fetchStrategyDetails();
//   }, []);

//   useEffect(() => {
//     const fetchLtp = async () => {
//       if (!securityId) return;
  
//       try {
//         const response = await fetch(`http://localhost:5000/python/getltp/${securityId}`);
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
  
//         const data = await response.json();
//         setLtp(data.matchedRow.LTP); // Assuming API returns LTP in this structure
//       } catch (error) {
//         console.error("Error fetching LTP:", error);
//         // Handle error
//       }
//     };
  
//     fetchLtp();
//   }, [securityId]); // Run when securityId changes
  
//   useEffect(() => {
//     const calculatePnL = () => {
//       console.log("calculatePnL orders:",orders);
//         const entryOrders = orders.filter(order => order.order_category === 'Entry');
//         const targetOrders = orders.filter(order => order.order_category === 'Target');

//         let totalPnL = 0;

//         entryOrders.forEach(entryOrder => {
//             const matchingTargetOrder = targetOrders.find(targetOrder => targetOrder.main_order_id === entryOrder.broker_order_id);
//             if (matchingTargetOrder) {
//                 const sellPrice = parseFloat(matchingTargetOrder.execution_price);
//                 const buyPrice = parseFloat(entryOrder.execution_price);
//                 const quantity = entryOrder.quantity; // Assuming quantity is the same for both entry and target orders

//                 const orderPnL = (sellPrice - buyPrice) * quantity;
//                 totalPnL += orderPnL;
//             }
//         });

//         setPnl(totalPnL);
//         setNetPnl(totalPnL - (transactionCosts * entryOrders.length)); // Example: Assuming transaction cost is applied per order
//     };

//     calculatePnL();
// }, [selectedStrategy]);

// function calculatePnL(orderHistories) {
//   let entryOrders = [];
//   let exitOrders = [];
  
//   // Separate entry and exit orders
//   orderHistories.forEach(order => {
//     if (order.order_category === "Entry" && order.transaction_type === "BUY") {
//       entryOrders.push(order);
//     } else if (["Target", "stop_loss"].includes(order.order_category) && order.transaction_type === "SELL") {
//       exitOrders.push(order);
//     }
//   });

//   let pnlResults = [];
//   let totalPnL = 0;
//   let totalNetPnL = 0;

//   // Calculate PnL for each pair of entry and exit orders
//   entryOrders.forEach(entry => {
//     // Find the corresponding exit order by matching the security_id and quantity
//     let correspondingExit = exitOrders.find(exit => 
//       exit.security_id === entry.security_id && exit.quantity === entry.quantity
//     );

//     if (correspondingExit) {
//       let entryPrice = parseFloat(entry.execution_price);
//       let exitPrice = parseFloat(correspondingExit.execution_price);
//       let quantity = entry.quantity;

//       // PnL = (Exit Price - Entry Price) * Quantity
//       let pnl = (exitPrice - entryPrice) * quantity;

//       // Calculate NetPnL if there are additional fees (currently no fees)
//       let netPnL = pnl; // You can adjust this line to subtract fees if needed.

//       // Accumulate total PnL and NetPnL
//       totalPnL += pnl;
//       totalNetPnL += netPnL;

//       // Store the individual PnL results for each pair
//       pnlResults.push({
//         entryOrderId: entry.order_id,
//         exitOrderId: correspondingExit.order_id,
//         pnl: pnl.toFixed(2),
//         netPnL: netPnL.toFixed(2)
//       });
//     }
//   });

//   // Final report: includes individual PnL and total PnL
//   return {
//     pnlResults,  // Individual PnL results for each trade pair
//     totalPnL: totalPnL.toFixed(2),  // Total PnL after all trades
//     totalNetPnL: totalNetPnL.toFixed(2)  // Total NetPnL after all trades
//   };
// }


// // console.log(calculatePnL(orderDetails));
// let { pnlResults, totalPnL, totalNetPnL } = calculatePnL(orderDetails);



//   // const transformedData = transformDataForCombinedDonutChart(strategyorders);
//   return (
//     <>
//       <PageTitle>PnL Summary:</PageTitle>

//       <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
//         <CardBody>
//           <form>
//             <div className="grid gap-4 lg:gap-6 xl:gap-6 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 py-2">
//               <div>
//                 <Label className="block text-sm">
//                   <span>{t("Select Strategy")}</span>

//                   <Select
//                     className="mt-1 border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
//                     value={selectedStrategy}
//                     onChange={(e) => setSelectedStrategy(e.target.value)}
//                   >
//                     <option value="">Select a strategy</option>
//                     {strategyDetails.map((strategy) => (
//                       <option
//                         key={strategy.strategyDesc.strategy_id}
//                         value={strategy.strategyDesc.strategy_id}
//                       >
//                         {strategy.strategyDesc.strategy_name}
//                       </option>
//                     ))}
//                   </Select>
//                 </Label>
//               </div>

//               <div>
//                 <Label className="block text-sm">
//                   <span>{t("Select Date")}</span>
//                   <Input
//                     type="date"
//                     className="mt-1 border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
//                     value={selectedDate}
//                     onChange={(e) => setSelectedDate(e.target.value)}
//                   />
//                 </Label>
//               </div>
//             </div>
//           </form>
//         </CardBody>
//       </Card>

//       <Card className="p-4 border border-gray-200 rounded-lg shadow-md w-full mb-4">
//         <CardBody>
//           <div className="flex">
//             <div className="w-5/12">
            
//               {chartData && <GroupBarChart data={chartData} />}
//             </div>
//             <div className="w-1/2 relative">
             

//               <div className="flex flex-wrap ">
//                 <>
//                   <Card className="flex-auto p-1 border border-gray-200 rounded-lg shadow-md mx-2 my-2 w-64 h-32">
//                     <div className="w-full h-full flex flex-col justify-center items-center">
//                       <h2 className="text-lg font-semibold mb-1">
//                         Total Trades
//                       </h2>
//                       <p className="text-2xl font-bold text-green-500">
//                         {strategyorders.length}
//                       </p>
//                     </div>
//                   </Card>

//                   <Card className="flex-auto p-1 border border-gray-200 rounded-lg shadow-md mx-2 my-2 w-64 h-32">
//                     <div className="w-full h-full flex flex-col justify-center items-center">
//                       <h2 className="text-lg font-semibold mb-1">
//                         Current Value
//                       </h2>
//                       <p className="text-2xl font-bold text-green-500">{ltp}</p>
//                     </div>
//                   </Card>

//                   <Card className="flex-auto p-1 border border-gray-200 rounded-lg shadow-md mx-2 my-2 w-64 h-32">
//                     <div className="w-full h-full flex flex-col justify-center items-center">
//                       <h2 className="text-lg font-semibold mb-1">PnL</h2>
//                       <p className="text-2xl font-bold text-red-600">
//                       {totalPnL}
//                       </p>
//                     </div>
//                   </Card>
//                   <Card className="flex-auto p-1 border border-gray-200 rounded-lg shadow-md mx-2 my-2 w-64 h-32">
//                     <div className="w-full h-full flex flex-col justify-center items-center">
//                       <h2 className="text-lg font-semibold mb-1">Net PnL</h2>
//                       <p className="text-2xl font-bold text-red-600">
//                       {totalNetPnL}
//                       </p>
//                     </div>
//                   </Card>
//                 </>
//               </div>
//               <Link to="/orders">
//                 <button className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                   View all orders
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </CardBody>
//       </Card>

 

//       <TableContainer className="mb-8 dark:bg-gray-900">
//         <Table>
//           <TableHeader>
//             <tr>
//               <TableCell className="text-center">Symbol</TableCell>
//               <TableCell className="text-center">Qty</TableCell>
//               <TableCell className="text-center">Order Price</TableCell>
//               <TableCell className="text-center">transactionType</TableCell>

//               <TableCell className="text-center">Ltp</TableCell>
            
//               <TableCell className="text-center">Status</TableCell>
//             </tr>
//           </TableHeader>

//           {/* Render order table */}
//           {loading ? (
//             <TableLoading />
//           ) : strategyorders.length ? (
//             <PLTable orders={strategyorders} ltp={ltp} />
//           ) : (
//             <NotFound title="Order" />
//           )}
//         </Table>
//       </TableContainer>
//     </>
//   );
// };

// export default PnLReport;




// import React, { useState, useEffect, useContext } from "react";
// import {
//   Button,
//   Card,
//   CardBody,
//   Input,
//   Label,
//   Pagination,TableBody,
//   Select,
//   Table,
//   TableCell,
//   TableContainer,
//   TableFooter,
//   TableHeader,
// } from "@windmill/react-ui";
// import { IoCloudDownloadOutline } from "react-icons/io5";
// import { useTranslation } from "react-i18next";
// import exportFromJSON from "export-from-json";
// import NotFound from "components/table/NotFound";
// import TableLoading from "components/preloader/TableLoading";
// import { notifyError } from "utils/toast";
// import { useListContext } from "context/ListContext";
// import PaperOrder from "components/order/PaperOrder";
// import PageTitle from "components/Typography/PageTitle";
// import PLTable from "components/order/PLTable";
// import BarChart from "components/chart/BarChart/BarChart";
// import LineChart from "components/chart/LineChart/LineChart";
// import DonutChart from "components/chart/DonutChart/DonutChart";
// import GroupBarChart from "components/chart/GroupBarChart/GroupBarChart";
// import { AdminContext } from "context/AdminContext";

// const PnLReport = () => {
//   const [orders, setOrders] = useState([]);
//   const [selectedStrategy, setSelectedStrategy] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalResults, setTotalResults] = useState([]);
//   const { masterorderList } = useListContext();
//   const resultsPerPage = 10; // Number of results per page
//   const { t } = useTranslation();
//   const [loading, setLoading] = useState(true);
//   const [orderDetails, setOrderDetails] = useState([]);
//   const [strategyDetails, setStrategyDetails] = useState([]);
//   const [ltpMap, setLtpMap] = useState(new Map());
//   const [strategyorders, setStrategyOrders] = useState([]);
//   const [pnl, setPnl] = useState(0);
//   const [netPnl, setNetPnl] = useState(0);
//   const transactionCosts = 0.01; // Example transaction cost per unit
//   const { state } = useContext(AdminContext);
//   const { zenithQuark } = state;
//   const [securityId, setSecurityId] = useState("");
//   const [ltp, setLtp] = useState(0); // Assuming LTP is a number

//   const salesReport = [
//     { date: "2024-01-01", total: 1000, order: 20 },
//     { date: "2024-01-02", total: 1500, order: 30 },
//     { date: "2024-01-03", total: 1200, order: 25 },
//     { date: "2024-01-04", total: 1800, order: 35 },
//     { date: "2024-01-05", total: 2000, order: 40 },
//     { date: "2024-01-06", total: 2200, order: 45 },
//     { date: "2024-01-07", total: 2500, order: 50 },
//   ];

//   const salesReport2 = [
//     { date: "January", totalSales: 1500 },
//     { date: "February", totalSales: 1800 },
//     { date: "March", totalSales: 2000 },
//     { date: "April", totalSales: 2200 },
//     { date: "May", totalSales: 1900 },
//     { date: "June", totalSales: 2300 },
//     { date: "July", totalSales: 900 },
//   ];

//   const [chartData, setChartData] = useState(null);

//   // const transformDataForChart = (orders) => {
//   //   const labels = orders.map((order) => order.transactionType);
//   //   const dataset1 = orders.map((order) => order.quantity);
//   //   const dataset2 = orders.map((order) => order.price);
//   //   const dataset3 = orders.map((order) => order.filled_qty);

//   //   return {
//   //     labels,
//   //     datasets: [
//   //       {
//   //         label: "Quantity",
//   //         data: dataset1,
//   //         backgroundColor: "rgb(255, 99, 132)",
//   //         stack: "Stack 0",
//   //       },
//   //       {
//   //         label: "Price",
//   //         data: dataset2,
//   //         backgroundColor: "rgb(75, 192, 192)",
//   //         stack: "Stack 1",
//   //       },
//   //       {
//   //         label: "Filled Quantity",
//   //         data: dataset3,
//   //         backgroundColor: "rgb(53, 162, 235)",
//   //         stack: "Stack 2",
//   //       },
//   //     ],
//   //   };
//   // };

//   // useEffect(() => {
//   //   setChartData(transformDataForChart(strategyorders));
//   // }, [strategyorders]);

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         setLoading(true);

//         const response = await fetch(`http://localhost:5000/order/orders/${selectedStrategy}`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         const allOrders = [...data.orders, ...data.histories];
//         setOrderDetails(allOrders);
//         if (allOrders.length > 0) {
//           setStrategyOrders(allOrders);
//           setSecurityId(allOrders[0].security_id);
//         }

//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching order details:", error);
//         setLoading(false);
//       }
//     };

//     fetchOrderDetails();
//   }, [selectedStrategy]);

//   useEffect(() => {
//     const fetchLtp = async () => {
//       if (!securityId) return;

//       try {
//         const response = await fetch(`http://localhost:5000/python/getltp/${securityId}`);
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         setLtp(data.matchedRow.LTP);
//       } catch (error) {
//         console.error("Error fetching LTP:", error);
//       }
//     };

//     fetchLtp();
//   }, [securityId]);

//   useEffect(() => {
//     const filteredOrders = masterorderList.filter((order) => {
//       if (selectedStrategy && order.strategy !== selectedStrategy) {
//         return false;
//       }
//       if (selectedDate) {
//         const orderDate = new Date(order.createdAt).toDateString();
//         const filterDate = new Date(selectedDate).toDateString();
//         if (orderDate !== filterDate) {
//           return false;
//         }
//       }
//       return true;
//     });

//     const startIndex = (currentPage - 1) * resultsPerPage;
//     const endIndex = startIndex + resultsPerPage;
//     const paginatedOrders = filteredOrders.slice(startIndex, endIndex);
//     setOrders(paginatedOrders);

//     setTotalResults(filteredOrders.length);
//   }, [masterorderList, currentPage, resultsPerPage, selectedStrategy, selectedDate]);

//   useEffect(() => {
//     const fetchAllLtp = async () => {
//       const uniqueSecurityIds = [...new Set(orders.map((order) => order.security_id))];

//       try {
//         const ltpResponses = await Promise.all(
//           uniqueSecurityIds.map((securityId) =>
//             fetchLtp(securityId).then((ltp) => ({ securityId, ltp }))
//           )
//         );

//         const ltpMap = new Map();
//         ltpResponses.forEach(({ securityId, ltp }) => {
//           ltpMap.set(securityId, ltp);
//         });
//         setLtpMap(ltpMap);
//       } catch (error) {
//         console.error("Error fetching LTP:", error);
//       }
//     };

//     fetchAllLtp();

//     const intervalId = setInterval(fetchAllLtp, 2000);

//     return () => {
//       clearInterval(intervalId);
//     };
//   }, [orders]);

//   const fetchLtp = async (securityId) => {
//     if (!securityId) return;

//     try {
//       const response = await fetch(`http://localhost:5000/python/getltp/${securityId}`);
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       return parseFloat(data.matchedRow.LTP);
//     } catch (error) {
//       console.error("Error fetching LTP:", error);
//       return 0;
//     }
//   };

//   useEffect(() => {
//     const fetchStrategyDetails = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/strategy/getpnlstartegies", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${zenithQuark}`,
//           },
//         });

//         const data = await response.json();

//         if (data.is_success) {
//           setStrategyDetails(data.details);
//         } else {
//           console.error("Failed to fetch strategies");
//         }
//       } catch (error) {
//         console.error("Error fetching strategies:", error);
//       }
//     };

//     fetchStrategyDetails();
//   }, [zenithQuark]);

//   const handleExport = () => {
//     const exportData = orders.map((order) => ({
//       Date: order.createdAt,
//       Symbol: order.symbol,
//       Quantity: order.quantity,
//       FilledQty: order.filled_qty,
//       Price: order.price,
//     }));

//     exportFromJSON({
//       data: exportData,
//       fileName: "order_report",
//       exportType: exportFromJSON.types.xlsx,
//     });
//   };

//   return (
//     <div>
//       <PageTitle>PnL Report</PageTitle>
//       <Card>
//         <CardBody>
//           <Label htmlFor="strategy">Strategy</Label>
//           <Select
//             id="strategy"
//             value={selectedStrategy}
//             onChange={(e) => setSelectedStrategy(e.target.value)}
//           >
//             <option value="">Select Strategy</option>
//             {strategyDetails.map((strategy) => (
//               <option key={strategy.strategy_id} value={strategy.strategy_name}>
//                 {strategy.strategy_name}
//               </option>
//             ))}
//           </Select>

//           <Label htmlFor="date">Date</Label>
//           <Input
//             id="date"
//             type="date"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//           />

//           <Button onClick={handleExport} className="mt-4">
//             <IoCloudDownloadOutline className="mr-2" />
//             {t("Export")}
//           </Button>

//           {loading ? (
//             <TableLoading />
//           ) : (
//             <TableContainer className="mt-4">
//               <Table>
//                 <TableHeader>
//                   <tr>
//                     <TableCell>Date</TableCell>
//                     <TableCell>Symbol</TableCell>
//                     <TableCell>Quantity</TableCell>
//                     <TableCell>Filled Qty</TableCell>
//                     <TableCell>Price</TableCell>
//                   </tr>
//                 </TableHeader>
//                 <TableBody>
//                   {orders.length > 0 ? (
//                     orders.map((order) => (
//                       <tr key={order.order_id}>
//                         <TableCell>{new Date(order.createdAt).toDateString()}</TableCell>
//                         <TableCell>{order.symbol}</TableCell>
//                         <TableCell>{order.quantity}</TableCell>
//                         <TableCell>{order.filled_qty}</TableCell>
//                         <TableCell>{order.price}</TableCell>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <TableCell colSpan="5">
//                         <NotFound />
//                       </TableCell>
//                     </tr>
//                   )}
//                 </TableBody>
//                 <TableFooter>
//                   <Pagination
//                     totalResults={totalResults}
//                     resultsPerPage={resultsPerPage}
//                     onChangePage={(page) => setCurrentPage(page)}
//                   />
//                 </TableFooter>
//               </Table>
//             </TableContainer>
//           )}

//           {/* {chartData && (
//             <div className="mt-4">
//               <BarChart data={chartData} />
//               <LineChart data={chartData} />
//               <DonutChart data={chartData} />
//               <GroupBarChart data={chartData} />
//             </div>
//           )} */}
//         </CardBody>
//       </Card>
//     </div>
//   );
// };

// export default PnLReport;



import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Card,
  CardBody,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";
import { useListContext } from "context/ListContext";
import { AdminContext } from "context/AdminContext";
import TableLoading from "components/preloader/TableLoading";
import NotFound from "components/table/NotFound";
import exportFromJSON from "export-from-json";
import { BaseUrl } from "utils/Constants";

const PnLReport = () => {
  const [orders, setOrders] = useState([]);
  const [selectedStrategy, setSelectedStrategy] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [strategyDetails, setStrategyDetails] = useState([]);
  const { masterorderList } = useListContext();
  const { state } = useContext(AdminContext);
  const { zenithQuark } = state;

  const resultsPerPage = 10;

  // Fetch orders based on selected strategy
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!selectedStrategy) return;

      setLoading(true);
      try {
        const response = await fetch(
          `${BaseUrl}order/orders/${selectedStrategy}`
        );
        if (!response.ok) throw new Error(`Failed to fetch orders`);

        const data = await response.json();
        setOrders(data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [selectedStrategy]);

  // Fetch strategies for selection
  useEffect(() => {
    const fetchStrategyDetails = async () => {
      try {
        const response = await fetch(`${BaseUrl}strategy/getpnlstartegies`, {
          headers: {
            Authorization: `Bearer ${zenithQuark}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch strategies");

        const data = await response.json();
        setStrategyDetails(data.details || []);
      } catch (error) {
        console.error("Error fetching strategies:", error);
      }
    };

    fetchStrategyDetails();
  }, [zenithQuark]);

  // Filter and paginate orders
  useEffect(() => {
    const filteredOrders = masterorderList.filter((order) => {
      if (selectedStrategy && order.strategy !== selectedStrategy) return false;
      if (selectedDate) {
        const orderDate = new Date(order.createdAt).toDateString();
        const filterDate = new Date(selectedDate).toDateString();
        return orderDate === filterDate;
      }
      return true;
    });

    const startIndex = (currentPage - 1) * resultsPerPage;
    const paginatedOrders = filteredOrders.slice(startIndex, startIndex + resultsPerPage);
    setOrders(paginatedOrders);
    setTotalResults(filteredOrders.length);
  }, [masterorderList, currentPage, selectedStrategy, selectedDate]);

  // Export data as CSV
  const handleExport = () => {
    const exportData = orders.map((order) => ({
      Date: order.createdAt,
      Symbol: order.symbol,
      Quantity: order.quantity,
      FilledQty: order.filled_qty,
      Price: order.execution_price,
    }));
    exportFromJSON({ data: exportData, fileName: "PnL_Report", exportType: "csv" });
  };

  return (
    <div>
      <Card>
        <CardBody>
          <div className="flex justify-between items-center mb-4">
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-1/3"
            />
            <Input
              type="select"
              value={selectedStrategy}
              onChange={(e) => setSelectedStrategy(e.target.value)}
              className="w-1/3"
            >
              <option value="">{`Select Strategy`}</option>
              {strategyDetails.map((strategy) => (
                <option key={strategy.id} value={strategy.id}>
                  {strategy.name}
                </option>
              ))}
            </Input>
            <Button onClick={handleExport}>Export</Button>
          </div>

          {loading ? (
            <TableLoading />
          ) : orders.length > 0 ? (
            <TableContainer>
              <Table>
                <TableHeader>
                  <tr>
                    <TableCell>Date</TableCell>
                    <TableCell>Symbol</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Filled Qty</TableCell>
                    <TableCell>Price</TableCell>
                  </tr>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>{order.symbol}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>{order.filled_qty}</TableCell>
                      <TableCell>{order.execution_price}</TableCell>
                    </tr>
                  ))}
                </TableBody>
              </Table>
              <TableFooter>
                <Pagination
                  totalResults={totalResults}
                  resultsPerPage={resultsPerPage}
                  onChange={(p) => setCurrentPage(p)}
                />
              </TableFooter>
            </TableContainer>
          ) : (
            <NotFound />
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default PnLReport;
