import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const StatsCard = ({ title, value, icon, trend = null, color = "primary", className = "" }) => {
  const getColorClasses = (color) => {
    switch (color) {
      case 'success':
        return 'bg-gradient-to-br from-green-50 to-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-gradient-to-br from-yellow-50 to-yellow-100 text-yellow-800 border-yellow-200';
      case 'error':
        return 'bg-gradient-to-br from-red-50 to-red-100 text-red-800 border-red-200';
      case 'info':
        return 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-800 border-blue-200';
      case 'accent':
        return 'bg-gradient-to-br from-accent-50 to-accent-100 text-accent-800 border-accent-200';
      default:
        return 'bg-gradient-to-br from-primary-50 to-primary-100 text-primary-800 border-primary-200';
    }
  };

  const getIconBgColor = (color) => {
    switch (color) {
      case 'success':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'error':
        return 'bg-red-500';
      case 'info':
        return 'bg-blue-500';
      case 'accent':
        return 'bg-accent-500';
      default:
        return 'bg-primary-500';
    }
  };

  return (
    <motion.div
      className={`card p-6 ${getColorClasses(color)} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-display font-medium text-sm mb-2 opacity-80">
            {title}
          </h3>
          <p className="text-3xl font-display font-bold mb-1">
            {value}
          </p>
          {trend && (
            <div className="flex items-center gap-1 text-sm">
              <ApperIcon 
                name={trend.direction === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
                className={trend.direction === 'up' ? 'text-green-600' : 'text-red-600'}
              />
              <span className={trend.direction === 'up' ? 'text-green-600' : 'text-red-600'}>
                {trend.value}
              </span>
              <span className="opacity-70">vs last week</span>
            </div>
          )}
        </div>
        <div className={`w-16 h-16 ${getIconBgColor(color)} rounded-full flex items-center justify-center shadow-lg`}>
          <ApperIcon name={icon} size={32} className="text-white" />
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;