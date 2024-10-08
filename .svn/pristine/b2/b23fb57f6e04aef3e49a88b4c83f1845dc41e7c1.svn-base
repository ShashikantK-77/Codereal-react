import React from 'react'
import InputAreaTwo from 'components/form/InputAreaTwo';
import Error from 'components/form/Error';


const Inputfields = ({register,label,name,placeholder,errors,onChange,maxLength,type,pattern,className,defaultValue,disabled,onClick,onFocus}) => {
  const error = errors && errors[name];

  return (
    <div>
  <div className="flex items-start lg:items-center  m-2 lg:m-2 sm:m-0 flex-col sm:flex-row">
  <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 sm:text-left flex-shrink-0" style={{ width: '155px' }}>
    {label}:
  </label>
  <div className="w-full lg:flex-grow sm:w-full" >
    <InputAreaTwo
      register={register}
      label={label}
      name={name}
      type={type ? type : "text"} 
      pattern ={pattern}
      errors={errors}
      placeholder={placeholder}
      onChange={onChange}
      className={className}
      maxLength={maxLength}
      defaultValue={defaultValue}
      disabled={disabled}
      onClick={onClick}
      onFocus={onFocus}
   
    />
 

  </div>
</div>



    </div>
  )
}

export default Inputfields