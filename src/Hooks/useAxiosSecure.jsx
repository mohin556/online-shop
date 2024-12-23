
import React from 'react';
import axios from 'axios';




 export const axiosSecure = axios.create({
    baseURL: 'https://shop-server-pi.vercel.app'
 })
const useAxiosSecure = () => {
    

    return axiosSecure;
};

export default useAxiosSecure;