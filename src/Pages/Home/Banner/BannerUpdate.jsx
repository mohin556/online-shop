import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const image_Hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_Hosting_api = `https://api.imgbb.com/1/upload?key=${image_Hosting_key}`;

const BannerUpdate = () => {
    const loadedData = useLoaderData(); // Initial banner data from loader
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();

    // State to hold banner data for UI updates
    const [bannerData, setBannerData] = useState({
        bannerName: loadedData.bannerName,
        image: loadedData.image,
        _id: loadedData._id,
    });

    const [isBannerUpdated, setIsBannerUpdated] = useState(false);

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();

            if (data.image && data.image[0]) {
                formData.append('image', data.image[0]);
            } else {
                console.log("No image selected"); 
                throw new Error("Image is required");
            }

            // Uploading the image
            const res = await axiosSecure.post(image_Hosting_api, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            console.log("Image Upload Response:", res); // Debug: Check image upload response

            if (res.data.success) {
                const newBanner = {
                    image: res.data.data.display_url,
                    bannerName: data.bannerName,
                };

                // Sending updated banner data to server
                const itemRes = await axiosSecure.patch(`/banners/${bannerData._id}`, newBanner);
                console.log("Banner Update Response:", itemRes); // Debug: Check banner update response

                if (itemRes.data.modifiedCount > 0) {
                    // Refetch the updated banner data and update state
                    setBannerData((prev) => ({
                        ...prev,
                        bannerName: newBanner.bannerName,
                        image: newBanner.image,
                    }));

                    reset(); // Reset the form

                    // Set banner updated state to true to show "New Banner Details"
                    setIsBannerUpdated(true);

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your banner has been updated',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } else {
                    throw new Error('Failed to update the banner');
                }
            } else {
                throw new Error('Image upload failed');
            }
        } catch (error) {
            console.error('Error uploading banner:', error);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: error.message || 'Failed to upload banner',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <div>
         
            <div className="w-full mb-8 p-6 bg-gray-100 rounded shadow-lg flex items-center">
                <div className="w-1/2">
                    <h2 className="text-xl font-bold mb-4">
                        {isBannerUpdated ? 'New Banner Details' : 'Current Banner Details'}
                    </h2>
                    <p><strong>ID:</strong> {bannerData._id}</p>
                    <p><strong>Banner Name:</strong> {bannerData.bannerName}</p>
                </div>

                {bannerData.image && (
                    <div className="w-1/2 flex justify-end">
                        <img
                            src={bannerData.image}
                            alt={bannerData.bannerName}
                            className="rounded"
                            style={{ width: '100%', height: 'auto' }}  // Image takes 100% of half-page width
                        />
                    </div>
                )}
            </div>

            <div className="w-full p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-lg w-full">
                    <label className="form-control w-full">
                        <div className="label">
                            <span style={{ color: '#8d1b3d' }} className="label-text">Banner Name</span>
                        </div>
                        <input
                            {...register('bannerName', { required: true })}
                            defaultValue={bannerData.bannerName}
                            type="text"
                            placeholder="Banner Name"
                            style={{ borderColor: '#8d1b3d', color: '#8d1b3d' }}
                            className="input input-bordered w-full"
                        />
                        {errors.bannerName && (
                            <p className="text-red-500">Banner name is required</p>  // Validation error message
                        )}
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
                        {errors.image && (
                            <p className="text-red-500">Image is required</p>  // Validation error message
                        )}
                    </label>

                    <button
                        type="submit"
                        style={{ borderColor: '#8d1b3d' }}
                        className="bg-[#8d1b3d] p-2 text-white font-bold rounded w-32">
                        UPDATE
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BannerUpdate;
