import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { toast } from 'react-toastify';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  models: string[];
  inStock: boolean;
  createdAt: string;
}

const AdminProducts: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    inStock: true
  });
  const [images, setImages] = useState<FileList | null>(null);
  const [models, setModels] = useState<FileList | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const modelInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    
    fetchProducts();
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data.products || response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files);
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModels(e.target.files);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      inStock: true
    });
    setImages(null);
    setModels(null);
    setEditingProduct(null);
    setShowAddForm(false);
    if (imageInputRef.current) imageInputRef.current.value = '';
    if (modelInputRef.current) modelInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let submitData: any;
      let headers: any = {};

      // If we have files, use FormData, otherwise use JSON
      if (images || models) {
        submitData = new FormData();
        submitData.append('name', formData.name);
        submitData.append('description', formData.description);
        submitData.append('price', formData.price);
        submitData.append('category', formData.category);
        submitData.append('inStock', formData.inStock.toString());

        if (images) {
          Array.from(images).forEach(image => {
            submitData.append('images', image);
          });
        }

        if (models) {
          Array.from(models).forEach(model => {
            submitData.append('models', model);
          });
        }
        headers['Content-Type'] = 'multipart/form-data';
      } else {
        // Use JSON for simple updates
        submitData = {
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          category: formData.category,
          inStock: formData.inStock
        };
        headers['Content-Type'] = 'application/json';
      }

      let response;
      if (editingProduct) {
        console.log('Updating product:', editingProduct._id, submitData);
        response = await api.put(`/products/${editingProduct._id}`, submitData, { headers });
        toast.success('Product updated successfully');
      } else {
        console.log('Creating new product:', submitData);
        response = await api.post('/products', submitData, { headers });
        toast.success('Product added successfully');
      }

      resetForm();
      fetchProducts();
    } catch (error: any) {
      console.error('Error saving product:', error);
      const errorMessage = error.response?.data?.message || 'Failed to save product';
      toast.error(errorMessage);
    }
  };

  const handleEdit = (product: Product) => {
    console.log('Editing product:', product);
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      inStock: product.inStock
    });
    setShowAddForm(true);
  };

  const handleDelete = async (productId: string) => {
    console.log('Frontend: Delete button clicked for product ID:', productId);
    
    if (!window.confirm('Are you sure you want to delete this product?')) {
      console.log('Frontend: Delete cancelled by user');
      return;
    }

    try {
      console.log('Frontend: Sending delete request for product ID:', productId);
      const response = await api.delete(`/products/${productId}`);
      console.log('Frontend: Delete response received:', response.data);
      
      if (response.data.success) {
        toast.success('Product deleted successfully');
        console.log('Frontend: Refreshing products list');
        fetchProducts(); // Refresh the products list
      } else {
        console.error('Frontend: Delete failed:', response.data.message);
        toast.error(response.data.message || 'Failed to delete product');
      }
    } catch (error: any) {
      console.error('Frontend: Error deleting product:', error);
      console.error('Frontend: Error details:', error.response?.data);
      const errorMessage = error.response?.data?.message || 'Failed to delete product';
      toast.error(errorMessage);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
    toast.success('Logged out successfully');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-pink-600">Daffodils Admin</h1>
            </div>
            <nav className="flex space-x-8">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="text-gray-500 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </button>
              <button
                className="text-gray-900 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Products
              </button>
              <button
                onClick={() => navigate('/admin/orders')}
                className="text-gray-500 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Orders
              </button>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Products Management</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
          >
            Add New Product
          </button>
        </div>

      {/* Add/Edit Product Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="average">Average</option>
                    <option value="premium">Premium</option>
                    <option value="special">Special</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  In Stock
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Product Images</label>
                <input
                  ref={imageInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                <p className="text-xs text-gray-500 mt-1">Select multiple images</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">3D Models</label>
                <input
                  ref={modelInputRef}
                  type="file"
                  multiple
                  accept=".glb,.gltf"
                  onChange={handleModelChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                <p className="text-xs text-gray-500 mt-1">Select GLB/GLTF files</p>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {product.images.length > 0 && (
              <img
                src={`${import.meta.env.VITE_API_URL}${product.images[0]}`}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-pink-600 font-bold">${product.price}</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <div className="text-xs text-gray-500 mb-3">
                Category: {product.category} | Created: {new Date(product.createdAt).toLocaleDateString()}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="mt-4 bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors"
          >
            Add Your First Product
          </button>
        </div>
      )}
      </div>
    </div>
  );
};

export default AdminProducts;
