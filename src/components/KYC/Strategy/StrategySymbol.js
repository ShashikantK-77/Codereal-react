

import React, { useState, useEffect, useContext } from "react";
import { Card, CardBody, Button } from "@windmill/react-ui";
import { useForm } from "react-hook-form";
import {
  MdOutlineNavigateNext,
  MdOutlineNavigateBefore,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { notifyError, notifySuccess } from "utils/toast";
import Previousdata from "./Previousdata";
import HeadKyc from "../HeadKyc";
import { CreateStrategyContext } from "context/CreateStrategyContext";
import logError from "hooks/useErrorLogger";
import { AdminContext } from "context/AdminContext";
import useDecodedToken from "hooks/useDecodeToken";
import { BaseUrl } from "utils/Constants";
const SymbolSelectionPage = ({
  handlePrevious,
  handleNext,
  stepperformData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },reset
  } = useForm({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [symbols, setSymbols] = useState([]);
  const [exchanges, setExchanges] = useState([]);
  const [selectedExchange, setSelectedExchange] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [exchangesAndCategories, setExchangesAndCategories] = useState({});

  const { StrategyID,selectedStrategy } = useContext(CreateStrategyContext);

  const { state } = useContext(AdminContext);
  const { zenithQuark } = state;

  const decodedToken = useDecodedToken();

  
console.log("stepperformData:",stepperformData);


  useEffect(() => {
    fetchExchangeAndCategories();
  }, []);


  useEffect(() => {
    if (selectedStrategy) {
      const { symbolSelection, actionSelection, indicators } = selectedStrategy;

      // Set the initial values if available
      setSelectedExchange(symbolSelection[0]?.exchange || "");
      setSelectedCategory(symbolSelection[0]?.category || "");
      setSelectedSymbol(symbolSelection[0]?.symbol || "");

      // Reset the form values
      reset({
        exchange: symbolSelection[0]?.exchange || "",
        category: symbolSelection[0]?.category || "",
        symbol: symbolSelection[0]?.symbol || "",
      });
    }
  }, [selectedStrategy, reset]);

  const fetchExchangeAndCategories = async () => {
    try {
      const response = await fetch(`${BaseUrl}strategy/unique-values`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${zenithQuark}`, // Replace zenithQuark with your actual token variable
        },
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
  
      if (data.is_success) {
        setExchanges(Object.keys(data.details));
        setExchangesAndCategories(data.details);
      } else {
        throw new Error(data.message || "Failed to fetch exchange and category data");
      }
    } catch (error) {
      console.error("Error fetching exchange and category data:", error.message);
      logError(error.message, 'StrategySymbol.js');
    }
  };

  const fetchSymbolsForCategory = async (category) => {
    try {
      const response = await fetch(`${BaseUrl}strategy/symbols/${selectedExchange}/${category}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${zenithQuark}`, // Replace zenithQuark with your actual token variable
        },
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
  
      if (data.is_success) {
        setSymbols(data.details.map(symbol => ({
          symbol: symbol.SEM_TRADING_SYMBOL,
          name: symbol.SEM_CUSTOM_SYMBOL || symbol.SEM_TRADING_SYMBOL
        })));
      } else {
        throw new Error(data.message || "Failed to fetch symbols");
      }
    } catch (error) {
      console.error("Error fetching symbols:", error.message);
      logError(error.message, 'StrategySymbol.js');
    }
  };
  
  

//   const handleFormSubmit = async (data) => {
//     try {
//       const formData = {
//         exchange: selectedExchange,
//         category: selectedCategory,
//         symbol: selectedSymbol,
//         StrategyID,
//         ...data,
//       };
//  // Check if required fields are present
//  if (!selectedExchange || !selectedCategory || !selectedSymbol) {
//   notifyError("Exchange, category, and symbol are required");
//   return;
// }

//       const response = await fetch(
//         "http://localhost:3001/api/saveSymbolSelection",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to save symbol selection");
//       }

//       notifySuccess("Symbol Selection Saved");

//       handleNext(formData);
//     } catch (error) {
//       console.error("Error saving symbol selection:", error);
//       logError(error.message, 'StrategySymbol.js');
//     }
//   };


const handleFormSubmit = async (data) => {
  try {
    const formData = {
      exchange: selectedExchange,
      category: selectedCategory,
      symbol: selectedSymbol,
      StrategyID:StrategyID,
      user_id: decodedToken?.user_id,
      // ...data,
    };

    // Check if required fields are present
    if (!selectedExchange || !selectedCategory || !selectedSymbol) {
      notifyError("Exchange, category, and symbol are required");
      return;
    }

    const response = await fetch(
     `${BaseUrl}strategy/saveSymbolSelection`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${zenithQuark}`, // Replace zenithQuark with your actual token variable
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to save symbol selection");
    }

    notifySuccess("Symbol Selection Saved");
    handleNext(formData);
  } catch (error) {
    console.error("Error saving symbol selection:", error);
    logError(error.message, 'StrategySymbol.js');
  }
};

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);
    fetchSymbolsForCategory(selectedCategory);
  };

  const handleExchangeChange = (e) => {
    const selectedExchange = e.target.value;
    setSelectedExchange(selectedExchange);
  };

  // const handleSymbolFilter = (input) => {
  //   const filtered = symbols.filter(
  //     (asset) =>
  //       asset.symbol.toLowerCase().startsWith(input.toLowerCase()) ||
  //       asset.name.toLowerCase().startsWith(input.toLowerCase())
  //   );
  //   setFilteredList(filtered);
  //   setSelectedSymbol(input);
  // };

  const handleSymbolFilter = (input) => {
    const filtered = symbols.filter(
      (asset) =>
        asset.symbol.toLowerCase().includes(input.toLowerCase()) ||
        asset.name.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredList(filtered);
    setSelectedSymbol(input); // This sets the current input to be displayed in the input field
  };

  
  const handleSymbolSelection = (symbol) => {
    setFilteredList([]);
    setSelectedSymbol(symbol);
    setIsDropdownOpen(false); // Close the dropdown after selecting a symbol
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Placeholder function for getSymbolName
  const getSymbolName = (symbol) => {
    // Define your logic to get the name of the symbol
    return symbol; // Placeholder logic, replace with your actual implementation
  };

  return (
    <div className="p-2">
      <Card className="w-min">
        <CardBody>
          <HeadKyc title="Symbol Selection" />

          <div className="grid lg:grid-cols-2 sm:grid-cols-1">
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="flex items-start lg:items-center m-2 lg:m-2 sm:m-0 flex-col sm:flex-row ">
                <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0 w-32">
                  Exchange:
                </label>
                <div className="w-full lg:flex-grow sm:w-full m-2 lg:m-2 flex flex-wrap">
                  {exchanges.map((exchange, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-md p-1 m-1"
                    >
                      <input
                        type="radio"
                        id={exchange}
                        name="exchange"
                        value={exchange}
                        onChange={handleExchangeChange}
                        className="h-4 w-4 text-green-500 border-gray-300 focus:ring-green-400 mx-2 p-1 rounded focus:outline-none"
                        checked={selectedExchange === exchange}
                      />
                      <label
                        htmlFor={exchange}
                        className="px-4 py-2 rounded cursor-pointer transition duration-300 ease-in-out
                        focus:bg-green-200 dark:bg-gray-700 hover:bg-green-200 dark:hover:bg-gray-700"
                      >
                        {exchange}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-start lg:items-center m-2 lg:m-2 sm:m-0 flex-col sm:flex-row">
                <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0 w-32">
                  Category:
                </label>
                <div className="w-full lg:flex-grow sm:w-full m-2 lg:m-2 flex flex-wrap">
                  {exchangesAndCategories[selectedExchange]?.map(
                    (category, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-md p-1 m-1"
                      >
                        <input
                          type="radio"
                          id={category}
                          name="category"
                          value={category}
                          onChange={handleCategoryChange}
                          className="h-4 w-4 text-green-500 border-gray-300 focus:ring-green-400 mx-2 p-1 rounded focus:outline-none"
                          checked={selectedCategory === category}
                          disabled={!selectedExchange}
                        />
                        <label
                          htmlFor={category}
                          className="px-4 py-2 rounded cursor-pointer transition duration-300 ease-in-out focus:bg-green-200
                          dark:bg-gray-700 hover:bg-green-200 dark:hover:bg-gray-700"
                        >
                          {category}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* {symbols.length > 0 && (
                <div className="flex items-start lg:items-center m-2 lg:m-2 sm:m-0 flex-col sm:flex-row">
                  <label
                    className="block text-sm font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0"
                    style={{ width: "155px" }}
                  >
                    Symbol:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={selectedSymbol}
                      className="border px-4 h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border"
                      disabled={!selectedExchange || !selectedCategory}
                      onChange={(e) => handleSymbolFilter(e.target.value)}
                    />

                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <MdKeyboardArrowDown
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                        onClick={toggleDropdown}
                      />
                    </div>

                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 w-full max-h-48 overflow-y-auto bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-600 shadow-lg rounded-b-md z-[100]">
                   
                        {symbols.map((asset, index) => (
  <div
    key={index}
    className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
    onClick={() => handleSymbolSelection(asset.symbol)}
  >
    <span className="font-medium">{asset.symbol}</span>{" "}
    -{" "}
    <span className="text-xs">
      {asset.name}
    </span>
  </div>
))}

                      </div>
                    )}
                  </div>
                </div>
              )} */}


              {symbols.length > 0 && (
                <div className="flex items-start lg:items-center m-2 lg:m-2 sm:m-0 flex-col sm:flex-row">
                  <label
                    className="block text-sm font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0"
                    style={{ width: "155px" }}
                  >
                    Symbol:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={selectedSymbol}
                      className="border px-4 h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border"
                      disabled={!selectedExchange || !selectedCategory}
                      onChange={(e) => handleSymbolFilter(e.target.value)}
                    />

                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <MdKeyboardArrowDown
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                        onClick={toggleDropdown}
                      />
                    </div>

                    {isDropdownOpen && filteredList.length > 0 && (
                      <div className="absolute top-full left-0 w-full max-h-48 overflow-y-auto bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-600 shadow-lg rounded-b-md z-[100]">
                        {/* Render filtered symbols dynamically */}
                        {filteredList.map((asset, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => handleSymbolSelection(asset.symbol)}
                          >
                            <span className="font-medium">{asset.symbol}</span>{" "}
                            -{" "}
                            <span className="text-xs">
                              {asset.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}


              {errors.symbol && (
                <span className="text-sm text-red-500">
                  Symbol is required
                </span>
              )}

              {/* <div className="flex items-center justify-between mt-4">
                <Button
                  className="w-min"
                  size="small"
                  iconLeft={MdOutlineNavigateBefore}
                  onClick={handlePrevious}
                >
                  Previous
                </Button>
                <Button
                  className="w-min"
                  size="small"
                  type="submit"
                  iconRight={MdOutlineNavigateNext}
                >
                  Next
                </Button>
              </div> */}

              <div className="flex justify-center m-3">
                  <Button className="px-4" onClick={handlePrevious}>
                    <MdOutlineNavigateBefore /> Previous
                  </Button>
                  <Button type="submit" className="mx-4">
                    Next <MdOutlineNavigateNext />
                  </Button>
                </div>
            </form>

            <div>
              <Previousdata stepperformData={stepperformData} />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default SymbolSelectionPage;
