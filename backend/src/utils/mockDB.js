// Mock database service for demonstration
class MockDB {
  constructor() {
    this.products = [
      {
        _id: '1',
        name: 'Beautiful Red Roses',
        description: 'Fresh red roses perfect for romantic occasions',
        price: 89.99,
        category: 'premium',
        images: ['/uploads/images/red-roses.jpg'],
        models: [],
        inStock: true,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      },
      {
        _id: '2',
        name: 'White Lily Bouquet',
        description: 'Elegant white lilies for special moments',
        price: 129.99,
        category: 'average',
        images: ['/uploads/images/white-lilies.jpg'],
        models: [],
        inStock: true,
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20')
      },
      {
        _id: '3',
        name: 'Mixed Spring Flowers',
        description: 'Colorful spring flower arrangement',
        price: 65.99,
        category: 'special',
        images: ['/uploads/images/spring-mix.jpg'],
        models: [],
        inStock: false,
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-01')
      }
    ];
    this.orders = [];
    this.admins = [
      {
        _id: 'admin1',
        username: 'admin',
        email: 'admin@daffofils.com',
        password: '$2a$10$EPcyiXQsdbo5Ue4d.4F75.Sre.VE2gHinYx./JcWaY2BIeeG4a4iC', // admin123
        role: 'admin',
        createdAt: new Date()
      }
    ];
    this.connected = false;
  }

  async connect() {
    console.log('📦 Using Mock Database for demonstration');
    console.log('✅ Mock Database connected successfully');
    this.connected = true;
    return Promise.resolve();
  }

  async disconnect() {
    this.connected = false;
    console.log('📦 Mock Database disconnected');
    return Promise.resolve();
  }

  isConnected() {
    return this.connected;
  }

  // Product methods
  async findProducts(query = {}) {
    return this.products.filter(product => {
      if (query.category && product.category !== query.category) return false;
      if (query.inStock !== undefined && product.inStock !== query.inStock) return false;
      return true;
    });
  }

  async findProductById(id) {
    return this.products.find(p => p._id === id);
  }

  async createProduct(productData) {
    const product = {
      _id: Date.now().toString(),
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.products.push(product);
    return product;
  }

  async updateProduct(id, updateData) {
    const index = this.products.findIndex(p => p._id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updateData, updatedAt: new Date() };
      return this.products[index];
    }
    return null;
  }

  async deleteProduct(id) {
    console.log('MockDB: Attempting to delete product with ID:', id);
    console.log('MockDB: Current products:', this.products.map(p => ({ id: p._id, name: p.name })));
    
    const index = this.products.findIndex(p => p._id === id);
    console.log('MockDB: Found product at index:', index);
    
    if (index !== -1) {
      const deletedProduct = this.products.splice(index, 1)[0];
      console.log('MockDB: Product deleted successfully:', deletedProduct);
      console.log('MockDB: Remaining products count:', this.products.length);
      return deletedProduct;
    }
    
    console.log('MockDB: Product not found for deletion');
    return null;
  }

  // Order methods
  async findOrders() {
    return this.orders;
  }

  async findOrderById(id) {
    return this.orders.find(o => o._id === id);
  }

  async createOrder(orderData) {
    const order = {
      _id: Date.now().toString(),
      orderNumber: `DF${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      ...orderData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.orders.push(order);
    return order;
  }

  async updateOrder(id, updateData) {
    const index = this.orders.findIndex(o => o._id === id);
    if (index !== -1) {
      this.orders[index] = { ...this.orders[index], ...updateData, updatedAt: new Date() };
      return this.orders[index];
    }
    return null;
  }

  async deleteOrder(id) {
    const index = this.orders.findIndex(o => o._id === id);
    if (index !== -1) {
      return this.orders.splice(index, 1)[0];
    }
    return null;
  }

  // Admin methods
  async findAdminByEmail(email) {
    return this.admins.find(a => a.email === email);
  }

  async findAdminByUsername(username) {
    return this.admins.find(a => a.username === username);
  }

  async createAdmin(adminData) {
    const admin = {
      _id: Date.now().toString(),
      ...adminData,
      createdAt: new Date()
    };
    this.admins.push(admin);
    return admin;
  }

  // Dashboard stats
  async getDashboardStats() {
    const totalProducts = this.products.length;
    const totalOrders = this.orders.length;
    const totalRevenue = this.orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    const pendingOrders = this.orders.filter(o => o.status === 'pending').length;

    return {
      totalProducts,
      totalOrders,
      totalRevenue,
      pendingOrders
    };
  }
}

export default new MockDB();
