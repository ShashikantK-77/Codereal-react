import React, { useState, useEffect, useContext } from "react";
import { Card, CardBody, Button } from "@windmill/react-ui";

import HeadKyc from "components/KYC/HeadKyc";
import Inputfields from "components/KYC/Inputfields";
import Error from "components/form/Error";
import useStrategySubmit from "hooks/useStrategySubmit";
import { MdOutlineNavigateNext } from "react-icons/md";
import { notifySuccess } from "utils/toast";
import { useForm } from "react-hook-form";
import useStepperRecord from "hooks/useStepperRecord";
import { CreateStrategyContext } from "context/CreateStrategyContext";
import { useListContext } from "context/ListContext";

const AssetsSelection = ({ handleNext }) => {
  const [strategyName, setStrategyName] = useState("");
  const [Description, setDescription] = useState("");
  const [Symbol, setSymbol] = useState("");
  const [availableStocks, setAvailableStocks] = useState([]);

  const { UniqueID } = useContext(CreateStrategyContext);
  const { WorkingStrategy } = useListContext();

  console.log("WorkingStrategy in asset selection:", WorkingStrategy);
  const { assets } = useStepperRecord(WorkingStrategy);

  const {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    reset,
  } = useForm({});

  const fetchAvailableStocks = async (exchange) => {
    try {
      const response = await fetch(
        "https://paper-api.alpaca.markets/v2/assets",
        {
          headers: {
            "APCA-API-KEY-ID": "PKYP9KGLKLIKTFU54DC5",
            "APCA-API-SECRET-KEY": "KQNI9rUdhvhP5qRQxl2oMwHAYrlVkfJDrT4AxPcT",
          },
        }
      );
      const stocks = response.data;
      setAvailableStocks(stocks);
    } catch (error) {
      console.error("Error fetching available stocks:", error);
    }
  };

  const fetchAssets = async () => {
    try {
      const response = await fetch(
        "https://paper-api.alpaca.markets/v2/assets",
        {
          headers: {
            "APCA-API-KEY-ID": "PKSWP5Z6U0OS356MGMBG",
            "APCA-API-SECRET-KEY": "huu1EiruE2Bf4QcXHg6y0fh6IklCthnonehQOf60",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setAvailableStocks(data);
      } else {
        console.error("Failed to fetch assets");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFormSubmit = (data) => {
    const formattedData = {
      strategyName,
      Description,
      Symbol,
      UniqueID,
      ...data,
    };

    const filteredData = Object.fromEntries(
      Object.entries(formattedData).filter(([_, value]) => value !== "")
    );

    console.log("Data to be stored in local storage:", filteredData);

    const existingData = localStorage.getItem("assetselection");

    if (existingData) {
      const parsedData = JSON.parse(existingData);
      const updatedData = [...parsedData, filteredData];
      localStorage.setItem("assetselection", JSON.stringify(updatedData));
    } else {
      localStorage.setItem("assetselection", JSON.stringify([filteredData]));
    }

    notifySuccess("Scrip Selection Saved");
    handleNext();
  };

  const handleSymbolChange = (e) => {
    setSymbol(e.target.value);
  };

  return (
    <div className="p-2">
      <Card className="w-min">
        <CardBody>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <HeadKyc title="Scrip Selection" />
            <div className="grid lg:grid-cols-2 sm:grid-cols-1">
              <div className="flex flex-col justify-center">
                <Inputfields
                  register={register}
                  label={"Strategy Name"}
                  name={"strategyName"}
                  placeholder={"Enter Strategy Name"}
                  value={strategyName}
                  onChange={(e) => setStrategyName(e.target.value)}
                />
                {errors.strategyName && (
                  <Error
                    style={{ marginTop: "-2rem" }}
                    errorName={errors.strategyName}
                  />
                )}
              </div>
            </div>

            <div className="grid lg:grid-cols-2 sm:grid-cols-1">
              <div className="flex flex-col justify-center">
                <Inputfields
                  register={register}
                  label={"Strategy Description"}
                  name={"strategyDescription"}
                  placeholder={"Enter Strategy Description"}
                  value={Description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className='flex items-start lg:items-center  m-2 lg:m-2 sm:m-0 flex-col sm:flex-row'>
              <label className="block text-sm  font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0" style={{ width: '155px' }}>
                Symbol:
              </label>
              <div className=' w-full lg:flex-grow sm:w-full'>
                <select
                  name="Symbol"
                label="Symbol"
                className="border px-4  h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border"
                value={Symbol} // Set the value to the state
                onChange={handleSymbolChange} // Call handleSymbolChange on change
                >
                  <option value="">-- Select --</option>
                  <option value="AAPL">AAPL</option>
                  <option value="MSFT">MSFT</option>
                </select>
                <div></div>
              </div>
            </div>

            <div className="flex justify-center mx-3 ">
              <Button type="submit" className="mx-4 text-white">
                Submit & Next <MdOutlineNavigateNext className="font-bold" />
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AssetsSelection;
