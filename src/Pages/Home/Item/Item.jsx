// import React from 'react';

// const Item = ({item}) => {

//    const {name,image,description,_id} = item;
//     return (
//         // <div className='space-y-4'>
//         //     <img  className='w-[170px]' src={image} alt="" />
//         //   <div>
//         //   <h1>{name}</h1>
//         //   <h2>{description}</h2>
//         //   </div>
            
//         // </div>
// //         <div className='space-y-4'>
// //   <img 
// //     className='w-[170px] transform transition-transform duration-300 hover:scale-105 hover:opacity-90 hover:grayscale-0' 
// //     src={image} 
// //     alt="" 
// //   />
// //   <div>
// //     <h1 style={{ color: '#8a1538' }}  className='font-bold ' >{name}</h1>
// //     <h2>{description}</h2>
// //   </div>
// // </div>
// <div className='space-y-4'>
// <img 
//     className='w-[170px] transform transition-transform duration-300 hover:scale-105 hover:opacity-90 hover:grayscale-0' 
//     src={image} 
//     alt="" 
// />
// <div>
//     <h1 style={{ color: '#8a1538' }} className='font-bold'>{name}</h1>
//     <h2>{description}</h2>
// </div>
// </div>

//     );
// };

// export default Item;
import React from 'react';

const Item = ({ item }) => {

    const { name, image, description,category, _id } = item;
    return (
        <div className='space-y-4'>
            <img 
                className='w-[170px] transform transition-transform duration-300 hover:scale-105 hover:opacity-90 hover:grayscale-0' 
                src={image} 
                alt={name} 
            />
            <div>
                <h1 style={{ color: '#8a1538' }} className='font-bold'>{category}</h1>
                <h2>{description}</h2>
            </div>
        </div>
    );
};

export default Item;
