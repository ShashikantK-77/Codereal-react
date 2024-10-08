import React from "react";
import { Input } from "@windmill/react-ui";
import { formValidationRules } from "./formValidationRules";

const InputAreacompo = ({
  register,
  defaultValue,
  name,

  type,
  placeholder,
  onChange,
  onBlur,
  onClick,
  disabled,
}) => {
  return (
    <>
      <Input
        {...register(`${name}`, formValidationRules[name])}
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
        name={name}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white "
        onChange={onChange}
        onBlur={onBlur}
        onClick={onClick}
        disabled={disabled}
      />
    </>
  );
};

export default InputAreacompo;





