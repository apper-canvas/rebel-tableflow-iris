import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import BillCard from '@/components/molecules/BillCard';
import StatsCard from '@/components/molecules/StatsCard';
import SearchBar from '@/components/molecules/SearchBar';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import Button from '@/components/atoms/Button';
import Select from '@/components/atoms/Select';
import { billService } from '@/services/api/billService';

const BillsList = () => {
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const loadBills = async () => {
    try {
      setLoading(true);
      setError("");
      await new Promise(resolve => setTimeout(resolve, 300));
      const data = await billService.getAll();
      setBills(data);
    } catch (err) {
      setError("Failed to load bills. Please try again.");
      console.error("Error loading bills:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBills();
  }, []);

  useEffect(() => {
    let filtered = bills;

    if (searchTerm) {
      filtered = filtered.filter(bill => 
        bill.id.toString().includes(searchTerm) ||
        bill.tableId.toString().includes(searchTerm)
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(bill => bill.status === statusFilter);
    }

    setFilteredBills(filtered);
  }, [bills, searchTerm, statusFilter]);

  const handleStatusChange = async (billId, newStatus) => {
    try {
      await billService.update(billId, { status: newStatus });
      await loadBills();
      toast.success(`Bill #${billId} marked as ${newStatus}`);
    } catch (err) {
      toast.error("Failed to update bill status");
    }
  };

  const generateStats = () => {
    const pending = bills.filter(b => b.status === 'pending').length;
    const paid = bills.filter(b => b.status === 'paid').length;
    const totalRevenue = bills
      .filter(b => b.status === 'paid')
      .reduce((sum, bill) => {
        const subtotal = bill.items.reduce((itemSum, item) => itemSum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.08;
        const tip = subtotal * 0.18;
        return sum + subtotal + tax + tip;
      }, 0);
    const total = bills.length;

    return { pending, paid, totalRevenue, total };
  };

  const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: "pending", label: "Pending" },
    { value: "paid", label: "Paid" },
    { value: "cancelled", label: "Cancelled" },
  ];

  if (loading) return <Loading type="orders" />;
  if (error) return <Error message={error} onRetry={loadBills} />;
  if (bills.length === 0) return <Empty type="bills" onAction={loadBills} />;

  const stats = generateStats();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Bills"
          value={stats.total}
          icon="Receipt"
          color="primary"
        />
        <StatsCard
          title="Pending Payment"
          value={stats.pending}
          icon="Clock"
          color="warning"
        />
        <StatsCard
          title="Paid Bills"
          value={stats.paid}
          icon="Check"
          color="success"
        />
        <StatsCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toFixed(2)}`}
          icon="DollarSign"
          color="accent"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-display font-bold text-gray-900">Bills & Payments</h2>
          <p className="text-gray-600 font-body mt-1">Track payments and manage billing</p>
        </div>
        <Button variant="primary" icon="RefreshCw" onClick={loadBills}>
          Refresh
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by bill ID or table..."
          className="flex-1 max-w-md"
        />
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={statusOptions}
          className="w-full sm:w-48"
        />
      </div>

      {filteredBills.length === 0 && (searchTerm || statusFilter) ? (
        <Empty 
          icon="Search"
          title="No matching bills"
          description="Try adjusting your search criteria or filters."
        />
      ) : (
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {filteredBills.map((bill) => (
            <BillCard
              key={bill.Id}
              bill={bill}
              onStatusChange={handleStatusChange}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default BillsList;