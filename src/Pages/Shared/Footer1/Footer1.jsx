import React from 'react';
import footer from '../../../assets/images/qtr.jpg';
import { useQuery } from '@tanstack/react-query';

const Footer1 = () => {
    const FooterImage = {
        backgroundImage: footer ? `url(${footer})` : 'none',
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100%",
        width: "100%",
    };
    const { data: informations = [] } = useQuery({
        queryKey: ['informations'],
        queryFn: async () => {
            const res = await axiosSecure.get('/informations');
            return res.data;
        }
    });

    const info = informations[0];
    return (
        <div style={FooterImage} className='text-white mb-20'>
            <div className='container'>
                <div className='grid md:grid-cols-3 pt-44 '>
                    {/* {Company details} */}
                    <div className='py-8 px-4'>
                       
                        <h1 className='sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3'>
                        <img src={info?.logoImage} alt="Logo" className='max-w-[100px]' />
                            OnlineShop
                        </h1>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto sapiente nihil distinctio, tenetur consequatur ipsam dolore iste nulla quis minus neque praesentium  sint expedita vel.</p>
                    </div>

                    {/* {Company Links} */}
                </div>
            </div>
        </div>
    );
};

export default Footer1;
