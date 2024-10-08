import React, { useState, useEffect } from "react";
import { Card, CardBody, Button } from "@windmill/react-ui";
import Error from "components/form/Error";
import { useForm } from "react-hook-form";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { notifySuccess } from "utils/toast";
import Previousdata from "./Previousdata";
import HeadKyc from "../HeadKyc";

const SymbolSelectionPage = ({
  handlePrevious,
  handleNext,
  stepperformData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [symbols, setSymbols] = useState([]);
  const [exchanges, setExchanges] = useState([
    "OTC",
    "NYSE",
    "NASDAQ",
    "ARCA",
    "AMEX",
    "BATS",
  ]);
  const [selectedExchange, setSelectedExchange] = useState("");
  const [first1000Assets, setFirst1000Assets] = useState([]);
  console.log("stepperformData:", stepperformData);
  useEffect(() => {
    fetchAlpacaAssets();
  }, []);

  const fetchAlpacaAssets = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/alpaca-assets");
      if (!response.ok) {
        throw new Error("Failed to fetch Alpaca assets");
      }
      const data = await response.json();
      const first1000AssetsData = data.slice(0, 300);
      console.log("Alpaca assets (first 1000):", first1000AssetsData);

      const uniqueExchangesSet = new Set(
        first1000AssetsData.map((asset) => asset.exchange)
      );
      const uniqueExchanges = Array.from(uniqueExchangesSet);
      // console.log("Unique Exchanges:", uniqueExchanges);
      setExchanges(uniqueExchanges);

      // Set symbols based on the default exchange and category
      setSelectedExchange(uniqueExchanges[0]);
      setSelectedCategory("stocks"); // Default category
      const symbolsForDefaultExchange = first1000AssetsData
        .filter((asset) => asset.exchange === uniqueExchanges[0])
        .map((asset) => asset.symbol);
      setSymbols(symbolsForDefaultExchange);
      setFirst1000Assets(first1000AssetsData);
    } catch (error) {
      console.error("Error fetching Alpaca assets:", error.message);
    }
  };

  const handleFormSubmit = (data) => {
    const formData = {
      exchange: selectedExchange,
      category: selectedCategory,
      symbol: data.Symbol,
      ...data, // Include additional form data if any
    };

    // Handle form submission
    notifySuccess("Symbol Selection Saved");
    handleNext(formData);
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);
    fetchSymbolsForCategory(selectedCategory);
  };

  const fetchSymbolsForCategory = async (category) => {
    let symbols = [];
    switch (category) {
      case "stocks":
        symbols = ["AAPL", "GOOGL", "MSFT", "TSLA"];
        break;
      case "indexes":
        symbols = [
          "Nifty 50",
          "S&P 500",
          "Dow Jones",
          "NASDAQ",
          "Nifty Infrastructure",
          "Nifty Bank",
        ];
        break;
      case "options":
        symbols = ["Call Option", "Put Option", "Straddle", "Strangle"];
        break;
      case "futures":
        symbols = ["Crude Oil", "Gold", "Corn", "Euro FX"];
        break;
      default:
        symbols = [];
        break;
    }
    setSymbols(symbols);
  };

  const handleExchangeChange = (e) => {
    const selectedExchange = e.target.value;
    setSelectedExchange(selectedExchange);
    const symbolsForExchange = first1000Assets
      .filter((asset) => asset.exchange === selectedExchange)
      .map((asset) => asset.symbol);
    setSymbols(symbolsForExchange);
  };

  return (
    <div className="p-2">
      <Card className="w-min">
        <CardBody>
          <HeadKyc title="Symbol Selection" />

          <div className="grid lg:grid-cols-2 sm:grid-cols-1">
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              {/* <div className="grid lg:grid-cols-2 sm:grid-cols-1"> */}

              <div className="flex items-start lg:items-center m-2 lg:m-2 sm:m-0 flex-col sm:flex-row">
                <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0 w-32">
                  Exchange:
                </label>
               
                <div className="w-full lg:flex-grow sm:w-full m-1 lg:m-2 flex flex-wrap ">
                  {exchanges.map((exchange, index) => (
                    <div key={index} className="flex items-center space-x-1  bg-gray-100 dark:bg-gray-800 rounded-md p-1 m-1">
                      <input
                        type="radio"
                        id={exchange}
                        name="exchange"
                        value={exchange}
                        onChange={handleExchangeChange}
                        className="h-4 w-4 text-green-500 border-gray-300 focus:ring-green-400 mx-2  p-1 rounded focus:outline-none"
                        checked={selectedExchange === exchange}
                      />
                      <label
                        htmlFor={exchange}
                        className=" px-4 py-2 rounded cursor-pointer transition duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        {exchange}
                      </label>
                    </div>
                  ))}
                </div>

              </div>

              {/* </div> */}

              {/* <div className="grid lg:grid-cols-2 sm:grid-cols-1"> */}
              <div className="flex items-start lg:items-center m-2 lg:m-2 sm:m-0 flex-col sm:flex-row">
                <label
                  className="block text-sm font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0"
                  style={{ width: "155px" }}
                >
                  Category:
                </label>
                <div className="w-full lg:flex-grow sm:w-full m-2 lg:m-2 flex">
                  <div className="flex items-center space-x-1  bg-gray-100 dark:bg-gray-800 rounded-md p-1 m-1">
                    <input
                      type="radio"
                      id="stocks"
                      name="category"
                      value="stocks"
                      onChange={handleCategoryChange}
                      className="h-4 w-4 text-green-500 border-gray-300 focus:ring-green-400 mx-2 bg-gray-100 dark:bg-gray-800 p-1 rounded"
                      checked={selectedCategory === "stocks"}
                    />
                    <label
                      htmlFor="stocks"
                      className="bg-gray-100 dark:bg-gray-800 p-1 rounded"
                    >
                      Stocks
                    </label>
                  </div>
                  <div className="flex items-center space-x-1  bg-gray-100 dark:bg-gray-800 rounded-md p-1 m-1">
                    <input
                      type="radio"
                      id="indexes"
                      name="category"
                      value="indexes"
                      onChange={handleCategoryChange}
                      className="h-4 w-4 text-green-500 border-gray-300 focus:ring-green-400 mx-2 bg-gray-100 dark:bg-gray-800 p-1 rounded"
                      checked={selectedCategory === "indexes"}
                    />
                    <label
                      htmlFor="indexes"
                      className="bg-gray-100 dark:bg-gray-800 p-1 rounded"
                    >
                      Indexes
                    </label>
                  </div>
                  <div className="flex items-center space-x-1  bg-gray-100 dark:bg-gray-800 rounded-md p-1 m-1">
                    <input
                      type="radio"
                      id="options"
                      name="category"
                      value="options"
                      onChange={handleCategoryChange}
                      className="h-4 w-4 text-green-500 border-gray-300 focus:ring-green-400 mx-2 bg-gray-100 dark:bg-gray-800 p-1 rounded"
                      checked={selectedCategory === "options"}
                    />
                    <label
                      htmlFor="options"
                      className="bg-gray-100 dark:bg-gray-800 p-1 rounded"
                    >
                      Options
                    </label>
                  </div>
                  <div className="flex items-center space-x-1  bg-gray-100 dark:bg-gray-800 rounded-md p-1 m-1">
                    <input
                      type="radio"
                      id="futures"
                      name="category"
                      value="futures"
                      onChange={handleCategoryChange}
                      className="h-4 w-4 text-green-500 border-gray-300 focus:ring-green-400 mx-2 bg-gray-100 dark:bg-gray-800 p-1 rounded"
                      checked={selectedCategory === "futures"}
                    />
                    <label
                      htmlFor="futures"
                      className="bg-gray-100 dark:bg-gray-800 p-1 rounded"
                    >
                      Futures
                    </label>
                  </div>
                </div>
              </div>
              {/* </div> */}

              {symbols.length > 0 && (
                <div className="flex items-start lg:items-center m-2 lg:m-2 sm:m-0 flex-col sm:flex-row">
                  <label
                    className="block text-sm font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0"
                    style={{ width: "155px" }}
                  >
                    Symbol:
                  </label>


                  {/* <div className="w-full lg:flex-grow sm:w-full m-2 lg:m-2">
                    <select
                      {...register("Symbol")}
                      className="border px-4 h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border"
                      disabled={!selectedExchange || !selectedCategory}
                    >
                      <option value="">-- Select Symbol --</option>
                      {symbols.map((symbol, index) => (
                        <option key={index} value={symbol}>
                          {symbol}
                        </option>
                      ))}
                    </select>
                    {errors.Symbol && (
                      <Error
                        style={{ marginTop: "-2rem" }}
                        errorName={errors.Symbol}
                      />
                    )}
                  </div> */}

                  {/* <div className="w-full lg:flex-grow sm:w-full m-2 lg:m-2">
                  <input
                    type="text"
                    {...register("Symbol")}
                    className="border px-4 h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border"
                    disabled={!selectedExchange || !selectedCategory}
                    // value={selectedSymbol}
                    // onChange={(e) => setSelectedSymbol(e.target.value)}
                  />
                  {errors.Symbol && (
                    <Error
                      style={{ marginTop: "-2rem" }}
                      errorName={errors.Symbol}
                    />
                  )}
                </div> */}

                <div className="w-full lg:flex-grow sm:w-full m-2 lg:m-2 relative">
  {/* Input field */}
  <input
    type="text"
    {...register("Symbol")}
    className="border px-4 h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border"
    disabled={!selectedExchange || !selectedCategory}
    onClick={() => {
      // When input field is clicked, focus on the hidden select element
      document.getElementById("symbolDropdown").focus();
    }}
  />
  {errors.Symbol && (
    <Error
      style={{ marginTop: "-2rem" }}
      errorName={errors.Symbol}
    />
  )}
  
  {/* Hidden select dropdown */}
  <select
    id="symbolDropdown"
    className="absolute inset-0 opacity-0 cursor-pointer"
    onChange={(e) => {
      // Update the input field value when an option is selected from the dropdown
      const selectedSymbol = e.target.value;
      document.getElementById("symbolInput").value = selectedSymbol;
    }}
  >
    <option value="">-- Select Symbol --</option>
    {symbols.map((symbol, index) => (
      <option key={index} value={symbol}>
        {symbol}
      </option>
    ))}
  </select>
</div>

                </div>
              )}

              {/* <div className="flex justify-center m-3">
              <Button type="submit" className="mx-4">
                Next <MdOutlineNavigateNext />
              </Button>
            </div> */}

              <div className="flex  justify-center m-3  ">
                <Button className="px-4" onClick={handlePrevious}>
                  <MdOutlineNavigateBefore /> Previous
                </Button>
                <Button type="submit" className="mx-4">
                  Next <MdOutlineNavigateNext />
                </Button>
              </div>
            </form>
            <Previousdata stepperformData={stepperformData} />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default SymbolSelectionPage;
