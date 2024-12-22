import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import { PiShoppingCartSimpleLight } from 'react-icons/pi';

const AdminOrders = () => {
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading, isError, error } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/orders');
      return res.data;
    }
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <div className="bg-white shadow-md rounded-lg p-4 max-w-3xl mx-auto mb-4">
        <div className="flex justify-between items-center">
          <h2 style={{ color: '#8a1538' }} className="text-xl font-bold">User Orders</h2>
        </div>
      </div>

      {orders.length > 0 ? (
        <div className="bg-white shadow-md rounded-lg p-4 max-w-3xl mx-auto">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="p-2">User</th>
                  <th className="p-2">Contact</th>
                  <th className="p-2">Area</th>
                  <th className="p-2">Order Date</th>
                  <th className="p-2">Total Price (QAR)</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Items</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  // Destructure the individual order object
                  const {
                    _id,
                    name,
                    location,
                    contact,
                    price,
                    status,
                    itemIds,
                    date,
                    cardIds
                  } = order;

                  // Conditional class based on order status
                  const statusClass = status === 'confirmed' ? 'bg-green-100' : '';

                  return (
                    <tr key={_id}>
                      <td className="p-2">{name}</td>
                      <td className="p-2">{contact}</td>
                      <td className="p-2">{location}</td>
                      <td className="p-2">{format(new Date(date), 'yyyy-MM-dd')}</td>
                      <td className="p-2">QAR {parseFloat(price).toFixed(2)}</td>
                      <td className={`p-2 ${statusClass}`}>{status}</td>
                      <td className="p-2">{itemIds.length}</td>
                      <td className="p-2">
                        <Link to={`/dashboard/paymentsOders/${_id}`}>
                          <button className="bg-[#8a1538] text-white py-1 gap-2 px-3 rounded-md hover:bg-[#6e112b] transition-all flex items-center space-x-2">
                            Details <PiShoppingCartSimpleLight />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-4 max-w-3xl mx-auto text-center">
          <h1 style={{ color: '#8a1538' }} className="text-lg font-bold mb-4">No orders available</h1>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
