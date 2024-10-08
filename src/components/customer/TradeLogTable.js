import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import PrintReceipt from "components/form/PrintReceipt";
import SelectStatus from "components/form/SelectStatus";
import Status from "components/table/Status";
import Tooltip from "components/tooltip/Tooltip";
import { useTranslation } from "react-i18next";
import { FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import { showDateTimeFormat } from "utils/dateFormate";

const TradeLogTable = ({ orders, currency, globalSetting }) => {
  // console.log('globalSetting',globalSetting)
  const { t } = useTranslation();
  // console.log('orders',orders)

  return (
    <>
      <TableBody className="dark:bg-gray-900">
        {orders?.map((order, i) => (
          <TableRow key={i + 1}>
          <TableCell className="text-right">
              <span className="font-semibold uppercase text-xs">
                {/* {order?.id} */}
                {/* {order.id.slice(0, 8)} */}
                {order.clientId}
              </span>
            </TableCell>

            <TableCell className="text-left">
              <span className="text-sm">
           
                {order.clientName}
              </span>
            </TableCell>

            <TableCell className="text-left text-xs">
              <span className="text-sm">
              {/* {order?.user_info?.name} */}
              {order.symbol}
              
              </span>{" "}
            </TableCell>

            <TableCell className="text-left text-xs">
              <span className="text-sm">
              {order.ordertype}
              </span>{" "}
            </TableCell>

            <TableCell className="text-right">
              <span className="text-sm font-semibold">
                {/* {order?.paymentMethod} */}
                {order.price}
              </span>
            </TableCell>

            
            <TableCell className="text-center">
  <span className="text-sm">
    {
      new Date(order.orderdate).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      })
    }
  </span>
</TableCell>

            <TableCell className="text-right">
              <span className="text-sm font-semibold">
                {/* {currency}
                {parseFloat(order?.total)?.toFixed(2)} */}
                {order.quantity}
              </span>
            </TableCell>


            <TableCell className="text-xs text-center">
              <Status status={order?.status} />
              {/* {order.status} */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default TradeLogTable;
