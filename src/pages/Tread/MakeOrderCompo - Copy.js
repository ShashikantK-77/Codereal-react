
import React, { useContext, useState, useEffect } from "react";
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
  Pagination,
} from "@windmill/react-ui";
import { HiPlusSm, HiMinusSm } from 'react-icons/hi';
import { OrderContextProvider, useOrderContext } from '../../context/OrderContext';
import { notifyError, notifySuccess } from '../../utils/toast';
const MakeOrderCompo = () => {
    const [orderBuyData, setOrderBuyData] = useState(null);
   
    const [price, setPrice] = useState(null);
    // const [symbol, setSymbol] = useState(0);
    const [changepercent, setChangePercent] = useState(0);

      const [symbol, setSymbol] = useState('');
      const [quantity, setQuantity] = useState(0);
      const [side,setSide] = useState('');
      const [typeorder,setType] = useState('');
      const [time_in_force,setTime_in_force] = useState('');
    // {
    //   "symbol":"AQU",
    //   "qty": 1,
    //   "side": "buy",
    //   "type": "market",
    //   "time_in_force": "gtc"
    // }
    
    const { order } = useOrderContext() || {};
    // setSymbol(order.symbol);

    // console.log(order);

    // useEffect(() => {
    //   const getOrderBuyData = () => {
    //     const orderBuyDataStr = localStorage.getItem('orderBuy');
    //     const parsedOrderBuyData = JSON.parse(orderBuyDataStr);
    //     setOrderBuyData(parsedOrderBuyData);
    //     setSymbol(orderBuyData.symbol);
    //     // console.log("orderBuyData",orderBuyData);
    //   };
  
    //   getOrderBuyData();
    // }, [orderBuyData]);



    useEffect(() => {
        const fetchData = async () => {
       
      
          const fetchStockPrice = async () => {
            try {
              const apiKey = 'PKYP9KGLKLIKTFU54DC5';
      
              const response = await fetch(
                `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${order.symbol}&apikey=${apiKey}`
              );
      
              if (response.ok) {
                const data = await response.json();
                console.log(data);
                const stockData = data['Global Quote'];
                const latestPrice = parseFloat(stockData['05. price']);
                const changepercent = parseFloat(stockData['10. change percent']);
                setChangePercent(changepercent);
                // console.log("price is pr",price);
                setPrice(latestPrice);
                setSymbol(order.symbol);

              } else {
                console.error('Failed to fetch stock price');
              }
            } catch (error) {
              console.error('Error:', error);
            }
          };
      
         
          fetchStockPrice();
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
      // const { order } = useContext(useOrderContext) || {}; // Set a default value of an empty object if OrderContext is undefined

          // console.log("order in makeorder" ,order);
// Rest of your code that depends on the 'order' property

const Buyorder =()=>{
  setSide("buy");
  setTime_in_force('gtc')
  console.log("in buy order","symol:",symbol,"quantity:",quantity,"side:",side,"type:",typeorder,"time_in_force:",time_in_force);
  const body = {
    symbol: symbol,
    qty: quantity,
    side: side,
    type: typeorder,
    time_in_force: time_in_force,
  };
  handleBuyOrder(body)
}

const handleBuyOrder = async (body) => {
  // const url = 'https://cors-anywhere.herokuapp.com/https://paper-api.alpaca.markets/v2/orders'; // Add the CORS proxy URL before the Alpaca API URL
  // const url = 'https://paper-api.alpaca.markets/v2/orders';
  // const url = 'http://localhost:3001/api/v2/orders';
  const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
const alpacaApiUrl = 'https://paper-api.alpaca.markets/v2/orders';
const url = corsProxyUrl + alpacaApiUrl;
  const apiKey = 'PKYP9KGLKLIKTFU54DC5';
  const secretKey = 'KQNI9rUdhvhP5qRQxl2oMwHAYrlVkfJDrT4AxPcT';
  const headers = {
    'APCA-API-KEY-ID': apiKey,
    'APCA-API-SECRET-KEY': secretKey,
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });

    if (response.ok) {
      // Order placed successfully
      console.log('Buy order placed successfully');
    } else {
      // Error in placing the order
      console.log('Error placing the buy order');
    }
  } catch (error) {
    console.error('An error occurred while placing the buy order:', error);
  }
};

  return (
    <div className="w-12/12">
    {/* <OrderContextProvider> */}
       {order ? (   <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4 w-12/12">
          <CardBody>
            {/* <div className="flex justify-between"> */}

            <div>
              <h2 className="font-bold">{order.name}</h2>
              <h2 className="font-bold"><span className="font-normal">Symbol:</span> {order.symbol}</h2>
              <div className="flex">
                {/* <h4 className="font-semibold">2405.10</h4> */}
                <h4 className="font-semibold">{price}</h4>
                <h3 className="font-medium text-xs"></h3>
                <span className="text-green-400 ml-2">({changepercent}%)</span>
              </div>
              <hr className="my-4" />

              <div className="flex w-10/12">
                <div>
                  <div className="flex ">
                    {/* <div className="m-2">
                <Label>Quantity</Label>
                <Input
                
                  type="text"
                  name="search"
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                  placeholder="Quantity"
                />
              </div> */}
              
              <div className="m-2 ">
              <Label>Quantity</Label>
  <div className="flex items-center">

      <button
        onClick={handleDecrement}
        className="p-2 border border-gray-300 rounded-l-lg focus:outline-none"
      >
        <HiMinusSm className="text-gray-500" />
      </button>
      <Input
        type="text"
        name="search"
        className="border border-gray-300 h-12 px-3 py-1 text-sm focus:outline-none flex-grow bg-gray-100 focus:bg-white"
        placeholder="Quantity"
        value={quantity}
        readOnly
      />
      <button
        onClick={handleIncrement}
        className="p-2 border border-gray-300 rounded-r-lg focus:outline-none"
      >
        <HiPlusSm className="text-gray-500" />
      </button>
    </div></div>





                    <div className="m-2">
                      <Label>Price/Market Price</Label>
                      <Input
                        type="text"
                        name="search"
                        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                        placeholder="Price/Market Price"
                        value={price}
                      />
                    </div>
                    
                  </div>

                  <div className="flex">
                    <div className="m-2">
                      <Label>Limits</Label>
                      <Input
                        type="text"
                        name="search"
                        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                        placeholder="Stop Loss"
                      />
                    </div>
                    <div className="m-2">
                      <Label>Order Type</Label>
                      {/* <Input
                        type="text"
                        name="search"
                        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                        placeholder="Take Profit"
                      /> */}

                      <Select
                onChange={(e) => setType(e.target.value)}
                value={typeorder}
                // className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white w-12/12"
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
                    </div>
                  </div>

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
                  </div>
                </div>
                <div className=" flex flex-col justify-center align-middle m-4 ">
                  <Badge className="mx-auto px-4 m-2  cursor-pointer ">Intraday</Badge>

                  <Badge className="mx-auto px-4 m-2 cursor-pointer text-center" type="neutral">
                    Delivery
                  </Badge>

                  <Badge className="mx-auto px-4 m-2 cursor-pointer text-center" type="neutral">
                    gtc
                  </Badge>
                  
                </div>  
              </div>

              <div className="flex">
                <Label className="mt-4">Order Type</Label>

                <div className="flex p-2 ">
                {/* <Badge className={`m-2 p-1 cursor-pointer ${type === 'Market' ? '' : 'neutral'}`} onClick={() => setType('Market')}>Market</Badge>
      <Badge className={`m-2 p-1 cursor-pointer ${type === 'Regular Loss' ? '' : 'neutral'}`} onClick={() => setType('Regular Loss')}>Regular Loss</Badge>
      <Badge className={`m-2 p-1 cursor-pointer ${type === 'Stop Loss' ? '' : 'neutral'}`} onClick={() => setType('Stop Loss')}>Stop Loss</Badge>
      <Badge className={`m-2 p-1 cursor-pointer ${type === 'Cover' ? '' : 'neutral'}`} onClick={() => setType('Cover')}>Cover</Badge>
      */}

                  <Badge className="m-2 p-1 cursor-pointer" onClick={() => setType('Market')}>Market</Badge>
                  <Badge className="m-2 p-1 cursor-pointer" type="neutral" onClick={() => setType('Regular Loss')}>Regular Loss</Badge>
                  <Badge className="m-2 p-1 cursor-pointer" type="neutral" onClick={() => setType('Stop Loss')}>Stop Loss</Badge>
                  <Badge className="m-2 p-1 cursor-pointer" type="neutral" onClick={() => setType('Cover')}>Cover</Badge>

                </div>
              </div>

              <div className="flex justify-center">
                <Button className="px-8 m-2" onClick={()=>Buyorder()}>Buy</Button>
                <Button className="px-8 m-2  btn-red">Sell</Button>
              </div>
            </div>
            {/* </div> */}
          </CardBody>
        </Card>):(
          <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4 w-12/12">
          <CardBody>
            {/* <div className="flex justify-between"> */}

            <div>
              <h2 className="font-bold">ADANI ENTERPRISES LTD.</h2>
              <div className="flex">
                <h4 className="font-semibold">2405.10</h4>
                <h3 className="font-medium text-xs"></h3>
                <span className="text-green-400 ml-2">(+9.09)</span>
              </div>
              <hr className="my-4" />

              <div className="flex w-10/12">
                <div>
                  <div className="flex ">
                    {/* <div className="m-2">
                <Label>Quantity</Label>
                <Input
                
                  type="text"
                  name="search"
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                  placeholder="Quantity"
                />
              </div> */}
              
              <div className="m-2 ">
              <Label>Quantity</Label>
  <div className="flex items-center">

      <button
        onClick={handleDecrement}
        className="p-2 border border-gray-300 rounded-l-lg focus:outline-none"
      >
        <HiMinusSm className="text-gray-500" />
      </button>
      <Input
        type="text"
        name="search"
        className="border border-gray-300 h-12 px-3 py-1 text-sm focus:outline-none flex-grow bg-gray-100 focus:bg-white"
        placeholder="Quantity"
        value={quantity}
        readOnly
      />
      <button
        onClick={handleIncrement}
        className="p-2 border border-gray-300 rounded-r-lg focus:outline-none"
      >
        <HiPlusSm className="text-gray-500" />
      </button>
    </div></div>





                    <div className="m-2">
                      <Label>Price/Market Price</Label>
                      <Input
                        type="text"
                        name="search"
                        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                        placeholder="Price/Market Price"
                      />
                    </div>
                    
                  </div>

                  <div className="flex">
                    <div className="m-2">
                      <Label>Limits</Label>
                      <Input
                        type="text"
                        name="search"
                        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                        placeholder="Stop Loss"
                      />
                    </div>
                    <div className="m-2">
                      <Label>Order Type</Label>
                      <Input
                        type="text"
                        name="search"
                        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                        placeholder="Take Profit"
                      />
                    </div>
                  </div>

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
                  </div>
                </div>
                <div className=" flex flex-col justify-center align-middle m-4 ">
                  <Badge className="mx-auto px-4 m-2  cursor-pointer ">Intraday</Badge>
                  <Badge className="mx-auto px-4 m-2 cursor-pointer text-center" type="neutral">
                    Delivery
                  </Badge>
                </div>  
              </div>

              <div className="flex">
                <Label className="mt-4">Order Type</Label>
                <div className="flex p-2 ">
                  <Badge className="m-2 p-1 cursor-pointer">Regular Loss</Badge>
                  <Badge className="m-2 p-1 cursor-pointer" type="neutral">
                    Stop Loss
                  </Badge>
                  <Badge className="m-2 p-1 cursor-pointer" type="neutral">
                    Cover
                  </Badge>
                </div>
              </div>

              <div className="flex justify-center">
                <Button className="px-8 m-2">Buy</Button>
                <Button className="px-8 m-2  btn-red">Sell</Button>
              </div>
            </div>
            {/* </div> */}
          </CardBody>
        </Card>
        )}
        {/* </OrderContextProvider> */}
    </div>
  )
}

export default MakeOrderCompo