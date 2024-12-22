import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { GrAdd } from "react-icons/gr";
import { useQuery } from '@tanstack/react-query';


const image_Hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const image_Hosting_api = `https://api.imgbb.com/1/upload?key=${image_Hosting_key}`;



const AddItems = () => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm()

    const [isCategoryInputVisible, setIsCategoryInputVisible] = useState(false);
    const [newCategory, setNewCategory] = useState('');

    const handleAddCategory = () => {
        setIsCategoryInputVisible(!isCategoryInputVisible); // Toggle input visibility
    };

    const handleCategoryChange = (e) => {
        setNewCategory(e.target.value);
    };

    const handleAddNewCategory = async () => {
        if (!newCategory) {
            alert('Please enter a category name');
            return;
        }

        try {
            // POST the new category to your backend
            const response = await axiosSecure.post('/categories', { name: newCategory });
            console.log('New Category Added:', response.data);

            // Refetch the categories to update the select options
            refetch();

            // Clear the input field and hide it
            setNewCategory('');
            setIsCategoryInputVisible(false);
        } catch (error) {
            console.error('Error adding new category:', error);
        }
    };

    const { data: categories = [], refetch } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axiosSecure.get('/categories');
            return res.data
        }
    })
    console.log(categories)

    const onSubmit = async (data) => {
        console.log(data)
        const imageFile = { image: data.image[0] }
        const res = await axiosSecure.post(image_Hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        console.log(res.data);
        if (res.data.success) {
            const Items = {
                name: data.name,
                image: res.data.data.display_url,
                description: data.description,
                category: data.category,
                price: parseFloat(data.price),
                arbName: data.arbName,


            }
            const itemRes = await axiosSecure.post('/items', Items);
            console.log(itemRes.data)
            if (itemRes.data.insertedId) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }

    return (
        <div style={{ color: '#8d1b3d' }} className='p-5 font-bold'>
            <h1 className='text-center font-bold'>ADD AN ITEM</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="form-control w-full my-2 ">
                    <div className="label">
                        <span style={{ color: '#8d1b3d' }} className="label-text  ">Item Name</span>

                    </div>
                    <input
                        {...register("name")}
                        type="text"
                        placeholder="Item Name"
                        className="input input-bordered w-full"
                        style={{ borderColor: '#8d1b3d', color: '#8d1b3d' }}
                    />

                </label>
                {/* <input {...register("firstName")} /> */}
                <div className='flex gap-4'>
                    {/* <label className="form-control w-full ">
                        <div className="label">
                            <span  style={{ color: '#8d1b3d' }} className="label-text">Category</span>

                        </div>
                        <select defaultValue="default" {...register("category")}
                            style={{ borderColor: '#8d1b3d' }}
                            className="select select-bordered">
                            <option disabled  value="default">Select Category</option>
                            <option>Fruits</option>
                            <option>Vegetables</option>
                            <option>Bakery</option>
                            <option>Dairy</option>
                            <option>Beverages</option>
                            <option>Meat</option>
                        </select>

                    </label> */}

                    <div className="form-control w-full">
                        <div className="label flex justify-between items-center">
                            <span style={{ color: '#8d1b3d' }} className="label-text text-lg font-semibold">Category</span>
                            <button
                                type="button"
                                onClick={handleAddCategory}
                                style={{ borderColor: '#8d1b3d' }}
                                className="flex items-center space-x-2 bg-[#8d1b3d] text-white px-2 py-1 rounded-lg transition-all duration-300"
                            >
                                <span>New Category</span>
                                <GrAdd style={{ color: 'white' }} />
                            </button>
                        </div>

                        <select
                            defaultValue="default"
                            {...register("category")}
                            style={{ borderColor: '#8d1b3d' }}
                            className="select select-bordered w-full"
                        >
                            <option disabled value="default">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}

                            {newCategory && <option>{newCategory}</option>}
                        </select>

                        {isCategoryInputVisible && (
                            <div className="mt-4">
                                <input
                                    type="text"
                                    placeholder="New Category"
                                    value={newCategory}
                                    onChange={handleCategoryChange}
                                    className="input input-bordered w-full"
                                    style={{ borderColor: '#8d1b3d', color: '#8d1b3d' }}
                                />
                                <button
                                    type="button"
                                    onClick={handleAddNewCategory}
                                    className="mt-2 bg-[#8d1b3d] text-white p-2 rounded"
                                >
                                    Add Category
                                </button>
                            </div>
                        )}
                    </div>
                    <label className="form-control w-full ">
                        <div className="label">
                            <span style={{ color: '#8d1b3d' }} className="label-text">Price</span>


                        </div>
                        <input
                            {...register("price")}
                            type="Number"
                            placeholder="Type here"
                            style={{ borderColor: '#8d1b3d', color: '#8d1b3d' }}
                            className="input input-bordered w-full "
                        />

                    </label>
                </div>
                <label className="form-control w-full  ">
                    <div className="label">
                        <span style={{ color: '#8d1b3d' }} className="label-text ">Arabic Name</span>

                    </div>
                    <input
                        {...register("arbName")}
                        type="text"
                        placeholder="Arabic Name
                        "
                        style={{ borderColor: '#8d1b3d', color: '#8d1b3d' }}
                        className="input input-bordered w-full "
                        dir="rtl" />


                </label>
                <label className="form-control w-full my-4 ">
                    <div className="label">
                        <span style={{ color: '#8d1b3d' }} className="label-text ">Description</span>

                    </div>
                    <textarea
                        {...register("description")}
                        placeholder="Item Description"
                        style={{ borderColor: '#8d1b3d', color: '#8d1b3d' }}
                        className="textarea textarea-bordered textarea-lg w-full ">

                    </textarea>


                </label>
                <div>
                    <label className="form-control w-full my-4">
                        <div className="label">
                            <span style={{ color: '#8d1b3d' }} className="label-text">Upload Item Image</span>

                        </div>
                        <input type="file"
                            style={{ borderColor: '#8d1b3d' }}
                            {...register("image")}
                            className="file-input file-input-bordered w-full " />

                    </label>
                </div>

                <button style={{ borderColor: '#8d1b3d' }} className="bg-[#8d1b3d] p-2 text-white font-bold rounded">
                    ADD ITEM
                </button>
            </form>

        </div>
    );
};

export default AddItems;