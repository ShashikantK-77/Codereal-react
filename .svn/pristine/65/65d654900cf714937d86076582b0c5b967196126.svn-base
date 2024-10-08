import { Input } from '@windmill/react-ui';

const InputAreaTwo = ({
  register,
  defaultValue,
  required,
  name,
  label,
  type,
  placeholder,
  onClick,
  onFocus,
  onChange,
  disabled
}) => {
  // Define pattern based on the type
  const pattern = type === 'number' ? /^[0-9]*$/ : undefined;

  const handleKeyPress = (e) => {
    if (type === 'number' && !/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };
  return (
    <>
      <Input
        // {...register(`${name}`, {
        //   required: required ? false : `${label} is required!`,
        // })}

   
        {...register(`${name}`, {
          required: required ? false : `${label} is required!`,
          pattern: pattern // Apply pattern if type is 'number'
        })}
        defaultValue={defaultValue}
        onClick={onClick}
        onFocus={onFocus}
        type={type}
        onKeyPress={handleKeyPress} 
        placeholder={placeholder}
        name={name}
        disabled={disabled}
        autoComplete="new-password"
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
      />
    </>
  );
};

export default InputAreaTwo;
