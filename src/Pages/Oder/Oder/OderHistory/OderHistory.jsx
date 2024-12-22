// import { useQuery } from '@tanstack/react-query';
// import React from 'react';
// import useUser from '../../../../Hooks/useUser';
// import useAxiosSecure from '../../../../Hooks/useAxiosSecure';

// const OderHistory = () => {
//     const axiosSecure = useAxiosSecure();
//     const { user } = useUser();

//     const { refetch, data: orders = [], isLoading, isError, error } = useQuery({
//         queryKey: ['order-stats', user?.contact], 
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/oder-stats?contact=${user.contact}`); 
//             return res.data;
//         }
//     });

//     if (isLoading) return <p>Loading...</p>;
//     if (isError) return <p>Error: {error.message}</p>;


//     const totalPrice = orders.reduce((acc, order) => acc + parseFloat(order.totalRevenue), 0);

//     return (
//         <div className="p-4">
//             <div className="bg-white shadow-md rounded-lg p-4 max-w-3xl mx-auto mb-4">
//                 <div className="flex justify-between items-center">
//                     <h2 style={{ color: '#8a1538' }} className="text-xl font-bold">Order Statistics</h2>
//                     {orders.length > 0 && (
//                         <button className="bg-[#8d1b3d] p-2 text-white font-bold rounded">
//                             PROCEED
//                         </button>
//                     )}
//                 </div>
//             </div>

//             {orders.length > 0 ? (
//                 <div className="bg-white shadow-md rounded-lg p-4 max-w-3xl mx-auto">
//                     <div className="overflow-x-auto">
//                         <table className="table w-full">
//                             <thead>
//                                 <tr>
//                                     <th className="p-2">Image</th>
//                                     <th className="p-2">Item Name</th>
//                                     <th className="p-2">Quantity</th>
//                                     <th className="p-2">Price (QAR)</th>
//                                     <th className="p-2">Total Revenue (QAR)</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {orders.map((order, index) => (
//                                     <tr key={index}>
//                                         <td className="p-2">
//                                             <img src={order.image} alt={order.itemName} className="w-16 h-16 object-cover rounded-md" />
//                                         </td>
//                                         <td className="p-2">{order.itemName}</td>
//                                         <td className="p-2">{order.quantity}</td>
//                                         <td className="p-2">QAR {parseFloat(order.price).toFixed(2)}</td>
//                                         <td className="p-2">QAR {parseFloat(order.totalRevenue).toFixed(2)}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>

//                     {/* Display the total price */}
//                     <div className="text-right mt-4">
//                         <h3 className="text-lg font-semibold">Total Price: {totalPrice.toFixed(2)} QAR  </h3>
//                     </div>
//                 </div>
//             ) : (
//                 <div className="bg-white shadow-md rounded-lg p-4 max-w-3xl mx-auto text-center">
//                     <h1 style={{ color: '#8a1538' }} className="text-lg font-bold mb-4">No data available</h1>
//                     <p style={{ color: '#8a1538' }} className="text-md">No orders to display at the moment.</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default OderHistory;

import React from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import useUser from '../../../../Hooks/useUser';
import { PiShoppingCartSimpleLight } from "react-icons/pi";
const OderHistory = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useUser();
    //     const { refetch, data: orders = [], isLoading, isError, error } = useQuery({
    //         queryKey: ['order-stats', user?.contact], 
    //         queryFn: async () => {
    //             const res = await axiosSecure.get(`/oder-stats?contact=${user.contact}`); 
    //             return res.data;
    //         }
    //     });


    const { data: orders = [], isLoading, isError, error } = useQuery({
        queryKey: ['orders', user?.contact],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders?contact=${user?.contact}`);
            return res.data;
        }
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div className="p-4">
            <div className="bg-white shadow-md rounded-lg p-4 max-w-3xl mx-auto mb-4">
                <div className="flex justify-between items-center">
                    <h2 style={{ color: '#8a1538' }} className="text-xl font-bold">My Oders</h2>
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
                                {orders.map((order, index) => {
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

                                    return (
                                        <tr key={_id}>
                                            <td className="p-2">{name}</td>
                                            <td className="p-2">{contact}</td>
                                            <td className="p-2">{location}</td>
                                            <td className="p-2">{format(new Date(date), 'yyyy-MM-dd')}</td>
                                            <td className="p-2">QAR {parseFloat(price).toFixed(2)}</td>
                                            <td className="p-2">{status}</td>
                                            <td className="p-2">{itemIds.length}</td>
                                            <td className="p-2">
                                                <Link to={`/dashboard/paymentsOders/${_id}`} >
                                                    <button className="bg-[#8a1538] text-white py-1 gap-2 px-3 rounded-md hover:bg-[#6e112b] transition-all flex items-center space-x-2">
                                                        Details <  PiShoppingCartSimpleLight />
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

export default OderHistory;