import React, { useState } from 'react';
import useUser from '../../Hooks/useUser';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useCart from '../../Hooks/useCart';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Card = ({ item }) => {
    const { name, image, description, _id, price, arbName } = item;
    const { user } = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();

    const { data: informations = [] } = useQuery({
        queryKey: ['informations'],
        queryFn: async () => {
            const res = await axiosSecure.get('/informations');
            return res.data;
        }
    });

    const info = informations[0];

    // State to track if the item is added to the cart and quantity
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [quantity, setQuantity] = useState(1);

    // Handle adding to cart
    const handleAddToCart = () => {
        if (user && user.contact) {
            const cartItem = {
                itemId: _id,
                contact: user.contact,
                userName: user.name,
                name,
                image,
                price,
                quantity
            };
            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    if (res.data.insertedId || res.data.updated) {
                        toast.success(`${name} added successfully`, {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        setIsAddedToCart(true);
                    }
                    refetch();
                })
                .catch(error => {
                    toast.error("Error adding item to cart", {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                });
        } else {
            toast.warn("Please Login First", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate('/login', { state: { from: location } });
        }
    };

    // Handle quantity increase (adds to cart)
    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
        handleAddToCart(); // Call handleAddToCart when increasing quantity
    };

    // Handle quantity decrease (remove from cart if necessary)
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
            // Decrease item quantity in the cart
            updateCartItem(quantity - 1);
        } else if (quantity === 1) {
            // If quantity is 1, remove the item from the cart
            removeFromCart();
            setIsAddedToCart(false); // Reset the button to "Add to Cart"
        }
    };

    // Update cart item quantity
    const updateCartItem = (newQuantity) => {
        if (user && user.contact) {
            const cartItem = {
                itemId: _id,
                contact: user.contact,
                quantity: newQuantity,
            };
            axiosSecure.patch(`/carts/${_id}`, cartItem)
                .then(res => {
                    if (res.data.modifiedCount) {
                        toast.success(`Quantity updated to ${newQuantity}`, {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                    refetch();
                })
                .catch(error => {
                    toast.error("Error updating cart", {
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

    // Remove item from cart
    const removeFromCart = () => {
        if (user && user.contact) {
            axiosSecure.delete(`/carts/${_id}?contact=${user.contact}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        toast.success(`${name} removed from cart`, {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        setIsAddedToCart(false); // Reset state after item is removed
                    } else {
                        toast.error("Cart item not found", {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                    refetch(); // Refetch cart data after deletion
                })
                .catch(error => {
                    toast.error("Error removing item from cart", {
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
        <div>
            <div className="card bg-base-100 w-45 shadow-xl transition-transform transform hover:scale-105">
                <figure>
                    <img
                        src={image}
                        alt={name} />
                </figure>
                <div className="card-body">
                    <h2 style={{ color: '#8a1538' }} className="card-title">{name}</h2>
                    <h2 className='font-medium'>مرحبا بكم</h2>
                    <p>{description}</p>
                    <p style={{ color: '#8a1538' }} className='font-bold text-2xl'>{arbName}</p>
                    <h2 style={{ color: '#8a1538' }} className='font-bold'>{info?.currency} {price} {info?.currency === 'USD' ? '$' : info?.currency === 'QAR' ? 'QR' : ''}</h2>

                    <div className="card-actions justify-end">
                        {isAddedToCart ? (
                            // If the item is added, show the quantity input with + and - buttons
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={decreaseQuantity}
                                    className="px-2 py-1 bg-[#8a1538] text-white rounded-l"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    value={quantity}
                                    readOnly
                                    className="w-12 text-center border border-gray-300"
                                />
                                <button
                                    onClick={increaseQuantity}
                                    className="px-2 py-1 bg-[#8a1538] text-white rounded-r"
                                >
                                    +
                                </button>
                            </div>
                        ) : (
                            // Show "Add to Cart" button if the item is not yet added
                            <button onClick={handleAddToCart} style={{ backgroundColor: '#8a1538', color: 'white' }} className="btn">
                                Add to Cart
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
