import React, { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai'; // Import the star icon

const PopularItems = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const url = 'popular.json';
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
            });
    }, []);

    return (
        <div className="p-4 my-8">
            <h1 className="text-2xl font-bold text-center mb-6">Popular Items</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 place-items-center'>
                {
                    items
                        .filter((item) => item.type === "popular") 
                        .slice(0, 6) // Limit to 6 items
                        .map((item) => (
                            <div
                                key={item.id}
                                className="rounded-2xl bg-white dark:bg-gray-800 relative shadow-xl duration-300 group max-w-[300px] overflow-hidden"
                            >
                                <div className="h-48 w-full overflow-hidden rounded-t-2xl">
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="object-cover h-full w-full" // Ensures images cover the div fully
                                    />
                                </div>
                                <div className="p-4 group-hover:bg-black/70 dark:group-hover:bg-gray-700 rounded-b-2xl transition-colors duration-300">
                                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{item.name}</h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.category}</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">{item.price} QAR</p>
                                    
                                    {/* Star Rating */}
                                    <div className="flex items-center mt-2">
                                        {[...Array(5)].map((_, index) => (
                                            <AiFillStar 
                                                key={index} 
                                                className={`text-yellow-500 ${index < item.rating ? 'text-yellow-500' : 'text-gray-300'}`} 
                                            />
                                        ))}
                                    </div>
                                    
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{item.description}</p>
                                </div>
                            </div>
                        ))
                }
            </div>
        </div>
    );
};

export default PopularItems;
