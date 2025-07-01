import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import { reservationService } from '@/services/api/reservationService';

const ReservationCreateForm = ({ onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      customerName: '',
      phone: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      time: '19:00',
      partySize: 2,
      tableId: '',
      notes: ''
    }
  });

  const tableOptions = [
    { value: '', label: 'Auto-assign table' },
    { value: '1', label: 'Table 1' },
    { value: '2', label: 'Table 2' },
    { value: '3', label: 'Table 3' },
    { value: '4', label: 'Table 4' },
    { value: '5', label: 'Table 5' },
    { value: '6', label: 'Table 6' },
    { value: '7', label: 'Table 7' },
    { value: '8', label: 'Table 8' },
    { value: '9', label: 'Table 9' },
    { value: '10', label: 'Table 10' },
    { value: '11', label: 'Table 11' },
    { value: '12', label: 'Table 12' },
    { value: '13', label: 'Table 13' },
    { value: '14', label: 'Table 14' },
    { value: '15', label: 'Table 15' },
    { value: '16', label: 'Table 16' },
    { value: '17', label: 'Table 17' },
    { value: '18', label: 'Table 18' },
    { value: '19', label: 'Table 19' },
    { value: '20', label: 'Table 20' },
    { value: '21', label: 'Table 21' },
    { value: '22', label: 'Table 22' }
  ];

  const timeSlots = [
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'
  ];

  const partySizeOptions = [
    { value: 1, label: '1 person' },
    { value: 2, label: '2 people' },
    { value: 3, label: '3 people' },
    { value: 4, label: '4 people' },
    { value: 5, label: '5 people' },
    { value: 6, label: '6 people' },
    { value: 7, label: '7 people' },
    { value: 8, label: '8 people' },
    { value: 9, label: '9 people' },
    { value: 10, label: '10 people' },
    { value: 11, label: '11 people' },
    { value: 12, label: '12 people' }
  ];

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      
      const reservationData = {
        customerName: data.customerName,
        phone: data.phone,
        date: data.date,
        time: data.time,
        partySize: parseInt(data.partySize),
        tableId: data.tableId || null,
        status: 'confirmed',
        notes: data.notes || ''
      };

      await reservationService.create(reservationData);
      toast.success('Reservation created successfully!');
      onSuccess();
    } catch (error) {
      console.error('Error creating reservation:', error);
      toast.error('Failed to create reservation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const watchedDate = watch('date');
  const watchedTime = watch('time');
  const watchedPartySize = watch('partySize');

  const isDateInPast = (dateString) => {
    const selectedDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate < today;
  };

  const isTimeInPast = (dateString, timeString) => {
    const selectedDateTime = new Date(`${dateString}T${timeString}`);
    const now = new Date();
    return selectedDateTime < now;
  };

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return value;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-display font-bold text-gray-900">New Reservation</h2>
            <p className="text-gray-600 font-body mt-1">Create a new guest reservation</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ApperIcon name="X" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)] space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Name *
                </label>
                <Input
                  type="text"
                  placeholder="Enter full name"
                  {...register('customerName', { 
                    required: 'Customer name is required',
                    minLength: { value: 2, message: 'Name must be at least 2 characters' }
                  })}
                  error={errors.customerName?.message}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <Input
                  type="tel"
                  placeholder="(555) 123-4567"
                  {...register('phone', { 
                    required: 'Phone number is required',
                    pattern: {
                      value: /^\(\d{3}\) \d{3}-\d{4}$/,
                      message: 'Please enter a valid phone number'
                    }
                  })}
                  onChange={(e) => {
                    e.target.value = formatPhoneNumber(e.target.value);
                  }}
                  error={errors.phone?.message}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date *
                </label>
                <Input
                  type="date"
                  min={format(new Date(), 'yyyy-MM-dd')}
                  {...register('date', { 
                    required: 'Date is required',
                    validate: {
                      notInPast: (value) => !isDateInPast(value) || 'Date cannot be in the past'
                    }
                  })}
                  error={errors.date?.message}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time *
                </label>
                <select
                  {...register('time', { 
                    required: 'Time is required',
                    validate: {
                      notInPast: (value) => {
                        if (watchedDate === format(new Date(), 'yyyy-MM-dd')) {
                          return !isTimeInPast(watchedDate, value) || 'Time cannot be in the past';
                        }
                        return true;
                      }
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {timeSlots.map(time => (
                    <option key={time} value={time}>
                      {format(new Date(`2000-01-01T${time}`), 'h:mm a')}
                    </option>
                  ))}
                </select>
                {errors.time && (
                  <p className="text-red-600 text-sm mt-1">{errors.time.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Party Size *
                </label>
                <select
                  {...register('partySize', { 
                    required: 'Party size is required',
                    min: { value: 1, message: 'Party size must be at least 1' }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {partySizeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.partySize && (
                  <p className="text-red-600 text-sm mt-1">{errors.partySize.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Table Preference
                </label>
                <Select
                  {...register('tableId')}
                  options={tableOptions}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Notes
              </label>
              <textarea
                {...register('notes')}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Any special requests, dietary restrictions, or celebrations..."
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Reservation Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Date & Time:</span>
                  <span className="font-medium">
                    {watchedDate && format(new Date(watchedDate), 'MMM d, yyyy')} at{' '}
                    {watchedTime && format(new Date(`2000-01-01T${watchedTime}`), 'h:mm a')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Party Size:</span>
                  <span className="font-medium">{watchedPartySize} people</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-green-600">Confirmed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              icon="Calendar"
            >
              Create Reservation
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ReservationCreateForm;