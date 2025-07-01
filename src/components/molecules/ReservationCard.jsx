import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';

const ReservationCard = ({ reservation, onStatusChange, className = "" }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return 'CheckCircle';
      case 'seated':
        return 'Users';
      case 'cancelled':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const canSeat = (status) => status === 'confirmed';
  const canCancel = (status) => ['confirmed'].includes(status);

  const reservationDate = format(new Date(reservation.date), 'MMM dd, yyyy');
  const reservationTime = format(new Date(`2024-01-01T${reservation.time}`), 'h:mm a');

  return (
    <motion.div
      className={`card p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <h3 className="font-display font-semibold text-lg text-gray-900">
            {reservation.customerName}
          </h3>
          <Badge 
            variant={reservation.status} 
            icon={getStatusIcon(reservation.status)}
            animate
          >
            {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
          </Badge>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 text-gray-600 font-body">
          <ApperIcon name="Calendar" size={16} />
          <span>{reservationDate}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-600 font-body">
          <ApperIcon name="Clock" size={16} />
          <span>{reservationTime}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-600 font-body">
          <ApperIcon name="Users" size={16} />
          <span>{reservation.partySize} guests</span>
        </div>
        <div className="flex items-center gap-3 text-gray-600 font-body">
          <ApperIcon name="Phone" size={16} />
          <span>{reservation.phone}</span>
        </div>
        {reservation.tableId && (
          <div className="flex items-center gap-3 text-gray-600 font-body">
            <ApperIcon name="MapPin" size={16} />
            <span>Table {reservation.tableId}</span>
          </div>
        )}
      </div>

      {reservation.notes && (
        <div className="mb-6 p-3 bg-surface rounded-lg">
          <p className="text-sm text-gray-700 font-body">
            <strong>Notes:</strong> {reservation.notes}
          </p>
        </div>
      )}

<div className="flex gap-3">
      {canSeat(reservation.status) && (
        <Button
          variant="primary"
          icon="Users"
          onClick={() => onStatusChange(reservation.Id, 'seated')}
          className="flex-1"
        >
          Seat Guests
        </Button>
      )}
      {canCancel(reservation.status) && (
        <Button
          variant="danger"
          icon="XCircle"
          onClick={() => onStatusChange(reservation.Id, 'cancelled')}
          size="default"
        >
          Cancel
        </Button>
      )}
    </div>
    </motion.div>
  );
};

export default ReservationCard;