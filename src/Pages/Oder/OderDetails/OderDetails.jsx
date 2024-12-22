import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAdmin from '../../../Hooks/useAdmin';
import { toast } from 'react-toastify';

const OderDetails = () => {
    const loadedData = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const [isAdmin] = useAdmin();
    const { _id, name, location, contact, price, status, itemIds } = loadedData;

    const { data: items = [] } = useQuery({
        queryKey: ['items'],
        queryFn: async () => {
            const res = await axiosSecure.get('/items');
            return res.data;
        },
    });

    const { data: drivers = [] } = useQuery({
        queryKey: ['drivers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/drivers');
            return res.data;
        },
    });

    const { data: orderDetails, refetch: refetchOrderDetails } = useQuery({
        queryKey: ['orderDetails', _id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/${_id}`);
            return res.data;
        },
        enabled: !!_id,
    });

    const [selectedDriver, setSelectedDriver] = useState('');

    const handleDeliver = () => {
        // Mock delivery action
        if (selectedDriver) {
            toast.success(`Order delivered by ${selectedDriver}!`);
        } else {
            toast.error('Please select a driver before delivering the order.');
        }
    };

    const handleAcceptOrder = async () => {
        try {
            const response = await axiosSecure.patch(`/orders/${_id}/status`, { status: 'Confirmed' });
            console.log(response.data.message);
            refetchOrderDetails();
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const { name: orderName, location: orderLocation, contact: orderContact, price: orderPrice, status: orderStatus } = orderDetails || {};
    const matchedItems = items.filter(item => itemIds.includes(item._id));

    return (
        <div className="p-4">
            <div className="bg-white shadow-md rounded-lg p-4 max-w-3xl mx-auto mb-4">
                <h1 className="text-xl font-bold" style={{ color: '#8a1538' }}>Order Detail</h1>
                <ul>
                    <li><strong>Name:</strong> {orderName}</li>
                    <li><strong>Location:</strong> {orderLocation}</li>
                    <li><strong>Contact:</strong> {orderContact}</li>
                    <li><strong>Price:</strong> {orderPrice} QAR</li>
                    <li className="flex items-center gap-2">
                        <strong>Status:</strong>
                        <span>{orderStatus}</span>
                        {orderStatus === 'pending' && isAdmin && (
                        <Link to='/dashboard/paymentOders'>
                            <button 
                                className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition-all"
                                onClick={handleAcceptOrder}
                            >
                                Accept Order
                            </button></Link>
                        )}
                    </li>
                </ul>
                {isAdmin && (
                    <div className="mt-4">
                        <label htmlFor="driver-select" className="block mb-2">Select Driver:</label>
                        <select
                            id="driver-select"
                            value={selectedDriver}
                            onChange={(e) => setSelectedDriver(e.target.value)}
                            className="border rounded-md p-2 w-full"
                        >
                            <option value="">-- Select a Driver --</option>
                            {drivers.map(driver => (
                                <option key={driver.id} value={driver.name}>{driver.name}</option>
                            ))}
                        </select>
                        {orderStatus === 'pending' ? (
                            <button
                                className="mt-2 bg-blue-500 text-white py-1 px-3 rounded-md cursor-not-allowed opacity-50"
                                disabled
                            >
                                Deliver
                            </button>
                        ) : (
                            <button
                                className="mt-2 bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition-all"
                                onClick={handleDeliver}
                            >
                                Deliver
                            </button>
                        )}

                    </div>
                )}
            </div>

            {matchedItems.length > 0 ? (
                <div className="bg-white shadow-md rounded-lg p-4 max-w-3xl mx-auto">
                    <h2 className="text-lg font-bold" style={{ color: '#8a1538' }}>Items:</h2>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th className="p-2">Image</th>
                                    <th className="p-2">Item Name</th>
                                    <th className="p-2">Price (QAR)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {matchedItems.map(item => (
                                    <tr key={item._id}>
                                        <td className="p-2">
                                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                                        </td>
                                        <td className="p-2">{item.name}</td>
                                        <td className="p-2">QAR {parseFloat(item.price).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="bg-white shadow-md rounded-lg p-4 max-w-3xl mx-auto text-center">
                    <h1 style={{ color: '#8a1538' }} className="text-lg font-bold mb-4">No Items Found</h1>
                    <p style={{ color: '#8a1538' }} className="text-md">No matched items to display at the moment.</p>
                </div>
            )}
        </div>
    );
};

export default OderDetails;
