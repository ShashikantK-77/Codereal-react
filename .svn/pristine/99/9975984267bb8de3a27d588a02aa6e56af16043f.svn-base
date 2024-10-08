import React, { useState } from 'react';
import { Button, Input, Card, CardBody, Modal } from '@windmill/react-ui'; // Assuming you're using Windmill UI components
import PageTitle from 'components/Typography/PageTitle';

const TradingAccount = () => {
  // Sample broker data for Indian Market and Forex Market
  const [brokers] = useState([
    {
      market: 'Indian Market',
      brokers: [
        {
          name: 'Kite',
          logoUrl: 'https://i.pinimg.com/564x/96/3a/85/963a853539af737933a2ef24c04a0aeb.jpg',
          fields: [
            { id: 'secretKey', label: 'Secret Key', type: 'text' },
            { id: 'appKey', label: 'App Key', type: 'text' },

            // Add more fields as needed
          ],
          Api:'https://paper-api.alpaca.markets/v2/account',
        },

        {
            name: 'Zerodha',
            logoUrl: 'https://i.pinimg.com/564x/96/3a/85/963a853539af737933a2ef24c04a0aeb.jpg',
            fields: [
              { id: 'secretKey', label: 'Secret Key', type: 'text' },
            //   { id: 'appKey', label: 'App Key', type: 'text' },
              // Add more fields as needed
            ],
            Api:'https://paper-api.alpaca.markets/v2/account',
          },

      ]
    },
    {
      market: 'Forex Market',
      brokers: [
        {
          name: 'Buisness Guide',
          logoUrl: 'https://i.pinimg.com/564x/96/3a/85/963a853539af737933a2ef24c04a0aeb.jpg',
          fields: [
            { id: 'apiToken', label: 'API Token', type: 'text' },
            // Add more fields as needed
          ]
        }
      ]
    },
  ]);

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to store the selected broker
  const [selectedBroker, setSelectedBroker] = useState(null);

  // Function to handle logo click and open modal
  const handleLogoClick = (broker) => {
    setSelectedBroker(broker);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <PageTitle>Trading Account</PageTitle>
      {brokers.map((market, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-xl font-semibold mb-2">{market.market} (2+)</h2>
          <div className="flex flex-wrap">
            {market.brokers.map((broker, idx) => (
              <div key={idx} className="logo-container m-2" onClick={() => handleLogoClick(broker)}>
                <img src={broker.logoUrl} alt={broker.name} className="w-20 h-20 cursor-pointer" />
              </div>
            ))}
          </div>
        </div>
      ))}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedBroker && (
          <div>
            <h1>You selected {selectedBroker.name} broker</h1>
            <form>
              {selectedBroker.fields.map((field, idx) => (
                <div key={idx} className="mb-4">
                  <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">{field.label}</label>
                  <Input
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 block w-full"
                  />
                </div>
              ))}
              <div className="mt-4">
                <Button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={closeModal}
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TradingAccount;





// // Sample data
// const brokerData = [
//     {
//       market: 'Indian Market',
//       brokers: [
//         {
//           name: 'Kite',
//           logoUrl: 'https://i.pinimg.com/564x/96/3a/85/963a853539af737933a2ef24c04a0aeb.jpg',
//           fields: [
//             { id: 'secretKey', label: 'Secret Key', type: 'text' },
//             { id: 'appKey', label: 'App Key', type: 'text' },
//             // Add more fields as needed
//           ],
//           Api: 'https://paper-api.alpaca.markets/v2/account',
//         },
//         {
//           name: 'Zerodha',
//           logoUrl: 'https://i.pinimg.com/564x/96/3a/85/963a853539af737933a2ef24c04a0aeb.jpg',
//           fields: [
//             { id: 'secretKey', label: 'Secret Key', type: 'text' },
//             // Add more fields as needed
//           ],
//           Api: 'https://paper-api.alpaca.markets/v2/account',
//         },
//       ],
//     },
//     {
//       market: 'Forex Market',
//       brokers: [
//         {
//           name: 'Business Guide',
//           logoUrl: 'https://i.pinimg.com/564x/96/3a/85/963a853539af737933a2ef24c04a0aeb.jpg',
//           fields: [
//             { id: 'apiToken', label: 'API Token', type: 'text' },
//             // Add more fields as needed
//           ],
//         },
//       ],
//     },
//   ];
  
//   // Save data to local storage
//   localStorage.setItem('Broker_Master', JSON.stringify(brokerData));
  