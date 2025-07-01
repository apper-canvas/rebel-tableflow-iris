import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';

const OrderCard = ({ order, onStatusChange, className = "" }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return 'Clock';
      case 'preparing':
        return 'ChefHat';
      case 'ready':
        return 'Bell';
      case 'served':
        return 'Check';
      case 'paid':
        return 'CreditCard';
      default:
        return 'Circle';
    }
  };

  const getNextStatus = (currentStatus) => {
    const statusFlow = {
      pending: 'preparing',
      preparing: 'ready',
      ready: 'served',
      served: 'paid'
    };
    return statusFlow[currentStatus];
  };

  const getNextStatusLabel = (currentStatus) => {
    const labels = {
      pending: 'Start Preparing',
      preparing: 'Mark Ready',
      ready: 'Mark Served',
      served: 'Mark Paid'
    };
    return labels[currentStatus];
  };

  const canAdvanceStatus = (status) => {
    return ['pending', 'preparing', 'ready', 'served'].includes(status);
  };

  const timeAgo = formatDistanceToNow(new Date(order.createdAt), { addSuffix: true });

  return (
    <motion.div
      className={`card p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-display font-semibold text-lg text-gray-900">
              Order #{order.id}
            </h3>
            <Badge 
              variant={order.status} 
              icon={getStatusIcon(order.status)}
              animate
            >
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600 font-body">
            <span className="flex items-center gap-1">
              <ApperIcon name="MapPin" size={16} />
              Table {order.tableId}
            </span>
            <span className="flex items-center gap-1">
              <ApperIcon name="Clock" size={16} />
              {timeAgo}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-display font-bold gradient-text">
            ${order.total.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900 font-body">
                  {item.quantity}x {item.name}
                </span>
              </div>
              {item.specialRequests && (
                <p className="text-sm text-gray-600 mt-1 font-body italic">
                  Note: {item.specialRequests}
                </p>
              )}
            </div>
            <span className="font-medium text-gray-900 font-body">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {order.notes && (
        <div className="mb-6 p-3 bg-surface rounded-lg">
          <p className="text-sm text-gray-700 font-body">
            <strong>Notes:</strong> {order.notes}
          </p>
        </div>
      )}

      {canAdvanceStatus(order.status) && (
        <div className="flex gap-3">
          <Button
            variant="primary"
            icon={getStatusIcon(getNextStatus(order.status))}
            onClick={() => onStatusChange(order.id, getNextStatus(order.status))}
            className="flex-1"
          >
            {getNextStatusLabel(order.status)}
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default OrderCard;