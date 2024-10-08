
import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "@windmill/react-ui";

const BrokerModal = ({ isOpen, onClose, broker, onDelete }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader className="text-lg font-semibold">Broker Details</ModalHeader>
      <ModalBody className="p-4">
        <div className="mb-4">
          <p><strong>ID:</strong> {broker.id}</p>
          {/* <p><strong>Name:</strong> {broker.name}</p> */}
          <p><strong>API Key:</strong> {broker.api_key}</p>
          <p><strong>API Secret Key:</strong> {broker.api_secret_key}</p>
          <p><strong>Connected Date:</strong> {new Date(broker.connected_date).toLocaleString()}</p>
          <p><strong>Status:</strong> {broker.status}</p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button layout="outline" className="mr-2" onClick={onClose}>
          Close
        </Button>
        <Button 
          layout="outline" 
          className="bg-red-600 text-white hover:bg-red-700 text-white" 
          onClick={() => onDelete(broker.broker_id
          )} // Handle delete action
        >
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default BrokerModal;
