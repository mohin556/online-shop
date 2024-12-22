import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import UserDetails from './UserDetails/UserDetails';


const Users = () => {
    
    const axiosSecure = useAxiosSecure();
   
    const {data: users=[] } = useQuery({
        queryKey: ['users'],
        queryFn: async ()=> {
            const res = await axiosSecure.get('/users');
            return res.data
        }
    })


    return (
      <div className="flex justify-center items-center min-h-screen bg-white w-full">
      <div className="p-4 w-full max-w-7xl">
        <div className="bg-white shadow-md rounded-lg p-4 w-full flex">
          <h1 style={{ color: '#8a1538' }} className="text-lg p-2 font-bold mb-4">
            Total User: {users.length}
          </h1>
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name <br />phone</th>
                  <th>Location</th>
                  <th>Role</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <UserDetails key={user._id} user={user} index={index + 1}></UserDetails>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    
    
    );
};

export default Users;