import React from 'react';
import { Select } from '@windmill/react-ui';
import Error from './Error';

const SelectGender = ({ setRole, register, name, label,errors  }) => {
  return (
    <>
      <Select
        onChange={(e) => setRole(e.target.value)}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
      
        {...register(`${name}`, {
          required: `${label} is required!`,
        })}
      >
        <option value="" defaultValue hidden>
        --Select--
        </option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
  
        {/* <option value="Manager">Manager</option>
        <option value="Accountant">Accountant</option>
        <option value="Driver"> Driver </option>
        <option value="Security Guard">Security Guard</option>
        <option value="Deliver Person">Delivery Person</option> */}
      </Select>
      {/* <Error errorName={errors.Role} /> */}
          
    </>
  );
};

export default SelectGender;
