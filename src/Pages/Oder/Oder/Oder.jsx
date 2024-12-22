// import React, { useEffect, useState } from 'react';

// mport { useParams } from 'react-router-dom';
// import useItem from '../../../Hooks/useItem';


// const Oder = () => {
//     const [items] = useItem();
//     const { id } = useParams();

//     const [item, setItem] = useState(null);

//     useEffect(() => {
//         const selectedItem = items.find(item => item._id === id);
//         setItem(selectedItem);
//     }, [id, items]);
//     // const item = items.find((item) => item._id === id);


//     if (!item) {
//         return <div>Item not found</div>;
//     }
//     return (
//         <div>
//         <h2>Order Only</h2>
//         <div className='item-details'>
//             <img src={item.image} alt={item.name} />
//             <h1>{item.name}</h1>
//             <p>{item.description}</p>
//         </div>
//     </div>
//     );
// };

// export default Oder;
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import useItem from '../../../Hooks/useItem';

// const Oder = () => {
//     const [items] = useItem();
//     const { id } = useParams();
//     const [item, setItem] = useState(null);

//     useEffect(() => {
//         const selectedItem = items.find(item => item._id === id);
//         setItem(selectedItem);
//     }, [id, items]);

//     if (!item) {
//         return <div>Item not found</div>;
//     }

//     return (
//         <div>
//             <h2>Order Only</h2>
//             <div className='item-details'>
//                 <img src={item.image} alt={item.name} />
//                 <h1>{item.name}</h1>
//                 <p>{item.description}</p>
//             </div>
//         </div>
//     );
// };

// export default Oder;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useItem from '../../../Hooks/useItem';

const Oder = () => {
    const [items] = useItem();
    const { id, category } = useParams();
    const [selectedItem, setSelectedItem] = useState(null);
    const [categoryItems, setCategoryItems] = useState([]);

    useEffect(() => {
        const item = items.find(item => item._id === id);
        setSelectedItem(item);
        const filteredItems = items.filter(item => item.category === category);
        setCategoryItems(filteredItems);
    }, [id, category, items]);

    if (!selectedItem) {
        return <div>Item not found</div>;
    }

    return (
        <div>
            <h2>Order Only</h2>
            <div className='item-details'>
                <img src={selectedItem.image} alt={selectedItem.name} />
                <h1>{selectedItem.name}</h1>
                <p>{selectedItem.description}</p>
            </div>
            <h3>All items in this category:</h3>
            <div className='grid md:grid-cols-5 sm:grid-cols-2 gap-2 space-y-4 p-5 space-x-4'>
                {categoryItems.map((item) => (
                    <div key={item._id}>
                        <img src={item.image} alt={item.name} />
                        <h1>{item.name}</h1>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Oder;

