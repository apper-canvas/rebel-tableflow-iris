import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import { selectUserRole, selectIsAdmin } from '@/store/slices/permissionSlice';
const Sidebar = () => {
  const userRole = useSelector(selectUserRole);
  const isAdmin = useSelector(selectIsAdmin);
  
  const navigation = [
    { name: 'Tables', href: '/tables', icon: 'Utensils' },
    { name: 'Orders', href: '/orders', icon: 'ChefHat' },
    { name: 'Reservations', href: '/reservations', icon: 'Calendar' },
    { name: 'Bills', href: '/bills', icon: 'Receipt' },
  ];
  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 h-full">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
            <ApperIcon name="Utensils" size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold gradient-text">TableFlow</h1>
            <p className="text-sm text-gray-600 font-body">Restaurant Management</p>
          </div>
        </div>
      </div>

      <nav className="mt-6 px-3">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-50 to-accent-50 text-primary-700 border-l-4 border-primary-500'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <motion.div
                    className="flex items-center gap-3 w-full"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ApperIcon 
                      name={item.icon} 
                      size={20} 
                      className={isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-primary-500'}
                    />
                    <span className="font-body">{item.name}</span>
                  </motion.div>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

<div className="absolute bottom-0 w-64 p-6 border-t border-gray-200 bg-surface">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isAdmin ? 'bg-gradient-to-br from-primary-500 to-accent-500' : 'bg-secondary-500'
          }`}>
            <ApperIcon name={isAdmin ? "Shield" : "User"} size={16} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 font-body">
              {isAdmin ? 'Administrator' : 'Restaurant Staff'}
            </p>
            <p className="text-xs text-gray-500 font-body">
              {isAdmin ? 'Full Access' : 'Active Session'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;