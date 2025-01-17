import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@windmill/react-ui";
import { useHistory } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { AdminContext } from "context/AdminContext";
import { CreateStrategyContext } from "context/CreateStrategyContext";
import Status from "components/table/Status";
import { notifyError, notifySuccess } from "utils/toast";
import { BaseUrl } from "utils/Constants";

const Strategy = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBacktestModalOpen, setIsBacktestModalOpen] = useState(false);

  const [completeStrategies, setCompleteStrategies] = useState([]);
  const [consolidatedData, setConsolidatedData] = useState([]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [strategyToDelete, setStrategyToDelete] = useState(null);

  const [isGoLiveModalOpen, setIsGoLiveModalOpen] = useState(false);
  const [selectedStrategyForGoLive, setSelectedStrategyForGoLive] =
    useState(null);

  const history = useHistory();
  const { state } = useContext(AdminContext);
  const { zenithQuark } = state;
  const { SetStrategyID, setSelectedStrategy } = useContext(
    CreateStrategyContext
  );

  useEffect(() => {
    getallstartegies();
  }, [zenithQuark]);

  const getallstartegies = async () => {
    try {
      const response = await fetch(
        `${BaseUrl}strategy/getallstartegies`,
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
      setCompleteStrategies(data.details);
      setConsolidatedData(data.details);
    } catch (error) {
      console.error("Error fetching complete strategies:", error);
    }
  };

  // const openModal = (strategy) => {
  //   setSelectedStrategy(strategy);
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setSelectedStrategy(null);
  //   setIsModalOpen(false);
  // };

  const openDeleteModal = (strategy) => {
    setStrategyToDelete(strategy);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setStrategyToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteStrategy = async () => {
    try {
      const response = await fetch(
        `${BaseUrl}/delete-strategy`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${zenithQuark}`,
          },
          body: JSON.stringify({
            strategy_id: strategyToDelete.strategyDesc.strategy_id,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        notifySuccess(data.message);
        // Refresh strategies after delete
        getallstartegies();
      } else {
        notifyError(data.message || "Failed to delete strategy");
      }
    } catch (error) {
      console.error("Error deleting strategy:", error);
      notifyError("An error occurred while deleting the strategy");
    } finally {
      closeDeleteModal();
    }
  };

  const handleDetails = (data) => {
    history.push({
      pathname: "/Strategystatus",

      state: { consolidatedData: data },
    });
  };

  const handleCompleteStrategy = async (strategyId) => {
    try {
      const response = await fetch(
        `${BaseUrl}strategy/complete-strategy`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${zenithQuark}`,
          },
          body: JSON.stringify({ strategy_id: strategyId }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        // alert(data.message);
        notifySuccess(data.message);
        getallstartegies();
      } else {
        // alert(data.message || 'Failed to update strategy');
        notifyError(data.message || "Failed to update strategy");
      }
    } catch (error) {
      console.error("Error completing strategy:", error);
      alert("An error occurred while completing the strategy");
    }
  };

  const handleStopStrategy = async (strategyId) => {
    try {
      const response = await fetch(
       `${BaseUrl}strategy/stop-strategy`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${zenithQuark}`,
          },
          body: JSON.stringify({ strategy_id: strategyId }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        // alert(data.message);
        notifySuccess(data.message);
        getallstartegies();
      } else {
        // alert(data.message || 'Failed to update strategy');
        notifyError(data.message || "Failed to update strategy");
      }
    } catch (error) {
      console.error("Error completing strategy:", error);
      alert("An error occurred while completing the strategy");
    }
  };

  // const handleContinueSetup = async (data) => {
  //   console.log("in handleContinueSetup data:",data);
  // }

  const handleContinueSetup = async (data) => {
    const initialStep = data.strategyDesc.completed_stages;
    SetStrategyID(data.strategyDesc.strategy_id);
    history.push({
      pathname: "/makestrategy",
      state: { initialStep: initialStep, data: data },
    });
  };

  const handleGoLiveClick = (strategy) => {
    setSelectedStrategyForGoLive(strategy);
    setIsGoLiveModalOpen(true);
  };
  

  const handleEditSetup = async (data) => {
    console.log("in handleEditSetup with data:", data);
    const initialStep = 0;
    SetStrategyID(data.strategyDesc.strategy_id);
    setSelectedStrategy(data);
    history.push({
      pathname: "/makestrategy",

      state: { initialStep: initialStep, data: data },
    });
  };

  return (
    <div className="p-2 flex flex-col">
      <Card className="w-full">
        <CardBody>
          <div className="grid grid-cols-2 gap-4">
            {consolidatedData.map((data, index) => (
              <div
                key={index}
                // className={`border p-4 rounded-lg shadow-md relative ${data.strategyDesc.is_complete ? 'bg-green-100' : 'bg-gray-100'}`}
                className={`border p-4 rounded-lg shadow-md relative ${
                  data.strategyDesc.is_complete
                    ? "bg-white-100"
                    : data.strategyDesc.is_active
                    ? "bg-green-100"
                    : "bg-gray-100"
                }`}
              >
                <ul>
                  <div className="">
                    <div className="flex">
                      <strong className="uppercase">
                        {data.strategyDesc.strategy_name}
                      </strong>{" "}
                    </div>
                    <div className="flex">
                      {data.strategyDesc.description || "N/A"}
                    </div>
                  </div>

                  <li className="mt-1 flex flex-wrap">
                    <strong>Symbols:</strong>
                    <ul>
                      {data.symbolSelection.map((symbol, i) => (
                        <li key={i}>
                          {symbol.exchange} - {symbol.category} -{" "}
                          {symbol.symbol}
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="mt-1 flex flex-wrap">
                    <strong>Actions:</strong>
                    <ul>
                      {data.actionSelection.map((action, i) => (
                        <li key={i}>
                          {action.action} - {action.order_type} - Qty:{" "}
                          {action.quantity}
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="mt-1 flex flex-wrap">
                    <strong>Indicators:</strong>
                    <ul className="flex flex-wrap space-x-4">
                      {data.indicators.map((indicator, i) => (
                        <li key={i}>
                          {indicator.param_name}: {indicator.param_value}
                        </li>
                      ))}
                    </ul>
                  </li>
                  {/* <div className="mt-2 flex justify-end">
                    {data.strategyDesc.is_complete ? (
                      <Button
                        onClick={() => handleCompleteStrategy(data.strategyDesc.strategy_id)}
                        className="bg-red-600 hover:bg-red-600 text-white font-semibold px-2 py-1 rounded-full m-2"
                      >
                        Live
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleContinueSetup(data)}
                        className="bg-green-600 hover:bg-green-600 text-white font-semibold px-2 py-1 rounded-full m-2"
                      >
                        Continue Setup
                      </Button>
                    )}
                  </div> */}

                  <div className="mt-2 flex justify-end">
                    {data.strategyDesc.is_complete ? (
                      data.strategyDesc.execution_status === "waiting" ? (
                        <div className="flex">
                          <button
                            // onClick={() => handleStrategyDetails(data.strategyDesc.strategy_id)}
                            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-2 py-2 rounded-full m-2"
                          >
                            Strategy Details
                          </button>
                          <button
                            onClick={() =>
                              handleStopStrategy(data.strategyDesc.strategy_id)
                            }
                            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-full m-2"
                          >
                            Stop
                          </button>
                        </div>
                      ) : (
                        <button
                          // onClick={() =>
                          //   handleCompleteStrategy(
                          //     data.strategyDesc.strategy_id
                          //   )
                          // }
                          // className="bg-indigo-600	 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-full m-2"
                          onClick={() => handleGoLiveClick(data)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-normal px-4 py-2 rounded-full m-2 text-sm"
      >
                        
                          Go Live
                        </button>
                      )
                    ) : (
                      <button
                        onClick={() => handleContinueSetup(data)}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-normal px-4 py-2 rounded-full m-2 text-sm"
                      >
                        Continue Setup
                      </button>
                    )}
                  </div>
                </ul>
                {/* <div className="absolute top-0 right-0 p-2">
                  <Button layout="link" size="icon" onClick={() => openModal(data)}>
                    <FiEdit2 className="w-5 h-5" />
                  </Button>
                  <Button layout="link" size="icon" className="ml-2">
                    <FiTrash2 className="w-5 h-5" />
                  </Button>
                </div> */}

                {(data.strategyDesc.execution_status === null ||
                  data.strategyDesc.execution_status === "") && (
                  <div className="absolute top-0 right-0 p-2">
                    <Button
                      layout="link"
                      size="icon"
                      onClick={() => handleEditSetup(data)}
                    >
                      <FiEdit2 className="w-5 h-5" />
                    </Button>
                    <Button
                      layout="link"
                      size="icon"
                      className="ml-2"
                      onClick={() => openDeleteModal(data)}
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </Button>
                  </div>
                )}

                {data.strategyDesc.execution_status != null && (
                  <div className="absolute top-0 right-0 p-2">
                    <Status status={data.strategyDesc.execution_status} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <ModalHeader>Confirm Delete</ModalHeader>
        <ModalBody>Are you sure you want to delete this strategy?</ModalBody>
       





        <ModalFooter>
  <button
    layout="outline"
    onClick={closeDeleteModal}
    className="w-full bg-gray-300 hover:bg-gray-400  font-semibold px-4 py-2 rounded-md"
  >
    Cancel
  </button>
  <button
           onClick={handleDeleteStrategy}
    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md"
  >
       Delete
  </button>
</ModalFooter>
      </Modal>


      <Modal isOpen={isGoLiveModalOpen} onClose={() => setIsGoLiveModalOpen(false)}>
  <ModalHeader>Go Live</ModalHeader>
  <ModalBody>
    Are you sure you want to set this strategy live?
    <div className="p-4">
      <ul>
        <li><strong>Strategy Name:</strong> {selectedStrategyForGoLive?.strategyDesc.strategy_name}</li>
        <li><strong>Description:</strong> {selectedStrategyForGoLive?.strategyDesc.description || "N/A"}</li>
        <li><strong>Required Fund:</strong> {selectedStrategyForGoLive?.strategyDesc.required_fund || "N/A"}</li>
        

        {/* Add more strategy details if needed */}
      </ul>
    </div>
  </ModalBody>
  <ModalFooter>
  <button
    layout="outline"
    onClick={() => setIsGoLiveModalOpen(false)}
    className="w-full bg-gray-300 hover:bg-gray-400  font-semibold px-4 py-2 rounded-md"
  >
    Cancel
  </button>
  <button
    onClick={() => {
      handleCompleteStrategy(selectedStrategyForGoLive.strategyDesc.strategy_id);
      setIsGoLiveModalOpen(false);
    }}
    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md"
  >
    Go Live
  </button>
</ModalFooter>

</Modal>

    </div>
  );
};

export default Strategy;
