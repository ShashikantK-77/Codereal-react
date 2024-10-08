import {
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  WindmillContext,
} from "@windmill/react-ui";
import LineChart from "components/chart/LineChart/LineChart";
import PieChart from "components/chart/Pie/PieChart";
import CardItem from "components/dashboard/CardItem";
import CardItemTwo from "components/dashboard/CardItemTwo";
import ChartCard from "components/chart/ChartCard";
import OrderTable from "components/order/OrderTable";
import TableLoading from "components/preloader/TableLoading";
import NotFound from "components/table/NotFound";
import PageTitle from "components/Typography/PageTitle";
import { SidebarContext } from "context/SidebarContext";
import * as dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import useAsync from "hooks/useAsync";
import useFilter from "hooks/useFilter";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiCheck, FiRefreshCw, FiShoppingCart, FiTruck } from "react-icons/fi";
import { ImCreditCard, ImStack } from "react-icons/im";
import OrderServices from "services/OrderServices";
import MasterTradersList from "./Tread/MasterTradersList";
import TradeLogTable from "components/customer/TradeLogTable";
import { useListContext } from "context/ListContext";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
//internal import

const Dashboard = () => {
  const { globalSetting } = useFilter();
  const { mode } = useContext(WindmillContext);

  dayjs.extend(isBetween);
  dayjs.extend(isToday);
  dayjs.extend(isYesterday);

  const {  lang } = useContext(SidebarContext);

  // const {tradelogs} = useContext(useListContext);
// console.log("tradelogs",tradelogs);

  // react hook
  const [todayOrderAmount, setTodayOrderAmount] = useState(0);
  const [yesterdayOrderAmount, setYesterdayOrderAmount] = useState(0);
  const [salesReport, setSalesReport] = useState([]);
  const [todayCashPayment, setTodayCashPayment] = useState(0);
  const [todayCardPayment, setTodayCardPayment] = useState(0);
  const [todayCreditPayment, setTodayCreditPayment] = useState(0);
  const [yesterdayCashPayment, setYesterdayCashPayment] = useState(0);
  const [yesterdayCardPayment, setYesterdayCardPayment] = useState(0);
  const [yesterdayCreditPayment, setYesterdayCreditPayment] = useState(0);
  const [orders, setOrders] = useState([]);
  const resultsPerPage = 2;
  const [totalResults,seTotalResults] =useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Set the initial page number to 1
  const [searchName, setSearchName] = useState("");


  const { data: bestSellerProductChart, loading: loadingBestSellerProduct } =
    useAsync(OrderServices.getBestSellerProductChart);

  const { data: dashboardRecentOrder, loading: loadingRecentOrder } = useAsync(
    () => OrderServices.getDashboardRecentOrder({ page: currentPage, limit: 8 })
  );

  const { data: dashboardOrderCount, loading: loadingOrderCount } = useAsync(
    OrderServices.getDashboardCount
  );

  const { data: dashboardOrderAmount, loading: loadingOrderAmount } = useAsync(
    OrderServices.getDashboardAmount
  );

  const currency = globalSetting?.default_currency || "$";

  // console.log("dashboardOrderCount", dashboardOrderCount);

  const { dataTable, serviceData } = useFilter(dashboardRecentOrder?.orders);

  const { t } = useTranslation();

  const handleChangePage = (page) => {
    setCurrentPage(page); // Update the currentPage when the page changes
    setSearchName("");
  };

  useEffect(() => {



    const existingDataString = localStorage.getItem('orderlog');
    let existingData = existingDataString ? JSON.parse(existingDataString) : [];
   


    // const filteredOrders = orderId ? existingData.filter(order => order.id === orderId) : existingData;

    // Reverse the filteredOrders array to display the list in reverse order
  // const reversedOrders = filteredOrders.reverse();

    setOrders(existingData.reverse());

    const totalres = orders.length;
    seTotalResults(totalres);

  



    // today orders show
    const todayOrder = dashboardOrderAmount?.ordersData?.filter((order) =>
      dayjs(order.updatedAt).isToday()
    );
    //  console.log('todayOrder',dashboardOrderAmount.ordersData)
    const todayReport = todayOrder?.reduce((pre, acc) => pre + acc.total, 0);
    setTodayOrderAmount(todayReport);

    // yesterday orders
    const yesterdayOrder = dashboardOrderAmount?.ordersData?.filter((order) =>
      dayjs(order.updatedAt).set(-1, "day").isYesterday()
    );

    const yesterdayReport = yesterdayOrder?.reduce(
      (pre, acc) => pre + acc.total,
      0
    );
    setYesterdayOrderAmount(yesterdayReport);

    // sales orders chart data
    const salesOrderChartData = dashboardOrderAmount?.ordersData?.filter(
      (order) =>
        dayjs(order.updatedAt).isBetween(
          new Date().setDate(new Date().getDate() - 7),
          new Date()
        )
    );

    salesOrderChartData?.reduce((res, value) => {
      let onlyDate = value.updatedAt.split("T")[0];

      if (!res[onlyDate]) {
        res[onlyDate] = { date: onlyDate, total: 0, order: 0 };
        salesReport.push(res[onlyDate]);
      }
      res[onlyDate].total += value.total;
      res[onlyDate].order += 1;
      return res;
    }, {});

    setSalesReport(salesReport);

    const todayPaymentMethodData = [];
    const yesterDayPaymentMethodData = [];

    // today order payment method
    dashboardOrderAmount?.ordersData?.filter((item, value) => {
      if (dayjs(item.updatedAt).isToday()) {
        if (item.paymentMethod === "Cash") {
          let cashMethod = {
            paymentMethod: "Cash",
            total: item.total,
          };
          todayPaymentMethodData.push(cashMethod);
        }

        if (item.paymentMethod === "Credit") {
          const cashMethod = {
            paymentMethod: "Credit",
            total: item.total,
          };

          todayPaymentMethodData.push(cashMethod);
        }

        if (item.paymentMethod === "Card") {
          const cashMethod = {
            paymentMethod: "Card",
            total: item.total,
          };

          todayPaymentMethodData.push(cashMethod);
        }
      }

      return item;
    });
    // yesterday order payment method
    dashboardOrderAmount?.ordersData?.filter((item, value) => {
      if (dayjs(item.updatedAt).set(-1, "day").isYesterday()) {
        if (item.paymentMethod === "Cash") {
          let cashMethod = {
            paymentMethod: "Cash",
            total: item.total,
          };
          yesterDayPaymentMethodData.push(cashMethod);
        }

        if (item.paymentMethod === "Credit") {
          const cashMethod = {
            paymentMethod: "Credit",
            total: item?.total,
          };

          yesterDayPaymentMethodData.push(cashMethod);
        }

        if (item.paymentMethod === "Card") {
          const cashMethod = {
            paymentMethod: "Card",
            total: item?.total,
          };

          yesterDayPaymentMethodData.push(cashMethod);
        }
      }

      return item;
    });

    const todayCsCdCit = Object.values(
      todayPaymentMethodData.reduce((r, { paymentMethod, total }) => {
        if (!r[paymentMethod]) {
          r[paymentMethod] = { paymentMethod, total: 0 };
        }
        r[paymentMethod].total += total;

        return r;
      }, {})
    );
    const today_cash_payment = todayCsCdCit.find(
      (el) => el.paymentMethod === "Cash"
    );
    setTodayCashPayment(today_cash_payment?.total);
    const today_card_payment = todayCsCdCit.find(
      (el) => el.paymentMethod === "Card"
    );
    setTodayCardPayment(today_card_payment?.total);
    const today_credit_payment = todayCsCdCit.find(
      (el) => el.paymentMethod === "Credit"
    );
    setTodayCreditPayment(today_credit_payment?.total);

    const yesterDayCsCdCit = Object.values(
      yesterDayPaymentMethodData.reduce((r, { paymentMethod, total }) => {
        if (!r[paymentMethod]) {
          r[paymentMethod] = { paymentMethod, total: 0 };
        }
        r[paymentMethod].total += total;

        return r;
      }, {})
    );
    const yesterday_cash_payment = yesterDayCsCdCit.find(
      (el) => el.paymentMethod === "Cash"
    );
    setYesterdayCashPayment(yesterday_cash_payment?.total);
    const yesterday_card_payment = yesterDayCsCdCit.find(
      (el) => el.paymentMethod === "Card"
    );
    setYesterdayCardPayment(yesterday_card_payment?.total);
    const yesterday_credit_payment = yesterDayCsCdCit.find(
      (el) => el.paymentMethod === "Credit"
    );
    setYesterdayCreditPayment(yesterday_credit_payment?.total);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardOrderAmount]);

  const masterTraders = [
    {
      id: 1,
      name: "Master Trader 1",
      profilePicture: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1331&q=80",
      strategy: "Short-term trading strategy",
      performance: "Above-Average Gains",
    },

    {
      id: 2,
      name: "Master Trader 2",
      profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      strategy: "Momentum Trading using Indicators",
      performance: "High returns",
    },

    {
      id: 3,
      name: "Master Trader 3",
      profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      strategy: "News Trading Approach",
      performance: "Market-Beating Returns",
    },

    {
      id: 4,
      name: "Master Trader 4",
      profilePicture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80",
      strategy: "Swing Trading Based on Price Patterns",
      performance: "Consistent Profitability",
    },

    {
      id: 5,
      name: "Master Trader 5",
      profilePicture: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      strategy: "Mean Reversion Trading",
      performance: "High returns",
    },
    // Add more master traders here
  ];

  return (
    <>
      {/* <PageTitle>{t("DashboardOverview")}</PageTitle> */}
      <PageTitle>Client Dashboard</PageTitle>

      <div className="grid gap-4 mb-8 md:grid-cols-4 xl:grid-cols-4">
      <Link to="orders">
        <CardItemTwo
          mode={mode}
          currency={currency}
          title="Today Order"
          title2="TodayOrder"
          Icon={ImStack}
          cash={todayCashPayment || 0}
          card={todayCardPayment || 0}
          credit={todayCreditPayment || 0}
          // price={todayOrderAmount || 0}
          price="2"
          className="text-white dark:text-green-100 bg-teal-500"
          loading={loadingOrderAmount}
        /></Link>

<Link to="orders">
        <CardItemTwo
          mode={mode}
          currency={currency}
          title="Yesterday Order"
          title2="YesterdayOrder"
          Icon={ImStack}
          cash={yesterdayCashPayment || 0}
          card={yesterdayCardPayment || 0}
          credit={yesterdayCreditPayment || 0}
          price="6"
          className="text-white dark:text-orange-100 bg-orange-400"
          loading={loadingOrderAmount}
        /></Link>

<Link to="orders">

        <CardItemTwo
          mode={mode}
          currency={currency}
          title2="ThisMonth"
          Icon={ImStack}
          // price={dashboardOrderAmount?.thisMonthlyOrderAmount || 0}
          price="30"
          className="text-white dark:text-green-100 bg-blue-500"
          loading={loadingOrderAmount}
        /></Link>


<Link to="orders">
        <CardItemTwo
          mode={mode}
          currency={currency}
          title2="AllTimeSales"
          Icon={ImStack}
          // price={dashboardOrderAmount?.totalAmount || 0}
          price="65"
          className="text-white dark:text-green-100 bg-green-500"
          loading={loadingOrderAmount}
        /></Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <Link to="tradelogs">
        <CardItem
          title="Total Orders"
          Icon={FiShoppingCart}
          loading={loadingOrderCount}
          // quantity={dashboardOrderCount?.totalOrder || 0}
          quantity= "65"
          className="text-orange-600 dark:text-orange-100 bg-orange-100 dark:bg-orange-500"
        /></Link>

<Link to="tradelogs">
        <CardItem
          title={t("OrderPending")}
          Icon={FiRefreshCw}
          loading={loadingOrderCount}
          // quantity={dashboardOrderCount?.totalPendingOrder?.count || 0}
          quantity="45"
          amount="5"
          className="text-blue-600 dark:text-blue-100 bg-blue-100 dark:bg-blue-500"
        /></Link>

<Link to="tradelogs">
        <CardItem
          title={t("OrderProcessing")}
          Icon={FiTruck}
          loading={loadingOrderCount}
          quantity={dashboardOrderCount?.totalProcessingOrder || 0}
          className="text-teal-600 dark:text-teal-100 bg-teal-100 dark:bg-teal-500"
        /></Link>

<Link to="tradelogs">
        <CardItem
          title={t("OrderDelivered")}
          Icon={FiCheck}
          loading={loadingOrderCount}
          quantity={dashboardOrderCount?.totalDeliveredOrder || 0}
          className="text-green-600 dark:text-green-100 bg-green-100 dark:bg-green-500"
        /></Link>
      </div>

      <PageTitle>Master Traders List</PageTitle>
      <MasterTradersList masterTraders={masterTraders}/>







      <div className="grid gap-4 md:grid-cols-2 my-8">
        <ChartCard
          mode={mode}
          loading={loadingOrderAmount}
          title="Performance Graph"
        >
          <LineChart salesReport={salesReport} />
        </ChartCard>

        <ChartCard
          mode={mode}
          loading={loadingBestSellerProduct}
          title={t("BestSellingProducts")}
        >
          <PieChart data={bestSellerProductChart} />
        </ChartCard>
      </div>

      {/* <PageTitle>{t("RecentOrder")}</PageTitle> */}

      {/* <Loading loading={loading} /> */}

   
    </>
  );
};

export default Dashboard;
