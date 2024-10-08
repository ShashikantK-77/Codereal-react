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

import {
  OrderContextProvider,
  useOrderContext,
} from "../../../context/OrderContext";
import { notifyError, notifySuccess } from "../../../utils/toast";

const SellOrder = () => {
  const [orderBuyData, setOrderBuyData] = useState(null);
  const [price, setPrice] = useState(null);
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [side, setSide] = useState("");
  const [type, setType] = useState("");
  const [time_in_force, setTime_in_force] = useState("");
  const { order } = useOrderContext() || {};
  const [activeButton, setActiveButton] = useState("intraday");

  useEffect(() => {
    const fetchData = async () => {
      const fetchStockPrice = async () => {
        try {
          const apiKey = "PKYP9KGLKLIKTFU54DC5";
          const response = await fetch(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${order.symbol}&apikey=${apiKey}`
          );

          if (response.ok) {
            const data = await response.json();
            const stockData = data["Global Quote"];
            const latestPrice = parseFloat(stockData["05. price"]);
            setPrice(latestPrice);
            setSymbol(order.symbol);
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
  }, [order]);

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

  const handleBuyOrder = async () => {
    setSide("sell");
    setTime_in_force("gtc");
    const body = {
      symbol: symbol,
      qty: quantity,
      side: side,
      type: type,
      time_in_force: time_in_force,
    };

    try {
      // const url = 'https://cors-anywhere.herokuapp.com/https://paper-api.alpaca.markets/v2/orders'; // Proxy server URL
      // const url = 'https://paper-api.alpaca.markets/v2/orders'; // Proxy server URL
      const url = "http://localhost:7000/api/place-order"; // Proxy server URL

      const apiKey = "PKYP9KGLKLIKTFU54DC5";
      const secretKey = "KQNI9rUdhvhP5qRQxl2oMwHAYrlVkfJDrT4AxPcT";
      const headers = {
        "APCA-API-KEY-ID": apiKey,
        "APCA-API-SECRET-KEY": secretKey,
        "Content-Type": "application/json",
      };

      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      if (response.ok) {
        notifySuccess("Buy order placed successfully");
        console.log("Buy order placed successfully");
      } else {
        notifyError("Error placing the buy order");
        console.log("Error placing the buy order");
      }
    } catch (error) {
      console.error("An error occurred while placing the buy order:", error);
    }
  };

  // const placeOrder = async (orderDetails) => {
  //   const apiUrl = 'http://localhost:7000/api/place-order'; // Proxy server URL
  //   const apiKey = 'PKYP9KGLKLIKTFU54DC5';
  //   const secretKey = 'KQNI9rUdhvhP5qRQxl2oMwHAYrlVkfJDrT4AxPcT';
  //   const headers = {
  //     'APCA-API-KEY-ID': apiKey,
  //     'APCA-API-SECRET-KEY': secretKey,
  //     'Content-Type': 'application/json',
  //   };

  //   try {
  //     const response = await fetch(apiUrl, {
  //       method: 'POST',
  //       headers: headers,
  //       body: JSON.stringify(orderDetails),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       return data;
  //     } else {
  //       throw new Error('Error placing the order');
  //     }
  //   } catch (error) {
  //     throw new Error(`An error occurred while placing the order: ${error.message}`);
  //   }
  // };

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
                <h4 className="font-semibold"><span className="font-normal">Price:</span>{price}</h4>
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
                          className="border border-gray-300 h-12 px-3 py-1 text-sm focus:outline-none flex-grow bg-white-100 focus:bg-white"
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
                        className="border h-12 text-sm focus:outline-none block w-full bg-white-100 border-transparent focus:bg-white w-1/2"
                        placeholder="Price/Market Price"
                        value={price}
                        readOnly
                      />
                    </div>
                  </div>

               
                  {/* 
                  <div className="flex">
                    <div className="m-2">
                      <Label>Stop Loss</Label>
                      <Input
                        type="text"
                        name="search"
                        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                        placeholder="Stop Loss"
                      />
                    </div>
                    <div className="m-2">
                      <Label>Take Profit</Label>
                      <Input
                        type="text"
                        name="search"
                        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                        placeholder="Take Profit"
                      />
                    </div>
                  </div> */}
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
        type === "market" ? "bg-orange-500 text-white" : "bg-gray-200"
      } hover:bg-orange-400 hover:text-white`}
      onClick={() => setType("market")}
    >
      Market
    </button>
    <button
      className={`px-3 py-1 m-2 rounded-md cursor-pointer ${
        type === "Regular Loss" ? "bg-orange-500 text-white" : "bg-gray-200"
      } hover:bg-orange-400 hover:text-white`}
      onClick={() => setType("Regular Loss")}
    >
      Limit
    </button>
    <button
      className={`px-3 py-1 m-2 rounded-md cursor-pointer ${
        type === "Stop Loss" ? "bg-orange-500 text-white" : "bg-gray-200"
      } hover:bg-orange-400 hover:text-white`}
      onClick={() => setType("Stop Loss")}
    >
      Stop Loss
    </button>
    <button
      className={`px-3 py-1 m-2 rounded-md cursor-pointer ${
        type === "Cover" ? "bg-orange-500 text-white" : "bg-gray-200"
      } hover:bg-orange-400 hover:text-white`}
      onClick={() => setType("Cover")}
    >
      SL Market
    </button>
  </div>
</div>

              <div className="flex justify-center">
                {/* <Button className="px-8 m-2" onClick={handleBuyOrder}>Buy</Button>      
                <Button className="px-8 m-2 btn-red">Sell</Button> */}

                <Button
                  className="px-8 m-2"
                  onClick={() => {
                    setSide("sell");
                    handleBuyOrder();
                  }}
                >
                  Sell
                </Button>
                {/* <Button className="px-8 m-2 btn-red" onClick={() => { setSide('sell'); handleBuyOrder(); }}>Sell</Button> */}
              </div>
            </div>
          </CardBody>
        </Card>
      ) : (
        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4 w-12/12">
          <CardBody>
            <div>
              <h2 className="font-bold text-red-600">
                Please Select Any Available Scrip For Sell Order
              </h2>
              <h2 className="font-bold">
                <span className="font-semibold"><span className="font-normal">Symbol:</span>Symbol</span>
              </h2>
              <div className="flex">
                <h4 className="font-semibold"><span className="font-normal">Price:</span>price</h4>
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
                          className="border border-gray-300 h-12 px-3 py-1 text-sm focus:outline-none flex-grow bg-white-100 focus:bg-white w-1/2"
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
                      {/* <Input
                        type="text"
                        name="search"
                        className="border h-12 text-sm focus:outline-none block bg-white-100 border-transparent focus:bg-white "
                        placeholder="Price/Market Price"
                        value={price}
                        readOnly
                      /> */}

                      <Input
  type="text"
  name="search"
  className="border h-12 text-sm focus:outline-none block bg-white-100 border-transparent focus:bg-white w-1/2 "
  placeholder="Price/Market Price"
  value={price}
  readOnly
/>
                    </div>
                  </div>

                  <div className="flex">
                    {/* <div className="m-2 ">
                      <Label>Limits</Label>
                      <Input
                        type="text"
                        name="search"
                        className="border h-12 text-sm focus:outline-none block w-full bg-white-100 border-transparent focus:bg-white w-6/12"
                        placeholder="Stop Loss"
                      />
                    </div> */}
                    {/* <div className="m-2">
                      <Label>Order Type</Label>
                      <Select
                        onChange={(e) => setType(e.target.value)}
                        value={typeorder}
                        className="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                      >
                        <option value="Market" defaultValue hidden>
                          Market
                        </option>
                        <option value="Market">Market</option>
                        <option value="Regular Loss">Regular Loss</option>
                        <option value="Stop Loss">Stop Loss</option>
                        <option value="Cover">Cover</option>
                      </Select>
                    </div> */}
                  </div>
                  {/* 
                  <div className="flex">
                    <div className="m-2">
                      <Label>Stop Loss</Label>
                      <Input
                        type="text"
                        name="search"
                        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                        placeholder="Stop Loss"
                      />
                    </div>
                    <div className="m-2">
                      <Label>Take Profit</Label>
                      <Input
                        type="text"
                        name="search"
                        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                        placeholder="Take Profit"
                      />
                    </div>
                  </div> */}
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
        type === "market" ? "bg-orange-500 text-white" : "bg-gray-200"
      } hover:bg-orange-400 hover:text-white`}
      onClick={() => setType("market")}
    >
      Market
    </button>
    <button
      className={`px-3 py-1 m-2 rounded-md cursor-pointer ${
        type === "Regular Loss" ? "bg-orange-500 text-white" : "bg-gray-200"
      } hover:bg-orange-400 hover:text-white`}
      onClick={() => setType("Regular Loss")}
    >
      Limit
    </button>
    <button
      className={`px-3 py-1 m-2 rounded-md cursor-pointer ${
        type === "Stop Loss" ? "bg-orange-500 text-white" : "bg-gray-200"
      } hover:bg-orange-400 hover:text-white`}
      onClick={() => setType("Stop Loss")}
    >
      Stop Loss
    </button>
    <button
      className={`px-3 py-1 m-2 rounded-md cursor-pointer ${
        type === "Cover" ? "bg-orange-500 text-white" : "bg-gray-200"
      } hover:bg-orange-400 hover:text-white`}
      onClick={() => setType("Cover")}
    >
      SL Market
    </button>
  </div>
</div>

              <div className="flex justify-center">
                {/* <Button className="px-8 m-2" onClick={handleBuyOrder}>Buy</Button>      
                <Button className="px-8 m-2 btn-red">Sell</Button> */}

                <Button
                  className="px-8 m-2 btn-red"
                  onClick={() => {
                    setSide("sell");
                    handleBuyOrder();
                  }}
                >
                  Sell
                </Button>
                {/* <Button className="px-8 m-2 btn-red" onClick={() => { setSide('sell'); handleBuyOrder(); }}>Sell</Button> */}
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default SellOrder;
