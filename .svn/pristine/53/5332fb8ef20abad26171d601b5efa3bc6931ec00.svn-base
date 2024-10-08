

// import React from "react";
// import { Card, CardBody } from "@windmill/react-ui";
// import PageTitle from "components/Typography/PageTitle";
// import LineChart from "components/chart/LineChart/LineChart";
// import { Link } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import Status from "components/table/Status";
// import PaperTrading from "pages/Strategy/PaperTrading";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom/cjs/react-router-dom";
// import {
//   Button,
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
// import OrderTable from "components/order/OrderTable";
// import NotFound from "components/table/NotFound";
// import TableLoading from "components/preloader/TableLoading";
// import BarChart from "components/chart/BarChart/BarChart";

// const BacktestDetailsDyn = ( ) => {
//   // const salesReport = [
//   //   { date: "2024-01-01", total: 1000, order: 20 },
//   //   { date: "2024-01-02", total: 1500, order: 30 },
//   //   { date: "2024-01-03", total: 1200, order: 25 },
//   //   { date: "2024-01-04", total: 1800, order: 35 },
//   //   { date: "2024-01-05", total: 2000, order: 40 },
//   //   { date: "2024-01-06", total: 2200, order: 45 },
//   //   { date: "2024-01-07", total: 2500, order: 50 },
//   //   // Add more data as needed
//   // ];

  

//   const salesReport2 = [
//     { date: 'January', totalSales: 1500 },
//     { date: 'February', totalSales: 1800 },
//     { date: 'March', totalSales: 2000 },
//     { date: 'April', totalSales: 2200 },
//     { date: 'May', totalSales: 1900 },
//     { date: 'June', totalSales: 2300 },
//     { date: 'July', totalSales: 900 },
//   ];

//   const location = useLocation();
//   const { strategyData } = location.state || {};
//   const {limitDays} = strategyData
//   console.log("strategyData in BacktestDetailsDyn:",strategyData);
//   console.log("data.symbolSelection.symbol",strategyData.symbolSelection[0].symbol);
//   const data = [strategyData];
//   console.log("data:", data);
//   // const { UniqueID } = useParams();
//   const UniqueID = data[0].StrategyID;
//   // console.log("UniqueID:",data[0].UniqueID);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [salesReport, setSalesReport] = useState([]);

//   const formatDate = (date) => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   const fetchSalesData = async () => {
//     console.log("IN fetchSalesData");

//     const today = new Date();

//     // Calculate the date 25 days ago
//     const limitdays = new Date(today);
//     limitdays.setDate(today.getDate() - limitDays);

//     // Format the dates as strings in 'YYYY-MM-DD' format
//     const fromDate = formatDate(limitdays);
//     const toDate = formatDate(today);
//     console.log("fromDate,toDate:",fromDate,toDate);
//     try {
//       const response = await fetch('http://localhost:3001/api/historicaldhan', {
//         method: 'POST',
//         headers: {
//           'access-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkaGFuIiwicGFydG5lcklkIjoiIiwiZXhwIjoxNzIxMjg0NDUzLCJ0b2tlbkNvbnN1bWVyVHlwZSI6IlNFTEYiLCJ3ZWJob29rVXJsIjoiIiwiZGhhbkNsaWVudElkIjoiMTEwMTM0Mzg3MSJ9.u6fKzbiql1wAPrfRJkbSU2IDgEblAvBD8TxvTHLdofz9e_QDP21D81pj9nL1A1tjlaUwG5nHKI9icIEDYZZ5eA',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           symbol: strategyData.symbolSelection[0].symbol,
//           exchangeSegment: 'NSE_EQ',
//           instrument: 'EQUITY',
//           expiryCode: 0,
//            fromDate: fromDate,
//         toDate: toDate,
//         }),
//       });
  
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
  
//       const data = await response.json();
//       console.log("Response in fetchSalesData: ", data);
//       return data;
//     } catch (error) {
//       console.error('Error fetching sales data:', error);
//       throw error; // Re-throw the error to handle it in the calling function
//     }
//   };
  
  
//   const calculateDailyPL = (salesReport) => {
//     return salesReport.map((day) => ({
//       ...day,
//       profitLoss: (day.close - day.open).toFixed(2), // Calculate profit/loss and format to 2 decimal places
//     }));
//   };
  
//   const calculatePercentageProfit = (salesReport) => {
//     const firstDay = salesReport[0].close;
//     return salesReport.map((day) => ({
//       ...day,
//       percentage: (((day.close - firstDay) / firstDay) * 100).toFixed(2), // Calculate percentage profit and format to 2 decimal places
//     }));
//   };


//  useEffect(() => {
//   const getData = async () => {
//     console.log("fetching historical data");
//     try {
//       const apiData = await fetchSalesData();
//       if (!Array.isArray(apiData)) {
//         throw new Error("API data is not an array");
//       }
//       const transformedData = transformData(apiData);
//       const dailyPLData = calculateDailyPL(transformedData);
//       const percentageData = calculatePercentageProfit(dailyPLData);
//       setSalesReport(percentageData);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       // Handle error state or display error message
//     }
//   };
//   getData();
// }, []);

  
  
//   const transformData = (apiData) => {
//     return apiData.start_Time.map((time, index) => {
//       // console.log("in transformData for debug:",apiData);
//       return {
       
//         date: new Date(time * 1000).toISOString().split('T')[0],
//         total: apiData.close[index] - apiData.open[index], // Example transformation, you can change based on requirements
//         order: apiData.volume[index], // Example transformation, you can change based on requirements
//       };
//     });
//   };

//   useEffect(() => {
//     const getData = async () => {
//       console.log("fetching historical data");
//       const apiData = await fetchSalesData();
//       const transformedData = transformData(apiData); // Transform API data to desired format
//       const dailyPLData = calculateDailyPL(transformedData); // Calculate daily profit/loss
//       const percentageData = calculatePercentageProfit(dailyPLData); // Calculate percentage profit
//       setSalesReport(percentageData); // Set state with transformed and calculated data
//       setLoading(false); // Update loading state
//     };
//     getData();
//   }, []);
  
//   // console.log("data:", data);

//   // Check if consolidatedData is an array
//   // if (!Array.isArray(consolidatedData)) {
//   //   // Handle the case where consolidatedData is not an array
//   //   return <p>Consolidated data is not an array</p>;
//   // }



//     // Fetch data from the API
  



//   return (
//     <div>
//       <PageTitle> Backtest Summary: </PageTitle>
//       <div className=" my-2">
//         <div className="grid grid-cols-1 gap-4 ">
//           {data.map((data, index) => (
//             <div
//               key={index}
//               className="border p-4 rounded-lg shadow-md  relative"
//             >
//               <ul>
//                 {data.strategyDesc.map((item, i) => (
//                   <div className="flex ">
//                     <li className="text-lg font-bold uppercase" key={i}>
//                       {item.strategyName}
//                     </li>
//                     <li className="px-4" key={`${i}-desc`}>
//                       {item.strategyDescription}
//                     </li>
//                   </div>
//                 ))}
//               </ul>

//               {/* Display symbol selection */}
//               <div className="flex ">
//                 <h2 className="text-lg font-semibold ">Symbol Selection:</h2>
//                 <ul>
//                   {data.symbolSelection.map((item, i) => (
//                     <li className="px-4" key={i}>
//                       Exchange: {item.exchange}, Category: {item.category},
//                       Symbol: {item.symbol}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Display action selection */}
//               <div className="flex ">
//                 <h2 className="text-lg font-semibold ">Action Selection:</h2>
//                 <ul className="px-4">
//                   {data.actionSelection.map((item, i) => (
//                     <li key={i}>
//                       Action: {item.Action}, Order Type: {item.ActionType}
                    
//                       {item.ActionType === "trailing_stop" && (
//                         <>, Trailing Stop Percent: {item.TrailingStopPercent}</>
//                       )}
//                       {item.ActionType === "Bracket" && (
//                         <>, Bracket Price At: {item.BracketPriceAt },
//                         Bracket Stop Loss: {item.BracketStopLoss},
//                         Bracket Target: {item.BracketTarget},
//                         </>
//                       )}
//                       {item.ActionType === "trigger" && (
//                         <>, Trigger Price At: {item.TriggerPriceAt },
//                         Trigger Price: {item.TriggerTriggerPrice},
//                         </>
//                       )}
//                       {item.ActionType === "limit" && (
//                         <>, Limit Price: {item.LimitPrice },
                      
//                         </>
//                       )}
//                       {item.ActionType === "cover" && (
//                         <>, Cover Price: {item.CoverPrice },
//                         Cover Stop Loss: {item.CoverStopLoss },
//                         Cover Trigger Prices: {item.CoverTriggerPrice }
                       
//                         </>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Display indicators */}
//               <div className="flex">
//                 <h2 className="text-lg text-red-900 font-semibold ">
//                   Indicators:
//                 </h2>
//                 <ul>
//                   {data.indicators.map((indicator, i) => (
//                     <li className="px-4" key={i}>
//                       {indicator.conditions.map((condition, j) => (
//                         <div className="flex" key={j}>
//                           <p className="px-2">
//                             Indicator: {condition.Indicator}
//                           </p>
//                           <p className="px-2">
//                             short_term_period: {condition.short_term_period}
//                           </p>
//                           <p className="px-2">
//                             long_term_period: {condition.long_term_period}
//                           </p>

//                           <p className="px-2">field: {condition.field}</p>
//                         </div>
//                       ))}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="absolute top-0 right-0 mt-2 mr-2 flex p-2">
//                 <Status status="completed" />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex flex-wrap ">
//       {/* {MainOrders.map((order, index) => (
//         <>
//         <Card className="flex-auto p-2 border border-gray-200 rounded-lg shadow-md mx-2 my-3 w-64 h-32">
//           <div className="w-full h-full flex flex-col justify-center items-center">
//             <h2 className="text-lg font-semibold mb-1">Trade</h2>
//             <p className="text-4xl font-bold text-blue-500">{orders.length}</p>
//           </div>
//         </Card>

//         <Card className="flex-auto p-2 border border-gray-200 rounded-lg shadow-md mx-2 my-3 w-64 h-32">
//           <div className="w-full h-full flex flex-col justify-center items-center">
//             <h2 className="text-lg font-semibold mb-1">PNL</h2>
//             <p className="text-4xl font-bold text-green-500">+205.30</p>
//           </div>
//         </Card>

//         <Card className="flex-auto p-2 border border-gray-200 rounded-lg shadow-md mx-2 my-3 w-64 h-32">
//           <div className="w-full h-full flex flex-col justify-center items-center">
//             <h2 className="text-lg font-semibold mb-1">INVESTMENT</h2>
//             <p className="text-4xl font-bold text-green-500">{MainOrders[0].price*MainOrders[0].quantity}</p>
        
//           </div>
//         </Card>

//         <Card className="flex-auto p-2 border border-gray-200 rounded-lg shadow-md mx-2 my-3 w-64 h-32">
//           <div className="w-full h-full flex flex-col justify-center items-center">
//             <h2 className="text-lg font-semibold mb-1">Status</h2>
//             <p className="text-4xl font-bold text-green-500">{MainOrders[0].orderStatus}</p>
//           </div>
//         </Card>

//         <Card className="flex-auto p-2 border border-gray-200 rounded-lg shadow-md mx-2 my-3 w-64 h-32">
//           <div className="w-full h-full flex flex-col justify-center items-center">
//             <h2 className="text-lg font-semibold mb-1">limit Order</h2>
//             <p className="text-4xl font-bold text-green-500">{StopLossOrders[0].price}</p>
//           </div>
//         </Card>

//         <Card className="flex-auto p-2 border border-gray-200 rounded-lg shadow-md mx-2 my-3 w-64 h-32">
//           <div className="w-full h-full flex flex-col justify-center items-center">
//             <h2 className="text-lg font-semibold mb-1">Profit Book</h2>
//             <p className="text-4xl font-bold text-green-500">{bookprofitOrders[0].price}</p>
//           </div>
//         </Card>

//         <Card className="flex-auto p-2 border border-gray-200 rounded-lg shadow-md mx-2 my-3 w-64 h-32">
//           <div className="w-full h-full flex flex-col justify-center items-center">
//             <h2 className="text-lg font-semibold mb-1">filled_qty</h2>
//             <p className="text-4xl font-bold text-green-500">{MainOrders[0].filled_qty}</p>
//           </div>
//         </Card>
//         <Card className="flex-auto p-2 border border-gray-200 rounded-lg shadow-md mx-2 my-3 w-64 h-32">
//           <div className="w-full h-full flex flex-col justify-center items-center">
//             <h2 className="text-lg font-semibold mb-1">Order Type</h2>
//             <p className="text-4xl font-bold text-green-500">{MainOrders[0].orderType}</p>
//           </div>
//         </Card>
//         </>
//       ))} */}
//       </div>

//       <Card className="p-4 border border-gray-200 rounded-lg shadow-md w-full mb-4">
//         <CardBody>
//           <div className="flex">
//             <div className="w-1/2">
//               <LineChart salesReport={salesReport} />
//             </div>
//             <div className="w-1/2 relative">
//               {/* <h2 className="font-normal">Strategy Period</h2>
//               <p className="font-semibold">Timing: Monday, February 14, 2024</p>
//               <div className="m-4 flex justify-center items-center">
             
//                <h1>StopLoss Orders:</h1> 
          
//                <p>{JSON.stringify(StopLossOrders, null, 2)}</p>
//                <h1>Book Profit Orders:</h1> 
            
//                <p>{JSON.stringify(bookprofitOrders, null, 2)}</p>
//               </div> */}
//               <BarChart salesReport={salesReport2}/>
//               <Link to="/orders">
//                 <button className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                   View all orders
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </CardBody>
//       </Card>

//       {salesReport.length > 0 ? (
//   <TableContainer>
//     <Table>
//       <TableHeader>
//         <tr>
//           <TableCell>Date</TableCell>
//           <TableCell>Profit/Loss</TableCell>
//           <TableCell>Percentage</TableCell>
//         </tr>
//       </TableHeader>
//       <tbody>
//   {salesReport.map((day, index) => (
//     <tr key={index}>
//       <TableCell className="text-center">{day.date}</TableCell>
//       <TableCell className="text-center">{day.profitLoss ? day.profitLoss.toFixed(2) : 'N/A'}</TableCell>
//       <TableCell className="text-center">{day.percentage ? `${day.percentage}%` : 'N/A'}</TableCell>
//     </tr>
//   ))}
// </tbody>
//     </Table>
//   </TableContainer>
// ) : (
//   <p>No data available</p>
// )}


//       {loading ? (
//         <TableLoading />
//       ) : orders.length === 0 ? (
//         <NotFound title="Order" />
//       ) : (
        

//         <TableContainer className="mb-8 dark:bg-gray-900">
//           <Table>
//             <TableHeader>
//               <tr>
//                 <TableCell className="text-center">Order ID</TableCell>
//                 <TableCell className="text-center">Date</TableCell>
//                 <TableCell className="text-center">Symbol</TableCell>
//                 <TableCell className="text-center">Type</TableCell>
//                 <TableCell className="text-center">Exchange</TableCell>
//                 <TableCell className="text-center">Quantity</TableCell>
//                 <TableCell className="text-center">Price</TableCell>
//                 <TableCell className="text-center">Order Type</TableCell>
//                 <TableCell className="text-center">Status</TableCell>
//                 <TableCell className="text-center">Actions</TableCell>
//               </tr>
//             </TableHeader>
      
//             <OrderTable orders={orders} />
        
//           </Table>
//         </TableContainer>
//       )}



//     </div>
//   );
// };

// export default BacktestDetailsDyn;


import React, { useEffect, useState } from "react";
import { Card, CardBody } from "@windmill/react-ui";
import PageTitle from "components/Typography/PageTitle";
import LineChart from "components/chart/LineChart/LineChart";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Status from "components/table/Status";
import PaperTrading from "pages/Strategy/PaperTrading";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import {
  Button,
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
import OrderTable from "components/order/OrderTable";
import NotFound from "components/table/NotFound";
import TableLoading from "components/preloader/TableLoading";
import BarChart from "components/chart/BarChart/BarChart";

const BacktestDetailsDyn = () => {
  const [salesReport, setSalesReport] = useState([]);
  const [salesReportgra, setSalesReportgra] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { strategyData } = location.state || {};
  const { limitDays } = strategyData;

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fetchSalesData = async () => {
    const today = new Date();
    const limitdays = new Date(today);
    limitdays.setDate(today.getDate() - limitDays);
    const fromDate = formatDate(limitdays);
    const toDate = formatDate(today);

    try {
      const response = await fetch("http://localhost:3001/api/historicaldhan", {
        method: "POST",
        headers: {
          "access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkaGFuIiwicGFydG5lcklkIjoiIiwiZXhwIjoxNzIxMjg0NDUzLCJ0b2tlbkNvbnN1bWVyVHlwZSI6IlNFTEYiLCJ3ZWJob29rVXJsIjoiIiwiZGhhbkNsaWVudElkIjoiMTEwMTM0Mzg3MSJ9.u6fKzbiql1wAPrfRJkbSU2IDgEblAvBD8TxvTHLdofz9e_QDP21D81pj9nL1A1tjlaUwG5nHKI9icIEDYZZ5eA",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symbol: strategyData.symbolSelection[0].symbol,
          exchangeSegment: "NSE_EQ",
          instrument: "EQUITY",
          expiryCode: 0,
          fromDate: fromDate,
          toDate: toDate,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response in fetchSalesData: ", data);

      if (!Array.isArray(data.start_Time)) {
        throw new Error("API data format error: start_Time is not an array");
      }

      return data;
    } catch (error) {
      console.error("Error fetching sales data:", error);
      throw error;
    }
  };
  const salesReport2 = [
    { date: 'January', totalSales: 1500 },
    { date: 'February', totalSales: 1800 },
    { date: 'March', totalSales: 2000 },
    { date: 'April', totalSales: 2200 },
    { date: 'May', totalSales: 1900 },
    { date: 'June', totalSales: 2300 },
    { date: 'July', totalSales: 900 },
  ];
  const transformData = (apiData) => {
    return apiData.start_Time.map((time, index) => ({
      date: new Date(time * 1000).toISOString().split("T")[0],
      open: apiData.open[index],
      high: apiData.high[index],
      low: apiData.low[index],
      close: apiData.close[index],
      volume: apiData.volume[index],
    }));
  };

  const calculateDailyPL = (salesReport) => {
    return salesReport.map((day) => ({
      ...day,
      profitLoss: (day.close - day.open).toFixed(2),
    }));
  };

  const calculatePercentageProfit = (salesReport) => {
    const firstDay = salesReport[0].close;
    return salesReport.map((day) => ({
      ...day,
      percentage: (((day.close - firstDay) / firstDay) * 100).toFixed(2),
    }));
  };

  const formatyearDate = (timestamp) => {
    // Create a new Date object from the Unix timestamp (in seconds)
    const date = new Date(timestamp * 1000);
    // Extract the year
    const year = date.getUTCFullYear();
    // Extract the month and pad it to ensure it has two digits
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    // Extract the day and pad it to ensure it has two digits
    const day = String(date.getUTCDate()).padStart(2, '0');
    // Return the formatted date string
    return `${year}-${month}-${day}`;
  };
  

  const transformDatagraph = (apiData) => {
    return apiData.start_Time.map((time, index) => {
      // console.log("in transformData for debug:",apiData);
      return {
       
        // date: new Date(time * 1000).toISOString().split('T')[0],
        date: formatyearDate(time),
        total: apiData.close[index] - apiData.open[index], // Example transformation, you can change based on requirements
        order: apiData.volume[index], // Example transformation, you can change based on requirements
      };
    });
  };


  useEffect(() => {
    const getData = async () => {
      console.log("fetching historical data");
      try {
        const apiData = await fetchSalesData();
        const transformedData = transformData(apiData);
        const dailyPLData = calculateDailyPL(transformedData);
        const percentageData = calculatePercentageProfit(dailyPLData);
        setSalesReport(percentageData);
        setLoading(false);

        
        const transformedDatagr = transformDatagraph(apiData);
        setSalesReportgra(transformedDatagr);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state or display error message
      }
    };
    getData();
  }, [limitDays, strategyData.symbolSelection]);

  return (
    <div>
      <PageTitle> Backtest Summary: </PageTitle>
      <div className="my-2">
        <div className="grid grid-cols-1 gap-4 ">
          {strategyData && (
            <div
              key={strategyData.StrategyID}
              className="border p-4 rounded-lg shadow-md  relative"
            >
              <ul>
                {strategyData.strategyDesc.map((item, i) => (
                  <div className="flex" key={i}>
                    <li className="text-lg font-bold uppercase">
                      {item.strategyName}
                    </li>
                    <li className="px-4">{item.strategyDescription}</li>
                  </div>
                ))}
              </ul>

              <div className="flex">
                <h2 className="text-lg font-semibold">Symbol Selection:</h2>
                <ul>
                  {strategyData.symbolSelection.map((item, i) => (
                    <li className="px-4" key={i}>
                      Exchange: {item.exchange}, Category: {item.category},
                      Symbol: {item.symbol}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex">
                <h2 className="text-lg font-semibold">Action Selection:</h2>
                <ul className="px-4">
                  {strategyData.actionSelection.map((item, i) => (
                    <li key={i}>
                      Action: {item.Action}, Order Type: {item.ActionType}

                      {item.ActionType === "trailing_stop" && (
                        <>
                          , Trailing Stop Percent: {item.TrailingStopPercent}
                        </>
                      )}
                      {item.ActionType === "Bracket" && (
                        <>
                          , Bracket Price At: {item.BracketPriceAt },
                          Bracket Stop Loss: {item.BracketStopLoss},
                          Bracket Target: {item.BracketTarget}
                        </>
                      )}
                      {item.ActionType === "trigger" && (
                        <>
                          , Trigger Price At: {item.TriggerPriceAt },
                          Trigger Price: {item.TriggerTriggerPrice}
                        </>
                      )}
                      {item.ActionType === "limit" && (
                        <>
                          , Limit Price: {item.LimitPrice }
                        </>
                      )}
                      {item.ActionType === "cover" && (
                        <>
                          , Cover Price: {item.CoverPrice },
                          Cover Stop Loss: {item.CoverStopLoss },
                          Cover Trigger Prices: {item.CoverTriggerPrice }
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex">
                <h2 className="text-lg text-red-900 font-semibold">
                  Indicators:
                </h2>
                <ul>
                  {strategyData.indicators.map((indicator, i) => (
                    <li className="px-4" key={i}>
                      {indicator.conditions.map((condition, j) => (
                        <div className="flex" key={j}>
                          <p className="px-2">
                            Indicator: {condition.Indicator}
                          </p>
                          <p className="px-2">
                            {/* short_term_period: {condition.short_term_period} */}
                          </p>
                          <p className="px-2">
                            {/* long_term_period: {condition.long_term_period} */}
                          </p>

                          {/* <p className="px-2">field: {condition.field}</p> */}
                        </div>
                      ))}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="absolute top-0 right-0 mt-2 mr-2 flex p-2">
                <Status status="completed" />
              </div>
            </div>
          )}
        </div>
      </div>

      <Card className="p-4 border border-gray-200 rounded-lg shadow-md w-full mb-4">
        <CardBody>
          <div className="flex">
            <div className="w-1/2">
              <LineChart salesReport={salesReportgra} />
            </div>
            <div className="w-1/2 relative">
              <BarChart salesReport={salesReport2} />
              <Link to="/orders">
                <button className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  View all orders
                </button>
              </Link>
            </div>
          </div>
        </CardBody>
      </Card>

      {salesReport.length > 0 ? (
        <TableContainer>
          <Table>
            <TableHeader>
              <tr>
              <TableCell>Sr.No.</TableCell>
                <TableCell className="text-center">Date</TableCell>
                <TableCell className="text-center">Profit/Loss</TableCell>
                <TableCell className="text-center"> Percentage Profit</TableCell>
              </tr>
            </TableHeader>
            <tbody>
              {salesReport.map((report, index) => (
                <tr key={index}>
                <TableCell >{index}</TableCell>
                  <TableCell className="text-center">{report.date}</TableCell>
                  <TableCell className="text-center">{report.profitLoss}</TableCell>
                  <TableCell className="text-center">{report.percentage}</TableCell>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      ) : loading ? (
        <TableLoading colSpan={3} />
      ) : (
        <NotFound colSpan={3} />
      )}



    </div>
  );
};

export default BacktestDetailsDyn;


