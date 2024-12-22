import React from 'react';
import { useLoaderData } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const image_Hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const image_Hosting_api= `https://api.imgbb.com/1/upload?key=${image_Hosting_key}`; 

const UpdateItem = () => {
    const {category,name,price,description,image,arbName,_id} = useLoaderData();


    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit,reset } = useForm()
    const onSubmit = async(data) => {
        console.log(data)
        const imageFile = {image: data.image[0]}
        const res = await axiosSecure.post(image_Hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        console.log(res.data);
         if(res.data.success) {
            const Items ={
                name: data.name,
                image: res.data.data.display_url,
                description: data.description,
                category: data.category,
                price: parseFloat(data.price),
                arbName: data.arbName,
                
               
            }
            const itemRes = await axiosSecure.patch(`/items/${_id}`, Items);
            console.log(itemRes.data)
            if(itemRes.data.modifiedCount > 0){
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${name} has been Updated`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
    }
    return (
        <div style={{ color: '#8d1b3d' }} className='p-5 font-bold'>
            <h1 className='text-center font-bold'>UPDATE AN ITEM</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="form-control w-full my-2 ">
                    <div className="label">
                        <span style={{ color: '#8d1b3d' }} className="label-text  ">Item Name</span>

                    </div>
                    <input
                        {...register("name")}
                        type="text"
                        defaultValue={name}
                        placeholder="Item Name"
                        className="input input-bordered w-full"
                        style={{ borderColor: '#8d1b3d', color: '#8d1b3d' }}
                    />

                </label>
                {/* <input {...register("firstName")} /> */}
                <div className='flex gap-4'>
                    <label className="form-control w-full ">
                        <div className="label">
                            <span  style={{ color: '#8d1b3d' }} className="label-text">Category</span>

                        </div>
                        <select defaultValue={category} {...register("category")}
                            style={{ borderColor: '#8d1b3d' }}
                            className="select select-bordered">
                            <option disabled value="default">Select Category</option>
                            <option>Fruits</option>
                            <option>Vegetables</option>
                            <option>Bakery</option>
                            <option>Dairy</option>
                            <option>Beverages</option>
                        </select>

                    </label>
                    <label className="form-control w-full ">
                        <div className="label">
                            <span style={{ color: '#8d1b3d' }} className="label-text">Price</span>


                        </div>
                        <input
                            {...register("price")}
                            defaultValue={price}
                            type="Number"
                            placeholder="Type here"
                            style={{ borderColor: '#8d1b3d',color: '#8d1b3d' }}
                            className="input input-bordered w-full "
                        />

                    </label>
                </div>
                <label className="form-control w-full  ">
                    <div className="label">
                        <span  style={{ color: '#8d1b3d' }} className="label-text ">Arabic Name</span>

                    </div>
                    <input
                        {...register("arbName")}
                        type="text"
                        defaultValue={arbName}
                        placeholder="Arabic Name
                        "
                        style={{ borderColor: '#8d1b3d',color: '#8d1b3d' }}
                        className="input input-bordered w-full " />

                </label>
                <label className="form-control w-full my-4 ">
                    <div className="label">
                        <span style={{ color: '#8d1b3d' }} className="label-text ">Description</span>

                    </div>
                    <textarea
                        {...register("description")}
                        defaultValue={description}
                        placeholder="Item Description"
                        style={{ borderColor: '#8d1b3d',color: '#8d1b3d' }}
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
                    UPDATE 
                </button>
            </form>

        </div>
    );
};

export default UpdateItem;