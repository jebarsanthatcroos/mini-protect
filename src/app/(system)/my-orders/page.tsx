'use client';

import { useEffect, useState } from 'react';

interface Order {
  _id: string;
  orderNumber: string;
  status: string;
  totalAmount: number;
  createdAt: string;
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await fetch('/api/orders/my-order');
        const data = await response.json();
        if (response.ok && data.success) {
          setOrders(data.orders ?? []);
        }
      } finally {
        setLoading(false);
      }
    };

    void loadOrders();
  }, []);

  if (loading) return <p className='p-6'>Loading orders...</p>;

  return (
    <main className='p-6'>
      <h1 className='mb-6 text-2xl font-semibold'>My Orders</h1>
      {orders.length === 0 ? (
        <p className='text-gray-600'>No orders found.</p>
      ) : (
        <div className='space-y-4'>
          {orders.map(order => (
            <article
              key={order._id}
              className='rounded-lg border border-gray-200 bg-white p-4 shadow-sm'
            >
              <div className='flex flex-wrap justify-between gap-2'>
                <h2 className='font-medium'>Order {order.orderNumber}</h2>
                <span className='capitalize text-gray-600'>{order.status}</span>
              </div>
              <p className='mt-2 text-gray-700'>
                Total: {order.totalAmount.toFixed(2)}
              </p>
              <p className='text-sm text-gray-500'>
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
