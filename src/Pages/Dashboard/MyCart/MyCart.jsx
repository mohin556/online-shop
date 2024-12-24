import React from 'react';
import useCart from '../../../Hooks/useCart';
import CartDetails from './CartDetails';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useUser from '../../../Hooks/useUser';
import { toast } from 'react-toastify';

const MyCart = () => {
    const [cart,refetch] = useCart();
    const {user} = useUser();
    const navigate = useNavigate();
    
    const axiosSecure = useAxiosSecure();
    const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price), 0);
   
    // const handleProced = async (cart) => {
        
    //     const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price), 0);
      
    //     const Oder = {
    //       name: user.name,
    //       location:user.location,
    //       contact: user.contact,
    //       price: totalPrice,
    //       date: new Date(),
    //       cardIds: cart.map(item => item._id),
    //       status: 'pending',
    //     };
      
    //     try {
    //       const res = await axiosSecure.post('/oderConfirm', Oder);
    //       console.log('confirmOder', res.data);
    //       refetch();
      
    //       if (res.data.insertedId) {
    //         Swal.fire({
    //           position: "top-end",
    //           icon: "success",
    //           title: "Your order has been confirmed",
    //           showConfirmButton: false,
    //           timer: 1500,
    //         }); 
    //         navigate('/dashboard/oderConfirm')
    //       }
    //     } catch (error) {
    //       console.error("Error confirming order:", error);
    //       Swal.fire({
    //         icon: "error",
    //         title: "Oops...",
    //         text: "Something went wrong! Please try again later.",
    //       });
    //     }
    //   };
    
    // const handleProced = async (cart) => {
    //     const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price), 0);
      
    //     const Oder = {
    //       name: user.name,
    //       location: user.location,
    //       contact: user.contact,
    //       price: totalPrice,
    //       date: new Date(),
    //       cardIds: cart.map(item => item._id),
    //       itemIds: cart.map(item => item.itemId),
    //       status: 'pending',
    //     };
      
    //     try {
    //       const res = await axiosSecure.post('/oderConfirm', Oder);
       
    //       refetch();
      
    //       if (res.data?.oderResult?.insertedId) {

    //         await Swal.fire({
    //           position: "top-end",
    //           icon: "success",
    //           title: "Your order has been confirmed",
    //           showConfirmButton: false,
    //           timer: 1500,
    //         });
    //         // navigate('/dashboard/oderConfirm');
    //           navigate('/dashboard/oders');
    //       }
    //     } catch (error) {
    //       console.error("Error confirming order:", error);
    //       Swal.fire({
    //         icon: "error",
    //         title: "Oops...",
    //         text: "Something went wrong! Please try again later.",
    //       });
    //     }
    //   };
      
    const handleProced = async (cart) => {
      const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price), 0);
  
      const Oder = {
          name: user.name,
          location: user.location,
          contact: user.contact,
          price: totalPrice,
          date: new Date(),
          cardIds: cart.map(item => item._id),
          itemIds: cart.map(item => item.itemId),
          status: 'pending',
      };
  
      try {
          const res = await axiosSecure.post('/oderConfirm', Oder);
  
          refetch();
  
          if (res.data?.oderResult?.insertedId) {
              toast.success("Order is confirmed and will be processed shortly.", {
                  position: "top-right",
                  autoClose: 1500,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  theme: "colored",
              });
  
              // Navigate to orders page after confirmation
              navigate('/dashboard/oders');
          }
      } catch (error) {
          console.error('Error:', error);
  
          toast.error("Failed to confirm your order. Please try again.", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
          });
      }
  };
    return (
      <div className="p-4">
      <div className="bg-white shadow-md rounded-lg p-4 max-w-3xl mx-auto mb-4">
        <div className="flex justify-between items-center">
          <h2 style={{ color: '#8a1538' }} className="text-xl font-bold">MY CART</h2>
          {cart.length > 0 && (
            <button onClick={() => handleProced(cart)} className="bg-[#8d1b3d] p-2 text-white font-bold rounded">
              PROCEED
            </button>
          )}
        </div>
      </div>
      
      {cart.length > 0 ? (
        <div className="bg-white shadow-md rounded-lg p-4 max-w-3xl mx-auto">
          <h1 style={{ color: '#8a1538' }} className="text-lg p-2 font-bold mb-4">Total Items: {cart.length}</h1>
          <h1 style={{ backgroundColor: '#8a1538', color: 'white' }} className="text-lg p-2 font-bold mb-4">Total Price: {totalPrice.toFixed(2)} QAR</h1>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  {/* <th>#</th> 
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th> */}
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <CartDetails key={item._id} cart={item} index={index + 1} /> 
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-4 max-w-3xl mx-auto text-center">
          <h1 style={{ color: '#8a1538' }} className="text-lg font-bold mb-4">Your cart is empty</h1>
          <p style={{ color: '#8a1538' }} className="text-md">Choose some items and come back to shop!</p>
        </div>
      )}
    </div>
    
    );
};

export default MyCart;
