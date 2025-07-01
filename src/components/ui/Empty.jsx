import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  icon = "PackageOpen", 
  title = "No items found", 
  description = "There are no items to display at the moment.",
  actionLabel = "Add New",
  onAction = null,
  type = "default"
}) => {
  const getEmptyContent = () => {
    switch (type) {
      case "tables":
        return {
          icon: "Utensils",
          title: "No Tables Available",
          description: "Set up your restaurant floor plan by adding tables to get started with managing your dining room.",
          actionLabel: "Add First Table"
        };
      case "orders":
        return {
          icon: "ChefHat",
          title: "No Active Orders",
          description: "All caught up! There are currently no orders to prepare or serve.",
          actionLabel: "Create New Order"
        };
      case "reservations":
        return {
          icon: "Calendar",
          title: "No Reservations Today",
          description: "No reservations are scheduled. Ready to welcome walk-in customers!",
          actionLabel: "Add Reservation"
        };
      case "bills":
        return {
          icon: "Receipt",
          title: "No Pending Bills",
          description: "All bills have been settled. Great job keeping up with payments!",
          actionLabel: "View All Bills"
        };
      default:
        return { icon, title, description, actionLabel };
    }
  };

  const content = getEmptyContent();

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-20 h-20 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center mb-6 shadow-lg"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <ApperIcon name={content.icon} size={40} className="text-primary-600" />
      </motion.div>
      
      <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
        {content.title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md font-body leading-relaxed">
        {content.description}
      </p>
      
      {onAction && (
        <motion.button
          onClick={onAction}
          className="btn-primary flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ApperIcon name="Plus" size={18} />
          {content.actionLabel}
        </motion.button>
      )}
    </motion.div>
  );
};

export default Empty;