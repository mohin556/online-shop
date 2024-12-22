import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import useAxiosSecure, { axiosSecure } from './../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Banner = () => {
    const axiosSecure = useAxiosSecure();

    const { data: banners = [] } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const res = await axiosSecure.get('/banners'); 
            return res.data;
        }
    });

    return (
   
        <div style={{ overflow: 'hidden', position: 'relative' }}>
        <Carousel>
            {banners.map((banner, index) => (
                <div key={index} style={{ width: '100%', height: '550px' }}> 
                    <img
                        src={banner.image}
                        alt={`slide${index + 1}`}
                        style={{
                            width: '100%',
                            height: '100%', 
                            objectFit: 'cover', 
                        }}
                    />
                </div>
            ))}
        </Carousel>
    </div>
    );
};

export default Banner;
