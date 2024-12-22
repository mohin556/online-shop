import React, { useEffect } from 'react';
import useAxiosSecure from './../../../Hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

const image_Hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_Hosting_api = `https://api.imgbb.com/1/upload?key=${image_Hosting_key}`;

const Information = () => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { data: informations = [],refetch } = useQuery({
        queryKey: ['informations'],
        queryFn: async () => {
            const res = await axiosSecure.get('/informations');
            return res.data;
        }
    });

    const info = informations[0];

    useEffect(() => {
        if (info) {
            reset({
                name: info.companyName,
                email: info.email,
                phone: info.phone,
                currency: info.currency,
                address: info.address,
                facebook: info.facebook,
                twitter: info.twitter,
                youtube: info.youtube
            });
        }
    }, [info, reset]);

    const onSubmit = async (data) => {
        try {
            console.log("Form data submitted:", data);

            const formData = new FormData();
            if (data.image && data.image[0]) {
                formData.append('image', data.image[0]);
            } else {
                console.log("No image selected"); 
                throw new Error("Image is required");
            }

            const imageRes = await axiosSecure.post(image_Hosting_api, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const imageUrl = imageRes.data.data.display_url;
            if (!imageUrl) {
                throw new Error("Image upload failed");
            }

            const Details = {
                name: data.name,
                email: data.email,
                phone: data.phone,
                currency: data.currency,
                address: data.address,
                logoImage: imageUrl,
                facebook: data.facebook,
                twitter: data.twitter,
                youtube: data.youtube,
            };

            const detailRes = await axiosSecure.patch(`/informations/${info._id}`, Details);

            if (detailRes.data.modifiedCount > 0) {
                reset();
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} has been updated`,
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                console.log("No modifications detected");
                throw new Error("Update failed");
            }
        } catch (error) {
            console.error("Error updating information:", error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Update failed",
                text: error.message,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div>
            <div style={{ color: '#8d1b3d' }} className='p-5 font-bold'>
                <h1 className='text-center font-bold'>Company Information</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Company Name */}
                    <label className="form-control w-full my-2">
                        <div className="label">
                            <span style={{ color: '#8d1b3d' }} className="label-text">Company Name</span>
                        </div>
                        <input
                            {...register("name")}
                            type="text"
                            placeholder="Company Name"
                            className="input input-bordered w-full"
                            style={{ borderColor: '#8d1b3d', color: '#8d1b3d' }}
                        />
                    </label>

                    {/* Email and Phone */}
                    <div className='flex gap-4'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span style={{ color: '#8d1b3d' }} className="label-text">Email</span>
                            </div>
                            <input
                                {...register("email")}
                                type="text"
                                placeholder="Email"
                                className="input input-bordered w-full"
                                style={{ borderColor: '#8d1b3d', color: '#8d1b3d' }}
                            />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span style={{ color: '#8d1b3d' }} className="label-text">Phone</span>
                            </div>
                            <input
                                {...register("phone")}
                                type="text"
                                placeholder="Contact"
                                className="input input-bordered w-full"
                                style={{ borderColor: '#8d1b3d', color: '#8d1b3d' }}
                            />
                        </label>
                    </div>

                    <div className='flex gap-4'>
                        <label className="form-control w-full my-2">
                            <div className="label">
                                <span style={{ color: '#8d1b3d' }} className="label-text">Facebook</span>
                            </div>
                            <input
                                {...register("facebook")}
                                type="text"
                                placeholder="Facebook URL"
                                className="input input-bordered w-full"
                                style={{ borderColor: '#8d1b3d', color: '#8d1b3d' }}
                            />
                        </label>

                        <label className="form-control w-full my-2">
                            <div className="label">
                                <span style={{ color: '#8d1b3d' }} className="label-text">Twitter</span>
                            </div>
                            <input
                                {...register("twitter")}
                                type="text"
                                placeholder="Twitter URL"
                                className="input input-bordered w-full"
                                style={{ borderColor: '#8d1b3d', color: '#8d1b3d' }}
                            />
                        </label>
                    </div>

                    <label className="form-control w-full my-2">
                        <div className="label">
                            <span style={{ color: '#8d1b3d' }} className="label-text">YouTube</span>
                        </div>
                        <input
                            {...register("youtube")}
                            type="text"
                            placeholder="YouTube URL"
                            className="input input-bordered w-full"
                            style={{ borderColor: '#8d1b3d', color: '#8d1b3d' }}
                        />
                    </label>

                    {/* Currency Selection */}
                    <label className="form-control w-full">
                        <div className="label">
                            <span style={{ color: '#8d1b3d' }} className="label-text">Add Currency</span>
                        </div>
                        <select
                            {...register("currency", { required: "Currency is required" })}
                            className="select select-bordered w-full"
                            style={{ borderColor: '#8d1b3d', color: '#8d1b3d' }}
                        >
                            <option value="">Select Currency</option>
                            <option value="USD">USD</option>
                            <option value="QAR">QAR</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                        </select>
                        {errors.currency && (
                            <p style={{ color: 'red' }}>{errors.currency.message}</p>
                        )}
                    </label>

                    {/* Address */}
                    <label className="form-control w-full my-4">
                        <div className="label">
                            <span style={{ color: '#8d1b3d' }} className="label-text">Address</span>
                        </div>
                        <textarea
                            {...register("address")}
                            placeholder="Address Location"
                            className="textarea textarea-bordered textarea-lg w-full"
                            style={{ borderColor: '#8d1b3d', color: '#8d1b3d' }}
                        />
                    </label>

                    {/* Logo Upload */}
                    <label className="form-control w-full my-4">
                        <div className="label">
                            <span style={{ color: '#8d1b3d' }} className="label-text">Upload Company Logo</span>
                        </div>
                        <input
                            type="file"
                            style={{ borderColor: '#8d1b3d' }}
                            {...register('image', { required: true })}
                            className="file-input file-input-bordered w-full"
                        />
                        {errors.image && (
                            <p className="text-red-500">Image is required</p>
                        )}
                    </label>

                    {/* Submit Button */}
                    <button
                        style={{ borderColor: '#8d1b3d' }}
                        className="bg-[#8d1b3d] p-2 text-white font-bold rounded"
                    >
                       Upload
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Information;
