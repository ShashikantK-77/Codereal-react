import React from "react";
import {
  Card,
  CardBody,
  Input,
  Table,
  TableCell,
  TableBody,
  TableContainer,
} from "@windmill/react-ui";

import NotFound from "components/table/NotFound";
import PageTitle from "components/Typography/PageTitle";
import { useTranslation } from "react-i18next";

// Dummy data for usage reports
const dummyUsageReportsData = [
  {
    _id: "1",
    feature: "Strategy",
    user: "JohnDoe",
    actionsCount: 15,
    lastAccess: "2024-01-08T02:06:37.919Z",
  },
  // Add more dummy data entries as needed
];

const UsageReports = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>Usage Reports</PageTitle>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder={t("UsageReportsPageSearchPlaceholder")}
              />
            </div>
          </form>
        </CardBody>
      </Card>

      <TableContainer className="mb-8">
        <Table>
          <thead>
            <tr>
              <TableCell>{t("UsageReportsId")}</TableCell>
              <TableCell>{t("UsageReportsFeature")}</TableCell>
              <TableCell>{t("UsageReportsUser")}</TableCell>
              <TableCell>{t("UsageReportsActionsCount")}</TableCell>
              <TableCell>{t("UsageReportsLastAccess")}</TableCell>
            </tr>
          </thead>
          <TableBody>
            {dummyUsageReportsData.map((report) => (
              <tr key={report._id}>
                <TableCell>{report._id}</TableCell>
                <TableCell>{report.feature}</TableCell>
                <TableCell>{report.user}</TableCell>
                <TableCell>{report.actionsCount}</TableCell>
                <TableCell>{report.lastAccess}</TableCell>
              </tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {dummyUsageReportsData.length === 0 && (
        <NotFound title="No usage reports available." />
      )}

    
    </>
  );
};

export default UsageReports;
