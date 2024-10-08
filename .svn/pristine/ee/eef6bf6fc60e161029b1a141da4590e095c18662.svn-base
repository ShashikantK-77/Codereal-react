import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Input,
  Label,
  Select,
  Button,
} from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import CustomerServices from "services/CustomerServices";

const MasterAccnt = ({setMasterAccount}) => {
  const [masterAccounts, setMasterAccounts] = useState([]);
  const [selectedMasterAccount, setSelectedMasterAccount] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    // Fetch master account data and store in state
    const fetchMasterAccounts = async () => {
      try {
        // const data = await CustomerServices.getMasterAccounts(); // Replace with your API call to get master accounts
        const data = localStorage.getItem('masterlist')
        const list = data ? JSON.parse(data) : [];
        setMasterAccounts(list);

      } catch (error) {
        // Handle error
      }
    };
    fetchMasterAccounts();
  }, []);

  // console.log(masterAccounts);
//   console.log(selectedMasterAccount);
// alert(selectedMasterAccount)
setMasterAccount(selectedMasterAccount);
  // const handlePlaceOrder = () => {
  //   // Use the selectedMasterAccount value in your order placement logic
  //   console.log("Selected Master Account:", selectedMasterAccount);
  //   // Rest of the order placement logic here...
  // };

  return (
    <Card className="p-1 mb-4">
      <CardBody>
        {/* <h1 className="text-xl font-semibold mb-4">{t("PlaceOrder")}</h1> */}
        <div className="mb-2">
          <Label>{t("SelectMasterAccount")}</Label>
          <Select
            className="mt-1"
            value={selectedMasterAccount}
            onChange={(e) => setSelectedMasterAccount(e.target.value)}
          >
            <option value="">{t("Please Select Master Account")}</option>
            {masterAccounts.map((account) => (
              <option key={account.UniqueKey} value={account.Account_Name}>
                {account.Account_Name}
              </option>
            ))}
            {/* <option value="sdcd">Master Account one</option>
            <option value="sdcd">Master Account two</option>
            <option value="sdcd">Master Account three</option>
            <option value="sdcd">Master Account four</option> */}
          </Select>
        </div>
        {/* Rest of your place order form */}
        {/* <div className="mt-4">
          <Button onClick={handlePlaceOrder}>{t("PlaceOrderButton")}</Button>
        </div> */}
      </CardBody>
    </Card>
  );
};

export default MasterAccnt;
