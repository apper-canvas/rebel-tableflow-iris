import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Button = ({ 
  children, 
  variant = "primary", 
  size = "default", 
  icon = null, 
  iconPosition = "left",
  loading = false,
  disabled = false,
  className = "",
  onClick,
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 border-none focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md hover:shadow-lg focus:ring-primary-500 disabled:from-gray-400 disabled:to-gray-500",
    secondary: "bg-white text-secondary-600 border border-secondary-200 shadow-sm hover:shadow-md hover:bg-secondary-50 focus:ring-secondary-500 disabled:bg-gray-100 disabled:text-gray-400",
    accent: "bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-md hover:shadow-lg focus:ring-accent-500 disabled:from-gray-400 disabled:to-gray-500",
    success: "bg-gradient-to-r from-success to-green-600 text-white shadow-md hover:shadow-lg focus:ring-success disabled:from-gray-400 disabled:to-gray-500",
    danger: "bg-gradient-to-r from-error to-red-600 text-white shadow-md hover:shadow-lg focus:ring-error disabled:from-gray-400 disabled:to-gray-500",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500 disabled:text-gray-400",
  };
  
  const sizes = {
    small: "px-3 py-2 text-sm",
    default: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  const iconSize = size === "small" ? 16 : size === "large" ? 20 : 18;

  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      {...props}
    >
      {loading ? (
        <>
          <ApperIcon name="Loader2" size={iconSize} className="animate-spin mr-2" />
          Loading...
        </>
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <ApperIcon name={icon} size={iconSize} className="mr-2" />
          )}
          {children}
          {icon && iconPosition === "right" && (
            <ApperIcon name={icon} size={iconSize} className="ml-2" />
          )}
        </>
      )}
    </motion.button>
  );
};

export default Button;