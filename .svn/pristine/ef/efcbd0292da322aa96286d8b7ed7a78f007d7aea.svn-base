import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { Input, Button } from '@windmill/react-ui';
import Nifty from './Nifty';

const Maintry = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
  <div className="tab-container flex justify-evenly">
        <Button
          className={`tab-button ${activeTab === 0 ? 'active' : ''}`}
          onClick={() => handleTabChange(0)}
        >
          NIFTY
        </Button>
        <Button
          className={`tab-button ${activeTab === 1 ? 'active' : ''}`}
          onClick={() => handleTabChange(1)}
        >
          BANK NIFTY
        </Button>
        <Button
          className={`tab-button ${activeTab === 2 ? 'active' : ''}`}
          onClick={() => handleTabChange(2)}
        >
          FINNIFTY
        </Button>
      </div>

      <div className="relative">
        <Input
          type="text"
          placeholder="Search"
          // onChange={onChange}
          className="pr-10 pl-3 m-2 py-2 rounded-lg border-gray-300 focus:ring-primary-500 focus:border-primary-500 bg-gray-100"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <BiSearch className="text-gray-400" />
        </div>
      </div>
      <hr className="my-2" />

      <div className="tab-content h-screen p-1">
        {activeTab === 0 && <div>
        <Nifty/> 
        </div> }
        {activeTab === 1 && <p>Content for BANK NIFTY</p>}
        {activeTab === 2 && <p>Content for FINNIFTY</p>}
      </div>

      <style jsx>{`
        .tab-button {
          transition: background-color 0.2s;
          background-color: gray;
          color: white;
        }

        .tab-button.active {
          background-color: green;
        }
      `}</style>
    </div>
  );
};

export default Maintry;