// Feedback.js
import PageTitle from 'components/Typography/PageTitle';
import React, { useState } from 'react';
import {

  Button,
  Input,
  Textarea,
  Dropdown,
  DropdownItem,
} from '@windmill/react-ui';

const Feedback = () => {
  const [feedbackType, setFeedbackType] = useState('');
  const [feedbackContent, setFeedbackContent] = useState('');

  const feedbackTypes = ['Bug Report', 'Feature Request', 'General Feedback'];

  const handleFeedbackSubmit = () => {
    // Implement your logic to handle feedback submission
    console.log('Feedback Type:', feedbackType);
    console.log('Feedback Content:', feedbackContent);

    // Reset form after submission
    setFeedbackType('');
    setFeedbackContent('');
  };

  return (
    <div>
      <PageTitle>Feedback</PageTitle>

  

      <div className="mb-4">
        <Dropdown
          className="w-full"
          isOpen={feedbackType !== ''}
          value={feedbackType}
          onChange={(value) => setFeedbackType(value)}
          placement="bottom-start"
        >
          <Button size="small" layout="outline" className="w-full">
            {feedbackType || 'Select Feedback Type'}
          </Button>
          {feedbackTypes.map((type) => (
            <DropdownItem key={type} value={type} onClick={() => setFeedbackType(type)}>
              {type}
            </DropdownItem>
          ))}
        </Dropdown>
      </div>

      <div className="mb-4 w-3/6">
        <Textarea
          className="resize-none"
          placeholder="Type your feedback..."
          value={feedbackContent}
          onChange={(e) => setFeedbackContent(e.target.value)}
        />
      </div>

      <Button onClick={handleFeedbackSubmit}>Submit Feedback</Button>
    </div>
  );
};

export default Feedback;
