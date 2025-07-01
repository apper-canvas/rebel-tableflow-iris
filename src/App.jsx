import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from '@/components/organisms/Layout';
import TablesPage from '@/components/pages/TablesPage';
import OrdersPage from '@/components/pages/OrdersPage';
import ReservationsPage from '@/components/pages/ReservationsPage';
import BillsPage from '@/components/pages/BillsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/tables" replace />} />
            <Route path="/tables" element={<TablesPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/reservations" element={<ReservationsPage />} />
            <Route path="/bills" element={<BillsPage />} />
          </Routes>
        </Layout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  );
}

export default App;