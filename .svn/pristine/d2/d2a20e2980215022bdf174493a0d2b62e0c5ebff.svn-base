// import React from "react";
// import { Input } from "@windmill/react-ui";

// const InputArea = ({
//   register,
//   defaultValue,
//   required,
//   name,
//   label,
//   type,
//   placeholder,



// }) => {
//   return (
//     <>
//       <Input
//         // {...register(`${name}`, {
//         //   required: required ? false : `${label} is required!`,
//         // })}
//         {...register(`${name}`, {
//           required: required ? `${label} is required!` : false,
//         })}
//         defaultValue={defaultValue}
//         type={type}
//         placeholder={placeholder}
//         name={name}
//         className="border h-12 text-sm focus:outline-none block w-full bg-white-100 dark:bg-white border-transparent focus:bg-white"

//       />
     
//     </>
//   );
// };

// export default InputArea;



import React from "react";
import { Input } from "@windmill/react-ui";

const InputArea = ({
  register,
  name,
  label,
  type,
  placeholder,
  errors, // Add 'errors' to display validation errors
  password // Receive the 'password' prop
}) => {

  // console.log("password:",password);

  const getValidationRules = () => {
    switch (name) {
      case "password":
        return {
          required: `${label} is required!`,
          pattern: {
            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
            message:
              "Invalid password pattern! Password should contain at least 8 characters including one number, one lowercase, and one uppercase letter.",
          },
        };
      case "cpassword":
        return {
          required: `${label} is required!`,
          validate: {
            matchesPassword: (value) => value === password || "Passwords do not match!",
          },
        };
        case "Mobile_No":
  return {
    required: `${label} is required!`,
    pattern: {
      value: /^\d{10}$/,
      message: "Invalid mobile number format! It should be a 10-digit number.",
    },
  };

      case "email":
        return {
          required: `${label} is required!`,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address!",
          },
        };
      default:
        return {
          required: `${label} is required!`,
        };
    }
  };
  
  


  const validationRules = getValidationRules();

  return (
    <>
      <Input
        // {...register(name, {
        //   required: `${label} is required!`,
        //   // Add other validation rules as needed
        // })}
        {...register(name, validationRules)}
        type={type}
        placeholder={placeholder}
        name={name}
        className="border h-12 text-sm focus:outline-none block w-full bg-white-100 dark:bg-white border-transparent focus:bg-white"
      />
      {/* {errors && errors[name] && (
        <p className="text-red-500">{errors[name].message}</p>
      )} */}
    </>
  );
};

export default InputArea;
