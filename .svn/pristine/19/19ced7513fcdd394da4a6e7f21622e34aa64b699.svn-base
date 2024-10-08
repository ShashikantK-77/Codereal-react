import React from "react";
import {
    Card,
    CardBody,
    Input,
    Pagination,  // Make sure this is imported
    Table,
    TableCell,
    TableBody,
    TableContainer,
    TableFooter,
    TableHeader,
  } from "@windmill/react-ui";
  

  import {   TableRow } from "@windmill/react-ui";

import TableLoading from "components/preloader/TableLoading";
import NotFound from "components/table/NotFound";
import PageTitle from "components/Typography/PageTitle";
import { useTranslation } from "react-i18next";
import Status from "components/table/Status";

const dummyStrategyData = [
  {
    _id: "1",
    name: "Active Strategy 1",
    status: "Active",
    description: "Description for Active Strategy 1",
    createdAt: "2024-01-08T02:06:37.919Z",
    updatedAt: "2024-01-08T02:06:37.919Z",
    __v: 0,
  },
  // Add more dummy data entries as needed
];

const Strategydata = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>Strategy List</PageTitle>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
            <div className="items-center">
              {/* You can add specific components or controls related to strategy here */}
            </div>
          </form>
        </CardBody>
      </Card>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder={t("StrategiesPageSearchPlaceholder")}
              />
              <button type="submit" className="absolute right-0 top-0 mt-5 mr-1"></button>
            </div>
          </form>
        </CardBody>
      </Card>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>{t("StrategyId")}</TableCell>
              <TableCell>{t("StrategyName")}</TableCell>
              <TableCell>{t("StrategyStatus")}</TableCell>
              <TableCell>{t("StrategyDescription")}</TableCell>
              <TableCell>{t("StrategyCreatedAt")}</TableCell>
              <TableCell className="text-right">{t("StrategyActions")}</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dummyStrategyData.map((strategy) => (
              <tr key={strategy._id}>
                <TableCell>{strategy._id}</TableCell>
                <TableCell>{strategy.name}</TableCell>
                <TableCell>
                <Status status={strategy.status} />
                </TableCell>
                <TableCell>{strategy.description}</TableCell>
                <TableCell>{strategy.createdAt}</TableCell>
                <TableCell className="text-right">
                  {/* Add action buttons if needed */}
                </TableCell>
              </tr>
            ))}
          </TableBody>
        </Table>
        {/* <TableFooter>
          <Pagination label="Table navigation" />
        </TableFooter> */}
      </TableContainer>

      {/* You can add more components or controls related to strategy here */}
    </>
  );
};

export default Strategydata;
