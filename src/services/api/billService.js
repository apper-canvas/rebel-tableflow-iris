import billsData from '@/services/mockData/bills.json';

class BillService {
  constructor() {
    this.bills = [...billsData];
  }

  async getAll() {
    await this.delay();
    return [...this.bills];
  }

  async getById(id) {
    await this.delay();
    const bill = this.bills.find(b => b.Id === parseInt(id));
    if (!bill) {
      throw new Error(`Bill with ID ${id} not found`);
    }
    return { ...bill };
  }

  async create(billData) {
    await this.delay();
    const newId = Math.max(...this.bills.map(b => b.Id)) + 1;
    const newBill = {
      Id: newId,
      createdAt: new Date().toISOString(),
      ...billData,
    };
    this.bills.push(newBill);
    return { ...newBill };
  }

  async update(id, updates) {
    await this.delay();
    const index = this.bills.findIndex(b => b.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Bill with ID ${id} not found`);
    }
    this.bills[index] = { ...this.bills[index], ...updates };
    return { ...this.bills[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.bills.findIndex(b => b.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Bill with ID ${id} not found`);
    }
    const deleted = this.bills.splice(index, 1)[0];
    return { ...deleted };
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));
  }
}

export const billService = new BillService();