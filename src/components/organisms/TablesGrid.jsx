import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import TableCard from '@/components/molecules/TableCard';
import StatsCard from '@/components/molecules/StatsCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import Button from '@/components/atoms/Button';
import { tableService } from '@/services/api/tableService';

const TablesGrid = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTables = async () => {
    try {
      setLoading(true);
      setError("");
      await new Promise(resolve => setTimeout(resolve, 300));
      const data = await tableService.getAll();
      setTables(data);
    } catch (err) {
      setError("Failed to load tables. Please try again.");
      console.error("Error loading tables:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTables();
  }, []);

  const handleTableClick = async (table) => {
    if (table.status === 'available') {
      try {
        await tableService.update(table.Id, { status: 'occupied' });
        await loadTables();
        toast.success(`Table ${table.number} is now occupied`);
      } catch (err) {
        toast.error("Failed to update table status");
      }
    } else if (table.status === 'occupied') {
      try {
        await tableService.update(table.Id, { status: 'available' });
        await loadTables();
        toast.success(`Table ${table.number} is now available`);
      } catch (err) {
        toast.error("Failed to update table status");
      }
    }
  };

  const generateStats = () => {
    const available = tables.filter(t => t.status === 'available').length;
    const occupied = tables.filter(t => t.status === 'occupied').length;
    const reserved = tables.filter(t => t.status === 'reserved').length;
    const total = tables.length;

    return { available, occupied, reserved, total };
  };

  if (loading) return <Loading type="tables" />;
  if (error) return <Error message={error} onRetry={loadTables} />;
  if (tables.length === 0) return <Empty type="tables" onAction={loadTables} />;

  const stats = generateStats();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Tables"
          value={stats.total}
          icon="Utensils"
          color="primary"
        />
        <StatsCard
          title="Available"
          value={stats.available}
          icon="Check"
          color="success"
        />
        <StatsCard
          title="Occupied"
          value={stats.occupied}
          icon="Users"
          color="error"
        />
        <StatsCard
          title="Reserved"
          value={stats.reserved}
          icon="Clock"
          color="warning"
        />
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-display font-bold text-gray-900">Restaurant Floor Plan</h2>
          <p className="text-gray-600 font-body mt-1">Click on tables to change their status</p>
        </div>
        <Button variant="primary" icon="RefreshCw" onClick={loadTables}>
          Refresh
        </Button>
      </div>

      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
      >
        {tables.map((table) => (
          <TableCard
            key={table.Id}
            table={table}
            onClick={handleTableClick}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default TablesGrid;