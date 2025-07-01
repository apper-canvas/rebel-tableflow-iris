import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Error = ({ message = "Something went wrong", onRetry = null, type = "default" }) => {
  const getErrorIcon = () => {
    switch (type) {
      case "network":
        return "WifiOff";
      case "not-found":
        return "SearchX";
      case "server":
        return "ServerCrash";
      default:
        return "AlertTriangle";
    }
  };

  const getErrorTitle = () => {
    switch (type) {
      case "network":
        return "Connection Problem";
      case "not-found":
        return "No Data Found";
      case "server":
        return "Server Error";
      default:
        return "Oops! Something went wrong";
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-16 h-16 bg-gradient-to-br from-error to-red-600 rounded-full flex items-center justify-center mb-6 shadow-lg"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ApperIcon name={getErrorIcon()} size={32} className="text-white" />
      </motion.div>
      
      <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
        {getErrorTitle()}
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md font-body">
        {message}
      </p>
      
      {onRetry && (
        <motion.button
          onClick={onRetry}
          className="btn-primary flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ApperIcon name="RefreshCw" size={18} />
          Try Again
        </motion.button>
      )}
    </motion.div>
  );
};

export default Error;