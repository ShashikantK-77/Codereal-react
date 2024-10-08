import React from "react";
import {
  Card,
  CardBody,
  Input,
  Pagination,
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";

import TableLoading from "components/preloader/TableLoading";
import NotFound from "components/table/NotFound";
import PageTitle from "components/Typography/PageTitle";
import { useTranslation } from "react-i18next";

// Dummy data for export logs
const dummyExportLogsData = [
  {
    _id: "1",
    feature: "Strategy",
    user: "JohnDoe",
    action: "Export",
    timestamp: "2024-01-08T02:06:37.919Z",
  },
  // Add more dummy data entries as needed
];

const ExportLogs = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>Export Logs</PageTitle>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
            <div className="items-center">
              {/* You can add specific components or controls related to export logs here */}
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
                placeholder={t("ExportLogsPageSearchPlaceholder")}
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-5 mr-1"
              ></button>
            </div>
          </form>
        </CardBody>
      </Card>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>{t("ExportLogsId")}</TableCell>
              <TableCell>{t("ExportLogsFeature")}</TableCell>
              <TableCell>{t("ExportLogsUser")}</TableCell>
              <TableCell>{t("ExportLogsAction")}</TableCell>
              <TableCell>{t("ExportLogsTimestamp")}</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dummyExportLogsData.map((log) => (
              <tr key={log._id}>
                <TableCell>{log._id}</TableCell>
                <TableCell>{log.feature}</TableCell>
                <TableCell>{log.user}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.timestamp}</TableCell>
              </tr>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          {/* <Pagination label="Table navigation" /> */}
        </TableFooter>
      </TableContainer>

      {/* You can add more components or controls related to export logs here */}
    </>
  );
};

export default ExportLogs;
