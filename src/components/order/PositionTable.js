import React from 'react';
import { TableCell, TableRow ,Button} from "@windmill/react-ui";
  const handleSquareOffClick = async (order) => {
    console.log(`Square Off button clicked! ${order}`);

    const requestJson = {
      dhanClientId: "1000000003",
      transactionType: order.transactionType === "BUY" ? "SELL" : "BUY",
      exchangeSegment: "NSE_EQ",
      productType: "INTRADAY",
      orderType: "MARKET",
      validity: "DAY",
      tradingSymbol: order.tradingSymbol,
      securityId: "11536",
      quantity: order.quantity.toString(),
      disclosedQuantity: "",
      price: "",
      triggerPrice: "",
      afterMarketOrder: false,
      amoTime: "",
      boProfitValue: "",
      boStopLossValue: "",
      drvExpiryDate: "string",
      drvOptionType: "CALL",
      drvStrikePrice: -3.402823669209385e38,
    };

    try {
      const response = await fetch("https://api.dhan.co/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access-token": "JWT", // Replace with your actual access token
        },
        body: JSON.stringify(requestJson),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Order placed successfully:", data);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
const PositionTable = ({ positionData }) => {
  // console.log("in PositionTable positionData:",positionData);
  return (
    <>
      {positionData.map((order, index) => (
        <TableRow key={index}>
       
          <TableCell className="text-center">{order.symbol}</TableCell>
          <TableCell className="text-center">{order.quantity}</TableCell>
          <TableCell className="text-center">{order.ltp}</TableCell>
          <TableCell className="text-center">{order.averagePrice}</TableCell>
          <TableCell className="text-center">{order.pnl}</TableCell>
          <TableCell className="text-center">{order.pnlPercentage}%</TableCell>

         <TableCell className="text-xs text-center">
                  <Button onClick={() => handleSquareOffClick(order)}>
                    Square Off
                 </Button>
               </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default PositionTable;
