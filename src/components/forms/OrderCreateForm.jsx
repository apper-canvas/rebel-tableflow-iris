import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import { orderService } from '@/services/api/orderService';

const OrderCreateForm = ({ onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const { register, handleSubmit, control, watch, formState: { errors } } = useForm({
    defaultValues: {
      tableId: '',
      items: [{ name: '', quantity: 1, price: 0, specialRequests: '' }],
      notes: ''
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  });

  const watchedItems = watch('items');

  const menuItems = [
    { id: 'burger-classic', name: 'Classic Burger', price: 14.99, category: 'Main' },
    { id: 'pasta-carbonara', name: 'Pasta Carbonara', price: 18.99, category: 'Main' },
    { id: 'pizza-margherita', name: 'Margherita Pizza', price: 16.99, category: 'Main' },
    { id: 'steak-ribeye', name: 'Ribeye Steak', price: 28.99, category: 'Main' },
    { id: 'fish-salmon', name: 'Grilled Salmon', price: 22.99, category: 'Main' },
    { id: 'salad-caesar', name: 'Caesar Salad', price: 12.99, category: 'Appetizer' },
    { id: 'appetizer-wings', name: 'Buffalo Wings', price: 11.99, category: 'Appetizer' },
    { id: 'fries-large', name: 'Large Fries', price: 6.99, category: 'Side' },
    { id: 'sides-mashed-potatoes', name: 'Mashed Potatoes', price: 7.99, category: 'Side' },
    { id: 'vegetables-grilled', name: 'Grilled Vegetables', price: 9.99, category: 'Side' },
    { id: 'rice-pilaf', name: 'Rice Pilaf', price: 5.99, category: 'Side' },
    { id: 'soda-cola', name: 'Cola', price: 2.99, category: 'Beverage' },
    { id: 'wine-red', name: 'House Red Wine', price: 8.99, category: 'Beverage' },
    { id: 'beer-craft', name: 'Craft Beer', price: 5.99, category: 'Beverage' },
    { id: 'water-sparkling', name: 'Sparkling Water', price: 3.99, category: 'Beverage' }
  ];

  const tableOptions = [
    { value: '', label: 'Select Table' },
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
    { value: '20', label: 'Table 20' }
  ];

  const calculateTotal = () => {
    return watchedItems.reduce((total, item) => {
      const selectedMenuItem = menuItems.find(m => m.name === item.name);
      const price = selectedMenuItem ? selectedMenuItem.price : 0;
      return total + (price * (item.quantity || 1));
    }, 0);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      
      const orderData = {
        tableId: data.tableId,
        items: data.items.map(item => {
          const selectedMenuItem = menuItems.find(m => m.name === item.name);
          return {
            menuItemId: selectedMenuItem?.id || '',
            name: item.name,
            quantity: parseInt(item.quantity),
            price: selectedMenuItem?.price || 0,
            specialRequests: item.specialRequests || ''
          };
        }),
        status: 'pending',
        total: calculateTotal(),
        notes: data.notes || ''
      };

      await orderService.create(orderData);
      toast.success('Order created successfully!');
      onSuccess();
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to create order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addItem = () => {
    append({ name: '', quantity: 1, price: 0, specialRequests: '' });
  };

  const removeItem = (index) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const nextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-display font-bold text-gray-900">Create New Order</h2>
            <p className="text-gray-600 font-body mt-1">Step {currentStep} of 2</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ApperIcon name="X" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="h-full">
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Table Assignment *
                    </label>
                    <Select
                      {...register('tableId', { required: 'Table selection is required' })}
                      options={tableOptions}
                      error={errors.tableId?.message}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Order Items</h3>
                      <Button
                        type="button"
                        variant="secondary"
                        icon="Plus"
                        onClick={addItem}
                        size="sm"
                      >
                        Add Item
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {fields.map((field, index) => (
                        <motion.div
                          key={field.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 border border-gray-200 rounded-lg space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">Item {index + 1}</h4>
                            {fields.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeItem(index)}
                                className="text-red-600 hover:text-red-700 p-1"
                              >
                                <ApperIcon name="Trash2" size={16} />
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Menu Item *
                              </label>
                              <select
                                {...register(`items.${index}.name`, { required: 'Menu item is required' })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              >
                                <option value="">Select item...</option>
                                {Object.entries(
                                  menuItems.reduce((acc, item) => {
                                    if (!acc[item.category]) acc[item.category] = [];
                                    acc[item.category].push(item);
                                    return acc;
                                  }, {})
                                ).map(([category, items]) => (
                                  <optgroup key={category} label={category}>
                                    {items.map(item => (
                                      <option key={item.id} value={item.name}>
                                        {item.name} - ${item.price}
                                      </option>
                                    ))}
                                  </optgroup>
                                ))}
                              </select>
                              {errors.items?.[index]?.name && (
                                <p className="text-red-600 text-sm mt-1">
                                  {errors.items[index].name.message}
                                </p>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Quantity *
                              </label>
                              <Input
                                type="number"
                                min="1"
                                {...register(`items.${index}.quantity`, { 
                                  required: 'Quantity is required',
                                  min: { value: 1, message: 'Quantity must be at least 1' }
                                })}
                                error={errors.items?.[index]?.quantity?.message}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Special Requests
                            </label>
                            <Input
                              type="text"
                              placeholder="e.g., No onions, extra sauce..."
                              {...register(`items.${index}.specialRequests`)}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">Total:</span>
                      <span className="text-xl font-bold text-indigo-600">
                        ${calculateTotal().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order Notes
                    </label>
                    <textarea
                      {...register('notes')}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Add any special instructions or notes for this order..."
                    />
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Table:</span>
                        <span className="font-medium">Table {watch('tableId')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Items:</span>
                        <span className="font-medium">{fields.length} item(s)</span>
                      </div>
                      <div className="border-t pt-3 flex justify-between items-center">
                        <span className="font-semibold text-gray-900">Total:</span>
                        <span className="text-xl font-bold text-indigo-600">
                          ${calculateTotal().toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex gap-3">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={prevStep}
                  icon="ArrowLeft"
                >
                  Previous
                </Button>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </Button>
{currentStep < 2 ? (
                <Button
                  type="button"
                  variant="primary"
                  onClick={nextStep}
                  icon="ArrowRight"
                  disabled={!watch('tableId') || watchedItems.some(item => !item.name)}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  loading={loading}
                  icon="Check"
                >
                  Create Order
                </Button>
              )}
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default OrderCreateForm;