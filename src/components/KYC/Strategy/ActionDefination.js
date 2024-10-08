import React, { useState, useContext, useEffect } from "react";
import { Card, CardBody, Button } from "@windmill/react-ui";
import HeadKyc from "components/KYC/HeadKyc";
import useKycSubmit from "hooks/useKycSubmit";
import Inputfields from "../Inputfields";
import Error from "components/form/Error";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { notifyError, notifySuccess } from "utils/toast";
import { CreateStrategyContext } from "context/CreateStrategyContext";
import useStepperRecord from "hooks/useStepperRecord";
import Previousdata from "./Previousdata";
import logError from "hooks/useErrorLogger";
import useDecodedToken from "hooks/useDecodeToken";
import { AdminContext } from "context/AdminContext";
import { useForm } from "react-hook-form";
import { BaseUrl } from "utils/Constants";

const ActionDefination = ({ handleNext, handlePrevious, stepperformData }) => {
  const { StrategyID, selectedStrategy } = useContext(CreateStrategyContext);
  const { updateCurrentStepForUniqueID } = useStepperRecord();
 
  const [Action, setAction] = useState("");
  const [ActionType, setActionType] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [LimitPrice, setLimitPrice] = useState("");
  const [CoverPrice, setCoverPrice] = useState("");
  const [CoverStopLoss, setCoverStopLoss] = useState("");
  const [CoverTriggerPrice, setCoverTriggerPrice] = useState("");
  const [TriggerPriceAt, setTriggerPriceAt] = useState("");
  const [TriggerTriggerPrice, setTriggerTriggerPrice] = useState("");
  const [BracketPriceAt, setBracketPriceAt] = useState("");
  const [BracketTarget, setBracketTarget] = useState("");
  const [BracketStopLoss, setBracketStopLoss] = useState("");

  const [Bookprofit, setBookprofit] = useState("");
  const [Stoploss, setStoploss] = useState("");

  const [isTimeEnabled, setIsTimeEnabled] = useState(false);
  const [StartTime, setStartTime] = useState("09:00");
  const [EndTime, setEndTime] = useState("15:30");
  const [timeError, setTimeError] = useState("");
  const [executionCount, setExecutionCount] = useState("");
  const [StartDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [EndDate, setEndDate] = useState(
    new Date(new Date().setFullYear(new Date().getFullYear() + 20))
      .toISOString()
      .split("T")[0]
  );
  const [dateError, setDateError] = useState("");
  // const { reset } = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },reset
  } = useForm({});
  // Helper function to validate the time range
  const isValidTime = (start, end) => {
    const minTime = "09:00";
    const maxTime = "15:30";
    return (
      start >= minTime &&
      start <= maxTime &&
      end >= minTime &&
      end <= maxTime &&
      start < end
    );
  };

  const handleStartTimeChange = (e) => {
    const selectedStartTime = e.target.value;
    if (isValidTime(selectedStartTime, EndTime)) {
      setStartTime(selectedStartTime);
      setTimeError("");
    } else {
      setTimeError(
        "Start time must be between 9:00 AM and 3:30 PM and earlier than end time."
      );
    }
  };

  const handleEndTimeChange = (e) => {
    const selectedEndTime = e.target.value;
    if (isValidTime(StartTime, selectedEndTime)) {
      setEndTime(selectedEndTime);
      setTimeError("");
    } else {
      setTimeError(
        "End time must be between 9:00 AM and 3:30 PM and later than start time."
      );
    }
  };
  // const { actionSelection } = selectedStrategy;
  const actionSelection = selectedStrategy ? selectedStrategy.actionSelection : null;

console.log("actionSelection:",actionSelection);
  useEffect(() => {
    if (selectedStrategy) {
      const { actionSelection } = selectedStrategy;
      
      // Check if actionSelection has at least one item
      const firstActionSelection =
        actionSelection.length > 0 ? actionSelection[0] : {};

      // Set state values
      setAction(firstActionSelection.action || "");
      setActionType(firstActionSelection.order_type || "");
      setQuantity(firstActionSelection.quantity || "");
      setLimitPrice(firstActionSelection.limit_price || "");
      setCoverPrice(firstActionSelection.cover_price || "");
      setCoverStopLoss(firstActionSelection.coverStopLoss || "");
      setCoverTriggerPrice(firstActionSelection.coverTriggerPrice || "");
      setTriggerPriceAt(firstActionSelection.triggerPriceAt || "");
      setTriggerTriggerPrice(firstActionSelection.triggerTriggerPrice || "");
      setBracketPriceAt(firstActionSelection.bracket_price_at || "");
      setBracketTarget(firstActionSelection.bracket_target || "");
      setBracketStopLoss(firstActionSelection.bracket_stop_loss || "");

      setBookprofit(firstActionSelection.target_percent || "");
      setStoploss(firstActionSelection.stoploss_percent || "");
    


      setIsTimeEnabled(firstActionSelection.isTimeEnabled || false);
      setStartTime(firstActionSelection.startTime || "09:00");
      setEndTime(firstActionSelection.endTime || "15:30");
      setExecutionCount(firstActionSelection.execution_count || "");
      setStartDate(
        firstActionSelection.start_date || new Date().toISOString().split("T")[0]
      );
      setEndDate(
        firstActionSelection.end_date ||
          new Date(new Date().setFullYear(new Date().getFullYear() + 20))
            .toISOString()
            .split("T")[0]
      );

      // Reset form values
      reset({
        Action: firstActionSelection.action || "",
        ActionType: firstActionSelection.actionType || "",
        Quantity: firstActionSelection.quantity || "",
        LimitPrice: firstActionSelection.limitPrice || "",
        CoverPrice: firstActionSelection.coverPrice || "",
        CoverStopLoss: firstActionSelection.coverStopLoss || "",
        CoverTriggerPrice: firstActionSelection.coverTriggerPrice || "",
        TriggerPriceAt: firstActionSelection.triggerPriceAt || "",
        TriggerTriggerPrice: firstActionSelection.triggerTriggerPrice || "",
        BracketPriceAt: firstActionSelection.bracketPriceAt || "",
        BracketTarget: firstActionSelection.bracketTarget || "",
        BracketStopLoss: firstActionSelection.bracketStopLoss || "",
        isTimeEnabled: firstActionSelection.isTimeEnabled || false,
        Bookprofit:firstActionSelection.target_percent || "",
        Stoploss:firstActionSelection.stoploss_percent || "",

        StartTime: firstActionSelection.startTime || "09:00",
        EndTime: firstActionSelection.endTime || "15:30",
        executionCount: firstActionSelection.executionCount || "",
        StartDate:
          firstActionSelection.startDate ||
          new Date().toISOString().split("T")[0],
        EndDate:
          firstActionSelection.endDate ||
          new Date(new Date().setFullYear(new Date().getFullYear() + 20))
            .toISOString()
            .split("T")[0],
      });
    }
  }, [selectedStrategy, reset]);

  const { state } = useContext(AdminContext);
  const { zenithQuark } = state;

  const decodedToken = useDecodedToken();

  const handleStartDateChange = (e) => {
    const selectedStartDate = e.target.value;
    setStartDate(selectedStartDate);
    const defaultEndDate = new Date(selectedStartDate);
    defaultEndDate.setFullYear(defaultEndDate.getFullYear() + 20);
    setEndDate(defaultEndDate.toISOString().split("T")[0]);
  };

  const isValidDate = (start, end) => {
    return new Date(start) <= new Date(end);
  };

  const handleEndDateChange = (e) => {
    const selectedEndDate = e.target.value;
    if (isValidDate(StartDate, selectedEndDate)) {
      setEndDate(selectedEndDate);
      setDateError("");
    } else {
      setDateError("End date must be later than or equal to start date.");
    }
  };

  // const { errors, register, handleSubmit, onSubmit } = useKycSubmit();

  const handleFormSubmit = async (data) => {
    console.log("in handleFormSubmit ActionDefination:",data);
    const formData = {
      Action,
      ActionType,
      Quantity,
      LimitPrice,
      CoverPrice,
      CoverStopLoss,
      CoverTriggerPrice,
      TriggerPriceAt,
      TriggerTriggerPrice,
      BracketPriceAt,
      BracketTarget,
      BracketStopLoss,
      StrategyID: StrategyID,
      Bookprofit,
      Stoploss,
      StartTime,
      EndTime,
      executionCount,
      StartDate,
      EndDate,
      user_id: decodedToken?.user_id, // Ensure user_id is provided here
      ...data,
    };

    const filteredFormData = Object.fromEntries(
      Object.entries(formData).filter(
        ([key, value]) => value !== null && value !== ""
      )
    );

    try {
      const response = await fetch(`${BaseUrl}strategy/actiondefinition`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${zenithQuark}`, // Replace zenithQuark with your actual token variable
          },
          body: JSON.stringify(filteredFormData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit action definition");
      }

      const responseData = await response.json();
      notifySuccess("Action Definition Submitted");
      handleNext(formData);
    } catch (error) {
      console.error("Error submitting action definition:", error.message);
      logError(error.message, "ActionDefination.js");
    }
  };

  console.log("stepperformData:", stepperformData);

  return (
    <div className="p-2">
      <Card className="w-min">
        <CardBody>
          <HeadKyc title="Order" />
          <div className="grid lg:grid-cols-2 sm:grid-cols-1">
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="flex flex-col justify-center">
                <div className="flex items-start lg:items-center m-2 lg:m-2 sm:m-0 flex-col sm:flex-row">
                  <label
                    className="block text-sm font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0"
                    style={{ width: "155px" }}
                  >
                    Action:
                  </label>
                  <div className="w-full lg:flex-grow sm:w-full m-2 lg:m-2 flex">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-md p-1 m-1">
                        <input
                          type="radio"
                          id="buy"
                          name="Action"
                          value="buy"
                          checked={Action === "buy"}
                          onChange={(e) => setAction(e.target.value)}
                          className="h-4 w-4 text-green-500 border-gray-300 focus:ring-green-400 mx-2 p-1 rounded focus:outline-none"
                        />
                        <label
                          htmlFor="buy"
                          className="px-4 py-2 rounded cursor-pointer transition duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                          Buy
                        </label>
                      </div>
                      <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-md p-1 m-1">
                        <input
                          type="radio"
                          id="sell"
                          name="Action"
                          value="sell"
                          checked={Action === "sell"}
                          onChange={(e) => setAction(e.target.value)}
                          className="h-4 w-4 text-green-500 border-gray-300 focus:ring-green-400 mx-2 p-1 rounded focus:outline-none"
                        />
                        <label
                          htmlFor="sell"
                          className="px-4 py-2 rounded cursor-pointer transition duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                          Sell
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start lg:items-center m-2 lg:m-2 sm:m-0 flex-col sm:flex-row">
                  <label
                    className="block text-sm font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0"
                    style={{ width: "155px" }}
                  >
                    executionCount:
                  </label>
                  <div className="w-12/12">
                    <select
                      name="executionCount"
                      value={executionCount}
                      onChange={(e) => setExecutionCount(e.target.value)}
                      className="border px-4 h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border"
                    >
                      <option value="">-- Select --</option>
                      <option value="1">Once in a day</option>
                      <option value="2">Twice in a day</option>
                      <option value="3">Three times in a day</option>
                      <option value="4">Four times in a day</option>
                      <option value="5">Five times in a day</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex items-start lg:items-center m-2 lg:m-2 sm:m-0 flex-col sm:flex-row">
                    <label
                      className="block text-sm font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0"
                      style={{ width: "155px" }}
                    >
                      Enable Time:
                    </label>
                    <input
                      type="checkbox"
                      checked={isTimeEnabled}
                      onChange={(e) => setIsTimeEnabled(e.target.checked)}
                      className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <p className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      Market timing is between 9:30 AM and 3:30 PM. You can
                      customize your timing.
                    </p>
                  </div>

                  {isTimeEnabled && (
                    <>
                      <div className="flex">
                        <div className="flex items-start lg:items-center m-2 lg:m-2 sm:m-0 flex-col sm:flex-row">
                          <label
                            className="block text-sm font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0"
                            style={{ width: "155px" }}
                          >
                            Start Time:
                          </label>
                          <input
                            type="time"
                            value={StartTime}
                            onChange={handleStartTimeChange}
                            min="09:00"
                            max="16:00"
                            className="border px-4 h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border"
                          />
                        </div>

                        <div className="flex items-start lg:items-center m-2 lg:m-2 sm:m-0 flex-col sm:flex-row">
                          <label
                            className="block text-sm font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0"
                            style={{ width: "115px" }}
                          >
                            End Time:
                          </label>
                          <input
                            type="time"
                            value={EndTime}
                            onChange={handleEndTimeChange}
                            min="09:00"
                            max="16:00"
                            className="border px-4 h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border"
                          />
                        </div>
                      </div>

                      <div className="flex">
                        <div className="flex items-start lg:items-center m-2 lg:m-2 sm:m-0 flex-col sm:flex-row">
                          <label
                            className="block text-sm font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0"
                            style={{ width: "155px" }}
                          >
                            Start Date:
                          </label>
                          <input
                            type="date"
                            value={StartDate}
                            onChange={handleStartDateChange}
                            className="border px-4 h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border"
                          />
                        </div>

                        <div className="flex items-start lg:items-center m-2 lg:m-2 sm:m-0 flex-col sm:flex-row">
                          <label
                            className="block text-sm font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0"
                            style={{ width: "115px" }}
                          >
                            End Date:
                          </label>
                          <input
                            type="date"
                            value={EndDate}
                            onChange={handleEndDateChange}
                            className="border px-4 h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border"
                          />
                        </div>
                      </div>
                    </>
                  )}
                  {timeError && (
                    <p className="text-red-500 text-sm mt-2">{timeError}</p>
                  )}
                </div>

                <div className="w-12/12">
                  <div className="flex items-start lg:items-center m-2 lg:m-2 sm:m-0 flex-col sm:flex-row">
                    <label
                      className="block text-sm font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0"
                      style={{ width: "155px" }}
                    >
                      Order Type:
                    </label>
                    <div className="w-12/12">
                      <select
                        name="ActionType"
                        value={ActionType}
                        onChange={(e) => setActionType(e.target.value)}
                        className="border px-4 h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border"
                      >
                        <option value="">-- Select --</option>
                        <option value="trigger">Trigger</option>
                        <option value="market">Market</option>
                        <option value="Bracket">Bracket</option>
                        <option value="limit">Limit</option>
                        <option value="cover">Cover</option>
                      </select>
                    </div>
                  </div>

                  <div
                  // className="flex items-start lg:items-center m-2 lg:m-2 sm:m-0 flex-col sm:flex-row"
                  >
                    <div className="w-12/12  lg:flex-grow sm:w-full">
                      <Inputfields
                        register={register}
                        label={"Quantity"}
                        name={"Quantity"}
                        placeholder={"Enter Quantity Here"}
                        value={Quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {ActionType === "limit" && (
                  <div className="w-12/12">
                    <div className="flex items-start lg:items-center m-2 lg:m-2 sm:m-0 flex-col sm:flex-row w-12/12">
                      <label
                        className="block text-sm font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0"
                        style={{ width: "155px" }}
                      >
                        Stop loss:
                      </label>
                      <input
                        type="text"
                        value={Stoploss}
                        onChange={(e) => setStoploss(e.target.value)}
                        className="border px-4 h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border w-4/12"
                      />


                    </div>

                    <div className="flex items-start lg:items-center m-2 lg:m-2 sm:m-0 flex-col sm:flex-row ">
                      <label
                        className="block text-sm font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0"
                        style={{ width: "155px" }}
                      >
                        Book Profit:
                      </label>
                      <input
                        type="text"
                        value={Bookprofit}
                        onChange={(e) => setBookprofit(e.target.value)} // Corrected onChange handler
                        className="border px-4 h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border"
                      />
                    </div>

                    <div className="flex items-start lg:items-center m-2 lg:m-2 sm:m-0 flex-col sm:flex-row">
                      <label
                        className="block text-sm font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0"
                        style={{ width: "155px" }}
                      >
                        Price at:
                      </label>
                      <input
                        type="text"
                        value={LimitPrice}
                        onChange={(e) => setLimitPrice(e.target.value)}
                        className="border px-4 h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border"
                      />
                    </div>
                  </div>
                )}

                {ActionType === "cover" && (
                  <div className="w-12/12">
                    <div className="flex items-start lg:items-center m-2 lg:m-2 sm:m-0 flex-col sm:flex-row">
                      <label
                        className="block text-sm font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0"
                        style={{ width: "155px" }}
                      >
                        Price at:
                      </label>
                      <input
                        type="text"
                        value={CoverPrice}
                        onChange={(e) => setCoverPrice(e.target.value)}
                        className="border px-4 h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border"
                      />
                    </div>

                    <div className="flex items-start lg:items-center m-2 lg:m-2 sm:m-0 flex-col sm:flex-row">
                      <label
                        className="block text-sm font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0"
                        style={{ width: "155px" }}
                      >
                        Stop Loss:
                      </label>
                      <input
                        type="text"
                        value={CoverStopLoss}
                        onChange={(e) => setCoverStopLoss(e.target.value)}
                        className="border px-4 h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border"
                      />
                    </div>

                    <div className="flex items-start lg:items-center m-2 lg:m-2 sm:m-0 flex-col sm:flex-row">
                      <label
                        className="block text-sm font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0"
                        style={{ width: "155px" }}
                      >
                        Trigger Price:
                      </label>
                      <input
                        type="text"
                        value={CoverTriggerPrice}
                        onChange={(e) => setCoverTriggerPrice(e.target.value)}
                        className="border px-4 h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border"
                      />
                    </div>

                    <div className="flex items-start lg:items-center m-2 lg:m-2 sm:m-0 flex-col sm:flex-row">
                      <label
                        className="block text-sm font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0"
                        style={{ width: "155px" }}
                      >
                        Book Profit:
                      </label>
                      <input
                        type="text"
                        value={Bookprofit}
                        onChange={(e) => setBookprofit(e.target.value)}
                        className="border px-4 h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border"
                      />
                    </div>
                  </div>
                )}

                {ActionType === "trigger" && (
                  <div className="w-12/12">
                    <div className="flex items-start lg:items-center m-2 lg:m-2 sm:m-0 flex-col sm:flex-row">
                      <label
                        className="block text-sm font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0"
                        style={{ width: "155px" }}
                      >
                        Price at:
                      </label>
                      <input
                        type="text"
                        value={TriggerPriceAt}
                        onChange={(e) => setTriggerPriceAt(e.target.value)}
                        className="border px-4 h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border"
                      />
                    </div>

                    <div className="flex items-start lg:items-center m-2 lg:m-2 sm:m-0 flex-col sm:flex-row">
                      <label
                        className="block text-sm font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0"
                        style={{ width: "155px" }}
                      >
                        Trigger Price:
                      </label>
                      <input
                        type="text"
                        value={TriggerTriggerPrice}
                        onChange={(e) => setTriggerTriggerPrice(e.target.value)}
                        className="border px-4 h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border"
                      />
                    </div>

                    <div className="flex items-start lg:items-center m-2 lg:m-2 sm:m-0 flex-col sm:flex-row">
                      <label
                        className="block text-sm font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0"
                        style={{ width: "155px" }}
                      >
                        Stop loss:
                      </label>
                      <input
                        type="text"
                        value={Stoploss}
                        onChange={(e) => setStoploss(e.target.value)}
                        className="border px-4 h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border"
                      />
                    </div>

                    <div className="flex items-start lg:items-center m-2 lg:m-2 sm:m-0 flex-col sm:flex-row">
                      <label
                        className="block text-sm font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0"
                        style={{ width: "155px" }}
                      >
                        Book Profit:
                      </label>
                      <input
                        type="text"
                        value={Bookprofit}
                        onChange={(e) => setBookprofit(e.target.value)}
                        className="border px-4 h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border"
                      />
                    </div>
                  </div>
                )}

                {ActionType === "Bracket" && (
                  <>
                    <div className="flex items-start lg:items-center m-2 lg:m-2 sm:m-0 flex-col sm:flex-row">
                      <label
                        className="block text-sm font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0"
                        style={{ width: "155px" }}
                      >
                        Price at:
                      </label>
                      <input
                        type="text"
                        value={BracketPriceAt}
                        onChange={(e) => setBracketPriceAt(e.target.value)}
                        className="border px-4 h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border"
                      />
                    </div>

                    <div className="flex items-start lg:items-center m-2 lg:m-2 sm:m-0 flex-col sm:flex-row">
                      <label
                        className="block text-sm font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0"
                        style={{ width: "155px" }}
                      >
                        Target:
                      </label>
                      <input
                        type="text"
                        value={BracketTarget}
                        onChange={(e) => setBracketTarget(e.target.value)}
                        className="border px-4 h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border"
                      />
                    </div>

                    <div className="flex items-start lg:items-center m-2 lg:m-2 sm:m-0 flex-col sm:flex-row">
                      <label
                        className="block text-sm font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0"
                        style={{ width: "155px" }}
                      >
                        Stop Loss:
                      </label>
                      <input
                        type="text"
                        value={BracketStopLoss}
                        onChange={(e) => setBracketStopLoss(e.target.value)}
                        className="border px-4 h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border"
                      />
                    </div>
                  </>
                )}

                {ActionType === "market" && (
                  <>
                    <div className="flex items-start lg:items-center m-2 lg:m-2 sm:m-0 flex-col sm:flex-row">
                      <label
                        className="block text-sm font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0"
                        style={{ width: "155px" }}
                      >
                        Book Profit:
                      </label>
                      <input
                        type="text"
                        value={Bookprofit}
                        onChange={(e) => setBookprofit(e.target.value)}
                        className="border px-4 h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border"
                      />
                    </div>

                    <div className="flex items-start lg:items-center m-2 lg:m-2 sm:m-0 flex-col sm:flex-row">
                      <label
                        className="block text-sm font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0"
                        style={{ width: "155px" }}
                      >
                        Stop Loss:
                      </label>
                      <input
                        type="text"
                        value={Stoploss}
                        onChange={(e) => setStoploss(e.target.value)}
                        className="border px-4 h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border"
                      />
                    </div>
                  </>
                )}

              

                <div className="flex justify-center m-3">
                  <Button className="px-4" onClick={handlePrevious}>
                    <MdOutlineNavigateBefore /> Previous
                  </Button>
                  <Button type="submit" className="mx-4">
                    Next <MdOutlineNavigateNext />
                  </Button>
                </div>
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

export default ActionDefination;
