


import React, { useState } from 'react';
import BuyOrder from './OrderCompo/BuyOrder';
import SellOrder from './OrderCompo/SellOrder';
import MasterAccnt from './MasterAccnt';
import { useEffect } from 'react';

const PlaceOtrderTab = () => {
  const [activeTab, setActiveTab] = useState('buy');
  const [selectedMasterAccount, setMasterAccount] = useState(null);
  const [filteredMasterAccounts, setFilteredMasterAccounts] = useState([]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // useEffect(() => {
  //   const data = localStorage.getItem('masterlist');
  //   const accounts = data ? JSON.parse(data) : [];

  //   if (selectedMasterAccount) {
  //     const filteredAccounts = accounts.filter(account => account.Account_Name === selectedMasterAccount);
  //     setFilteredMasterAccounts(filteredAccounts);
  //     // console.log(filteredMasterAccounts);
  //   } else {
  //     setFilteredMasterAccounts([]);
  //   }
  // }, [selectedMasterAccount]);

  useEffect(() => {
    const data = localStorage.getItem('masterlist');
    const accounts = data ? JSON.parse(data) : [];

    if (selectedMasterAccount) {
      const filteredAccounts = accounts.filter(account => account.Account_Name === selectedMasterAccount);
      setFilteredMasterAccounts(filteredAccounts);
      console.log(filteredMasterAccounts);
    } else {
      setFilteredMasterAccounts([]);
    }
  }, [selectedMasterAccount]);

  return (
    <div>
      <div className="tab-buttons">
        <button
          onClick={() => handleTabClick('buy')}
          className={`font-bold text-lg ${activeTab === 'buy' ? 'active' : ''}`}
        >
          Buy
        </button>
        <button
          onClick={() => handleTabClick('sell')}
          className={`font-bold text-lg ${activeTab === 'sell' ? 'active' : ''}`}
        >
          Sell
        </button>
      </div>

      <MasterAccnt setMasterAccount={setMasterAccount} />

      {/* Display the filteredMasterAccounts */}
      {/* {filteredMasterAccounts.map(account => (
        <div key={account.id}>
        
          <p>Name: {account.name}</p>
          <p>Email: {account.email}</p>
         
        </div>
      ))} */}

      {activeTab === 'buy' && <BuyOrder filteredMasterAccounts={filteredMasterAccounts}/>}
      {activeTab === 'sell' && <SellOrder />}

      <style jsx>{`
        .tab-buttons {
          display: flex;
          justify-content: center;
          margin-bottom: 16px;
        }

        button {
          background-color: transparent;
          border: none;
          padding: 8px 16px;
          margin: 0 8px;
          font-size: 16px;
          color: #000;
          text-decoration: none;
          cursor: pointer;
        }

        button.active {
          border-bottom: 2px solid #00ff00;
        }
      `}</style>
    </div>
  );
};

export default PlaceOtrderTab;
