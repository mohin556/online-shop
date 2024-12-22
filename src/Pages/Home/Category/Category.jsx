// import React, { useEffect, useState } from 'react';
// import Item from '../Item/Item';
// import useItem from '../../../Hooks/useItem';
// import { useNavigate, useParams } from 'react-router-dom';



// const Category = () => {
//     const [items] = useItem();
//     const navigate = useNavigate();
//     // const { category } = useParams();
//     // const [filteredItems, setFilteredItems] = useState([]);
//     // useEffect(() => {
//     //     if (category) {
//     //         setFilteredItems(items.filter(item => item.category === category));
//     //     } else {
//     //         setFilteredItems(items);
//     //     }
//     // }, [category, items]);

//     const handleImageClick = (id) => {
//         navigate(`/item/${id}`);
//     };



//     // const [selectedTab, setSelectedTab] = useState(0);

//     // const handleImageClick = (index) => {
//     //     setSelectedTab(index + 1); // Adjust index to match TabPanel position
//     // };

//     // const [items, setItems] = useState([]);
//     // console.log(items)

//     // useEffect(() => {
//     //     fetch('category.json')
//     //         .then(res => res.json())
//     //         .then(data => setItems(data.items));  
//     // }, []);

//     return (



//         <div className='grid md:grid-cols-5 sm:grid-cols-2 gap-2 space-y-4 p-5 space-x-4'>
//             {items.slice(0, 5).map((item) => (
//                 <div key={item._id} onClick={() => handleImageClick(item._id)}>
//                     <Item item={item} />
//                 </div>
//             ))}
//         </div>

//     );
// };

// export default Category;


// import React, { useEffect, useState } from 'react';
// import Item from '../Item/Item';
// import useItem from '../../../Hooks/useItem';
// import { useNavigate, useParams } from 'react-router-dom';
// import 'react-tabs/style/react-tabs.css';

// const Category = () => {
//     const [items] = useItem();
//     const navigate = useNavigate();
//     const { category } = useParams();
//     const [filteredItems, setFilteredItems] = useState([]);

//     useEffect(() => {
//         if (category) {
//             setFilteredItems(items.filter(item => item.category === category));
//         } else {
//             setFilteredItems(items);
//         }
//     }, [category, items]);

//     const handleImageClick = (id) => {
//         navigate(`/order/${category}/${id}`);
//     };

//     return (
//         <div className='grid md:grid-cols-5 sm:grid-cols-2 gap-2 space-y-4 p-5 space-x-4'>
//             {filteredItems.map((item) => (
//                 <div key={item._id} onClick={() => handleImageClick(item._id)}>
//                     <Item item={item} />
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Category;
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import Item from '../Item/Item';
// import useItem from '../../../Hooks/useItem';
// import 'react-tabs/style/react-tabs.css';

// const Category = () => {
//     const [items] = useItem();
//     const { category } = useParams()
//     const navigate = useNavigate(); 
//     const [filteredItems, setFilteredItems] = useState([]);

//     useEffect(() => {
//         // Get unique categories and limit to 5
//         const categories = Array.from(new Set(items.map(item => item.category))).slice(0, 5);

//         // Get one item per category
//         const categoryItems = categories.map(cat => {
//             return items.find(item => item.category === cat);
//         });

//         setFilteredItems(categoryItems);
//     }, [items]);

//     const handleCategoryClick = (category) => {
//         navigate(`/category/${category}`);
//     };

//     return (
//         <div className='grid md:grid-cols-5 sm:grid-cols-2 gap-2 space-y-4 p-5 space-x-4'>
//             {filteredItems.map((item) => (
//                 <div key={item._id} onClick={() => handleCategoryClick(item.category)}>
//                     <Item item={item} />
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Category;

// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import Item from '../Item/Item';
// import useItem from '../../../Hooks/useItem';
// import 'react-tabs/style/react-tabs.css';
// import { Helmet } from 'react-helmet-async';

// const Category = () => {
//     const [items] = useItem();
//     const navigate = useNavigate();
//     const [filteredItems, setFilteredItems] = useState([]);

//     useEffect(() => {
//         // Get unique categories and limit to 5
//         const categories = Array.from(new Set(items.map(item => item.category))).slice(0, 5);

//         // Get one item per category
//         const categoryItems = categories.map(cat => {
//             return items.find(item => item.category === cat);
//         });

//         setFilteredItems(categoryItems);
//     }, [items]);

//     const handleCategoryClick = (category) => {
//         navigate(`/category/${category}`);
//     };

//     return (
//         <div>
//             <Helmet>
//             <title>Online Shop | Category</title>
//             </Helmet>
//             <h1 style={{ color: '#8a1538' }}  className='font-extrabold text-center   my-4 '>RECOMMENDED FOR YOU</h1>
//             <div className='grid md:grid-cols-5 sm:grid-cols-2 gap-2 space-y-4 p-5 space-x-4'>

//                 {filteredItems.map((item) => (
//                     <div key={item.id} onClick={() => handleCategoryClick(item.category)}>
//                         <Item item={item} />
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Category;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useItem from '../../../Hooks/useItem'; // Make sure to update this path
import Item from '../Item/Item';


const Category = () => {
    const [items] = useItem();
    const navigate = useNavigate();
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        if (items) {
            // Get unique categories and limit to 5
            const categories = Array.from(new Set(items.map(item => item.category)));

            // Get one item per category
            const categoryItems = categories.map(cat => {
                return items.find(item => item.category === cat);
            });

            setFilteredItems(categoryItems);
        }
    }, [items]);

    const handleCategoryClick = (category) => {
        navigate(`/category/${category}`);
    };

    return (
        <div>

            <h1 style={{ color: '#8a1538' }} className='font-extrabold text-center my-4'>RECOMMENDED FOR YOU</h1>
            <div className='grid md:grid-cols-5 sm:grid-cols-2 gap-2 space-y-4 p-5 space-x-4'>
                {filteredItems.map((item) => (
                    <div key={item.id} onClick={() => handleCategoryClick(item.category)}>
                        <Item item={item} />
                    </div>
                ))}
            </div>
            {/* <h1 style={{ color: '#8a1538' }} className='font-extrabold text-center my-4'>
                RECOMMENDED FOR YOU
            </h1>
            <div className='flex overflow-x-auto space-x-4 p-5'>
                {filteredItems.map((item) => (
                    <div key={item.id} onClick={() => handleCategoryClick(item.category)}>
                        <Item item={item} />
                    </div>
                ))}
            </div> */}
        </div>
    );
};

export default Category;

