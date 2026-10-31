import React, { useEffect, useState } from 'react';
import OrderCard from './OrderCard';
import Spinner from '../../components/Spinner';
import { fetchOrders } from './ordersAPI';

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders()
      .then(setOrders)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((o) => <OrderCard key={o.id} order={o} />)
      )}
    </div>
  );
}