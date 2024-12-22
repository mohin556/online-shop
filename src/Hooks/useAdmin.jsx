import React from 'react';
import useUser from './useUser';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {
    const  { user } = useUser();
    const axiosSecure = useAxiosSecure();
    const { data: isAdmin } = useQuery({
        queryKey: [ user?.contact, 'isAdmin'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users/admin/${user?.contact}`);
         
            return res.data?.admin;
        }
    })
    return [isAdmin]
   
};

export default useAdmin;