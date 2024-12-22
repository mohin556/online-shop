import React from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FaExchangeAlt } from "react-icons/fa";

const BannerDemo = ({ banner }) => {
    const { image, bannerName, _id } = banner;
    const axiosSecure = useAxiosSecure();

    const { data: banners = [], refetch } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const res = await axiosSecure.get('/banners'); 
            return res.data;
        }
    });

    const handleBannerRemove = (id) => {
        if (window.confirm("Are you sure you want to delete this banner?")) {
            axiosSecure.delete(`/banners/${id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        toast.success("Banner deleted successfully!", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 3000,
                            hideProgressBar: true,
                            pauseOnHover: false,
                            draggable: true,
                        });
                    }
                })
                .catch(() => {
                    toast.error("Failed to delete banner.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000,
                        hideProgressBar: true,
                        pauseOnHover: false,
                        draggable: true,
                    });
                });
        }
    };


    return (
        <div className="flex flex-col md:flex-row items-center justify-between bg-white shadow-lg rounded-lg w-full p-4">
           
            <div className="md:w-1/2 w-full">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-auto object-cover rounded-lg"
                />
                <p style={{ color: '#8a1538' }} className="font-semibold text-lg mt-4 text-center">{bannerName}</p>
            </div>

           
            <div className="flex flex-col items-center md:items-start mt-4 md:mt-0 md:w-1/2 space-y-4 md:ml-8">
                <Link to={`/dashboard/updateBanner/${_id}`} >
                    <button
                        className="flex items-center px-4 py-2 font-bold text-white bg-blue-600 rounded-lg transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        style={{ backgroundColor: '#8a1538' }}
                    >
                        <FaExchangeAlt className="mr-2" />
                        Update
                    </button>
                </Link>
        
                <button
                    onClick={() => handleBannerRemove(_id)}
                    style={{ backgroundColor: '#8a1538' }}
                    className="flex items-center px-4 py-2 font-bold text-white bg-red-600 rounded-lg transition duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                    <RiDeleteBin6Line className="mr-2" />
                    Remove
                </button>
            </div>
        </div>
    );
};

export default BannerDemo;
