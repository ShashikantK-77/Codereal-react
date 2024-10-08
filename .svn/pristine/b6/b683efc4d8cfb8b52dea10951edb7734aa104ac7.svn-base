// PasswordReset.js
import React, { useState } from 'react';
import { Input, Button } from '@windmill/react-ui';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordReset = () => {
    // Add logic for password reset here
    console.log('Password reset logic goes here');
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-8 max-w-md w-full bg-white rounded shadow-md space-y-4">
        <h2 className="text-2xl font-semibold text-center">Reset Your Password</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 text-sm font-medium">
              Email Address
            </label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 text-sm font-medium">
              New Password
            </label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-600 text-sm font-medium">
              Confirm Password
            </label>
            <Input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <Button block type="button" onClick={handlePasswordReset}>
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
