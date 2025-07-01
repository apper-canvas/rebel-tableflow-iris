import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import OrderCard from '@/components/molecules/OrderCard';
import StatsCard from '@/components/molecules/StatsCard';
import SearchBar from '@/components/molecules/SearchBar';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import Button from '@/components/atoms/Button';
import Select from '@/components/atoms/Select';
import { orderService } from '@/services/api/orderService';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");
      await new Promise(resolve => setTimeout(resolve, 300));
      const data = await orderService.getAll();
      setOrders(data);
    } catch (err) {
      setError("Failed to load orders. Please try again.");
      console.error("Error loading orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.id.toString().includes(searchTerm) ||
        order.tableId.toString().includes(searchTerm)
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  }, [orders, searchTerm, statusFilter]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await orderService.update(orderId, { status: newStatus });
      await loadOrders();
      toast.success(`Order #${orderId} status updated to ${newStatus}`);
    } catch (err) {
      toast.error("Failed to update order status");
    }
  };

  const generateStats = () => {
    const pending = orders.filter(o => o.status === 'pending').length;
    const preparing = orders.filter(o => o.status === 'preparing').length;
    const ready = orders.filter(o => o.status === 'ready').length;
    const total = orders.length;

    return { pending, preparing, ready, total };
  };

  const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: "pending", label: "Pending" },
    { value: "preparing", label: "Preparing" },
    { value: "ready", label: "Ready" },
    { value: "served", label: "Served" },
    { value: "paid", label: "Paid" },
  ];

  if (loading) return <Loading type="orders" />;
  if (error) return <Error message={error} onRetry={loadOrders} />;
  if (orders.length === 0) return <Empty type="orders" onAction={loadOrders} />;

  const stats = generateStats();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Orders"
          value={stats.total}
          icon="ChefHat"
          color="primary"
        />
        <StatsCard
          title="Pending"
          value={stats.pending}
          icon="Clock"
          color="warning"
        />
        <StatsCard
          title="Preparing"
          value={stats.preparing}
          icon="Flame"
          color="info"
        />
        <StatsCard
          title="Ready"
          value={stats.ready}
          icon="Bell"
          color="success"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-display font-bold text-gray-900">Active Orders</h2>
          <p className="text-gray-600 font-body mt-1">Track and manage all restaurant orders</p>
        </div>
        <Button variant="primary" icon="RefreshCw" onClick={loadOrders}>
          Refresh
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by order ID or table..."
          className="flex-1 max-w-md"
        />
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={statusOptions}
          className="w-full sm:w-48"
        />
      </div>

      {filteredOrders.length === 0 && (searchTerm || statusFilter) ? (
        <Empty 
          icon="Search"
          title="No matching orders"
          description="Try adjusting your search criteria or filters."
        />
      ) : (
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.Id}
              order={order}
              onStatusChange={handleStatusChange}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default OrdersList;