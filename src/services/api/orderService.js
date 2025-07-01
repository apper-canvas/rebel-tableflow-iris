import ordersData from '@/services/mockData/orders.json';

class OrderService {
  constructor() {
    this.orders = [...ordersData];
  }

  async getAll() {
    await this.delay();
    return [...this.orders];
  }

  async getById(id) {
    await this.delay();
    const order = this.orders.find(o => o.Id === parseInt(id));
    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }
    return { ...order };
  }

  async create(orderData) {
    await this.delay();
    const newId = Math.max(...this.orders.map(o => o.Id)) + 1;
    const newOrder = {
      Id: newId,
      createdAt: new Date().toISOString(),
      ...orderData,
    };
    this.orders.push(newOrder);
    return { ...newOrder };
  }

  async update(id, updates) {
    await this.delay();
    const index = this.orders.findIndex(o => o.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Order with ID ${id} not found`);
    }
    this.orders[index] = { ...this.orders[index], ...updates };
    return { ...this.orders[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.orders.findIndex(o => o.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Order with ID ${id} not found`);
    }
    const deleted = this.orders.splice(index, 1)[0];
    return { ...deleted };
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));
  }
}

export const orderService = new OrderService();