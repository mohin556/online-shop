import React from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import useAxiosSecure from './../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useCart from '../../../Hooks/useCart';
// import useCart from '../../../Hooks/useCart';


const CartDetails = ({ cart, index }) => {

    const { _id, name, price, image } = cart;
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();

    const handleDelete = (id) => {
        if (window.confirm(`Are you sure? want to delete ${name}!`)) {
            axiosSecure.delete(`/carts/${id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        toast.success("Your item has been deleted.", {
                            position: "top-end",
                            autoClose: 1500,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                })
                .catch(error => {
                    toast.error("An error occurred while deleting the item.", {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                });
        }
    };

    return (
        <tr>
            <td style={{ color: '#8a1538' }} className='font-bold'>{index}</td>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img src={image} alt={name} />
                        </div>
                    </div>
                    <div>
                        <div style={{ color: '#8a1538' }} className="font-bold">{name}</div>
                        <div className="text-sm opacity-50 font-bold">{price} QAR</div>
                    </div>
                </div>
            </td>
            <td>1</td> {/* Assuming quantity is 1, adjust accordingly */}
            <td className='font-bold'>{price} <span style={{ color: '#8a1538' }}>QAR</span></td>
            <td>
                <button onClick={() => handleDelete(_id)} style={{ backgroundColor: '#8a1538', color: 'white' }} className="flex items-center px-3 py-1.5  font-bold text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-200">
                    <RiDeleteBin6Line className="mr-1.5 " />
                    Remove
                </button>
            </td>
        </tr>
    );
};

export default CartDetails;
