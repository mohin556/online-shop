import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { IoCutOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const ManageItems = () => {


    const axiosSecure = useAxiosSecure();
    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/items/${item._id}`)
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: `${item.name} has been deleted.`,
                        icon: "success"
                    });
                }
            }
        });
    }
    const { data: items = [], refetch } = useQuery({
        queryKey: ['items'],
        queryFn: async () => {
            const res = await axiosSecure.get('/items');
            return res.data;
        },
    });

    return (
        <div style={{ color: '#8d1b3d' }}>
            <h1 className='text-center font-bold'>MANAGE ITEM</h1>
            <br />
            <h1 className='text-center font-bold'>Total :{items.length}</h1>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Item Image & Name</th>
                                <th>Item Details</th>
                                <th>Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.map((item, index) => (
                                    <tr key={item._id}>
                                        <td style={{ color: '#8a1538' }} className='font-bold'>{index + 1}</td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img src={item.image} alt={item.name} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div style={{ color: '#8a1538' }} className="font-bold">{item.name}</div>
                                                    <div className="text-sm opacity-50 font-bold">{item.category} Item</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {item.description}
                                            <br />
                                            <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                                        </td>
                                        <td className='font-bold'>{item.price} <span style={{ color: '#8a1538' }}>QAR</span></td>
                                        <td className='flex gap-2'>
                                            <Link to={`/dashboard/updateItem/${item._id}`}>  <button

                                                style={{ backgroundColor: '#8a1538', color: 'white' }}
                                                className="flex items-center px-3 py-1.5 font-bold text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-200"
                                            >
                                                <FaEdit className="mr-1.5 text-2xl" />

                                            </button></Link>
                                            <button
                                                onClick={() => handleDelete(item)}
                                                style={{ backgroundColor: '#8a1538', color: 'white' }}
                                                className="flex items-center px-3 py-1.5 font-bold text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-200"
                                            >
                                                <RiDeleteBin6Line className="mr-1.5 text-2xl" /> {/* Applied larger text size */}

                                            </button>

                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;
