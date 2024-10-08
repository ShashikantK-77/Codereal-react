
  

import { useState, useEffect, useCallback } from 'react';
import { BaseUrl } from 'utils/Constants';

const useBrokerData = () => {
  const [brokerData, setBrokerData] = useState([]);
  const [brokerInfo, setBrokerInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBrokerData = useCallback(async () => {
    console.log("in fetchBrokerData");
    setLoading(true);
    try {
      const response = await fetch(`${BaseUrl}broker/getBrokerAcountData`);
      const data = await response.json();

      const brokers = Array.isArray(data.brokerData) ? data.brokerData : [];

      setBrokerData(brokers);
      console.log("brokerData after changed:",brokerData);

      const brokerInfoPromises = brokers.map(async (broker) => {
        try {
          const brokerInfoResponse = await fetch(`${BaseUrl}broker/getBrokerInfo/${broker.broker_id}`);
          const brokerInfoData = await brokerInfoResponse.json();
          return { id: broker.broker_id, name: brokerInfoData.broker?.name || 'Unknown' };
        } catch (infoError) {
          return { id: broker.broker_id, name: 'Error fetching data' };
        }
      });

      const brokerInfoArray = await Promise.all(brokerInfoPromises);
      const brokerInfoMap = brokerInfoArray.reduce((acc, info) => {
        acc[info.id] = info.name;
        return acc;
      }, {});

      setBrokerInfo(brokerInfoMap);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBrokerData();
  }, [fetchBrokerData]);

  return { brokerData, brokerInfo, loading, error, refetch: fetchBrokerData };
};

export default useBrokerData;
