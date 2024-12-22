import React from 'react';
import useAxiosSecure, { axiosSecure } from './../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaTruck } from "react-icons/fa";
import { PiBriefcaseMetalFill } from "react-icons/pi";
import { FaUsers } from "react-icons/fa6";
import { MdAttachMoney } from "react-icons/md";
import useUser from './../../../Hooks/useUser';
import useAdmin from './../../../Hooks/useAdmin';

const AdminHome = () => {
  const { user } = useUser();
  console.log(user)
  const [isAdmin] = useAdmin();
  const axiosSecure = useAxiosSecure();

  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin-stats');
      return res.data;
    }
  })



  return (
    <div>
  <h1>Hi, {isAdmin ? user?.name : "Back"}</h1>
  <div className="stats shadow flex flex-col md:flex-row justify-center gap-4 mx-auto">
    <div className="stat">
      <div className="stat-figure text-secondary">
        <MdAttachMoney className='text-3xl'></MdAttachMoney>
      </div>
      <div className="stat-title">Revenue</div>
      <div className="stat-value">{stats?.revenue} <p className="text-sm inline">QAR</p></div>
      <div className="stat-desc">Jan 1st - Feb 1st</div>
    </div>

    <div className="stat">
      <div className="stat-figure text-secondary">
        <FaUsers className='text-3xl'></FaUsers>
      </div>
      <div className="stat-title">USERS</div>
      <div className="stat-value">{stats?.users}</div>
    </div>

    <div className="stat">
      <div style={{color: '#8E1352'}} className="stat-figure">
        <PiBriefcaseMetalFill className='text-3xl'></PiBriefcaseMetalFill>
      </div>
      <div className="stat-title">ITEMS</div>
      <div className="stat-value">{stats?.items}</div>
      <div className="stat-desc">↘︎ 90 (14%)</div>
    </div>

    <div className="stat">
      <div style={{color: '#8E1352'}} className="stat-figure">
        <FaTruck className='text-3xl'></FaTruck>
      </div>
      <div className="stat-title">ODERS</div>
      <div className="stat-value">{stats?.oders}</div>
      <div className="stat-desc">↘︎ 90 (14%)</div>
    </div>
  </div>
</div>

  );
};

export default AdminHome;