import tablesData from '@/services/mockData/tables.json';

class TableService {
  constructor() {
    this.tables = [...tablesData];
  }

  async getAll() {
    await this.delay();
    return [...this.tables];
  }

  async getById(id) {
    await this.delay();
    const table = this.tables.find(t => t.Id === parseInt(id));
    if (!table) {
      throw new Error(`Table with ID ${id} not found`);
    }
    return { ...table };
  }

  async create(tableData) {
    await this.delay();
    const newId = Math.max(...this.tables.map(t => t.Id)) + 1;
    const newTable = {
      Id: newId,
      ...tableData,
    };
    this.tables.push(newTable);
    return { ...newTable };
  }

  async update(id, updates) {
    await this.delay();
    const index = this.tables.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Table with ID ${id} not found`);
    }
    this.tables[index] = { ...this.tables[index], ...updates };
    return { ...this.tables[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.tables.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Table with ID ${id} not found`);
    }
    const deleted = this.tables.splice(index, 1)[0];
    return { ...deleted };
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));
  }
}

export const tableService = new TableService();