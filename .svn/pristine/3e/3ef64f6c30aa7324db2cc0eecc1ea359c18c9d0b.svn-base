// // import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
// // import PrintReceipt from "components/form/PrintReceipt";
// // import Status from "components/table/Status";
// // import Tooltip from "components/tooltip/Tooltip";
// // import { useTranslation } from "react-i18next";
// // import { FiBookOpen } from "react-icons/fi";
// // import { Link } from "react-router-dom";

// // const ChiledTable = ({ orders }) => {
// //   const { t } = useTranslation();

// //   return (
// //     <>
// //       <TableBody className="dark:bg-gray-900 ml-20">
// //         {orders?.map((order, i) => (
// //           <TableRow key={i}>
// //           <TableCell className="text-center">
// //               <span className="font-semibold uppercase text-xs">
// //                 {/* {order?.BrokerClientID} */}
// //               </span>
// //             </TableCell>
// //             <TableCell className="text-center">
// //               <span className="font-semibold uppercase text-xs">
// //                 {order?.BrokerClientID}
// //               </span>
// //             </TableCell>
// //             <TableCell className="text-center">
// //               <span className="text-sm">
// //                 {new Date(order.updateTime).toLocaleString("en-US", {
// //                   year: "numeric",
// //                   month: "short",
// //                   day: "numeric",
// //                   hour: "numeric",
// //                   minute: "numeric",
// //                   second: "numeric",
// //                   hour12: true,
// //                 })}
// //               </span>
// //             </TableCell>
// //             <TableCell className="text-center text-xs">
// //               <span className="text-sm">{order.tradingSymbol}</span>{" "}
// //             </TableCell>
// //             <TableCell className="text-center">
// //               <span className="text-sm ">{order.transactionType}</span>
// //             </TableCell>
// //             <TableCell className="text-center">
// //               <span className="text-sm ">{order.exchangeSegment}</span>
// //             </TableCell>
// //             <TableCell className="text-center">
// //               <span className="text-sm ">{order.quantity}</span>
// //             </TableCell>
// //             <TableCell className="text-center">
// //               <span className="text-sm ">{order.ExecutionPrice}</span>
// //             </TableCell>
// //             <TableCell className="text-center">
// //               <span className="text-sm ">{order.orderType}</span>
// //             </TableCell>
// //             <TableCell className="text-xs text-center">
// //               <Status status={order?.orderStatus} />
// //             </TableCell>
// //             <TableCell className="text-center flex justify-center">
// //               <div className="flex justify-between items-center">
// //                 <PrintReceipt orderId={order._id} />
// //                 <span className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
// //                   <Link to={`/tradelogs?orderId=${order?.orderId}`}>
// //                     <Tooltip
// //                       id="view"
// //                       Icon={FiBookOpen}
// //                       title={t("ViewTradeLog")}
// //                       bgColor="#059669"
// //                     />
// //                   </Link>
// //                 </span>
// //               </div>
// //             </TableCell>
// //           </TableRow>
// //         ))}
// //       </TableBody>
// //     </>
// //   );
// // };

// // export default ChiledTable;

// import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
// import PrintReceipt from "components/form/PrintReceipt";
// import Status from "components/table/Status";
// import Tooltip from "components/tooltip/Tooltip";
// import { useTranslation } from "react-i18next";
// import { FiBookOpen } from "react-icons/fi";
// import { Link } from "react-router-dom";

// const ChiledTable = ({ orders }) => {
//   const { t } = useTranslation();

//   return (
//     <>
//       <TableBody className="dark:bg-gray-900 ml-20">
//         {orders?.map((order, i) => (
//           <TableRow key={i}>
//             <TableCell className="text-center ml-36"></TableCell> {/* Add a blank cell at the beginning */}
//             <TableCell className="text-center">
//               <span className="font-semibold uppercase text-xs">
//                 {order?.BrokerClientID}
//               </span>
//             </TableCell>
//             <TableCell className="text-center">
//               <span className="text-sm">
//                 {new Date(order.updateTime).toLocaleString("en-US", {
//                   year: "numeric",
//                   month: "short",
//                   day: "numeric",
//                   hour: "numeric",
//                   minute: "numeric",
//                   second: "numeric",
//                   hour12: true,
//                 })}
//               </span>
//             </TableCell>
//             <TableCell className="text-center text-xs">
//               <span className="text-sm">{order.tradingSymbol}</span>{" "}
//             </TableCell>
//             <TableCell className="text-center">
//               <span className="text-sm ">{order.transactionType}</span>
//             </TableCell>
//             <TableCell className="text-center">
//               <span className="text-sm ">{order.exchangeSegment}</span>
//             </TableCell>
//             <TableCell className="text-center">
//               <span className="text-sm ">{order.quantity}</span>
//             </TableCell>
//             <TableCell className="text-center">
//               <span className="text-sm ">{order.ExecutionPrice}</span>
//             </TableCell>
//             <TableCell className="text-center">
//               <span className="text-sm ">{order.orderType}</span>
//             </TableCell>
//             <TableCell className="text-xs text-center">
//               <Status status={order?.orderStatus} />
//             </TableCell>
//             <TableCell className="text-center flex justify-center">
//               <div className="flex justify-between items-center">
//                 <PrintReceipt orderId={order._id} />
//                 <span className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
//                   <Link to={`/tradelogs?orderId=${order?.orderId}`}>
//                     <Tooltip
//                       id="view"
//                       Icon={FiBookOpen}
//                       title={t("ViewTradeLog")}
//                       bgColor="#059669"
//                     />
//                   </Link>
//                 </span>
//               </div>
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </>
//   );
// };

// export default ChiledTable;

import {
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
} from "@windmill/react-ui";
import PrintReceipt from "components/form/PrintReceipt";
import Status from "components/table/Status";
import Tooltip from "components/tooltip/Tooltip";
import { useTranslation } from "react-i18next";
import { FiBookOpen } from "react-icons/fi";
import { Link } from "react-router-dom";

const ChiledTable = ({ orders }) => {
  const { t } = useTranslation();
  console.log("ChiledTable orders:", orders);

  return (
    <>
      <thead className="bg-gray-50">
        <tr className="text-center text-gray-400">
          <TableCell className=" px-4 py-2 capitalize text-sm">
            Order ID
          </TableCell>
          <TableCell className=" px-4 py-2 capitalize text-sm">
            Order Category
          </TableCell>
          <TableCell className=" px-4 py-2 capitalize text-sm">
          Type
          </TableCell>
          <TableCell className=" px-4 py-2 capitalize text-sm">Qty</TableCell>
          <TableCell className=" px-4 py-2 capitalize text-sm">Price</TableCell>

          <TableCell className=" px-4 py-2 capitalize text-sm">
            Status
          </TableCell>
        </tr>
      </thead>
      <TableBody className="dark:bg-gray-900 ml-20">
        {orders?.map((order, i) => (
          <TableRow key={i}>
            <TableCell className="text-center">
              <span className=" uppercase text-xs">{order?.order_id}</span>
            </TableCell>
            <TableCell className="text-center">
              <span className="text-sm">{order?.order_category}</span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">{order?.transaction_type}</span>
            </TableCell>
            {/* <TableCell className="text-center text-xs">
              <span className="text-sm">{order.tradingSymbol}</span>{" "}
            </TableCell> */}
            {/* <TableCell className="text-center">
              <span className="text-sm capitalize">{order.transactionType}</span>
            </TableCell> */}
            {/* <TableCell className="text-center">
              <span className="text-sm ">{order.exchangeSegment}</span>
            </TableCell> */}
            <TableCell className="text-center">
              <span className="text-sm ">{order.quantity}</span>
            </TableCell>
            <TableCell className="text-center">
              <span className="text-sm ">{order.execution_price}</span>
            </TableCell>
            {/* <TableCell className="text-center">
              <span className="text-sm capitalize">{order.orderType}</span>
            </TableCell> */}
            <TableCell className="text-xs text-center">
              <Status status={order?.order_status} />
            </TableCell>
            {/* <TableCell className="text-center flex justify-center">
              <div className="flex justify-between items-center">
                <PrintReceipt orderId={order._id} />
                <span className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                  <Link to={`/tradelogs?orderId={order?.orderId}`}>
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

export default ChiledTable;
