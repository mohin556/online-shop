// import React from 'react';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';


// const Login = () => {

//   const navigate = useNavigate();
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const form = event.target;
//         const name = form.name.value;
//         const contact = form.contact.value;
//         const location = form.location.value;
//         console.log(name, contact, location);

//         const user = { name, contact, location };

//         try {
//             const response = await fetch('http://localhost:5000/user', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(user),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to create user');
//             }

//             const result = await response.json();
//             if (response.status === 200) {
//                 Swal.fire({
//                     icon: 'info',
//                     title: 'User already exists',
//                     text: 'User already exists with the provided contact number.',
//                 });
//             } else if (response.status === 201) {
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'User created',
//                     text: 'User created successfully.',
//                 });
//                 navigate('/');
//             }
//             console.log('User created:', result);
//         } catch (error) {
//             console.error('Error:', error);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error',
//                 text: 'Failed to create user.',
//             });
//         }
//     };

//     return (
//         <div className="hero bg-base-200 min-h-screen">
//         <div className="hero-content flex-col lg:flex-row-reverse">
//           <div className="text-center lg:text-left">
//             <h1 className="text-5xl font-bold">Login now!</h1>
//             <p className="py-6">
//               Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
//               quasi. In deleniti eaque aut repudiandae et a id nisi.
//             </p>
//           </div>
//           <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
//             <form onSubmit={handleSubmit} className="card-body">
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text"> Name</span>
//                 </label>
//                 <input type="text" placeholder=" name" name='name' className="input input-bordered" required />
//               </div>
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text" >Contact Number</span>
//                 </label>
//                 <input type="number"  placeholder="Contact number" name='contact' className="input input-bordered" required />
//               </div>
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text"> Address</span>
//                 </label>
//                 <input type="text" placeholder="Location address" name='location' className="input input-bordered" required />
//               </div>
//               <div className="form-control mt-6">

//                 <input className="btn btn-primary"  type="submit" value="Login" />
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//     );
// };

// export default Login;

// import React, { useState } from 'react';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [user, setUser] = useState(null);
//  console.log(user)
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const form = event.target;
//     const name = form.name.value;
//     const contact = form.contact.value;

//     const userData = { name, contact };

//     try {
//       const response = await fetch('http://localhost:5000/user', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create user');
//       }

//       const result = await response.json();

//       if (response.status === 200) {
//         Swal.fire({
//           icon: 'info',
//           title: 'User already exists',
//           text: 'User already exists with the provided contact number.',
//         });
//         setUser(result); // Store the existing user data
//       } else if (response.status === 201) {
//         Swal.fire({
//           icon: 'success',
//           title: 'User created',
//           text: 'User created successfully.',
//         });
//         setUser(result); // Store the newly created user data
//       }

//       // Store user data in localStorage or state
//       localStorage.setItem('user', JSON.stringify(result));
//       navigate('/'); // Redirect after successful login/registration
//     } catch (error) {
//       console.error('Error:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to create user.',
//       });
//     }
//   };

//   return (
//     <div className="hero bg-base-200 min-h-screen">
//       <div className="hero-content flex-col lg:flex-row-reverse">
//         <div className="text-center lg:text-left">
//           <h1 className="text-5xl font-bold">Login now!</h1>
//           <p className="py-6">
//             Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
//           </p>
//         </div>
//         <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
//           <form onSubmit={handleSubmit} className="card-body">
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Name</span>
//               </label>
//               <input type="text" placeholder="Name" name="name" className="input input-bordered" required />
//             </div>
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Contact Number</span>
//               </label>
//               <input type="number" placeholder="Contact number" name="contact" className="input input-bordered" required />
//             </div>
//             <div className="form-control mt-6">
//               <input className="btn btn-primary" type="submit" value="Login" />
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import loginImg from '../../assets/images/logins.jpg';
import { toast } from "react-toastify";

const Login = () => {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  console.log('login state from here', location.state);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const form = event.target;
  //   const name = form.name.value;
  //   const contact = form.contact.value;
  //   const location = form.location.value;

  //   const userData = { name, contact, location };

  //   try {
  //     const response = await fetch('http://localhost:5000/user', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(userData),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to create user');
  //     }

  //     const result = await response.json();

  //     if (response.status === 200) {
  //       Swal.fire({
  //         icon: 'info',
  //         title: 'User already exists',
  //         text: 'User already exists with the provided contact number.',
  //       });
  //     } else if (response.status === 201) {
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'User created',
  //         text: 'User created successfully.',
  //       });
  //     }

  //     // Store user data in localStorage
  //     localStorage.setItem('contact', JSON.stringify(contact));
  //     setUser(result);
  //     navigate('/user');
  //   } catch (error) {
  //     console.error('Error:', error);
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Error',
  //       text: 'Failed to create user.',
  //     });
  //   }
  //   navigate(from, { replace: true });
  // };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const contact = form.contact.value;
    const location = form.location.value;

    const userData = { name, contact, location };

    try {
        const response = await fetch('http://localhost:5000/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Failed to create user');
        }

        const result = await response.json();

        if (response.status === 200) {
            toast.info("User already exists with the provided contact number.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
        } else if (response.status === 201) {
            toast.success("Welcome back! You have successfully logged in.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
        }

        // Store user data in localStorage
        localStorage.setItem('contact', JSON.stringify(contact));
        setUser(result);
        navigate('/user');
    } catch (error) {
        console.error('Error:', error);
        toast.error("Failed to create user.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
        });
    }
    navigate(from, { replace: true });
};
  return (
    <div className="hero bg-base-200 min-h-screen">
      
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="w-full lg:w-1/2">
    
          <img className="mx-auto lg:mx-0 w-full h-auto object-cover " src={loginImg} alt="Login illustration" />
        </div>

        <div className="card bg-base-100 w-full max-w-sm lg:w-1/2 shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span
                  className="label-text font-semibold"
                  style={{ color: '#8a1538' }}
                >
                  Name
                </span>
              </label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                className="input input-bordered"
                required
                style={{ borderColor: '#8a1538', color: '#8a1538' }}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span style={{ color: '#8a1538' }} className="label-text font-semibold">Contact Number</span>
              </label>
              <input type="number" placeholder="Contact number" name="contact" className="input input-bordered" style={{ borderColor: '#8a1538', color: '#8a1538' }} required />
            </div>
            <div className="form-control">
              <label className="label">
                <span style={{ color: '#8a1538' }} className="label-text font-semibold">Location</span>
              </label>
              <textarea
                name="location"
                placeholder="Exact Location"
                className="textarea textarea-bordered"
                style={{ borderColor: '#8a1538', color: '#8a1538' }}
                required
              ></textarea>
            </div>

            <div className="form-control mt-6">
              <input
                className="btn"
                type="submit"
                value="Login"
                style={{ backgroundColor: '#8a1538', color: 'white' }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
