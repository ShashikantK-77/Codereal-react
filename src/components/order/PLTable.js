import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import PrintReceipt from "components/form/PrintReceipt";
import SelectStatus from "components/form/SelectStatus";
import Status from "components/table/Status";
import Tooltip from "components/tooltip/Tooltip";
import { useTranslation } from "react-i18next";
import { FiBookOpen } from "react-icons/fi";
import { Link } from "react-router-dom";
import { showDateTimeFormat } from "utils/dateFormate";

const PLTable = ({ orders, ltp, currency, globalSetting }) => {
  console.log("PLTable orders", orders);
  // console.log('globalSetting',globalSetting)
  const { t } = useTranslation();
  console.log('orders OrderTable pnl',orders)

  return (
    <>
      <TableBody className="dark:bg-gray-900">
        {orders?.map((order, i) => (
          <TableRow key={i + 1}>
            <TableCell className="text-center">
              <span className="font-semibold uppercase text-xs">
                {order.trading_symbol}
              </span>
            </TableCell>

            <TableCell className="text-center text-xs">
              <span className="text-sm">{order.quantity}</span>{" "}
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">{order.execution_price}</span>
            </TableCell>

            <TableCell className="text-center">
              <span
                className={`text-sm ${
                  order.transaction_type === "BUY"
                    ? "text-green-600"
                    : order.transaction_type === "SELL"
                    ? "text-red-600"
                    : ""
                }`}
              >
                {order.transaction_type}
              </span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">{ltp}</span>
            </TableCell>

            {/* <TableCell className="text-center">
              <span
                className="text-sm"
                style={{ color: ltp - order.price < 0 ? "red" : "green" }}
              >
                {order.pnl}
              </span>
            </TableCell> */}

            {/* <TableCell className="text-center">
              <span
                className="text-sm"
                style={{
                  color:
                    ((ltp - order.execution_price) / order.execution_price) * 100 < 0
                      ? "red"
                      : "green",
                }}
              >
                {typeof order.net_pnl === "number"
                  ? order.net_pnl.toFixed(2) + "%"
                  : Number(order.net_pnl).toFixed(2) + "%"}
              </span>
            </TableCell> */}

            {/* <TableCell className="text-center">
              
              <span
                className="text-sm"
                style={{
                  color:
                    ((ltp - order.execution_price) / order.execution_price) * 100 < 0
                      ? "red"
                      : "green",
                }}
              >
                {typeof order.net_pnl === "number"
                  ? order.net_pnl.toFixed(2) + "%"
                  : Number(order.net_pnl).toFixed(2) + "%"}
              </span>
            </TableCell> */}

            <TableCell className="text-xs text-center">
              <Status status="success" />
            </TableCell>

            {/* <TableCell className="text-center flex justify-center">
              <div className="flex justify-between items-center">
                <PrintReceipt orderId={order._id} />

                <span className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
       
                  <Link to={`/tradelogs?orderId=${order?.orderno}`}>
               
                    <Tooltip
                      id="view"
                      Icon={FiBookOpen}
                      title={t("ViewTradeLog")}
                      bgColor="#059669"
                    />
                  </Link>
                </span>
              </div>
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default PLTable;
