import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure, { axiosSecure } from './../../../Hooks/useAxiosSecure';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { MdOutlinePersonAddAlt } from "react-icons/md";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DriversDetails = () => {
    const axiosSecure = useAxiosSecure();


    const { data: drivers = [], refetch } = useQuery({
        queryKey: ['drivers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/drivers');
            return res.data
        }
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure? You won't be able to revert this!")) {
            try {
                const res = await axiosSecure.delete(`/drivers/${id}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                    toast.success('Driver has been deleted successfully!');
                }
            } catch (error) {
                console.error("Error deleting driver:", error);
                toast.error('Something went wrong while deleting the driver!');
            }
        }
    };
    
    const onSubmit = async (data) => {
        console.log('Form submitted', data);
    
        const drivers = {
            name: data.name,
            contact: data.phone
        };
    
        try {
            const driverRes = await axiosSecure.post('/drivers', drivers);
            console.log(driverRes.data);
    
            if (driverRes.data.insertedId) {
                refetch();
                toast.success('Driver has been saved successfully!');
              
            }
        } catch (error) {
            console.error("Error saving driver:", error);
            toast.error('Something went wrong while saving the driver!');
        }
    };
    

    return (
        <div className='p-6'>
            <div className="bg-white shadow-md rounded-lg p-4 max-w-3xl mx-auto mb-4">
                <div className="flex justify-between items-center">
                    <h2 style={{ color: '#8a1538' }} className="text-xl font-bold">Add DRIVER!</h2>

                </div>
            </div>
         
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-lg w-full">
                 <div className='flex gap-4'>
                 <label className="form-control w-full">
                    <div className="label">
                        <span style={{ color: '#8d1b3d' }} className="label-text">Driver Name</span>
                    </div>
                    <input
                        {...register('name', { required: true })}
                        type="text"
                        placeholder="Driver Name"
                        style={{ borderColor: '#8d1b3d', color: '#8d1b3d' }}
                        className="input input-bordered w-full"
                    />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span style={{ color: '#8d1b3d' }} className="label-text">Phone</span>
                    </div>
                    <input
                        {...register('phone', { required: true })}
                        type="number"
                        placeholder="phone"
                        style={{ borderColor: '#8d1b3d', color: '#8d1b3d' }}
                        className="input input-bordered w-full"
                    />
                </label>
                 </div>

                
                <button
                    type="submit"
                    style={{ borderColor: '#8d1b3d' }}
                    className=" flex gap-2 bg-[#8d1b3d] p-2 text-white font-bold rounded w-32 mt-3">
              <MdOutlinePersonAddAlt />   ADD
                </button>
            </form>

            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full bg-[#8d1b3d] text-white">
                        {/* head */}
                        <thead>
                            <tr className="bg-[#8d1b3d] text-white">
                                <th className="p-4">#</th>
                                <th className="p-4">Name</th>
                                <th className="p-4">Contact</th>
                                <th className="p-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {drivers.map((driver, index) => (
                                <tr key={driver.id} className="hover:bg-[#a0244e]">
                                    <th className="p-4">{index + 1}</th>
                                    <td className="p-4">{driver.name}</td>
                                    <td className="p-4">{driver.contact}</td>
                                    <td className="p-4">
                                        <button onClick={() => { handleDelete(driver._id) }} className='border border-white p-2 rounded-md font-semibold'>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default DriversDetails;