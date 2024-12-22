

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Card from '../Card/Card';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ItemDetails = () => {
    const { category } = useParams();
    const axiosSecure = useAxiosSecure();
    // const [items, setItems] = useState([]);

    


    const { data: items = [], isLoading, error } = useQuery({
        queryKey: ['items'],
        queryFn: async () => {
            const res = await axiosSecure.get('/items');
            return res.data;
        },
    });

    const [filteredItems, setFilteredItems] = useState([]);

    // Filtering items based on the category
    useEffect(() => {
        if (items.length > 0) {
            const filtered = items.filter(item => item.category.toLowerCase() === category.toLowerCase());
            setFilteredItems(filtered);
        }
    }, [category, items]);
 
        // Handling loading and error states
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching data: {error.message}</div>;
    }


    // useEffect(() => {
    //     fetch('/category.json')
    //         .then(res => {
    //             return res.json();
    //         })
    //         .then(data => {
    //             setItems(data);
    //             const filtered = data.filter(item => item.category.toLowerCase() === category.toLowerCase());
    //             setFilteredItems(filtered);
    //         })
    //         .catch(error => console.error('Error fetching data:', error));
    // }, [category]);

//     return (
//         <div>
//             <h1 style={{ color: '#8a1538' }} className="font-extrabold">{category} Items {category.length} </h1>
//             <div className='grid md:grid-cols-5 sm:grid-cols-2 gap-2 space-y-4 p-5 space-x-4'>
//                 {filteredItems.map(item => (
//                     <div key={item.id}>
//                         <Card item={item} />
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ItemDetails;


return (
    <div>
        <h1 style={{ color: '#8a1538' }} className="font-extrabold">
            {category} Items ({filteredItems.length})
        </h1>
        <div className='grid md:grid-cols-5 sm:grid-cols-2 gap-2 space-y-4 p-5 space-x-4'>
            {filteredItems.map(item => (
                <div key={item.id}>
                    <Card item={item} />
                </div>
            ))}
        </div>
    </div>
);
};

export default ItemDetails;

// const axiosSecure = useAxiosSecure();
   
// const {data: users=[] } = useQuery({
//     queryKey: ['items'],
//     queryFn: async ()=> {
//         const res = await axiosSecure.get('/items');
//         return res.data
//     }
// })