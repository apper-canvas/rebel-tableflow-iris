import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userRole: 'admin',
  permissions: {
    // Table Management
    tables: {
      view: true,
      create: true,
      update: true,
      delete: true,
      manage_layout: true,
      change_status: true,
    },
    // Order Management
    orders: {
      view: true,
      create: true,
      update: true,
      delete: true,
      modify_items: true,
      change_status: true,
      cancel: true,
      refund: true,
    },
    // Reservation Management
    reservations: {
      view: true,
      create: true,
      update: true,
      delete: true,
      modify_details: true,
      change_status: true,
      cancel: true,
      reschedule: true,
    },
    // Billing Management
    bills: {
      view: true,
      create: true,
      update: true,
      delete: true,
      modify_items: true,
      apply_discounts: true,
      process_payments: true,
      generate_reports: true,
    },
    // Staff Management
    staff: {
      view: true,
      create: true,
      update: true,
      delete: true,
      manage_roles: true,
      manage_permissions: true,
    },
    // System Configuration
    system: {
      view_analytics: true,
      export_data: true,
      manage_settings: true,
      backup_restore: true,
      system_logs: true,
    },
  },
  isAdmin: true,
};

const permissionSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    setUserRole: (state, action) => {
      state.userRole = action.payload;
      state.isAdmin = action.payload === 'admin';
    },
    updatePermissions: (state, action) => {
      state.permissions = { ...state.permissions, ...action.payload };
    },
    resetPermissions: (state) => {
      state.permissions = initialState.permissions;
      state.userRole = 'admin';
      state.isAdmin = true;
    },
  },
});

export const { setUserRole, updatePermissions, resetPermissions } = permissionSlice.actions;

export const selectUserRole = (state) => state.permissions.userRole;
export const selectPermissions = (state) => state.permissions.permissions;
export const selectIsAdmin = (state) => state.permissions.isAdmin;

// Permission check helpers
export const selectCanPerformAction = (state, module, action) => {
  return state.permissions.permissions[module]?.[action] || false;
};

export default permissionSlice.reducer;