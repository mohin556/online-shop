import React from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosSecure, { axiosSecure } from './../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FaEdit, FaExchangeAlt } from 'react-icons/fa';


const BannerDetails = ({ banner, index }) => {
    const { image, name, _id } = banner;
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
        <tr>
            <td className="font-bold" style={{ color: '#8a1538' }}>
                {index}
            </td>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle h-18 w-20">
                            <img src={image} alt={name} />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold" style={{ color: '#8a1538' }}>
                            {name}
                        </div>
                    </div>
                </div>
            </td>
            <td>

                <Link to={`/dashboard/updateBanner/${_id}`}>  <button

                    style={{ backgroundColor: '#8a1538', color: 'white' }}
                    className="flex items-center px-3 py-1.5 font-bold text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-200"
                >
                    <FaExchangeAlt className="mr-1.5 text-2xl" />
                    Update
                </button></Link>
            </td>
            <td>
                <button
                    onClick={() => handleBannerRemove(_id)}
                    className="flex items-center px-3 py-1.5 font-bold text-white rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-300 hover:bg-red-600"
                    style={{ backgroundColor: '#8a1538' }}
                >
                    <RiDeleteBin6Line className="mr-1.5" />
                    Remove
                </button>
            </td>
        </tr>

    );
};

export default BannerDetails;
