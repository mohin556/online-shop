import React from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';

import Swal from 'sweetalert2';
import useCart from './../../../../Hooks/useCart';
import { ImUsers } from "react-icons/im";
import { useQuery } from '@tanstack/react-query';
import useAdmin from '../../../../Hooks/useAdmin';
import { toast } from "react-toastify";

const UserDetails = ({ user, index }) => {
    const axiosSecure = useAxiosSecure();
    const [isAdmin] = useAdmin();
    console.log(isAdmin)



    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data
        }
    })

    const { _id, contact, name, location } = user;
    const handleMakeAdmin = (id) => {

        axiosSecure.patch(`/users/admin/${id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${name} is An Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(error => {
                console.error("Error making admin:", error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Failed to make admin",
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    }
    // const handleDeleteUser = (id) => {
    //     Swal.fire({
    //         title: "Are you sure?",
    //         text: "You won't be able to revert this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes, delete it!"
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             axiosSecure.delete(`/users/${id}`)
    //                 .then(res => {
    //                     if (res.data.deletedCount > 0) {
    //                         refetch();
    //                         Swal.fire({
    //                             title: "Deleted!",
    //                             text: "Your file has been deleted.",
    //                             icon: "success"
    //                         });

    //                     }
    //                 });
    //         }
    //     });

    // }
   
    const handleDeleteUser = (id) => {
        if (window.confirm("Are you sure? This action cannot be undone!")) {
            axiosSecure.delete(`/users/${id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        toast.success("User deleted successfully!");
                    } else {
                        toast.error("Failed to delete the user.");
                    }
                })
                .catch(() => {
                    toast.error("An error occurred while deleting the user.");
                });
        }
    };

    return (

        <tr style={{ color: '#8a1538' }} className="bg-base-200 font-bold">
            <th className='font-bold'> {index}</th>
            <td>{name} <br />{contact}</td>
            <td> {location}</td>
            <td>
                {user.role === 'admin' ? (
                    'Admin'
                ) : (
                    <button
                        onClick={() => handleMakeAdmin(_id)}
                        style={{ backgroundColor: '#8a1538', color: 'white' }}
                        className="flex items-center px-3 py-1.5 font-bold text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-200"
                    >
                        <ImUsers style={{ color: 'white' }} className="mr-1.5 text-2xl" />
                        Make Admin
                    </button>
                )}
            </td>

            <td> <button onClick={() => handleDeleteUser(_id)} style={{ backgroundColor: '#8a1538', color: 'white' }} className="flex items-center px-3 py-1.5  font-bold text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-200">
                <RiDeleteBin6Line className="mr-1.5 " />
                Remove
            </button> </td>
        </tr>

    );
};

export default UserDetails;