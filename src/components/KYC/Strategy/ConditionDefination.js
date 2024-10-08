import React, { useState, useEffect, useContext } from "react";
import { Card, CardBody, Button } from "@windmill/react-ui";
import HeadKyc from "components/KYC/HeadKyc";
import useStrategySubmit from "hooks/useStrategySubmit";
import Inputfields from "../Inputfields";
import { useListContext } from "context/ListContext";
import Error from "components/form/Error";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import Counditioncard from "./Counditioncard";
import { CreateStrategyContext } from "context/CreateStrategyContext";
import useStepperRecord from "hooks/useStepperRecord";
import { notifySuccess } from "utils/toast";
import Previousdata from "./Previousdata";
import logError from "hooks/useErrorLogger";
import { AdminContext } from "context/AdminContext";
import useDecodedToken from "hooks/useDecodeToken";
import { BaseUrl } from "utils/Constants";


const ConditionDefination = ({
  handleNext,
  handlePrevious,
  stepperformData,
}) => {
  const [indicator, setIndicator] = useState("");
  const [selectedParams, setSelectedParams] = useState([]);
  const [indicatorParameters, setIndicatorParameters] = useState({});
  const { updateCurrentStepForUniqueID } = useStepperRecord();
  const decodedToken = useDecodedToken();
  const { StrategyID,selectedStrategy } = useContext(CreateStrategyContext);
  console.log("selectedStrategy:",selectedStrategy);

  const { setConditions, formData, setFormData, conditions } = useListContext();
  const { errors, register, handleSubmit, reset } = useStrategySubmit();

  console.log("conditions:",conditions);

  // console.log("this is stepperformData:", stepperformData);
  const handleFormSubmit = (data) => {
    const newCondition = {
      ...data,
      Indicator: indicator,
      field: data.field || (selectedParams.find(param => param.name === 'field')?.subproperties[0] || ''), // Get the selected field value or the first subproperty as default

      // Parameters: selectedParams,
    };

    setConditions((prevConditions) => [...prevConditions, newCondition]);
    setFormData((prevFormData) => ({
      ...prevFormData,
      conditions: [...conditions, newCondition],
    }));

    reset();
    setIndicator("");
    setSelectedParams([]);

    notifySuccess("Condition Definition Saved");
  };

  const { state } = useContext(AdminContext);
  const { zenithQuark } = state;


  // const indicatorOptions = {
  //   1: "Simple Moving Average",
  //   2: "Relative Strength Index",
  //   3: "Parabolic SAR",
  //   4: "Moving Average Convergence Divergence",
  //   5: "Exponential Moving Average",
  // };
  
  // const indicatorParam = {
  //   "Simple Moving Average": [
  //     { name: "short_term_period", datatype: "number" },
  //     { name: "long_term_period", datatype: "number" },
  //   ],
  //   "Relative Strength Index": [
  //     { name: 'overbought', datatype: 'text' },
  //     { name: 'oversold', datatype: 'text' },
  //     { name: 'period', datatype: 'text' },
  //   ],
  //   "Parabolic SAR": [
  //     { name: 'acceleration', datatype: 'text' },
  //     { name: 'maximum', datatype: 'text' },
  //   ],
  //   "Moving Average Convergence Divergence": [
  //     { name: 'short_period', datatype: 'number' },
  //     { name: 'long_period', datatype: 'number' },
  //     { name: 'signal_period', datatype: 'number' },
  //   ],
  //   "Exponential Moving Average": [
  //     { name: 'period', datatype: 'number' },
  //     { name: 'field', datatype: 'select', subproperties: ["open", "close", "high", "low"] },
  //   ],
  // };
  
  // // Function to transform data
  // const transformIndicators = (indicators) => {
  //   const indicatorData = {};
    
  //   // Find the indicator name using indicator_id
  //   const indicatorId = indicators[0]?.indicator_id;
  //   const indicatorName = indicatorOptions[indicatorId] || 'Unknown Indicator';
  //   indicatorData.Indicator = indicatorName;
  
  //   // Get expected parameters for the indicator
  //   const expectedParams = indicatorParam[indicatorName] || [];
  
  //   // Initialize parameters with empty values
  //   expectedParams.forEach(param => {
  //     indicatorData[param.name] = ''; // Default empty value
  //   });
  
  //   // Populate parameters
  //   indicators.forEach(indicator => {
  //     if (expectedParams.some(param => param.name === indicator.param_name)) {
  //       indicatorData[indicator.param_name] = indicator.param_value;
  //     }
  //   });
  
  //   // Handle special cases for 'field'
  //   if (indicatorData.field && indicatorParam[indicatorName]?.find(p => p.name === 'field')) {
  //     const fieldOptions = indicatorParam[indicatorName].find(p => p.name === 'field').subproperties;
  //     if (fieldOptions && !fieldOptions.includes(indicatorData.field)) {
  //       indicatorData.field = ''; // Default to empty if not a valid option
  //     }
  //   }
  
  //   return indicatorData;
  // };



  const indicatorOptions = {
    1: "Simple Moving Average",
    2: "Relative Strength Index",
    3: "Parabolic SAR",
    4: "Moving Average Convergence Divergence",
    5: "Exponential Moving Average",
  };
  
  // Function to transform the indicators array
  const transformIndicators = (indicators) => {
    const indicatorData = {};
  
    indicators.forEach(indicator => {
      // Check if Indicator name is provided directly
      const indicatorName = indicator.Indicator || indicatorOptions[indicator.indicator_id] || 'Unknown Indicator';
  
      // Initialize the indicator entry if not already present
      if (!indicatorData[indicatorName]) {
        indicatorData[indicatorName] = {};
      }
  
      // Map parameter name to its value
      if (indicator.param_name && indicator.param_value) {
        indicatorData[indicatorName][indicator.param_name] = indicator.param_value;
      }
    });
  
    // Convert to the format you need: array of objects
    return Object.entries(indicatorData).map(([indicator, params]) => ({
      Indicator: indicator,
      ...params
    }));
  };

  //  Pre-fill the form with selected strategy values
   useEffect(() => {
    if (selectedStrategy && selectedStrategy.indicators && selectedStrategy.indicators.length > 0) {
      const firstIndicator = selectedStrategy.indicators[0];
      setIndicator(firstIndicator.indicator_id);
   

      // const transformedData = transformData(selectedStrategy.indicators);
      // // setIndicatorParameters(transformedData)
      console.log("selectedStrategy.indicators:",selectedStrategy.indicators);
    
      // setConditions(selectedStrategy.indicators)
      const transformedData = transformIndicators(selectedStrategy.indicators);
      console.log("transformedData:",transformedData);
      setConditions(transformedData)
      // setSelectedParams(selectedStrategy.indicators)

      console.log("selectedParams:",selectedParams);
    }
  }, [selectedStrategy, indicatorParameters]);


  useEffect(() => {
    const fetchIndicatorParameters = async () => {
      try {
        const response = await fetch(`${BaseUrl}strategy/indicatorParameters`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${zenithQuark}`, // Add authorization header
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch indicator parameters");
        }
        const data = await response.json();
        // console.log("data in fetchIndicatorParameters:",data);
 
        setIndicatorParameters(data);
        // console.log("indicatorParameters:",indicatorParameters);
      } catch (error) {
        console.error("Error fetching indicator parameters:", error.message);
        logError(error.message, 'ConditionDefination.js');
      }
    };
  
    fetchIndicatorParameters();
  }, [zenithQuark]); // Add zenithQuark to the dependency array if it's a state or context value
  

  useEffect(() => {
    setSelectedParams(indicatorParameters[indicator] || []);
  }, [indicator, indicatorParameters]);

  
  const handleNextbtn = async () => {
    const dataToSave = {
      conditions: conditions.map(condition => ({
        ...condition,
        // Any additional fields you need to add
      })),
      StrategyID: StrategyID,
    };
  
    console.log('dataToSave in ConditionDefination--------------------------:', dataToSave);
  
    try {
      const response = await fetch(`${BaseUrl}strategy/saveIndicators`, { // Adjust the URL if needed
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${zenithQuark}`, // If your API requires authentication
        },
        body: JSON.stringify(dataToSave),
      });
  
      if (!response.ok) {
        throw new Error("Failed to save indicators");
      }
  
      const responseData = await response.json();
      notifySuccess("Indicators saved successfully");
      handleNext(dataToSave);
    } catch (error) {
      console.error("Error saving indicators:", error.message);
      logError(error.message, 'ConditionDefination.js');
    }
  };
  

  return (
    <div className="p-2">
      <Card className="w-min">
        <CardBody>
          <HeadKyc title="Indicator Selection " />
          <div className="grid lg:grid-cols-2 sm:grid-cols-1">
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="flex flex-col justify-center">

              
              {/* {stepperformData.openValue !== null && (
              <div className="flex items-start lg:items-center m-2 lg:m-2 sm:m-0 flex-col sm:flex-row">
                <label
                  className="block text-sm font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0"
                  style={{ width: "155px" }}
                >
                  Selected Symbol Value:
                </label>
                <div className="border px-4 h-12 text-lg font-bold focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 text-center flex items-center justify-center">
  {stepperformData.openValue}
</div>

                </div>
              )} */}

                <div className="flex items-start lg:items-center  m-2 lg:m-2 sm:m-0 flex-col sm:flex-row">
                  <label
                    className="block text-sm  font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0"
                    style={{ width: "155px" }}
                  >
                    Indicator:
                  </label>
                  <div className=" w-full lg:flex-grow sm:w-full">
                    <select
                      name="Indicator"
                      {...register("Indicator", {
                        required: "Indicator is required",
                      })}
                      onChange={(e) => setIndicator(e.target.value)}
                      value={indicator}
                      className="border px-4  h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border"
                    >
                      <option value="">-- Select --</option>
                      <option value="Simple Moving Average">
                        Simple Moving Average
                      </option>
                      <option value="Relative Strength Index">
                        Relative Strength Index
                      </option>
                      <option value="Parabolic SAR">Paranolic Sar</option>
                      <option value="Moving Average Convergence Divergence">
                        MACD
                      </option>
                      <option value="Exponential Moving Average">
                        Exponential Moving Average
                      </option>
                    </select>
                  </div>
                </div>


    


                {selectedParams.map((param, index) => (
  <div key={index} className="grid lg:grid-cols-1 sm:grid-cols-1">
    <div className="flex flex-col justify-center">
      {param.Datatype === "select" ? (
        <div className="flex items-start lg:items-center  m-2 lg:m-2 sm:m-0 flex-col sm:flex-row">
          <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0" style={{ width: '155px' }}>
            {param.name}:
          </label>
          <div className="w-full lg:flex-grow sm:w-full">
            <select
              name={param.name}
              // {...register(param.name, { required: `${param.name} is required` })}
              register={register}
          // label={param.name}
          
              className="border px-4 h-12 text-sm focus:outline-none w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border"
            >
              <option value="">-- Select --</option>
              {param.subproperties.map((subproperty) => (
                <option key={subproperty} value={subproperty}>
                  {subproperty}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        <Inputfields
          register={register}
          label={param.name}
          name={param.name}
          placeholder={`Enter ${param.name}`}
          type={param.Datatype}
          
        />
      )}
      {errors.strategyName && (
        <Error style={{ marginTop: "-2rem" }} errorName={errors.strategyName} />
      )}
    </div>
  </div>
))}

                {/* <Button className='w-2/6 my-2 '  type="submit">Add Indicator</Button> */}

                <div className="flex justify-center">
                  {" "}
                  {/* Added div for center alignment */}
                  <Button className="w-2/6 my-2" type="submit">
                    Add Indicator
                  </Button>
                </div>

                <Counditioncard conditions={conditions} />
              </div>
              <div>{/* <Counditioncard conditions={conditions} /> */}</div>

              <div className="flex justify-end m-3  ">
                <Button className="px-4" onClick={handlePrevious}>
                  <MdOutlineNavigateBefore /> Previous
                </Button>
                <Button className="mx-4" onClick={handleNextbtn}>
                  Next <MdOutlineNavigateNext />
                </Button>
              </div>
            </form>
            <Previousdata stepperformData={stepperformData} />
          </div>
        </CardBody>

        {errors.ConditionType && <Error errorName={errors.ConditionType} />}
        {!errors.ConditionType && errors.Indicator && (
          <Error errorName={errors.Indicator} />
        )}
        {!errors.ConditionType && !errors.Indicator && errors.Operator && (
          <Error errorName={errors.Operator} />
        )}
        {!errors.ConditionType &&
          !errors.Indicator &&
          !errors.Operator &&
          errors.IndicatorValue && <Error errorName={errors.IndicatorValue} />}
        {!errors.ConditionType &&
          !errors.Indicator &&
          !errors.Operator &&
          !errors.IndicatorValue &&
          errors.Actiontype && <Error errorName={errors.Actiontype} />}
        {!errors.ConditionType &&
          !errors.Indicator &&
          !errors.Operator &&
          !errors.IndicatorValue &&
          !errors.Actiontype &&
          errors.Actiondetails && <Error errorName={errors.Actiondetails} />}
      </Card>
    </div>
  );
};

export default ConditionDefination;
