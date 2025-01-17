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
import { FiCheck, FiLink, FiRefreshCw, FiShoppingCart, FiTruck } from "react-icons/fi";
import { ImCreditCard, ImStack } from "react-icons/im";
import OrderServices from "services/OrderServices";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import HeroCompo from "../Strategy/HeroCompo";
import SuggestStrategy from "../Tread/SuggestStrategy";
import InvestingChart from "components/chart/investing.com/Chart";
//internal import

const AdminDashboard = () => {
  const { globalSetting } = useFilter();
  const { mode } = useContext(WindmillContext);

  dayjs.extend(isBetween);
  dayjs.extend(isToday);
  dayjs.extend(isYesterday);

  const { currentPage, handleChangePage, lang } = useContext(SidebarContext);

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

  useEffect(() => {
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

  return (
    <>
    <PageTitle>Admin Dashboard</PageTitle>

   

      <div className="grid gap-4 mb-8 md:grid-cols-4 xl:grid-cols-4">
      <Link to="orders">
        <CardItemTwo
          mode={mode}
          currency={currency}
          title="Creted Startegy"
          title2="Users"
          Icon={ImStack}
          cash={todayCashPayment || 0}
          card={todayCardPayment || 0}
          credit={todayCreditPayment || 0}
          price={todayOrderAmount || 0}
          className="text-white dark:text-green-100 bg-teal-500"
          loading={loadingOrderAmount}
        /> </Link>

<Link to="clients">
        <CardItemTwo
          mode={mode}
          currency={currency}
          title="Live Startegy"
          title2="Total Startegy"
          Icon={ImStack}
          cash={yesterdayCashPayment || 0}
          card={yesterdayCardPayment || 0}
          credit={yesterdayCreditPayment || 0}
          price={yesterdayOrderAmount || 0}
          className="text-white dark:text-orange-100 bg-orange-400"
          loading={loadingOrderAmount}
        /></Link>

<Link to="orders">

        <CardItemTwo
          mode={mode}
          currency={currency}
          title2="Balance"
          Icon={ImStack}
          price={dashboardOrderAmount?.thisMonthlyOrderAmount || 0}
          className="text-white dark:text-green-100 bg-blue-500"
          loading={loadingOrderAmount}
        /></Link>


        <CardItemTwo
          mode={mode}
          currency={currency}
          title2="All Time Profit"
          Icon={ImStack}
          price={dashboardOrderAmount?.totalAmount || 0}
          className="text-white dark:text-green-100 bg-green-500"
          loading={loadingOrderAmount}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <Link to="tradelogs">
        <CardItem
          title="Total Order"
          Icon={FiShoppingCart}
          loading={loadingOrderCount}
          quantity={dashboardOrderCount?.totalOrder || 0}
          className="text-orange-600 dark:text-orange-100 bg-orange-100 dark:bg-orange-500"
        />
        </Link>
        <Link to="tradelogs">
        <CardItem
          title={t("OrderPending")}
          Icon={FiRefreshCw}
          loading={loadingOrderCount}
          quantity={dashboardOrderCount?.totalPendingOrder?.count || 0}
          amount={dashboardOrderCount?.totalPendingOrder?.total || 0}
          className="text-blue-600 dark:text-blue-100 bg-blue-100 dark:bg-blue-500"
        />        </Link>
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

      {/* <HeroCompo/> */}

      <div>
      {/* <PageTitle>Strategy Templates</PageTitle>
      <p className="text-gray-800 dark:text-gray-200 -mt-6">
        Save time and effort in building strategy, choose from the ready to use template, customize and build it
      </p> */}

      {/* <div className="flex justify-end -mt-6">
      <Link to="templates">
  
       <p className=" hover:text-blue-700 mr-4">View All <FiLink /></p>   
      
        </Link>
       
      </div> */}
    </div>
    {/* <PageTitle>Strategy Templates</PageTitle>
    <p className="text-gray-800 dark:text-gray-200 -mt-6">
        Save time and effort in building strategy, choose from the ready to use template, customize and build it
      </p> */}

    {/* <SuggestStrategy/> */}

      <div className="grid gap-4 md:grid-cols-2 my-8">
        <ChartCard
          mode={mode}
          loading={loadingOrderAmount}
          title={t("Performance Graph")}
        >
          <LineChart salesReport={salesReport} />
        </ChartCard>

        <ChartCard
          mode={mode}
          loading={loadingBestSellerProduct}
          title={t("Best Trading Trades")}
        >
          {/* <PieChart data={bestSellerProductChart} /> */}
          <InvestingChart/>
        </ChartCard>
      </div>



      {/* <Loading loading={loading} /> */}

   
    </>
  );
};

export default AdminDashboard;
