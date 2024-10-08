// import React, { useState, useEffect, useContext } from "react";
// import { Card, CardBody, Button } from "@windmill/react-ui";

// import HeadKyc from "components/KYC/HeadKyc";
// import Inputfields from "components/KYC/Inputfields";
// import Error from "components/form/Error";
// import useStrategySubmit from "hooks/useStrategySubmit";
// import { MdOutlineNavigateNext } from "react-icons/md";
// import { notifyError, notifySuccess } from "utils/toast";
// import { useForm } from "react-hook-form";
// import useStepperRecord from "hooks/useStepperRecord";
// import { CreateStrategyContext } from "context/CreateStrategyContext";
// import { useListContext } from "context/ListContext";
// import { AdminContext } from "context/AdminContext";
// import logError from "hooks/useErrorLogger";
// import useDecodedToken from "hooks/useDecodeToken";


// const AssetsSelection = ({ handleNext }) => {

//   const [strategyName, setStrategyName] = useState("");
//   const [Description, setDescription] = useState("");
//   const [filteredStrategies, setFilteredStrategies] = useState([]);
//   const decodedToken = useDecodedToken();
// console.log("decodedToken ? decodedToken.UserID:",decodedToken);
  
//   const { UniqueID,SetUniqueID,SetStrategyID } = useContext(CreateStrategyContext);
//   const { WorkingStrategy } = useListContext();

//   console.log("WorkingStrategy in asset selection:", WorkingStrategy);
//   const { assets } = useStepperRecord(WorkingStrategy);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     onSubmit,
//     reset,
//   } = useForm({});

//   // const fetchAvailableStocks = async (exchange) => {
//   //   try {
//   //     const response = await fetch(
//   //       "https://paper-api.alpaca.markets/v2/assets",
//   //       {
//   //         headers: {
//   //           "APCA-API-KEY-ID": "PKYP9KGLKLIKTFU54DC5",
//   //           "APCA-API-SECRET-KEY": "KQNI9rUdhvhP5qRQxl2oMwHAYrlVkfJDrT4AxPcT",
//   //         },
//   //       }
//   //     );
//   //     const stocks = response.data;
//   //     setAvailableStocks(stocks);
//   //   } catch (error) {
//   //     console.error("Error fetching available stocks:", error);
//   //   }
//   // };

//   // const fetchAssets = async () => {
//   //   try {
//   //     const response = await fetch(
//   //       "https://paper-api.alpaca.markets/v2/assets",
//   //       {
//   //         headers: {
//   //           "APCA-API-KEY-ID": "PKSWP5Z6U0OS356MGMBG",
//   //           "APCA-API-SECRET-KEY": "huu1EiruE2Bf4QcXHg6y0fh6IklCthnonehQOf60",
//   //         },
//   //       }
//   //     );
//   //     if (response.ok) {
//   //       const data = await response.json();
//   //       setAvailableStocks(data);
//   //     } else {
//   //       console.error("Failed to fetch assets");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error:", error);
//   //     logError(error, 'AssetsSelection.js');
//   //   }
//   // };

  
// const { state } = useContext(AdminContext);
// const { zenithQuark } = state;

// const lastStrategy = filteredStrategies[filteredStrategies.length - 1];

// console.log("zenithQuark in assetselection:",zenithQuark);


  

//   const handleFormSubmit = async (data) => {
//     try {
//       const prefix = 'S';
//       let uniqueID = '';
  
//       if (lastStrategy && !lastStrategy.isComplete) {
//         uniqueID = lastStrategy.UniqueID;
//       } else {
//         const timestamp = Date.now();
//         const randomID = Math.floor(10000 + Math.random() * 90000);
//         uniqueID = `${prefix}_${randomID}`.slice(0, 8);
//       }

  
//       const currentDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

//       const formattedData = {
//         strategy_name: strategyName, // Ensure this matches the Sequelize model field
//         strategyDescription: Description,
//         user_id: decodedToken?.user_id,
//         required_fund: 250,
//         // ...data,
//       };
//       const filteredData = Object.fromEntries(
//         Object.entries(formattedData).filter(([_, value]) => value !== "")
//       );
//       SetStrategyID(uniqueID)
//       console.log("Data to be sent to server:", filteredData);

//       console.log("formattedData sumbitted:",formattedData);
  
//       // Make a single API call to save strategy description
//       const response = await fetch('http://localhost:5000/startegy/StrategyDesc', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization' : 'Bearer 1f3g2jh4k5l6qw8e7r9ty0uiopasdfghjklzaapaxcvbnm'
//         },
//         body: JSON.stringify(formattedData),
//       });
  
//       if (response.ok) {
//         const responseData = await response.json();
//         console.log("Server response:", responseData);
//         notifySuccess("Scrip Selection Saved");
//         handleNext(filteredData);
//       } else {
//         console.error('Failed to save strategy description:', response.statusText);
//         notifyError("Failed to save Scrip Selection");
//       }
//     } catch (error) {
//       console.error('Error saving strategy:', error);
//       notifyError("Failed to save Scrip Selection");
//     }
//   };
  

//   return (
//     <div className="p-2">
//       <Card className="w-min">
//         <CardBody>
//           <form onSubmit={handleSubmit(handleFormSubmit)}>
//             <HeadKyc title="Strategy Identification" />
//             <div className="grid lg:grid-cols-2 sm:grid-cols-1">
//               <div className="flex flex-col justify-center">
//                 <Inputfields
//                   register={register}
//                   label={"Strategy Name"}
//                   name={"strategyName"}
//                   placeholder={"Enter Strategy Name"}
//                   value={strategyName}
//                   onChange={(e) => setStrategyName(e.target.value)}
//                 />
//                 {errors.strategyName && (
//                   <Error
//                     style={{ marginTop: "-2rem" }}
//                     errorName={errors.strategyName}
//                   />
//                 )}
//               </div>
//             </div>

//             <div className="grid lg:grid-cols-2 sm:grid-cols-1">
//               <div className="flex flex-col justify-center">
//                 <Inputfields
//                   register={register}
//                   label={"Strategy Description"}
//                   name={"strategyDescription"}
//                   placeholder={"Enter Strategy Description"}
//                   value={Description}
//                   onChange={(e) => setDescription(e.target.value)}
//                 />
//               </div>
//             </div>

 

//             <div className="flex justify-center mx-3 ">
//               <Button type="submit" className="mx-4 text-white">
//                 Submit & Next <MdOutlineNavigateNext className="font-bold" />
//               </Button>
//             </div>
//           </form>
//         </CardBody>
//       </Card>
//     </div>
//   );
// };

// export default AssetsSelection;



// import React, { useState, useContext } from "react";
// import { Card, CardBody, Button } from "@windmill/react-ui";
// import HeadKyc from "components/KYC/HeadKyc";
// import Inputfields from "components/KYC/Inputfields";
// import Error from "components/form/Error";
// import { MdOutlineNavigateNext } from "react-icons/md";
// import { notifyError, notifySuccess } from "utils/toast";
// import { useForm } from "react-hook-form";
// import { CreateStrategyContext } from "context/CreateStrategyContext";
// import { useListContext } from "context/ListContext";
// import { AdminContext } from "context/AdminContext";
// import useDecodedToken from "hooks/useDecodeToken";

// const AssetsSelection = ({ handleNext }) => {
//   const [strategyName, setStrategyName] = useState("");
//   const [Description, setDescription] = useState("");
//   const decodedToken = useDecodedToken();

//   console.log("decodedToken ? decodedToken.UserID:", decodedToken);

//   const { SetStrategyID } = useContext(CreateStrategyContext);
//   const { WorkingStrategy } = useListContext();

//   console.log("WorkingStrategy in asset selection:", WorkingStrategy);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const { state } = useContext(AdminContext);
//   const { zenithQuark } = state;

//   console.log("zenithQuark in assetselection:", zenithQuark);

//   const handleFormSubmit = async () => {
//     try {
//       const prefix = 'S';
//       let uniqueID = '';

//       if (WorkingStrategy && !WorkingStrategy.isComplete) {
//         uniqueID = WorkingStrategy.UniqueID;
//       } else {
//         const randomID = Math.floor(10000 + Math.random() * 90000);
//         uniqueID = `${prefix}_${randomID}`.slice(0, 8);
//       }

//       const formattedData = {
//         strategy_name: strategyName,
//         strategyDescription: Description,
//         user_id: decodedToken?.user_id,
//         required_fund: 250,
//       };

//       const filteredData = Object.fromEntries(
//         Object.entries(formattedData).filter(([_, value]) => value !== "")
//       );

//       SetStrategyID(uniqueID);
//       console.log("Data to be sent to server:", formattedData);
//       console.log("strategyName:", strategyName); // Debug strategyName
//       console.log("Description:", Description); // Debug Description

//       const response = await fetch('http://localhost:5000/strategy/StrategyDesc', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${zenithQuark}`,
//         },
//         body: JSON.stringify(formattedData),
//       });

//       if (response.ok) {
//         const responseData = await response.json();
//         console.log("Server response:", responseData);
//         notifySuccess("Scrip Selection Saved");
//         handleNext(formattedData);
//       } else {
//         console.error('Failed to save strategy description:', response.statusText);
//         notifyError("Failed to save Scrip Selection");
//       }
//     } catch (error) {
//       console.error('Error saving strategy:', error);
//       notifyError("Failed to save Scrip Selection");
//     }
//   };

//   return (
//     <div className="p-2">
//       <Card className="w-min">
//         <CardBody>
//           <form onSubmit={handleSubmit(handleFormSubmit)}>
//             <HeadKyc title="Strategy Identification" />
//             <div className="grid lg:grid-cols-2 sm:grid-cols-1">
//               <div className="flex flex-col justify-center">
//                 <Inputfields
//                     register={register}
//                   label={"Strategy Name"}
//                   name={"strategyName"}
//                   placeholder={"Enter Strategy Name"}
//                   value={strategyName}
//                   onChange={(e) => setStrategyName(e.target.value)}
           
//                 />
//                 {errors.strategyName && (
//                   <Error
//                     style={{ marginTop: "-2rem" }}
//                     errorName={errors.strategyName}
//                   />
//                 )}
//               </div>
//             </div>

//             <div className="grid lg:grid-cols-2 sm:grid-cols-1">
//               <div className="flex flex-col justify-center">
//                 <Inputfields
//                   register={register}
//                   label={"Strategy Description"}
//                   name={"strategyDescription"}
//                   placeholder={"Enter Strategy Description"}
//                   value={Description}
//                   onChange={(e) => setDescription(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="flex justify-center mx-3 ">
//               <Button type="submit" className="mx-4 text-white">
//                 Submit & Next <MdOutlineNavigateNext className="font-bold" />
//               </Button>
//             </div>
//           </form>
//         </CardBody>
//       </Card>
//     </div>
//   );
// };

// export default AssetsSelection;

import React, { useState, useContext,useEffect  } from "react";
import { Card, CardBody, Button } from "@windmill/react-ui";
import HeadKyc from "components/KYC/HeadKyc";
import Inputfields from "components/KYC/Inputfields";
import Error from "components/form/Error";
import { MdOutlineNavigateNext } from "react-icons/md";
import { notifyError, notifySuccess } from "utils/toast";
import { useForm } from "react-hook-form";
import { CreateStrategyContext } from "context/CreateStrategyContext";
import { useListContext } from "context/ListContext";
import { AdminContext } from "context/AdminContext";
import useDecodedToken from "hooks/useDecodeToken";
import { BaseUrl } from "utils/Constants";

const AssetsSelection = ({ handleNext }) => {
  const [StrategyName, setStrategyName] = useState("");
  const [Description, setDescription] = useState("");
  const decodedToken = useDecodedToken();

  const { SetStrategyID,StrategyID,selectedStrategy } = useContext(CreateStrategyContext);
  const { WorkingStrategy } = useListContext();

  const { register, handleSubmit, formState: { errors },reset  } = useForm();

  const { state } = useContext(AdminContext);
  const { zenithQuark } = state;

  useEffect(() => {
    if (selectedStrategy) {
      // Set default values for the form inputs based on selectedStrategy
      reset({
        StrategyName: selectedStrategy.strategyDesc.strategy_name,
        strategyDescription: selectedStrategy.strategyDesc.description
      });
    }
  }, [selectedStrategy, reset]);



  const handleFormSubmit = async (data) => {
    try {
      const prefix = 'S';
      let uniqueID = '';

      if (WorkingStrategy && !WorkingStrategy.isComplete) {
        uniqueID = WorkingStrategy.UniqueID;
      } else {
        const randomID = Math.floor(10000 + Math.random() * 90000);
        uniqueID = `${prefix}_${randomID}`.slice(0, 8);
      }

      const formattedData = {
        strategy_id: StrategyID, // Ensure strategy_id is included
        user_id: decodedToken?.user_id,
        required_fund: 350,
        ...data,
      };
      console.log("formattedData:",formattedData);

      SetStrategyID(uniqueID);
      const response = await fetch(`${BaseUrl}strategy/StrategyDesc`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${zenithQuark}`,
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Scrip Selection Saved:",responseData);
        console.log("responseData.details.strategy_id",responseData.details.strategy_id);
        SetStrategyID(responseData.details.strategy_id)
        notifySuccess("Scrip Selection Saved:");
        console.log("Scrip Selection Saved: formattedData:",formattedData);
        handleNext(formattedData);
      } else {
        console.error('Failed to save strategy description:', response.statusText);
        notifyError("Failed to save Scrip Selection");
      }
    } catch (error) {
      console.error('Error saving strategy:', error);
      notifyError("Failed to save Scrip Selection");
    }
  };

  // console.log("selectedStrategy:",selectedStrategy);
  const isStrategyNameDisabled = !!selectedStrategy?.strategyDesc?.strategy_name;
  console.log("isStrategyNameDisabled",isStrategyNameDisabled);
  return (
    <div className="p-2">
      <Card className="w-min">
        <CardBody>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <HeadKyc title="Strategy Identification" />
            <div className="grid lg:grid-cols-2 sm:grid-cols-1">
              <div className="flex flex-col justify-center">
                <Inputfields
                  register={register}
                  label="Strategy Name"
                  name="StrategyName"
                  placeholder="Enter Strategy Name"
                  value={StrategyName}
                  disabled={isStrategyNameDisabled} // Disable input if strategyName is present
                  onChange={(e) => setStrategyName(e.target.value)}
                />
                {errors.strategyName && (
                  <Error
                    style={{ marginTop: "-2rem" }}
                    errorName={errors.StrategyName}
                  />
                )}
              </div>
            </div>

            <div className="grid lg:grid-cols-2 sm:grid-cols-1">
              <div className="flex flex-col justify-center">
                <Inputfields
                  register={register}
                  label="Strategy Description"
                  name="strategyDescription"
                  placeholder="Enter Strategy Description"
                  value={Description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-center mx-3">
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
