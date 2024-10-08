import { Button } from '@windmill/react-ui'
import React,{ useEffect, useState,createContext } from 'react'
import { useOrderContext, OrderContextProvider } from '../../context/OrderContext';


// const Nifty = () => {

//   const [assets, setAssets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { setOrderData } = useOrderContext();

//   useEffect(() => {
//     const fetchAssets = async () => {
//       try {
//         const response = await fetch('https://paper-api.alpaca.markets/v2/assets', {
//           headers: {
//             'APCA-API-KEY-ID': 'PKYP9KGLKLIKTFU54DC5',
//             'APCA-API-SECRET-KEY': 'KQNI9rUdhvhP5qRQxl2oMwHAYrlVkfJDrT4AxPcT',
//             // 'APCA-API-SECRET-KEY': 'KQNI9rUdhvhP5qRQxl2oMwHAYrrT4AxPcT',
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setAssets(data);
//         } else {
//           console.error('Failed to fetch assets');
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAssets();
//   }, []);

//   const handleBuy = (asset) => {
//     const orderBuyData = {
//       symbol: asset.symbol,
//       name: asset.name,
//       exchange: asset.exchange,
//       id:asset.id,
//       status:asset.status,
//       tradable:asset.tradable,
//       timestamp: new Date().getTime(),
//     };
//     // AssetContext.Provider.value = orderBuyData;
//     setOrderData(orderBuyData);
//     // localStorage.setItem('orderBuy', JSON.stringify(orderBuyData));
//     // console.log('Order Buy Data Localstorage:', orderBuyData);
//     // console.log(asset);
//   };
//   // const activeAssets = assets.filter((asset) => asset.status === 'active');
//   const activeAssets = assets.filter((asset) => asset.status === 'active' && asset.tradable === true);

//   return (
//     <div className="h-64 overflow-y-auto">
//       {activeAssets.slice(0, 15).map((asset) => (
//   <>
//     <div className='flex justify-around'>
  
//     <div>
//       <h2 className='font-bold my-4'>{asset.symbol}</h2>
//     </div>
//     <div>
//       {/* <div className='my-2 mx-8 bg-gray-300 px-12 p-4 text-xs	'>{asset.name}</div> */}
//       <div className='m-2 w-24 bg-gray-300  p-1 text-xs truncate'>{asset.name.substring(0, 20)}....</div>
//     </div>
//     <div className='my-2'> 
//       <Button className='mx-1' onClick={() => handleBuy(asset)}>Buy</Button>
//       <Button className='btn-red mx-1'>Sell</Button>
//     </div>

//     </div>
//     <hr/>
//     </>
// ))}
//     </div>
//   )
// }

// export default Nifty


const Nifty = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setOrderData } = useOrderContext();

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch('https://paper-api.alpaca.markets/v2/assets', {
          headers: {
            'APCA-API-KEY-ID': 'PKYP9KGLKLIKTFU54DC5',
            'APCA-API-SECRET-KEY': 'KQNI9rUdhvhP5qRQxl2oMwHAYrlVkfJDrT4AxPcT',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAssets(data);
        } else {
          console.error('Failed to fetch assets');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  const handleBuy = (asset) => {
    const orderBuyData = {
      symbol: asset.symbol,
      name: asset.name,
      exchange: asset.exchange,
      id: asset.id,
      status: asset.status,
      tradable: asset.tradable,
      timestamp: new Date().getTime(),
    };

    setOrderData(orderBuyData);
  };

  const activeAssets = assets.filter((asset) => asset.status === 'active' && asset.tradable === true );

  return (
    <div className="h-screen overflow-y-auto ">
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        activeAssets.length > 0 ? (
          activeAssets.slice(0, 25).map((asset) => (
            <>
         


<div className="w-full"> {/* Add this wrapper with full width */}
  <button
    className="w-full hover:bg-gray-100 focus:outline-none focus:bg-green-200 text-gray-700 font-bold py-1  rounded-md"
    onClick={() => handleBuy(asset)}
  >
    <div className="flex justify-between items-center">
      <div className="p-2 w-4/6"> {/* Update width to 3/6 (50%) */}
        <h2 className="font-bold text-sm my-1 text-green-500 text-left">{asset.symbol}</h2>
      </div>

      <div className="my-1 py-1 flex w-2/6"> {/* Update width to 3/6 (50%) */}
        <h2 className="font-bold text-green-600 hover:text-green-600 mx-2 text-right">B</h2>
        <h2 className="font-bold text-red-600 hover:text-green-600 mx-2 text-right">S</h2>
        <h2 className="font-bold hover:text-green-600 mx-2 text-right">220/-</h2>
      </div>
    </div>
  </button>
</div>


              <hr />
            </>
          ))
        ) : (
          <div className="text-center">No active assets available.</div>
        )
      )}
    </div>
  );
};

export default Nifty;

