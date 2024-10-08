import React from 'react';
import { Button, Card, CardBody, Text } from "@windmill/react-ui";
import { useHistory } from 'react-router-dom'; // Import useHistory from React Router

const Createstrategy = () => {
    const history = useHistory();

    const handleCreateClick = () => {
        // Navigate to the '/makestrategy' URL when the button is clicked
        history.push('/makestrategy');
      };
  return (
    <Card className="w-full mb-4">
      <CardBody>
        <div className="text-center">
          <p className="text-xl font-semibold mb-2">Create a New Strategy</p>
          <p className="text-sm text-gray-500 mb-4">Start building your custom trading strategy</p>
          <Button
            onClick={handleCreateClick} 
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-full"
          >
            Create
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

export default Createstrategy;
