export const fetchOrders = async () => {
  return [
    { id: 1001, name: 'Order #1001', total: 42.00, status: 'Delivered' },
    { id: 1002, name: 'Order #1002', total: 129.50, status: 'Processing' }
  ];
};