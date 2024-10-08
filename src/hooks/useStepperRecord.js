import { useState, useEffect } from 'react';

const useStepperRecord = (WorkingStrategy) => {
  const [assets, setAssets] = useState([]);
  const [action, setAction] = useState([]);
  const [indicators, setIndicators] = useState([]);

  useEffect(() => {
    const fetchAndSetData = () => {
      try {
        if (WorkingStrategy?.UniqueID) {
          const localStorageKeys = ['assetselection', 'Actionselection', 'indicators'];

          // Fetch data for each key from localStorage
          localStorageKeys.forEach((key) => {
            const localStorageData = JSON.parse(localStorage.getItem(key)) || [];
            const filteredData = localStorageData.filter(item => item.UniqueID === WorkingStrategy.UniqueID);

            switch (key) {
              case 'assetselection':
                setAssets(filteredData);
                break;
              case 'Actionselection':
                setAction(filteredData);
                break;
              case 'indicators':
                setIndicators(filteredData);
                break;
              default:
                break;
            }
          });
        }
      } catch (error) {
        console.error('Error fetching and setting data:', error);
      }
    };

    fetchAndSetData();
  }, [WorkingStrategy]);

  return { assets, action, indicators };
};

export default useStepperRecord