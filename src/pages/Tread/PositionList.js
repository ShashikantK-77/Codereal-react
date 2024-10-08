




import {
  Card,
  CardBody,
  Input,
  Table,
  TableCell,
  TableContainer,
  TableHeader,
  Pagination,
} from "@windmill/react-ui";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PositionTable from "components/order/PositionTable";
import NotFound from "components/table/NotFound";
import PageTitle from "components/Typography/PageTitle";
import TableLoading from "components/preloader/TableLoading";
import { BaseUrl } from "utils/Constants";

const PositionList = () => {
  const [orders, setOrders] = useState([]);
  const [positionData, setPositionData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [ltpMap, setLtpMap] = useState(new Map());
  const resultsPerPage = 4;
  const { t } = useTranslation();

  useEffect(() => {
    let isMounted = true;

    const fetchOrders = async () => {
      try {
        const response = await fetch(`${BaseUrl}python/get-all-orders`, {
          headers: {
            'Content-Type': 'application/json',
            'access-token': 'your-access-token',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if (isMounted) {
          if (data.success && Array.isArray(data.orders)) {
            const reversedOrders = data.orders.reverse();
            setOrders(reversedOrders);
            console.log("got orders:",reversedOrders);
            setTotalResults(reversedOrders.length);
          } else {
            console.error('Unexpected response format:', data);
            setOrders([]);
            setTotalResults(0);
          }
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchOrders();

    return () => {
      isMounted = false;
    };
  }, []);

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

    fetchAllLtp(); // Fetch LTP initially

    const intervalId = setInterval(fetchAllLtp, 2000); // Set interval to fetch LTP every 2 seconds

    return () => {
      clearInterval(intervalId); // Cleanup interval on unmount
    };
  }, [orders]);

  // useEffect(() => {
  //   const uniqueSymbols = [...new Set(orders.map(order => order.trading_symbol))];
  
  //   const positionData = uniqueSymbols.map(symbol => {
  //     const relevantOrders = orders.filter(order => order.trading_symbol === symbol);

  //     let totalBuyQuantity = 0;
  //     let totalSellQuantity = 0;

  //     relevantOrders.forEach(order => {
  //       if (order.transaction_type === "BUY") {
  //         totalBuyQuantity += order.quantity;
  //       } else if (order.transaction_type === "SELL") {
  //         totalSellQuantity += order.quantity;
  //       }
  //     });

  //     const totalQuantity = totalBuyQuantity - totalSellQuantity;

  //     const executionPrices = relevantOrders
  //       .map(order => parseFloat(order.execution_price));

  //     const averagePrice = executionPrices.length > 0
  //       ? (executionPrices.reduce((sum, price) => sum + price, 0) / executionPrices.length).toFixed(2)
  //       : 0;

  //     const securityId = relevantOrders.find(order => order.security_id)?.security_id;
  //     const ltp = securityId ? ltpMap.get(securityId) : null;

  //     const pnl = ltp && averagePrice
  //       ? ((ltp - parseFloat(averagePrice)) * totalQuantity).toFixed(2)
  //       : null;

  //     const totalInvestedAmount = averagePrice * totalQuantity;
  //     const pnlPercentage = ltp && averagePrice && totalInvestedAmount !== 0
  //       ? (((ltp - parseFloat(averagePrice)) * totalQuantity) / totalInvestedAmount * 100).toFixed(2)
  //       : null;

  //     return {
  //       symbol,
  //       quantity: totalQuantity,
  //       averagePrice: parseFloat(averagePrice),
  //       ltp,
  //       pnl,
  //       pnlPercentage,
  //       actions: null
  //     };
  //   });
  
  //   setPositionData(positionData);
  // }, [orders, ltpMap]);


  useEffect(() => {
    const uniqueSymbols = [...new Set(orders.map(order => order.trading_symbol))]
      .filter(symbol => symbol.toLowerCase().includes(searchName.toLowerCase()));
    
    const positionData = uniqueSymbols.map(symbol => {
      const relevantOrders = orders.filter(order =>
        order.trading_symbol === symbol
      );
  
      let totalBuyQuantity = 0;
      let totalSellQuantity = 0;
  
      relevantOrders.forEach(order => {
        if (order.transaction_type === "BUY") {
          totalBuyQuantity += order.quantity;
        } else if (order.transaction_type === "SELL") {
          totalSellQuantity += order.quantity;
        }
      });
  
      const totalQuantity = totalBuyQuantity - totalSellQuantity;
  
      const executionPrices = relevantOrders
        .map(order => parseFloat(order.execution_price));
  
      const averagePrice = executionPrices.length > 0
        ? (executionPrices.reduce((sum, price) => sum + price, 0) / executionPrices.length).toFixed(2)
        : 0;
  
      const securityId = relevantOrders.find(order => order.security_id)?.security_id;
      const ltp = securityId ? ltpMap.get(securityId) : null;
  
      const pnl = ltp && averagePrice
        ? ((ltp - parseFloat(averagePrice)) * totalQuantity).toFixed(2)
        : null;
  
      const totalInvestedAmount = averagePrice * totalQuantity;
      const pnlPercentage = ltp && averagePrice && totalInvestedAmount !== 0
        ? (((ltp - parseFloat(averagePrice)) * totalQuantity) / totalInvestedAmount * 100).toFixed(2)
        : null;
  
      return {
        symbol,
        quantity: totalQuantity,
        averagePrice: parseFloat(averagePrice),
        ltp,
        pnl,
        pnlPercentage,
        actions: null
      };
    });
  
    setPositionData(positionData);
  }, [orders, ltpMap, searchName]);
  
  
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

  // console.log("positionData:",positionData);

  return (
    <>
      <PageTitle>Positions</PageTitle>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <div className="grid gap-4 lg:gap-6 xl:gap-6 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 py-2">
            <Input
              type="search"
              name="search"
              onChange={(e) => setSearchName(e.target.value)}
              className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
              placeholder="Search by Symbol"
            />
          </div>
        </CardBody>
      </Card>

      {loading ? (
        <TableLoading />
      ) : positionData.length === 0 ? (
        <NotFound title="Positions" />
      ) : (
        <TableContainer className="mb-8 dark:bg-gray-900">
          <Table>
            <TableHeader>
              <tr>
                <TableCell className="text-center">Symbol</TableCell>
                <TableCell className="text-center">Qty</TableCell>
                <TableCell className="text-center">LTP</TableCell>
                <TableCell className="text-center">Avg Price</TableCell>
                <TableCell className="text-center">PnL</TableCell>
                <TableCell className="text-center">PnL(%)</TableCell>
                <TableCell className="text-center">Actions</TableCell>
              </tr>
            </TableHeader>
            <PositionTable positionData={positionData || []} />
          </Table>
        </TableContainer>
      )}

      {/* <div className="flex justify-end mt-4">
        <Pagination
          totalResults={totalResults}
          resultsPerPage={resultsPerPage}
          onChange={(page) => setCurrentPage(page)}
          label="Position Table Navigation"
        />
      </div> */}
    </>
  );
};

export default PositionList;
