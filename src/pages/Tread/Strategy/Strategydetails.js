

import React from "react";
import { Card, CardBody } from "@windmill/react-ui";
import PageTitle from "components/Typography/PageTitle";
import LineChart from "components/chart/LineChart/LineChart";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Status from "components/table/Status";
import PaperTrading from "pages/Strategy/PaperTrading";
import { useEffect, useState } from "react";
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

const Strategydetails = () => {
  // const salesReport = [
  //   { date: "2024-01-01", total: 1000, order: 20 },
  //   { date: "2024-01-02", total: 1500, order: 30 },
  //   { date: "2024-01-03", total: 1200, order: 25 },
  //   { date: "2024-01-04", total: 1800, order: 35 },
  //   { date: "2024-01-05", total: 2000, order: 40 },
  //   { date: "2024-01-06", total: 2200, order: 45 },
  //   { date: "2024-01-07", total: 2500, order: 50 },
  //   // Add more data as needed
  // ];

  const salesReport2 = [
    { date: 'January', totalSales: 1500 },
    { date: 'February', totalSales: 1800 },
    { date: 'March', totalSales: 2000 },
    { date: 'April', totalSales: 2200 },
    { date: 'May', totalSales: 1900 },
    { date: 'June', totalSales: 2300 },
    { date: 'July', totalSales: 900 },
  ];
  const location = useLocation();
  const { consolidatedData } = location.state;
  const data = [consolidatedData];
  console.log("data:", data);
  // const { UniqueID } = useParams();
  const UniqueID = data[0].StrategyID;
  // console.log("UniqueID:",data[0].UniqueID);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [salesReport, setSalesReport] = useState([
    { date: "2024-01-01", total: 1000, order: 20 },
    { date: "2024-01-02", total: 1500, order: 30 },
    { date: "2024-01-03", total: 1200, order: 25 },
    { date: "2024-01-04", total: 1800, order: 35 },
    { date: "2024-01-05", total: 2000, order: 40 },
    { date: "2024-01-06", total: 2200, order: 45 },
    { date: "2024-01-07", total: 2500, order: 50 },
  ]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fetchSalesData = async () => {
    console.log("IN fetchSalesData");

    const today = new Date();

    // Calculate the date 25 days ago
    const twentyFiveDaysAgo = new Date(today);
    twentyFiveDaysAgo.setDate(today.getDate() - 25);

    // Format the dates as strings in 'YYYY-MM-DD' format
    const fromDate = formatDate(twentyFiveDaysAgo);
    const toDate = formatDate(today);
    console.log("fromDate,toDate:",fromDate,toDate);
    try {
      const response = await fetch('http://localhost:3001/api/historicaldhan', {
        method: 'POST',
        headers: {
          'access-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkaGFuIiwicGFydG5lcklkIjoiIiwiZXhwIjoxNzE4NTEzMTk4LCJ0b2tlbkNvbnN1bWVyVHlwZSI6IlNFTEYiLCJ3ZWJob29rVXJsIjoiIiwiZGhhbkNsaWVudElkIjoiMTEwMTM0Mzg3MSJ9.uQqLPQyPbWIrPaC_5Yf8V7HblP96yFFwlBKSlS2lGSFcaEeD3cIT3wxbBlwliQbzKSxidvYwfvSvz6nV1kdamQ',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symbol: 'TCS',
          exchangeSegment: 'NSE_EQ',
          instrument: 'EQUITY',
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
      return data;
    } catch (error) {
      console.error('Error fetching sales data:', error);
      throw error; // Re-throw the error to handle it in the calling function
    }
  };
  
  
  
  const transformData = (apiData) => {
    return apiData.start_Time.map((time, index) => {
      // console.log("in transformData for debug:",apiData);
      return {
       
        date: new Date(time * 1000).toISOString().split('T')[0],
        total: apiData.close[index] - apiData.open[index], // Example transformation, you can change based on requirements
        order: apiData.volume[index], // Example transformation, you can change based on requirements
      };
    });
  };

  useEffect(() => {
    const getData = async () => {
      console.log("fetching hostorical data");
      const apiData = await fetchSalesData();
      const transformedData = transformData(apiData);
      setSalesReport(transformedData);
    };
    getData();
  }, []);
  // console.log("data:", data);

  // Check if consolidatedData is an array
  // if (!Array.isArray(consolidatedData)) {
  //   // Handle the case where consolidatedData is not an array
  //   return <p>Consolidated data is not an array</p>;
  // }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/orders/${UniqueID}`
        );
        const data = await response.json();
       
        setOrders(data);
        console.log("Orders:", data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchData();
  }, [UniqueID]);

    // Fetch data from the API
    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/ordersfile', {
            headers: {
              'Content-Type': 'application/json',
              'access-token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkaGFuIiwicGFydG5lcklkIjoiIiwiZXhwIjoxNzE4NTEzMTk4LCJ0b2tlbkNvbnN1bWVyVHlwZSI6IlNFTEYiLCJ3ZWJob29rVXJsIjoiIiwiZGhhbkNsaWVudElkIjoiMTEwMTM0Mzg3MSJ9.uQqLPQyPbWIrPaC_5Yf8V7HblP96yFFwlBKSlS2lGSFcaEeD3cIT3wxbBlwliQbzKSxidvYwfvSvz6nV1kdamQ'
            },
          });
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          console.log("data in orders",data);
        //   data= [
        //     {
        //         "dhanClientId": "1101343871",
        //         "orderId": "1724060636936",
        //         "exchangeOrderId": "0",
        //         "correlationId": "1101343871-1717658943427",
        //         "orderStatus": "REJECTED",
        //         "transactionType": "SELL",
        //         "exchangeSegment": "BSE_EQ",
        //         "productType": "INTRADAY",
        //         "orderType": "LIMIT",
        //         "validity": "DAY",
        //         "tradingSymbol": "MTPL",
        //         "securityId": "540254",
        //         "quantity": 1,
        //         "disclosedQuantity": 0,
        //         "price": 23.95,
        //         "triggerPrice": 0.0,
        //         "afterMarketOrder": false,
        //         "boProfitValue": 0.0,
        //         "boStopLossValue": 0.0,
        //         "legName": "NA",
        //         "createTime": "2024-06-06 12:59:03",
        //         "updateTime": "2024-06-06 12:59:03",
        //         "exchangeTime": "0000-00-00 00:00:00",
        //         "drvExpiryDate": "0001-01-01",
        //         "drvOptionType": "NA",
        //         "drvStrikePrice": 0.0,
        //         "omsErrorCode": "0",
        //         "omsErrorDescription": "EXCH: RATE NOT MULTIPLE OF TICK[0.01000000]",
        //         "filled_qty": 0,
        //         "algoId": "0"
        //     },
        //     {
        //         "dhanClientId": "1101343871",
        //         "orderId": "3724060638666",
        //         "exchangeOrderId": "0",
        //         "correlationId": "1101343871-1717658942892",
        //         "orderStatus": "REJECTED",
        //         "transactionType": "SELL",
        //         "exchangeSegment": "BSE_EQ",
        //         "productType": "INTRADAY",
        //         "orderType": "LIMIT",
        //         "validity": "DAY",
        //         "tradingSymbol": "MTPL",
        //         "securityId": "540254",
        //         "quantity": 1,
        //         "disclosedQuantity": 0,
        //         "price": 24.04,
        //         "triggerPrice": 0.0,
        //         "afterMarketOrder": false,
        //         "boProfitValue": 0.0,
        //         "boStopLossValue": 0.0,
        //         "legName": "NA",
        //         "createTime": "2024-06-06 12:59:02",
        //         "updateTime": "2024-06-06 12:59:02",
        //         "exchangeTime": "0000-00-00 00:00:00",
        //         "drvExpiryDate": "0001-01-01",
        //         "drvOptionType": "NA",
        //         "drvStrikePrice": 0.0,
        //         "omsErrorCode": "0",
        //         "omsErrorDescription": "EXCH: RATE NOT MULTIPLE OF TICK[0.01000000]",
        //         "filled_qty": 0,
        //         "algoId": "0"
        //     },
        //     {
        //         "dhanClientId": "1101343871",
        //         "orderId": "3724060638656",
        //         "exchangeOrderId": "1717644600001302012",
        //         "correlationId": "1101343871-1717658941827",
        //         "orderStatus": "PENDING",
        //         "transactionType": "BUY",
        //         "exchangeSegment": "BSE_EQ",
        //         "productType": "INTRADAY",
        //         "orderType": "LIMIT",
        //         "validity": "DAY",
        //         "tradingSymbol": "MTPL",
        //         "securityId": "540254",
        //         "quantity": 1,
        //         "disclosedQuantity": 0,
        //         "price": 24.02,
        //         "triggerPrice": 0.0,
        //         "afterMarketOrder": false,
        //         "boProfitValue": 0.0,
        //         "boStopLossValue": 0.0,
        //         "legName": "NA",
        //         "createTime": "2024-06-06 12:59:01",
        //         "updateTime": "2024-06-06 12:59:01",
        //         "exchangeTime": "0000-00-00 00:00:00",
        //         "drvExpiryDate": "0001-01-01",
        //         "drvOptionType": "NA",
        //         "drvStrikePrice": 0.0,
        //         "omsErrorCode": "0",
        //         "omsErrorDescription": "EXCH:Market Order Triggered",
        //         "filled_qty": 0,
        //         "algoId": "0"
        //     }
        // ]
        
        

          setOrders(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching trades:', error);
          setLoading(false);
        }
      };
      fetchOrders();
    }, []);

    // Filter orders where RiskOrder is main_order
  const MainOrders = orders.filter(order => order.RiskOrder === 'main_order');
  console.log("MainOrders:",MainOrders);
  const StopLossOrders = orders.filter(order => order.RiskOrder === 'stop_loss');
    console.log("StopLossOrders:",StopLossOrders);
  const bookprofitOrders = orders.filter(order => order.RiskOrder === 'bookprofit');
  console.log("bookprofitOrders:",bookprofitOrders);

  return (
    <div>
      <PageTitle> Strategy Summary: </PageTitle>
      <div className=" my-2">
        <div className="grid grid-cols-1 gap-4 ">
          {data.map((data, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg shadow-md  relative"
            >
              <ul>
                {data.strategyDesc.map((item, i) => (
                  <div className="flex ">
                    <li className="text-lg font-bold uppercase" key={i}>
                      {item.strategyName}
                    </li>
                    <li className="px-4" key={`${i}-desc`}>
                      {item.strategyDescription}
                    </li>
                  </div>
                ))}
              </ul>

              {/* Display symbol selection */}
              <div className="flex ">
                <h2 className="text-lg font-semibold ">Symbol Selection:</h2>
                <ul>
                  {data.symbolSelection.map((item, i) => (
                    <li className="px-4" key={i}>
                      Exchange: {item.exchange}, Category: {item.category},
                      Symbol: {item.symbol}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Display action selection */}
              <div className="flex ">
                <h2 className="text-lg font-semibold ">Action Selection:</h2>
                <ul className="px-4">
                  {data.actionSelection.map((item, i) => (
                    <li key={i}>
                      Action: {item.Action}, Order Type: {item.ActionType}
                    
                      {item.ActionType === "trailing_stop" && (
                        <>, Trailing Stop Percent: {item.TrailingStopPercent}</>
                      )}
                      {item.ActionType === "Bracket" && (
                        <>, Bracket Price At: {item.BracketPriceAt },
                        Bracket Stop Loss: {item.BracketStopLoss},
                        Bracket Target: {item.BracketTarget},
                        </>
                      )}
                      {item.ActionType === "trigger" && (
                        <>, Trigger Price At: {item.TriggerPriceAt },
                        Trigger Price: {item.TriggerTriggerPrice},
                        </>
                      )}
                      {item.ActionType === "limit" && (
                        <>, Limit Price: {item.LimitPrice },
                      
                        </>
                      )}
                      {item.ActionType === "cover" && (
                        <>, Cover Price: {item.CoverPrice },
                        Cover Stop Loss: {item.CoverStopLoss },
                        Cover Trigger Prices: {item.CoverTriggerPrice }
                       
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Display indicators */}
              <div className="flex">
                <h2 className="text-lg text-red-900 font-semibold ">
                  Indicators:
                </h2>
                <ul>
                  {data.indicators.map((indicator, i) => (
                    <li className="px-4" key={i}>
                      {indicator.conditions.map((condition, j) => (
                        <div className="flex" key={j}>
                          <p className="px-2">
                            Indicator: {condition.Indicator}
                          </p>
                          <p className="px-2">
                            short_term_period: {condition.short_term_period}
                          </p>
                          <p className="px-2">
                            long_term_period: {condition.long_term_period}
                          </p>

                          <p className="px-2">field: {condition.field}</p>
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
          ))}
        </div>
      </div>

      <div className="flex flex-wrap ">
      {MainOrders.map((order, index) => (
        <>
        <Card className="flex-auto p-2 border border-gray-200 rounded-lg shadow-md mx-2 my-3 w-64 h-32">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <h2 className="text-lg font-semibold mb-1">Trade</h2>
            <p className="text-4xl font-bold text-blue-500">{orders.length}</p>
          </div>
        </Card>

        <Card className="flex-auto p-2 border border-gray-200 rounded-lg shadow-md mx-2 my-3 w-64 h-32">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <h2 className="text-lg font-semibold mb-1">PNL</h2>
            <p className="text-4xl font-bold text-green-500">+205.30</p>
          </div>
        </Card>

        <Card className="flex-auto p-2 border border-gray-200 rounded-lg shadow-md mx-2 my-3 w-64 h-32">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <h2 className="text-lg font-semibold mb-1">INVESTMENT</h2>
            <p className="text-4xl font-bold text-green-500">{MainOrders[0].price*MainOrders[0].quantity}</p>
            {/* <p className="text-4xl font-bold text-green-500">{MainOrders.price*MainOrders.quantity}</p> */}
          </div>
        </Card>

        <Card className="flex-auto p-2 border border-gray-200 rounded-lg shadow-md mx-2 my-3 w-64 h-32">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <h2 className="text-lg font-semibold mb-1">Status</h2>
            <p className="text-4xl font-bold text-green-500">{MainOrders[0].orderStatus}</p>
          </div>
        </Card>

        <Card className="flex-auto p-2 border border-gray-200 rounded-lg shadow-md mx-2 my-3 w-64 h-32">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <h2 className="text-lg font-semibold mb-1">limit Order</h2>
            <p className="text-4xl font-bold text-green-500">{StopLossOrders[0].price}</p>
          </div>
        </Card>

        <Card className="flex-auto p-2 border border-gray-200 rounded-lg shadow-md mx-2 my-3 w-64 h-32">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <h2 className="text-lg font-semibold mb-1">Profit Book</h2>
            <p className="text-4xl font-bold text-green-500">{bookprofitOrders[0].price}</p>
          </div>
        </Card>

        <Card className="flex-auto p-2 border border-gray-200 rounded-lg shadow-md mx-2 my-3 w-64 h-32">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <h2 className="text-lg font-semibold mb-1">filled_qty</h2>
            <p className="text-4xl font-bold text-green-500">{MainOrders[0].filled_qty}</p>
          </div>
        </Card>
        <Card className="flex-auto p-2 border border-gray-200 rounded-lg shadow-md mx-2 my-3 w-64 h-32">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <h2 className="text-lg font-semibold mb-1">Order Type</h2>
            <p className="text-4xl font-bold text-green-500">{MainOrders[0].orderType}</p>
          </div>
        </Card>
        </>
      ))}
      </div>

      <Card className="p-4 border border-gray-200 rounded-lg shadow-md w-full mb-4">
        <CardBody>
          <div className="flex">
            <div className="w-1/2">
              <LineChart salesReport={salesReport} />
            </div>
            <div className="w-1/2 relative">
              {/* <h2 className="font-normal">Strategy Period</h2>
              <p className="font-semibold">Timing: Monday, February 14, 2024</p>
              <div className="m-4 flex justify-center items-center">
             
               <h1>StopLoss Orders:</h1> 
          
               <p>{JSON.stringify(StopLossOrders, null, 2)}</p>
               <h1>Book Profit Orders:</h1> 
            
               <p>{JSON.stringify(bookprofitOrders, null, 2)}</p>
              </div> */}
              <BarChart salesReport={salesReport2}/>
              <Link to="/orders">
                <button className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  View all orders
                </button>
              </Link>
            </div>
          </div>
        </CardBody>
      </Card>

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
                <TableCell className="text-center">Date</TableCell>
                <TableCell className="text-center">Symbol</TableCell>
                <TableCell className="text-center">Type</TableCell>
                <TableCell className="text-center">Exchange</TableCell>
                <TableCell className="text-center">Quantity</TableCell>
                <TableCell className="text-center">Price</TableCell>
                <TableCell className="text-center">Order Type</TableCell>
                <TableCell className="text-center">Status</TableCell>
                <TableCell className="text-center">Actions</TableCell>
              </tr>
            </TableHeader>
      
            <OrderTable orders={orders} />
        
          </Table>
        </TableContainer>
      )}



    </div>
  );
};

export default Strategydetails;
