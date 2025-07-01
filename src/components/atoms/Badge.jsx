import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Badge = ({ 
  children, 
  variant = "default", 
  size = "default",
  icon = null,
  animate = false,
  className = "",
  ...props 
}) => {
  const baseClasses = "inline-flex items-center font-medium rounded-full";
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800",
    secondary: "bg-secondary-100 text-secondary-800",
    accent: "bg-gradient-to-r from-accent-100 to-accent-200 text-accent-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
    available: "bg-green-100 text-green-800",
    occupied: "bg-red-100 text-red-800",
    reserved: "bg-yellow-100 text-yellow-800",
    cleaning: "bg-gray-100 text-gray-800",
    pending: "bg-yellow-100 text-yellow-800",
    preparing: "bg-blue-100 text-blue-800",
    ready: "bg-green-100 text-green-800",
    served: "bg-gray-100 text-gray-800",
    paid: "bg-green-100 text-green-800",
  };
  
  const sizes = {
    small: "px-2 py-1 text-xs",
    default: "px-3 py-1 text-sm",
    large: "px-4 py-2 text-base",
  };

  const iconSize = size === "small" ? 12 : size === "large" ? 16 : 14;

  const badgeContent = (
    <span className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {icon && <ApperIcon name={icon} size={iconSize} className="mr-1" />}
      {children}
    </span>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {badgeContent}
      </motion.div>
    );
  }

  return badgeContent;
};

export default Badge;