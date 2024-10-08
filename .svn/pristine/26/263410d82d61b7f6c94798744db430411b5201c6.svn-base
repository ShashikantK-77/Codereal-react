import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Select,
  Input,
  Label,
  Badge,
  Button,
  Card,
  CardBody,
} from "@windmill/react-ui";
import { HiPlusSm, HiMinusSm } from "react-icons/hi";
import * as dayjs from "dayjs";
import { useHistory } from "react-router-dom";

import {
  OrderContextProvider,
  useOrderContext,
} from "../../../context/OrderContext";
import { notifyError, notifySuccess } from "../../../utils/toast";
import { useListContext } from "context/ListContext";

const BuyOrder = ({ filteredMasterAccounts }) => {
  const [orderBuyData, setOrderBuyData] = useState(null);
  const [price, setPrice] = useState(null);
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [side, setSide] = useState("buy");
  const [type, setType] = useState("market");
  const [time_in_force, setTime_in_force] = useState("gtc");
  const { order } = useOrderContext() || {};
  const [activeButton, setActiveButton] = useState("intraday");
  const [OrderID, setOrderID] = useState("");
  const history = useHistory();
  const { setMasterorderList } = useListContext();

  const [MasterApiKey, SetMasterApiKey] = useState("");
  const [MasterSectertKey, SetMasterSectertKey] = useState("");
  const [MasterUniqueId, SetMasterUniqueId] = useState("");

  const [copyOrderResults, setCopyOrderResults] = useState({ success: 0, failure: 0 });

  // const [successfulCount, setSuccessfulCount] = useState(0);
  // const [unsuccessfulCount, setUnsuccessfulCount] = useState(0);

  let successfulCount = 0;
  let unsuccessfulCount = 0;

  useEffect(() => {
    const fetchData = async () => {
      const fetchStockPrice = async () => {
        try {
          const apiKey = "PKUQV61MJ54QWDVMSIPM";
          const response = await fetch(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${order.symbol}&apikey=${apiKey}`
          );

          if (response.ok) {
            const data = await response.json();
            if (data && data["Global Quote"]) {
              const stockData = data["Global Quote"];
              if (stockData["05. price"]) {
                const latestPrice = parseFloat(stockData["05. price"]);
                setPrice(latestPrice);
                setSymbol(order.symbol);
              } else {
                console.error(
                  "Failed to fetch stock price: '05. price' not found."
                );
              }
            } else {
              console.error(
                "Failed to fetch stock price: 'Global Quote' not found in response data."
              );
            }
          } else {
            console.error("Failed to fetch stock price");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

      if (order && order.symbol) {
        fetchStockPrice();
      }
    };

    fetchData();
    SetMasterApiKey(filteredMasterAccounts[0]?.apiKey);
    SetMasterSectertKey(filteredMasterAccounts[0]?.secretKey);
    SetMasterUniqueId(filteredMasterAccounts[0]?.UniqueKey);
  }, [order]);


  const handlesuccesscopyorder = () => {
    successfulCount++;
  };

  const handlerejectedcopyorder = () => {
    unsuccessfulCount++;
  };


  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleButtonClick = (type) => {
    setActiveButton(type);
  };

  const successorders = 0;
  const failureorders = 0;



  const handleBuyOrder = async () => {
    setSide("buy");
    setTime_in_force("gtc");
    setSymbol(order.symbol);

    if (
      filteredMasterAccounts.length === 0 || // Check if the array is empty
      (filteredMasterAccounts[0]?.apiKey === "" &&
        filteredMasterAccounts[0]?.secretKey === "") // Check if apiKey and secretKey are empty
    ) {
      notifyError("Please select a Master Account");
      return;
    }
    const body = {
      symbol: symbol,
      qty: quantity,
      side: side,
      type: type,
      time_in_force: time_in_force,
      // apiKey: "PKYP9KGLKLIKTFU54DC5",
      // secretKey: "KQNI9rUdhvhP5qRQxl2oMwHAYrlVkfJDrT4AxPcT",
      apiKey: filteredMasterAccounts[0]?.apiKey,
      secretKey: filteredMasterAccounts[0]?.secretKey,
      UniqueKey:filteredMasterAccounts[0]?.UniqueKey,
    };

    // await BuyFunction(body);

    const asset_id = await BuyFunction(body);



    // Get the list of clients and their data from localStorage
    const clientDataString = localStorage.getItem("clientlist");
    const clientData = clientDataString ? JSON.parse(clientDataString) : [];

    // console.log("MasterUniqueId",MasterUniqueId);
    const filteredAccounts = clientData.filter(
      (account) => account.UniqueKey === filteredMasterAccounts[0]?.UniqueKey
    );

    console.log("Copy Trades-------------->", filteredAccounts);

    // Execute the "Copy Orders" for each client in the clientData array
    for (const client of filteredAccounts) {
      const { apiKey, secretKey, name, clientId } = client;

      const copyBody = {
        OrderId: asset_id,
        symbol: symbol,
        qty: quantity,
        side: side,
        type: type,
        time_in_force: time_in_force,
        apiKey: apiKey,
        secretKey: secretKey,
        clientId: clientId,
        Name: name,
      };
      // console.log("copyBody", copyBody);

      try {
        if (asset_id) {
          const copyResponse = await CopyBuyFunction(copyBody);
          if (copyResponse?.status === "success") {
            handlesuccesscopyorder();
          } else {
            // If the copy order fails, increment the failure count in copyOrderResults
            handlerejectedcopyorder();
          }
        } else {
          notifyError("Error in Master Order");
       
        }
      } catch (error) {
        console.error("An error occurred while placing the order:", error);
        notifyError("Error in Master Order");
       
      }
    }
  
// ... (log the final counts after all orders are done)
console.log("Successful Copy Orders:", successfulCount);
console.log("Rejected Copy Orders:", unsuccessfulCount);
  
  
  
  
  
  
  };

  const BuyFunction = async (body) => {
    console.log("in buy function");
    try {
      const url = "http://localhost:7000/api/place-order"; // Proxy server URL

      const headers = {
        "APCA-API-KEY-ID": body.apiKey,
        "APCA-API-SECRET-KEY": body.secretKey,
        "Content-Type": "application/json",
      };

      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
      const responseData = await response.json();
console.log("responseData",responseData);
      
      if (responseData.id) {
        const asset_id = responseData.id;

        if (responseData.id) {
          const existingDataString = localStorage.getItem("masterorder");
          let existingData = existingDataString
            ? JSON.parse(existingDataString)
            : [];
  
          const newOrderData = {
            orderno: responseData.id,
            symbol: responseData.symbol,
            ordertype: responseData.side,
            price: "120",
            orderdate: responseData.created_at,
            quantity: responseData.qty,
            status: responseData.status,
            UniqueKey: body.UniqueKey,
          };
  
          const updatedData = [...existingData, newOrderData];
          localStorage.setItem("masterorder", JSON.stringify(updatedData));
          setMasterorderList(updatedData);


        }



        if (asset_id) notifySuccess("Placed Master Order Successfully");

        // history.push('/OrdersList');
        // In the component where you want to navigate from
        // history.push(
        //   "/orders?masterUniqueId=" + filteredMasterAccounts[0]?.UniqueKey
        // );

        history.push("/orders");

        return asset_id;
        //here i want to make give path to /OrdersList and other remains same
      } else {
        notifyError("Error placing the order");
        console.log("Error placing the order");
        return null;
      }
    } catch (error) {
      notifyError("Error placing the order", error);
      console.error("An error occurred while placing the order:", error);
      return null;
    }
  };

  const CopyBuyFunction = async (body) => {
    console.log("in buy function");
    try {
      const url = "http://localhost:7000/api/place-order"; // Proxy server URL

      const headers = {
        "APCA-API-KEY-ID": body.apiKey,
        "APCA-API-SECRET-KEY": body.secretKey,
        "Content-Type": "application/json",
      };

      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      const responseData = await response.json();
      if (responseData.id) {
        const existingDataString = localStorage.getItem("orderlog");
        let existingData = existingDataString
          ? JSON.parse(existingDataString)
          : [];

        const newOrderData = {
          clientId: body.clientId,
          clientName: body.Name,
          symbol: responseData.symbol,
          ordertype: responseData.side,
          price: "120",
          orderdate: responseData.created_at,
          quantity: responseData.qty,
          status: responseData.status,
          OrderId: body.OrderId,
        };

        const updatedData = [...existingData, newOrderData];
        localStorage.setItem("orderlog", JSON.stringify(updatedData));
          // Return a custom response object indicating success
      return {
        success: true,
        data: responseData, // If you need to access the response data in the calling function
      };
        // notifySuccess("Placed Copy Order Successfully");
        // setCopyOrderResults((prevResults) => ({ ...prevResults, success: prevResults.success + 1 }));
        // handlesuccesscopyorder();
       

      } else {
        // notifyError("Error placing the order");
        return {
          success: false,
          error: "Error placing the order",
        };
    
      }
    } catch (error) {
      // console.error("An error occurred while placing the order:", error);
    

    }
  };

  return (
    <div className="w-12/12">
      {order ? (
        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4 w-12/12">
          <CardBody>
            <div>
              <h2 className="font-bold">{order.name}</h2>
              <h2 className="font-bold">
                <span className="font-normal">Symbol:</span> {order.symbol}
              </h2>
              <div className="flex">
                <h4 className="font-semibold">
                  <span className="font-normal">Price:</span>
                  {price}
                </h4>
                <h3 className="font-medium text-xs"></h3>
              </div>
              <hr className="my-4" />

              <div className="flex w-10/12">
                <div>
                  <div className="flex ">
                    <div className="m-2 w-4/12">
                      <Label className="text-center">Quantity</Label>
                      <div className="flex items-center ">
                        <button
                          onClick={handleDecrement}
                          className="p-2 border bg-gray-50 border-gray-300 rounded-l-lg focus:outline-none"
                        >
                          <HiMinusSm className="text-gray-500" />
                        </button>
                        <Input
                          type="text"
                          name="search"
                          className="border border-gray-300 h-12 px-3 py-1 text-sm focus:outline-none flex-grow bg-white-100 focus:bg-white text-center"
                          placeholder="Quantity"
                          value={quantity}
                          readOnly
                        />
                        <button
                          onClick={handleIncrement}
                          className="p-2 border bg-gray-50 border-gray-300 rounded-r-lg focus:outline-none"
                        >
                          <HiPlusSm className="text-gray-500" />
                        </button>
                      </div>
                    </div>

                    <div className="m-2 w-4/12">
                      <Label>Price/Market Price</Label>
                      <Input
                        type="text"
                        name="search"
                        disabled
                        className="border h-12 text-sm focus:outline-none block w-full bg-white-100 border-transparent focus:bg-white w-1/2"
                        placeholder="Price/Market Price"
                        // value={price}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="flex">
               
                  </div>
               
                </div>
                <div className="flex flex-col justify-center aign-middle m-4 w-12/12">
                  <button
                    className={`px-3 py-1 m-2 rounded-md w-12/12 ${
                      activeButton === "intraday"
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 border border-transparent"
                    } hover:bg-green-500 hover:text-white`}
                    // style={{ width: '100px' }} // Set the specific width you want
                    onClick={() => handleButtonClick("intraday")}
                  >
                    Intraday
                  </button>

                  <button
                    className={`px-3 py-1 m-2 rounded-md w-12/12 ${
                      activeButton === "delivery"
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 border border-transparent"
                    } hover:bg-green-500 hover:text-white`}
                    // style={{ width: '100px' }} // Set the specific width you want
                    onClick={() => handleButtonClick("delivery")}
                  >
                    Delivery
                  </button>
                </div>
              </div>

             
              <div className="flex">
                <Label className="mt-4">Order Type</Label>
                <div className="flex p-2">
                  <button
                    className={`px-3 py-1 m-2 rounded-md cursor-pointer ${
                      type === "market"
                        ? "bg-orange-500 text-white"
                        : "bg-gray-200"
                    } hover:bg-orange-400 hover:text-white`}
                    onClick={() => setType("market")}
                  >
                    Market
                  </button>
                  <button
                    className={`px-3 py-1 m-2 rounded-md cursor-pointer ${
                      type === "Regular Loss"
                        ? "bg-orange-500 text-white"
                        : "bg-gray-200"
                    } hover:bg-orange-400 hover:text-white`}
                    onClick={() => setType("Regular Loss")}
                  >
                    Limit
                  </button>
                  <button
                    className={`px-3 py-1 m-2 rounded-md cursor-pointer ${
                      type === "Stop Loss"
                        ? "bg-orange-500 text-white"
                        : "bg-gray-200"
                    } hover:bg-orange-400 hover:text-white`}
                    onClick={() => setType("Stop Loss")}
                  >
                    Stop Loss
                  </button>
                  <button
                    className={`px-3 py-1 m-2 rounded-md cursor-pointer ${
                      type === "Cover"
                        ? "bg-orange-500 text-white"
                        : "bg-gray-200"
                    } hover:bg-orange-400 hover:text-white`}
                    onClick={() => setType("Cover")}
                  >
                    SL Market
                  </button>
                </div>
              </div>

              <div className="flex justify-center">
        

                <Button
                  className="px-8 m-2"
                  onClick={() => {
                    setSide("buy");
                    handleBuyOrder();
                  }}
                >
                  Buy
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      ) : (
        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4 w-12/12">
          <CardBody>
            <div>
              <h2 className="font-bold text-green-400">
                Please Select Any Available Scrip For Buy Order
              </h2>
              <h2 className="font-bold">
                <span className="font-semibold">
                  <span className="font-normal">Symbol:</span>Symbol
                </span>
              </h2>
              <div className="flex">
                <h4 className="font-semibold">
                  <span className="font-normal">Price:</span>price
                </h4>
                <h3 className="font-medium text-xs"></h3>
              </div>
              <hr className="my-4" />

              <div className="flex w-12/12">
                <div>
                  <div className="flex ">
                    <div className="m-2 w-4/12">
                      <Label className="text-center">Quantity</Label>
                      <div className="flex items-center">
                        <button
                          onClick={handleDecrement}
                          className="p-2 border bg-gray-50 border-gray-300 rounded-l-lg focus:outline-none"
                        >
                          <HiMinusSm className="text-gray-500" />
                        </button>
                        <Input
                          type="text"
                          name="search"
                          className="border border-gray-300 h-12 px-3 py-1 text-sm focus:outline-none flex-grow bg-white-100 focus:bg-white w-1/2 text-center"
                          placeholder="Quantity"
                          value={quantity}
                          readOnly
                        />
                        <button
                          onClick={handleIncrement}
                          className="p-2 border border-gray-300 rounded-r-lg focus:outline-none bg-gray-50"
                        >
                          <HiPlusSm className="text-gray-500" />
                        </button>
                      </div>
                    </div>

                    <div className="m-2 w-4/12">
                      <Label className="text-center">Price/Market Price</Label>
                  

                      <Input
                        disabled
                        type="text"
                        name="search"
                        className="border h-12 text-sm focus:outline-none block bg-white-100 border-transparent focus:bg-white w-1/2 text-center"
                        placeholder="Price/Market Price"
                        // value={price}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="flex">
                   
                  </div>
                 
                </div>

                <div className="flex flex-col justify-center aign-middle m-4 w-12/12">
                  <button
                    className={`px-3 py-1 m-2 rounded-md w-12/12 ${
                      activeButton === "intraday"
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 border border-transparent"
                    } hover:bg-green-500 hover:text-white`}
                    // style={{ width: '100px' }} // Set the specific width you want
                    onClick={() => handleButtonClick("intraday")}
                  >
                    Intraday
                  </button>

                  <button
                    className={`px-3 py-1 m-2 rounded-md w-12/12 ${
                      activeButton === "delivery"
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 border border-transparent"
                    } hover:bg-green-500 hover:text-white`}
                    // style={{ width: '100px' }} // Set the specific width you want
                    onClick={() => handleButtonClick("delivery")}
                  >
                    Delivery
                  </button>
                </div>
              </div>

              <div className="flex">
                <Label className="mt-4">Order Type</Label>
                <div className="flex p-2">
                  <button
                    className={`px-3 py-1 m-2 rounded-md cursor-pointer ${
                      type === "market"
                        ? "bg-orange-500 text-white"
                        : "bg-gray-200"
                    } hover:bg-orange-400 hover:text-white`}
                    onClick={() => setType("market")}
                  >
                    Market
                  </button>
                  <button
                    className={`px-3 py-1 m-2 rounded-md cursor-pointer ${
                      type === "Regular Loss"
                        ? "bg-orange-500 text-white"
                        : "bg-gray-200"
                    } hover:bg-orange-400 hover:text-white`}
                    onClick={() => setType("Regular Loss")}
                  >
                    Limit
                  </button>
                  <button
                    className={`px-3 py-1 m-2 rounded-md cursor-pointer ${
                      type === "Stop Loss"
                        ? "bg-orange-500 text-white"
                        : "bg-gray-200"
                    } hover:bg-orange-400 hover:text-white`}
                    onClick={() => setType("Stop Loss")}
                  >
                    Stop Loss
                  </button>
                  <button
                    className={`px-3 py-1 m-2 rounded-md cursor-pointer ${
                      type === "Cover"
                        ? "bg-orange-500 text-white"
                        : "bg-gray-200"
                    } hover:bg-orange-400 hover:text-white`}
                    onClick={() => setType("Cover")}
                  >
                    SL Market
                  </button>
                </div>
              </div>

              <div className="flex justify-center">
               

                <Button
                  className="px-8 m-2"
                  onClick={() => {
                    setSide("buy");
                    handleBuyOrder();
                  }}
                >
                  Buy
                </Button>
               
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default BuyOrder;
