import React, { forwardRef } from 'react';
import ApperIcon from '@/components/ApperIcon';

const Select = forwardRef(({ 
  label = "", 
  options = [], 
  error = "", 
  placeholder = "Select an option",
  className = "",
  containerClassName = "",
  ...props 
}, ref) => {
  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 font-body">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          className={`input-field pr-10 appearance-none ${error ? 'border-error focus:border-error focus:ring-red-100' : ''} ${className}`}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ApperIcon name="ChevronDown" size={18} className="text-gray-400" />
        </div>
      </div>
      {error && (
        <p className="text-sm text-error font-body">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;