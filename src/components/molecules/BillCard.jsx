import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';

const BillCard = ({ bill, onStatusChange, className = "" }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return 'Clock';
      case 'paid':
        return 'Check';
      case 'cancelled':
        return 'X';
      default:
        return 'Circle';
    }
  };

  const canMarkPaid = (status) => status === 'pending';
  const isPaid = bill.status === 'paid';

  const billDate = format(new Date(bill.createdAt), 'MMM dd, yyyy h:mm a');

  const calculateTax = (subtotal) => subtotal * 0.08; // 8% tax
  const calculateTip = (subtotal) => subtotal * 0.18; // 18% tip
  const subtotal = bill.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = calculateTax(subtotal);
  const tip = calculateTip(subtotal);
  const total = subtotal + tax + tip;

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
              Bill #{bill.id}
            </h3>
            <Badge 
              variant={bill.status} 
              icon={getStatusIcon(bill.status)}
              animate
            >
              {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600 font-body">
            <span className="flex items-center gap-1">
              <ApperIcon name="MapPin" size={16} />
              Table {bill.tableId}
            </span>
            <span className="flex items-center gap-1">
              <ApperIcon name="Clock" size={16} />
              {billDate}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-display font-bold gradient-text">
            ${total.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {bill.items.map((item, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900 font-body">
                  {item.quantity}x {item.name}
                </span>
              </div>
            </div>
            <span className="font-medium text-gray-900 font-body">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-2 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-gray-600 font-body">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600 font-body">
          <span>Tax (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600 font-body">
          <span>Tip (18%)</span>
          <span>${tip.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-display font-bold text-lg border-t border-gray-200 pt-2">
          <span>Total</span>
          <span className="gradient-text">${total.toFixed(2)}</span>
        </div>
      </div>

      {canMarkPaid(bill.status) && (
        <div className="flex gap-3 mt-6">
          <Button
            variant="success"
            icon="CreditCard"
            onClick={() => onStatusChange(bill.id, 'paid')}
            className="flex-1"
          >
            Mark as Paid
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default BillCard;