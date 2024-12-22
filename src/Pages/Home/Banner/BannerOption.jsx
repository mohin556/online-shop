import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import BannerDetails from './BannerDetails';
import BannerDemo from './BannerDemo';

const image_Hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_Hosting_api = `https://api.imgbb.com/1/upload?key=${image_Hosting_key}`;

const BannerOption = () => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();


    const queryClient = useQueryClient();

    const { data: banners = [] } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const res = await axiosSecure.get('/banners');
            return res.data;
        },
    });

    const onSubmit = async (data) => {
        console.log('Form submitted', data);
        try {
            const formData = new FormData();
            formData.append('image', data.image[0]);

            const res = await axiosSecure.post(image_Hosting_api, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.data.success) {
                const Banners = {
                    image: res.data.data.display_url,
                    bannerName: data.bannerName,
                };

                const itemRes = await axiosSecure.post('/banners', Banners);

                if (itemRes.data.insertedId) {
                    reset(); 
                    queryClient.invalidateQueries('banners');

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your banner has been uploaded',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            } else {
                throw new Error('Image upload failed');
            }
        } catch (error) {
            console.error('Error uploading banner:', error);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Failed to upload banner',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-start justify-start w-full">
           
            <div className="w-full p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-lg w-full">
                    <label className="form-control w-full">
                        <div className="label">
                            <span style={{ color: '#8d1b3d' }} className="label-text">Banner Name</span>
                        </div>
                        <input
                            {...register('bannerName', { required: true })}
                            type="text"
                            placeholder="Banner Name"
                            style={{ borderColor: '#8d1b3d', color: '#8d1b3d' }}
                            className="input input-bordered w-full"
                        />
                    </label>

                    <label className="form-control w-full my-4">
                        <div className="label">
                            <span style={{ color: '#8d1b3d' }} className="label-text">Upload Banner Image</span>
                        </div>
                        <input
                            type="file"
                            style={{ borderColor: '#8d1b3d' }}
                            {...register('image', { required: true })}
                            className="file-input file-input-bordered w-full"
                        />
                    </label>

                    <button
                        type="submit"
                        style={{ borderColor: '#8d1b3d' }}
                        className="bg-[#8d1b3d] p-2 text-white font-bold rounded w-32">
                        UPLOAD
                    </button>
                </form>
            </div>

          
            <div className="w-full p-6">
                <div className="bg-white shadow-md rounded-lg p-4 w-full">
                    <h1 style={{ color: '#8a1538' }} className="text-lg p-2 font-bold mb-4">
                        Banners Number: {banners.length}
                    </h1>

                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                   
                                </tr>
                            </thead>
                            <tbody>
                                {banners.map((banner, index) => (
                                    <BannerDetails key={banner._id} banner={banner} index={index + 1} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <h1 style={{ color: '#8a1538' }} className="text-lg p-2 font-bold mb-2"> Total Banner: {banners.length}</h1>
            <h3  style={{ color: '#8a1538' }} className='text-lg p-2 '>Update Banner!</h3>
            {banners.map(banner => <BannerDemo key={banner._id} banner={banner}></BannerDemo>)}
        </div>
    );
};

export default BannerOption;
