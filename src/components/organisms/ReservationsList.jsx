import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import ReservationCard from '@/components/molecules/ReservationCard';
import StatsCard from '@/components/molecules/StatsCard';
import SearchBar from '@/components/molecules/SearchBar';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import Button from '@/components/atoms/Button';
import Select from '@/components/atoms/Select';
import { reservationService } from '@/services/api/reservationService';

const ReservationsList = () => {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const loadReservations = async () => {
    try {
      setLoading(true);
      setError("");
      await new Promise(resolve => setTimeout(resolve, 300));
      const data = await reservationService.getAll();
      setReservations(data);
    } catch (err) {
      setError("Failed to load reservations. Please try again.");
      console.error("Error loading reservations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

  useEffect(() => {
    let filtered = reservations;

    if (searchTerm) {
      filtered = filtered.filter(reservation => 
        reservation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.phone.includes(searchTerm)
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(reservation => reservation.status === statusFilter);
    }

    setFilteredReservations(filtered);
  }, [reservations, searchTerm, statusFilter]);

  const handleStatusChange = async (reservationId, newStatus) => {
    try {
      await reservationService.update(reservationId, { status: newStatus });
      await loadReservations();
      toast.success(`Reservation status updated to ${newStatus}`);
    } catch (err) {
      toast.error("Failed to update reservation status");
    }
  };

  const generateStats = () => {
    const confirmed = reservations.filter(r => r.status === 'confirmed').length;
    const seated = reservations.filter(r => r.status === 'seated').length;
    const cancelled = reservations.filter(r => r.status === 'cancelled').length;
    const total = reservations.length;

    return { confirmed, seated, cancelled, total };
  };

  const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: "confirmed", label: "Confirmed" },
    { value: "seated", label: "Seated" },
    { value: "cancelled", label: "Cancelled" },
  ];

  if (loading) return <Loading type="reservations" />;
  if (error) return <Error message={error} onRetry={loadReservations} />;
  if (reservations.length === 0) return <Empty type="reservations" onAction={loadReservations} />;

  const stats = generateStats();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Reservations"
          value={stats.total}
          icon="Calendar"
          color="primary"
        />
        <StatsCard
          title="Confirmed"
          value={stats.confirmed}
          icon="CheckCircle"
          color="success"
        />
        <StatsCard
          title="Seated"
          value={stats.seated}
          icon="Users"
          color="info"
        />
        <StatsCard
          title="Cancelled"
          value={stats.cancelled}
          icon="XCircle"
          color="error"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-display font-bold text-gray-900">Reservations</h2>
          <p className="text-gray-600 font-body mt-1">Manage guest reservations and seating</p>
        </div>
        <Button variant="primary" icon="RefreshCw" onClick={loadReservations}>
          Refresh
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by name or phone..."
          className="flex-1 max-w-md"
        />
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={statusOptions}
          className="w-full sm:w-48"
        />
      </div>

      {filteredReservations.length === 0 && (searchTerm || statusFilter) ? (
        <Empty 
          icon="Search"
          title="No matching reservations"
          description="Try adjusting your search criteria or filters."
        />
      ) : (
        <motion.div 
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {filteredReservations.map((reservation) => (
            <ReservationCard
              key={reservation.Id}
              reservation={reservation}
              onStatusChange={handleStatusChange}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ReservationsList;