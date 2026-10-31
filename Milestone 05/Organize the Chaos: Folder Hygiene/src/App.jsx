import React from 'react';
import LoginForm from './features/auth/LoginForm';
import CartItem from './features/cart/CartItem';
import ProductList from './features/catalog/ProductList';
import OrderCard from './features/orders/OrderCard';

export default function App() {
  const sampleOrder = { id: 1001, name: 'Order #1001', total: 42.00, status: 'Delivered' };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">ShopFlat E-Commerce</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <LoginForm />
        <ProductList />
        <div>
          <h2 className="text-xl font-bold mb-3">Order History</h2>
          <OrderCard order={sampleOrder} />
        </div>
      </div>
    </div>
  );
}