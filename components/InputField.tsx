// components/InputField.tsx
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  value?: string | number | boolean;
  required?: boolean;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: LucideIcon;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value = '',
  placeholder = '',
  required = false,
  type = 'text',
  onChange,
  icon: Icon,
}) => {
  return (
    <div className="relative mb-6">
      <div className="relative w-full">
        {Icon && <Icon className="absolute left-3 top-[18px] h-5 w-5 text-gray-400 pointer-events-none" />}
        <input
          type={type}
          id={name}
          name={name}
          onChange={onChange}
          required={required}
          placeholder={ ' '} // trick to activate floating label
          className={`peer w-full bg-white text-black border border-gray-300 rounded-lg px-4 py-3 pt-5 ${
            Icon ? 'pl-11' : ''
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        <label
          htmlFor={name}
          className="absolute left-10 top-2.5 text-sm text-gray-500 transition-all duration-200 transform 
            scale-75 -translate-y-2 origin-[0] 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 
            peer-focus:scale-75 peer-focus:-translate-y-2"
        >
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      </div>
    </div>
  );
};

export default InputField;
