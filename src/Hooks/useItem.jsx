import { useEffect, useState } from "react";


const useItem =() =>{

    const [items, setItems] = useState([]);

   
    const [loading,setLoading] = useState(true)
    
    useEffect(() => {
        fetch('http://localhost:5000/items')
            .then(res => res.json())
            .then(data => {setItems(data);setLoading(false)}); 
             
    }, []);
    return [items,loading]
}

export default useItem;
// import { useEffect, useState } from "react";

// const useItem = () => {
//     const [items, setItems] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [categories, setCategories] = useState([]);

//     useEffect(() => {
//         fetch('category.json')
//             .then(res => res.json())
//             .then(data => {
//                 setItems(data.items);
//                 setLoading(false);

//                 // Extract unique categories
//                 const uniqueCategories = [...new Set(data.items.map(item => item.category))];
//                 setCategories(uniqueCategories);
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//                 setLoading(false);
//             });
//     }, []);

//     return [items, loading, categories];
// }

// export default useItem;
