// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaCartShopping } from "react-icons/fa6";
// import useUser from '../../../Hooks/useUser';


// const Navbar = () => {

//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const { user } = useUser();
//   const navigate = useNavigate();
//   // useEffect(() => {
//   //   const loggedInStatus = localStorage.getItem('isLoggedIn');
//   //   if (loggedInStatus === 'true') {
//   //     setIsLoggedIn(true);
//   //   }
//   // }, []);

//   const handleLogout = () => {
//     // Clear user data from state and localStorage
//     setUser(null);
//     localStorage.removeItem('user');
//     localStorage.removeItem('contact');

//     // Redirect to the login page
//     navigate('/login');
//   };


//   return (
//     <div>
//       <div className="navbar" style={{ backgroundColor: '#8a1538', color: 'white' }}>

//         <div className="navbar-start">
//           <div className="dropdown">
//             <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h8m-8 6h16" />
//               </svg>
//             </div>
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
//               <li><Link to='/item'> Oder</Link></li>
//               <li>
//                 <a>Items </a>
//                 <ul className="p-2">
//                   <li><a>Submenu 1</a></li>
//                   <li><a>Submenu 2</a></li>
//                 </ul>
//               </li>

//             </ul>
//           </div>
//           <Link className="btn btn-ghost text-xl" to="/">Online Shop</Link>
//         </div>
//         <div className="navbar-center hidden lg:flex">
//           <ul className="menu menu-horizontal px-1">
//             <li><Link to='/item/:id'> Oder</Link></li>
//             <li><Link to='/category'> Category</Link></li>
//             <li><Link to='/user'> Oder</Link></li>
//             <li>
//               <details>
//                 <summary>Items Name</summary>
//                 <ul className="p-2">
//                   <li><a>Submenu 1</a></li>
//                   <li><a>Submenu 2</a></li>
//                 </ul>
//               </details>
//             </li>
//             <li><Link>

//               <button className="btn">
//                 <FaCartShopping className='mr-2 text-xl' />
//                 <div className="badge badge-secondary">+0</div>
//               </button></Link></li>
//           </ul>
//         </div>
//         {/* <div className="navbar-end">

//     <Link className="btn " to="/login">Login</Link>
//   </div> */}
//         <div className="navbar-end">
//           {!user ? (
//             <Link className="btn" to="/login">Login</Link>
//           ) : (
//             <button className="btn" onClick={handleLogout}>LogOut</button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaCartShopping } from "react-icons/fa6";
// import useUser from '../../../Hooks/useUser';
// import useCart from '../../../Hooks/useCart';

// const Navbar = () => {
//   const { user, setUser } = useUser(); // Extract setUser from useUser hook
//   const navigate = useNavigate();
//   const [cart] = useCart();

//   const handleLogout = () => {
//     // Clear user data from state and localStorage
//     setUser(null); // Properly update the user state
//     localStorage.removeItem('user');
//     localStorage.removeItem('contact');

//     // Redirect to the login page
//     navigate('/');
//   };

//   return (
//     <div>
//       <div className="navbar" style={{ backgroundColor: '#8E1352', color: 'white' }}>

//         <div className="navbar-start">
//           <div className="dropdown">
//             <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h8m-8 6h16" />
//               </svg>
//             </div>
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
//               <li><Link to='/item'> Order</Link></li>
//               <li>
//                 <a>Items </a>
//                 <ul className="p-2">
//                   <li><a>Submenu 1</a></li>
//                   <li><a>Submenu 2</a></li>
//                 </ul>
//               </li>
//             </ul>
//           </div>
//           <Link className="btn btn-ghost " to="/">Online Shop</Link>
//         </div>
//         <div className="navbar-center hidden lg:flex">
//           <ul className="menu menu-horizontal px-1">
//             <li><Link to='/item/:id'> Order</Link></li>
//             <li><Link to='/category'> Category</Link></li>
//             <li><Link to='/user'> User</Link></li>

//             <li>
//               <details>
//                 <summary>Items Name</summary>
//                 <ul className="p-2">
//                   <li><a>Submenu 1</a></li>
//                   <li><a>Submenu 2</a></li>
//                 </ul>
//               </details>
//             </li>
//             <li><Link to='/dashboard/cart'>
//               <button className="btn">
//                 <FaCartShopping className='mr-2 ' />
//                 <div className="badge badge-secondary">+{cart.length}</div>
//               </button></Link></li>
//           </ul>
//         </div>
//         <div className="navbar-end">
//           {!user ? (
//             <Link className="btn" to="/login">Login</Link>
//           ) : (
//             <button className="btn" onClick={handleLogout}>LogOut</button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import useUser from '../../../Hooks/useUser';
import useCart from '../../../Hooks/useCart';
import useAdmin from '../../../Hooks/useAdmin';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Navbar = () => {
  const { user, setUser } = useUser();
  const [isAdmin] = useAdmin();
  const navigate = useNavigate();
  const [cart] = useCart();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('contact');
    navigate('/');
  };

  const axiosSecure = useAxiosSecure();
  const { data: informations = [] } = useQuery({
      queryKey: ['informations'],
      queryFn: async () => {
          const res = await axiosSecure.get('/informations');
          return res.data;
      }
  });

  const info = informations[0];



  return (
    <div className="navbar bg-[#8E1352] text-white p-2">
      <div className="navbar-start">
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost btn-sm lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </button>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><Link to='/item'>Order</Link></li>
            <li>
              <a>Items</a>
              <ul className="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </li>
          </ul>
        </div>
        <Link className="btn btn-ghost text-lg flex items-center" to="/">
        <Link className="btn btn-ghost text-lg flex items-center" to="/">
    <img src={info?.logoImage} alt="Logo" className="w-8 h-auto md:w-28 lg:w-40 rounded-md mr-2" />
  
</Link>
      
</Link>

      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to='/dashboard/oders'>Order</Link></li>
          <li><Link to='/category'>Category</Link></li>
          <li><Link to='/user'>User</Link></li>
          {
            user && isAdmin && <li><Link to='/dashboard/adminHome'>DashBoard</Link></li>
          }
          {
            user && !isAdmin && <li><Link to='/dashboard/userHome'>DashBoard</Link></li>
          }

          <li>
            <details>
              <summary>Items Name</summary>
              <ul className="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </details>
          </li>
          <li>
            <Link to='/dashboard/cart'>
              <button className="btn btn-sm">
                <FaCartShopping className='mr-1' />
                <div className="badge badge-secondary">+{cart.length}</div>
              </button>
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        {!user ? (
          <Link className="btn btn-sm" to="/login">Login</Link>
        ) : (
          <button className="btn btn-sm" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;

