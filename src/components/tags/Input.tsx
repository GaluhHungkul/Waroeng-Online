import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  type?: string;
  className?: string;
  showIcon?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={`relative w-full  text-white ${className} `} id={id}>       
        {isPassword && (
        <>
        {showPassword
        ?
        <Eye className="absolute right-3 top-1/2 -translate-y-1/2  w-4 h-4 cursor-pointer" color='black'  onClick={togglePassword} /> 
        : 
        <EyeOff className="absolute right-3 top-1/2 -translate-y-1/2  w-4 h-4 cursor-pointer" color='black'  onClick={togglePassword} />
        }
        </>
        )}
      <input
        id={id}
        type={isPassword ? (showPassword ? 'text' : 'password') : type}
        className={`peer w-full border border-gray-300  rounded-md px-3 pt-6  pb-2 text-gray-500 text-sm focus:outline-none focus:border-blue-500 lg:text-base pr-10`}
        placeholder=''
        {...props}
      />
      <label
        htmlFor={id}
        className="absolute left-3 top-2 text-gray-500 text-sm transition-all
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
          peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
      >
        {label}
      </label>
    </div>
  );
};

export default Input;