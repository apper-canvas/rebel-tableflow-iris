import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';

const TableCard = ({ table, onClick, className = "" }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-50 border-green-200 hover:bg-green-100';
      case 'occupied':
        return 'bg-red-50 border-red-200 hover:bg-red-100';
      case 'reserved':
        return 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100';
      case 'cleaning':
        return 'bg-gray-50 border-gray-200 hover:bg-gray-100';
      default:
        return 'bg-white border-gray-200 hover:bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available':
        return 'Check';
      case 'occupied':
        return 'Users';
      case 'reserved':
        return 'Clock';
      case 'cleaning':
        return 'Sparkles';
      default:
        return 'Circle';
    }
  };

  return (
    <motion.div
      className={`card cursor-pointer p-4 ${getStatusColor(table.status)} ${className}`}
      onClick={() => onClick(table)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
          <ApperIcon name="Utensils" size={24} className="text-secondary-600" />
        </div>
        
        <div>
          <h3 className="font-display font-semibold text-gray-900 text-lg">
            Table {table.number}
          </h3>
          <p className="text-sm text-gray-600 font-body">
            {table.capacity} seats
          </p>
        </div>
        
        <Badge 
          variant={table.status} 
          icon={getStatusIcon(table.status)}
          animate
        >
          {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
        </Badge>
      </div>
    </motion.div>
  );
};

export default TableCard;