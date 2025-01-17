import React, { useState, useEffect } from "react";
import { Button, TableBody, TableCell, TableRow } from "@windmill/react-ui";
import ChiledTable from "./ChiledTable"; // Ensure the import path is correct
import {
  FiPlus,
  FiMinus,
  FiCheckCircle,
  FiSkipForward,
  FiPlay,
} from "react-icons/fi";
import { BaseUrl } from "utils/Constants";

const OrderTable = ({ orders, fromOrderList }) => {
  const [expandedRows, setExpandedRows] = useState([]);
  const [ltpMap, setLtpMap] = useState(new Map());

  // console.log("orders in OrderTable:", orders);

  const toggleExpandRow = (index) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleSquareOffClick = async (order) => {
    // Implementation of the Square Off logic...
  };
  

  const fetchLtp = async (securityId) => {
    if (!securityId) return;

    try {
      const response = await fetch(
        `${BaseUrl}python/getltp/${securityId}`
      );
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      return parseFloat(data.matchedRow.LTP);
    } catch (error) {
      console.error("Error fetching LTP:", error);
      return 0;
    }
  };

  useEffect(() => {
    const fetchAllLtp = async () => {
      const uniqueSecurityIds = [
        ...new Set(orders.map((order) => order.security_id)),
      ];

      try {
        const ltpResponses = await Promise.all(
          uniqueSecurityIds.map((securityId) =>
            fetchLtp(securityId).then((ltp) => ({ securityId, ltp }))
          )
        );

        const ltpMap = new Map();
        ltpResponses.forEach(({ securityId, ltp }) => {
          ltpMap.set(securityId, ltp);
        });
        setLtpMap(ltpMap);
      } catch (error) {
        console.error("Error fetching LTP:", error);
      }
    };

    fetchAllLtp();
  }, [orders]);

  // Filter orders to include only those with order_category = "Entry"
  const entryOrders = orders.filter(
    (order) => order.order_category === "Entry"
  );

  return (
    <>
      <TableBody className="dark:bg-gray-900">
        {entryOrders.map((order, i) => {
          // Find successful child orders (Target and Stop Loss)
          const childOrders = orders.filter(
            (childOrder) =>
              childOrder.main_order_id === order.broker_order_id &&
              (childOrder.order_category === "Target" ||
                childOrder.order_category === "stop_loss") &&
              childOrder.order_status === "success" // Ensure only successful orders are included
          );

          const displaychildOrders = orders.filter(
            (childOrder) =>
              childOrder.main_order_id === order.broker_order_id &&
              (childOrder.order_category === "Target" ||
                childOrder.order_category === "stop_loss")
          );

          // Calculate total quantity and average price of successful child orders
          const totalChildQty = childOrders.reduce(
            (total, childOrder) => total + childOrder.quantity,
            0
          );
          const totalChildPrice = childOrders.reduce(
            (total, childOrder) =>
              total + childOrder.execution_price * childOrder.quantity,
            0
          );
          const avgChildPrice =
            totalChildQty > 0 ? totalChildPrice / totalChildQty : 0;

          // Initialize profitLoss and percentChange as 'NA' by default
          let profitLoss = "NA";
          let percentChange = "NA";

          if (totalChildQty > 0) {
            // Calculate PnL based on the formula if there are successful child orders
            const executionPrice = order.execution_price;
            const orderQty = order.quantity;

            if (order.transaction_type === "BUY") {
              profitLoss =
                totalChildQty * avgChildPrice - orderQty * executionPrice;
            } else {
              // If the entry order was a sell
              profitLoss =
                orderQty * executionPrice - totalChildQty * avgChildPrice;
            }

            // Calculate Net PnL %
            percentChange =
              executionPrice > 0
                ? (profitLoss / (orderQty * executionPrice)) * 100
                : 0;

            // Round the profitLoss and percentChange to two decimal places
            profitLoss = profitLoss.toFixed(2);
            percentChange = percentChange.toFixed(2) + "%";
          }

          // Determine classes based on profitLoss and percentChange values
          const profitLossClass =
            profitLoss >= 0 ? "text-green-600" : "text-red-600";

          // const percentChangeClass =
          //   percentChange >= 0 ? "text-green-600" : "text-red-600";

            const percentChangeClass =
    percentChange >= 0 ? "text-red-600" : "text-green-600";


          // Define alternate row color classes
          const rowClass = i % 2 === 0 ? "bg-gray-100" : "bg-gray-200";

          return (
            <React.Fragment key={i}>
              <TableRow className={rowClass}>
                <TableCell className="text-center">
                  <button onClick={() => toggleExpandRow(i)}>
                    {expandedRows.includes(i) ? <FiMinus /> : <FiPlus />}
                  </button>
                </TableCell>
                {fromOrderList && (
                  <TableCell className="text-center text-xs">
                    {order.order_result_status === "open" ? (
                      <span className="animate-spin text-orange-500 text-center">
                        <FiPlay size={20} />
                      </span>
                    ) : (
                      <span className="text-green-500 text-center">
                        <FiCheckCircle size={20} />
                      </span>
                    )}
                  </TableCell>
                )}
                <TableCell className="text-center">
                  <span className="uppercase text-xs">{order?.order_id}</span>
                </TableCell>
                <TableCell className="text-center text-xs">
                  <span className="text-sm">{order.trading_symbol}</span>
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-sm">{order.transaction_type}</span>
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-sm">{order.quantity}</span>
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-sm">{order.execution_price}</span>
                </TableCell>
                <TableCell className="text-center">
                  <span className={`text-sm ${profitLossClass}`}>
                    {profitLoss}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <span className={`text-sm ${percentChangeClass}`}>
                    {percentChange}
                  </span>
                </TableCell>
                {/* Uncomment if you need a Square Off button */}
                {/* <TableCell className="text-xs text-center">
                  <Button onClick={() => handleSquareOffClick(order)}>
                    Square Off
                  </Button>
                </TableCell> */}
              </TableRow>
              {expandedRows.includes(i) && (
                <TableRow>
                  <TableCell colSpan={11} className="pl-24">
                    <ChiledTable orders={displaychildOrders} />
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          );
        })}
      </TableBody>
    </>
  );
};

export default OrderTable;
