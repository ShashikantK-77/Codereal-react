import React, { useState, useEffect, useContext } from "react";
import { Avatar, Badge, Button } from "@windmill/react-ui";
import { Link } from "react-router-dom";
import { notifyError, notifySuccess } from "utils/toast";
import { AdminContext } from "context/AdminContext";
import { useHistory } from "react-router-dom";
import logError from "hooks/useErrorLogger";
import { BaseUrl } from "utils/Constants";

const SuggestStrategy = () => {
  const [strategies, setStrategies] = useState([]);
  const [completeStrategies, setCompleteStrategies] = useState([]);
  const [consolidatedData, setConsolidatedData] = useState([]);
  const [availableBalance, setAvailableBalance] = useState(null);
  const [activeTab, setActiveTab] = useState("all"); // Default to show all strategies
  const [userSubscriptions, setUserSubscriptions] = useState([]);
  console.log("consolidatedData in SuggestStrategy:", consolidatedData);

  // const low = consolidatedData.filter(order => {
  //   return order.strategyDesc[0].Risk === 'low';
  // });
  // const Mid = consolidatedData.filter(order => {
  //   return order.strategyDesc[0].Risk === 'Mid';
  // });
  // const High = consolidatedData.filter(order => {
  //   return order.strategyDesc[0].Risk === 'High';
  // });

  const history = useHistory();
  const { state } = useContext(AdminContext);

  const { zenithQuark } = state;
  // console.log("zenithQuark userID-------------------:", zenithQuark.UserID);

  // useEffect(() => {
  //   const fetchUserSubscriptions = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:3001/api/userSubscriptions/${zenithQuark.UserID}`);
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch user subscriptions");
  //       }
  //       const subscriptions = await response.json();
  //       setUserSubscriptions(subscriptions);
  //     } catch (error) {
  //       console.error("Error fetching user subscriptions:", error);
  //       logError(error.message, "SuggestStrategy.js")
  //     }
  //   };

  //   fetchUserSubscriptions();
  // }, [zenithQuark.UserID]);

  useEffect(() => {
    const fetchAvailableBalance = async () => {
      try {
        const response = await fetch(`${BaseUrl}strategy/fundlimit`, {
          method: "GET",
          headers: {
            "access-token":
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkaGFuIiwicGFydG5lcklkIjoiIiwiZXhwIjoxNzI1NjEzMzUyLCJ0b2tlbkNvbnN1bWVyVHlwZSI6IlNFTEYiLCJ3ZWJob29rVXJsIjoiIiwiZGhhbkNsaWVudElkIjoiMTEwMTM0Mzg3MSJ9.Hm-KSGOhEhfveRUQ25U_hA9nQjrPDpV7UX6WJGaznYV7lRXaf-txSVPqxAqqLvMUJGliA6FfNAM0Fgdi7Dws3Q",
            "Content-Type": "application/json",
            Authorization: `Bearer ${zenithQuark}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch available balance");
        }

        const responseData = await response.json();
        setAvailableBalance(responseData.availabelBalance); // Assuming a debug value
      } catch (error) {
        console.error("Error fetching available balance:", error.message);
        logError(error.message, "SuggestStrategy.js");
      }
    };

    fetchAvailableBalance();
  }, []);

  useEffect(() => {
    const fetchCompleteStrategies = async () => {
      try {
        const response = await fetch(
          `${BaseUrl}strategy/getCompleteStrategies`,
          {
            headers: {
              Authorization: `Bearer ${zenithQuark}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCompleteStrategies(data);
        setConsolidatedData(data.details);
        setAvailableBalance(1500);
      } catch (error) {
        console.error("Error fetching complete strategies:", error);
        logError(error.message, "SuggestStrategy.js");
      }
    };

    fetchCompleteStrategies();
  }, [zenithQuark]);

  // const handleSubscribe = async (id, availableBalance) => {
  //   console.log(" handleSubscribe startegy:",id);
  //   try {
  //     const response = await fetch(`http://localhost:5000/temp/Subscribe`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${zenithQuark}`,
  //       },
  //       body: JSON.stringify({

  //         strategyId: id,
  //         availableBalance: availableBalance
  //       })
  //     });

  //     if (response.ok) {
  //       const updatedStrategies = strategies.map((strategy) =>
  //         strategy.UniqueID === id ? { ...strategy, subscribed: true } : strategy
  //       );
  //       setStrategies(updatedStrategies);
  //       notifySuccess("Subscription successful!");
  //     } else {
  //       const errorData = await response.json();
  //       if (errorData.error === "Broker not connected. Please connect to the broker first.") {
  //         notifyError(errorData.error)
  //         history.push('/tradingaccount');
  //       } else {
  //         notifyError(errorData.error || "Failed to subscribe.");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error subscribing to strategy:", error);
  //     logError(error.message, "SuggestStrategy.js")
  //     notifyError(error.message || "An unexpected error occurred.");
  //   }
  // };

  const handleSubscribe = async (id, availableBalance) => {
    console.log(" handleSubscribe startegy:", id);
    try {
      const response = await fetch(`${BaseUrl}temp/Subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${zenithQuark}`,
        },
        body: JSON.stringify({
          strategyId: id,
          availableBalance: availableBalance,
        }),
      });

      if (response.ok) {
        const updatedStrategies = strategies.map((strategy) =>
          strategy.UniqueID === id
            ? { ...strategy, subscribed: true }
            : strategy
        );
        setStrategies(updatedStrategies);
        notifySuccess("Subscription successful!");
      } else {
        const errorData = await response.json();
        notifyError(errorData.error || "Failed to subscribe.");
        if (
          errorData.error ===
          "Broker not connected. Please connect to the broker first."
        ) {
          history.push("/tradingaccount");
        }
      }
    } catch (error) {
      console.error("Error subscribing to strategy:", error);
      logError(error.message, "SuggestStrategy.js");
      notifyError(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <>
      <div className="flex justify-center space-x-4 my-6">
        <Button
          onClick={() => setActiveTab("all")}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            activeTab === "all" ? "bg-blue-700" : ""
          }`}
        >
          All
        </Button>
        <Button
          onClick={() => setActiveTab("low")}
          className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${
            activeTab === "low" ? "bg-green-700" : ""
          }`}
        >
          Low
        </Button>
        <Button
          onClick={() => setActiveTab("mid")}
          className={`bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ${
            activeTab === "mid" ? "bg-yellow-700" : ""
          }`}
        >
          Mid
        </Button>
        <Button
          onClick={() => setActiveTab("high")}
          className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${
            activeTab === "high" ? "bg-red-700" : ""
          }`}
        >
          High
        </Button>
      </div>

      <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-6">
        {/* {(activeTab === 'low' ? low : activeTab === 'mid' ? Mid : activeTab === 'high' ? High : consolidatedData).map((strategy) => ( */}
        {consolidatedData.map((strategy) => (
          //     <div
          //       key={strategy.StrategyID}
          //       className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md relative"
          //     >
          //     {/* Status Badge in the top-right corner */}
          // <div className="absolute top-0 right-0 m-2">

          // <p className="bg-red-500 text-white p-1 m-0.5 rounded text-sm"> Risk: <span>High</span></p>

          //     {/* <Badge className="bg-yellow-500 text-white">Not Subscribed</Badge> */}

          // </div>
          //       <h3 className="text-lg font-semibold text-red-600 dark:text-gray-200">
          //         {/* {strategy.strategyDesc.map((desc, index) => ( */}
          //           <span  className="uppercase">{strategy.strategyDesc.strategy_name}, </span>
          //         {/* ))
          //         } */}
          //       </h3>
          //       <p className="text-gray-600 dark:text-gray-300 mb-1 text-sm">

          //         {/* {strategy.strategyDesc.map((desc, index) => ( */}
          //           <span >{strategy.strategyDesc.description}, </span>
          //         {/* ))} */}
          //       </p>
          //       <p className="text-gray-600 dark:text-gray-300  text-sm">
          //         Symbol:
          //         {strategy.symbolSelection.map((symbol, index) => (
          //           <span className="text-lg font-semibold"> {symbol.symbol} </span>
          //         ))}
          //       </p>

          //       <p className="text-gray-600 dark:text-gray-300 mb-1 text-sm">
          //         Average Return: <span className="text-green-500 font-semibold text-lg"> 12.00%</span> per year
          //       </p>
          //       <p className="text-gray-600 dark:text-gray-300 mb-1 text-xs">
          //         Risk Level: <span>High</span>
          //       </p>
          //       {userSubscriptions.some(sub => sub.StrategyID === strategy.StrategyID) ? (
          //         <Badge className="text-sm">Subscribed</Badge>
          //       ) : (
          //         <div className="flex items-center justify-between space-x-4">
          //           {/* <Button
          //             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-grow"
          //             onClick={() => handleSubscribe(strategy.strategyDesc.strategy_id, availableBalance)}
          //           >
          //             Subscribe
          //           </Button> */}
          //           <div className="flex-grow">
          //             <Link  to={{
          //                 pathname: "/StrategyDetails",
          //                 state: { strategyData: strategy }
          //               }}>
          //               <Button className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded w-full">
          //                 Know More
          //               </Button>
          //             </Link>
          //           </div>
          //         </div>
          //       )}
          //     </div>

          // <!-- This is an example component -->
          <div
            class="flex items-center justify-center "
            key={strategy.StrategyID}
          >
            <div class="rounded-xl border p-5 shadow-md  w-96 h-72 bg-white">
              <div class="flex w-full items-center justify-between border-b pb-1">
                <div class="flex items-center space-x-1">
                  {/* <div class="h-8 w-8 rounded-full bg-slate-400 bg-[url('')]"></div> */}
                  <div class="text-lg font-bold text-slate-700">Strategy</div>
                </div>
                <div class="flex items-center space-x-8">
                  <button class="rounded-2xl border bg-neutral-100 px-3 mx-4 py-1 text-xs font-semibold">
                    High
                  </button>
                  <div class="text-xs text-neutral-500">2 hours ago</div>
                </div>
              </div>

              <div class="mt-4 mb-1">
                <div class="mb-0.5 text-base font-bold uppercase">
                  {" "}
                  {strategy.strategyDesc.strategy_name
                    .split(" ")
                    .slice(0, 3)
                    .join(" ")}
                </div>
                <div class="text-sm text-neutral-600">
                  {strategy.strategyDesc.description
                    .split(" ")
                    .slice(0, 5)
                    .join(" ")}
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-evenly gap-4 pt-2 text-slate-500 mb-2">
                <div className="group flex-grow rounded-xl disabled:border *:select-none [&>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 dark:disabled:border-gray-800/50 disabled:dark:bg-gray-900 dark:*:disabled:!text-white text-gray-950 bg-gray-100 hover:bg-gray-200/75 active:bg-gray-100 dark:text-white dark:bg-gray-500/10 dark:hover:bg-gray-500/15 dark:active:bg-gray-500/10 flex gap-1.5 items-center text-sm h-8 px-3.5 justify-center p-2">
                  <span>
                    {strategy.symbolSelection.map((symbol, index) => (
                      <span key={index}> {symbol.symbol} </span>
                    ))}
                  </span>
                </div>

                <div className="group flex-grow rounded-xl disabled:border *:select-none [&>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 dark:disabled:border-gray-800/50 disabled:dark:bg-gray-900 dark:*:disabled:!text-white text-gray-950 bg-gray-100 hover:bg-gray-200/75 active:bg-gray-100 dark:text-white dark:bg-gray-500/10 dark:hover:bg-gray-500/15 dark:active:bg-gray-500/10 flex gap-1.5 items-center text-sm h-8 px-3.5 justify-center p-2">
                  <span>
                    {" "}
                    {strategy.symbolSelection.map((symbol, index) => (
                      <span key={index}> {symbol.exchange} </span>
                    ))}
                  </span>
                </div>

                <div className="group flex-grow rounded-xl disabled:border *:select-none [&>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 dark:disabled:border-gray-800/50 disabled:dark:bg-gray-900 dark:*:disabled:!text-white text-gray-950 bg-gray-100 hover:bg-gray-200/75 active:bg-gray-100 dark:text-white dark:bg-gray-500/10 dark:hover:bg-gray-500/15 dark:active:bg-gray-500/10 flex gap-1.5 items-center text-sm h-8 px-3.5 justify-center p-2">
                  <span>
                    {" "}
                    {strategy.symbolSelection.map((symbol, index) => (
                      <span key={index}> {symbol.category} </span>
                    ))}
                  </span>
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between border-t pt-2 text-slate-500">
                  <div class="flex space-x-4 md:space-x-8">
                    <div class="flex cursor-pointer items-center transition hover:text-slate-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="mr-1.5 h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 17h5l-1.405-1.405C18.805 15.195 18 14.105 18 13V8a6 6 0 00-5-5.917V2a1 1 0 10-2 0v.083A6 6 0 006 8v5c0 1.105-.805 2.195-1.595 2.595L3 17h5m6 0a2 2 0 11-4 0h4z"
                        />
                      </svg>

                      <span>125</span>
                    </div>

                    <div class="flex cursor-pointer items-center transition hover:text-slate-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="mr-1.5 h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                        />
                      </svg>
                      <span>4</span>
                    </div>

                    <Link
  to={{
    pathname: "/StrategyDetails",
    state: { strategyData: strategy },
  }}
  className="group rounded-xl disabled:border *:select-none [&>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 dark:disabled:border-gray-800/50 disabled:dark:bg-gray-900 dark:*:disabled:!text-white text-gray-950 bg-gray-100 hover:bg-gray-200/75 active:bg-gray-100 dark:text-white dark:bg-gray-500/10 dark:hover:bg-gray-500/15 dark:active:bg-gray-500/10 flex gap-1.5 items-center text-sm h-8 px-3.5 justify-center p-2"
>
  <span>Know More</span>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
  >
    <path
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M8 5l7 7-7 7"
    />
  </svg>
</Link>

                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SuggestStrategy;
