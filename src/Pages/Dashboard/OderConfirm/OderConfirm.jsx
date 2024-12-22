import React from 'react';
import useUser from '../../../Hooks/useUser';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const OrderConfirm = () => {
    const { user } = useUser();
    const axiosSecure = useAxiosSecure();

    const { data: orders = [], error } = useQuery({
        queryKey: ['orders', user?.contact],
        queryFn: async () => {
            if (!user?.contact) return [];
            const res = await axiosSecure.get(`/orderConfirm/${user.contact}`);
            return res.data;
        },
        enabled: !!user?.contact,
    });

    if (!user) {
        return <p>User data is not available.</p>;
    }

    if (error) {
        return <p>Error fetching orders: {error.message}</p>;
    }
    console.log(orders)
    return (
        <div>
            <h1>Thanks for confirming</h1>
            <h1>Total {orders.length}</h1>
            {orders.length === 0 && <p>No orders found for this contact.</p>}
            <div>
                
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Order Summary</h2>
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                {/* Table Head */}
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th>#</th>
                                        <th>Price</th>
                                        <th>Location</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                {/* Table Body */}
                                <tbody>
                                    {orders.map((order, index) => (
                                        <tr key={order._id} className="hover:bg-gray-50">
                                            <th>{index + 1}</th>
                                            <td>{order.price} QAR</td>
                                            <td>{order.location}</td>
                                            <td>{order.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default OrderConfirm;
