import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaCartShopping, FaRegStar, FaTruck } from "react-icons/fa6";
import { TbLayoutGridAdd } from "react-icons/tb";
import { FaCarSide } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { PiUsersThreeFill } from "react-icons/pi";
import { FaListCheck } from "react-icons/fa6";
import { MdOutlineAddHome, MdOutlineManageAccounts } from "react-icons/md";
import { PiFlagBannerFoldDuotone } from "react-icons/pi";
import useCart from '../Hooks/useCart';
import useAdmin from './../Hooks/useAdmin';
import { LiaHistorySolid } from "react-icons/lia";
import { PiPaperPlaneRight } from "react-icons/pi";
const Dashboard = () => {
    const [cart] = useCart();
    const [isAdmin] = useAdmin();
    return (
        <div className='flex'>
            <div style={{ backgroundColor: '#8a1538', color: 'white' }} className='w-64 min-h-screen p-8 '>
                <ul className='menu'>
                    {
                        isAdmin ? <>

                            <li>
                                <NavLink to="/dashboard/adminHome">
                                    <IoHome />
                                    Admin Home
                                </NavLink>
                                <NavLink to="/dashboard/cart">
                                    <FaCartShopping />
                                    My Cart [+{cart.length}]
                                </NavLink>
                                <NavLink to="/">
                                    <IoHome />
                                    Home
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard/addItems">
                                    <TbLayoutGridAdd />
                                    Add Item
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/editItems">
                                    <MdOutlineManageAccounts />
                                    Manage Items
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/paymentOders">
                                <PiPaperPlaneRight/>
                                    Payment Oders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/users">
                                    <PiUsersThreeFill />
                                    All Uses
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/oders">
                                    <LiaHistorySolid />
                                    Oder History
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/drivers">
                                    <FaTruck/>
                                    Driver List
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/banner">
                                    <FaRegStar />
                                    Banner Option
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/information">
                                    <MdOutlineAddHome />
                                    Company Information
                                </NavLink>
                            </li>



                        </>
                            : <>
                                <li>
                                    <NavLink to="/dashboard/userHome">
                                        <IoHome />
                                        User Home
                                    </NavLink>
                                    <NavLink to="/dashboard/cart">
                                        <FaCartShopping />
                                        My Cart [+{cart.length}]
                                    </NavLink>
                                    <NavLink to="/">
                                        <IoHome />
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/oders">
                                        <LiaHistorySolid />
                                        Oder History
                                    </NavLink>
                                </li>
                                <li>

                                    <NavLink to="/dashboard/users">
                                        <PiUsersThreeFill />
                                        All Uses
                                    </NavLink>
                                </li>
                                    <li>

                                    <NavLink to="">
                                        <PiUsersThreeFill />
                                    Working test
                                    </NavLink>
                                </li>

                                {/* <li>

                                    <NavLink to="/dashboard/users">
                                        <PiUsersThreeFill />
                                      Create Admin
                                    </NavLink>
                                </li> */}

                            </>
                    }



                </ul>
            </div>
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default Dashboard;