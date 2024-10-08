// __tests__/SampleComponent.test.js
import React from 'react';
import { render } from '@testing-library/react';
import SampleComponent from '../src/pages/SampleComponent';

describe('SampleComponent', () => {
  it('renders with the correct greeting message', () => {
    const name = 'John';
    const { getByText } = render(<SampleComponent name={name} />);
    const greetingElement = getByText(`Hello, ${name}!`);
    expect(greetingElement).toBeInTheDocument();
  });

  it('renders the sample description', () => {
    const name = 'John';
    const { getByText } = render(<SampleComponent name={name} />);
    const descriptionElement = getByText('This is a sample component for testing.');
    expect(descriptionElement).toBeInTheDocument();
  });
});
