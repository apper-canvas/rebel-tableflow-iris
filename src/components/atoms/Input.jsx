import React, { forwardRef } from 'react';
import ApperIcon from '@/components/ApperIcon';

const Input = forwardRef(({ 
  label = "", 
  icon = null, 
  error = "", 
  type = "text",
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
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ApperIcon name={icon} size={18} className="text-gray-400" />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={`input-field ${icon ? 'pl-10' : ''} ${error ? 'border-error focus:border-error focus:ring-red-100' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-error font-body">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;