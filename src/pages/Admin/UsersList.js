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

// Dummy data for the user list
const dummyUserData = [
  {
    _id: "1",
    username: "JohnDoe",
    email: "john.doe@example.com",
    role: "Admin",
    createdAt: "2024-01-08T02:06:37.919Z",
    updatedAt: "2024-01-08T02:06:37.919Z",
    __v: 0,
  },
  // Add more dummy data entries as needed
];

const UsersList = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>Users List</PageTitle>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
            <div className="items-center">
              {/* You can add specific components or controls related to user list here */}
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
                placeholder={t("UsersPageSearchPlaceholder")}
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
              <TableCell>{t("UserId")}</TableCell>
              <TableCell>{t("Username")}</TableCell>
              <TableCell>{t("UserEmail")}</TableCell>
              <TableCell>{t("UserRole")}</TableCell>
              <TableCell>{t("UserCreatedAt")}</TableCell>
              <TableCell className="text-right">{t("UserActions")}</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dummyUserData.map((user) => (
              <tr key={user._id}>
                <TableCell>{user._id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell className="text-right">
                  {/* Add action buttons if needed */}
                </TableCell>
              </tr>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          {/* <Pagination label="Table navigation" /> */}
        </TableFooter>
      </TableContainer>

      {/* You can add more components or controls related to user list here */}
    </>
  );
};

export default UsersList;
