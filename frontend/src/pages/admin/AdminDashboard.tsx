import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, ShoppingCart, Clock, DollarSign } from 'lucide-react';
import { adminAPI } from '../../services/api';

interface DashboardStats {
  overview: {
    totalProducts: number;
    totalOrders: number;
    pendingOrders: number;
    totalRevenue: number;
  };
  ordersByStatus: Record<string, number>;
  recentOrders: any[];
  lowStockProducts: any[];
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<any>(null);

  useEffect(() => {
    const user = localStorage.getItem('adminUser');
    if (user) {
      setAdminUser(JSON.parse(user));
    }
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await adminAPI.getDashboard();
      setStats(response.data.data);
    } catch (error: any) {
      console.error('Dashboard fetch error:', error);
      alert('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon, title, value, color = 'violet' }: any) => (
    <motion.div
      className={`bg-white rounded-xl p-6 shadow-lg border border-${color}-100 hover:shadow-xl transition-shadow duration-300`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 bg-${color}-100 rounded-lg`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">Welcome back, {adminUser?.username}!</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
                <button
                  onClick={() => {
                    localStorage.removeItem('adminToken');
                    localStorage.removeItem('adminUser');
                    window.location.href = '/admin/login';
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Package className="w-6 h-6 text-violet-600" />}
            title="Total Products"
            value={stats?.overview.totalProducts || 0}
            color="violet"
          />
          <StatCard
            icon={<ShoppingCart className="w-6 h-6 text-blue-600" />}
            title="Total Orders"
            value={stats?.overview.totalOrders || 0}
            color="blue"
          />
          <StatCard
            icon={<Clock className="w-6 h-6 text-yellow-600" />}
            title="Pending Orders"
            value={stats?.overview.pendingOrders || 0}
            color="yellow"
          />
          <StatCard
            icon={<DollarSign className="w-6 h-6 text-green-600" />}
            title="Total Revenue"
            value={`AED ${(stats?.overview.totalRevenue || 0).toLocaleString()}`}
            color="green"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => window.location.href = '/admin/products'}
                className="w-full text-left p-3 bg-violet-50 rounded-lg hover:bg-violet-100 transition-colors"
              >
                <p className="font-medium text-violet-900">Manage Products</p>
                <p className="text-sm text-violet-600">Add, edit, or remove products</p>
              </button>
              <button
                onClick={() => window.location.href = '/admin/orders'}
                className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <p className="font-medium text-blue-900">View Orders</p>
                <p className="text-sm text-blue-600">Manage customer orders</p>
              </button>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
            <div className="space-y-3">
              {stats?.recentOrders?.slice(0, 3).map((order, index) => (
                <div key={order._id} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900">#{order.orderNumber}</p>
                  <p className="text-sm text-gray-600">{order.customerInfo.name}</p>
                  <p className="text-sm text-gray-500">AED {order.pricing.total}</p>
                </div>
              ))}
              {(!stats?.recentOrders || stats.recentOrders.length === 0) && (
                <div className="text-center py-4 text-gray-500">
                  No recent orders
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Low Stock Alert</h3>
            <div className="space-y-3">
              {stats?.lowStockProducts?.slice(0, 3).map((product, index) => (
                <div key={product._id} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-red-600">{product.stockQuantity} remaining</p>
                </div>
              ))}
              {(!stats?.lowStockProducts || stats.lowStockProducts.length === 0) && (
                <div className="text-center py-4 text-gray-500">
                  All products well stocked! 🎉
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
