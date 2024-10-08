import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import PrintReceipt from "components/form/PrintReceipt";
import SelectStatus from "components/form/SelectStatus";
import Status from "components/table/Status";
import Tooltip from "components/tooltip/Tooltip";
import { useTranslation } from "react-i18next";
import { FiBookOpen } from "react-icons/fi";
import { Link } from "react-router-dom";
import { showDateTimeFormat } from "utils/dateFormate";

const BacktestOrder = ({ orders}) => {
  console.log("BacktestOrder orders", orders);
  // console.log('globalSetting',globalSetting)
  const { t } = useTranslation();
  // console.log('orders OrderTable',orders)

  return (
    <>
      <TableBody className="dark:bg-gray-900">
        {orders?.map((order, i) => (
          <TableRow key={i + 1}>
            
            <TableCell className="text-center">
              <span className="font-semibold uppercase text-xs">
              {order?.strategy_id}
              </span>
            </TableCell>

            <TableCell className="text-center text-xs">
              <span className="text-sm">{order.symbol}</span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">{order?.date}</span>
            </TableCell>

      

            <TableCell className="text-center">
              <span className="text-sm ">{order.exchange_segment}</span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">{order?.ltp}</span>
            </TableCell>


            <TableCell className="text-center">
              <span className="text-sm ">{order.order}</span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm ">{order.quantity}</span>
            </TableCell>

           

         

            <TableCell className="text-xs text-center">
             
              <span className="text-sm ">{order?.short_term_sma}</span>
            </TableCell>

            <TableCell className="text-xs text-center">
            <span className="text-sm ">{order?.long_term_sma}</span>
          
            </TableCell>

            <TableCell className="text-xs text-center">
            <span className="text-sm ">{order.rsi}</span>
            
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

export default BacktestOrder;
