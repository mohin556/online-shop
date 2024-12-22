import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useUser from './useUser';

const useCart = () => {
    // tan stack query 

    const axiosSecure =  useAxiosSecure();
    const {user} = useUser();
    const {refetch,data: cart = []} = useQuery({
        queryKey : ['cart', user?.contact],
        queryFn: async() =>{

            const res = await axiosSecure.get(`/carts?contact=${user.contact}`)
            return res.data;
        }
    })     
    return [cart,refetch]
      
};

export default useCart;