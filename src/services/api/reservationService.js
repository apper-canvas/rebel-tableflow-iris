import reservationsData from '@/services/mockData/reservations.json';

class ReservationService {
  constructor() {
    this.reservations = [...reservationsData];
  }

  async getAll() {
    await this.delay();
    return [...this.reservations];
  }

  async getById(id) {
    await this.delay();
    const reservation = this.reservations.find(r => r.Id === parseInt(id));
    if (!reservation) {
      throw new Error(`Reservation with ID ${id} not found`);
    }
    return { ...reservation };
  }

  async create(reservationData) {
    await this.delay();
    const newId = Math.max(...this.reservations.map(r => r.Id)) + 1;
    const newReservation = {
      Id: newId,
      ...reservationData,
    };
    this.reservations.push(newReservation);
    return { ...newReservation };
  }

  async update(id, updates) {
    await this.delay();
    const index = this.reservations.findIndex(r => r.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Reservation with ID ${id} not found`);
    }
    this.reservations[index] = { ...this.reservations[index], ...updates };
    return { ...this.reservations[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.reservations.findIndex(r => r.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Reservation with ID ${id} not found`);
    }
    const deleted = this.reservations.splice(index, 1)[0];
    return { ...deleted };
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));
  }
}

export const reservationService = new ReservationService();