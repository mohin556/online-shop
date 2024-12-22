// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const User = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         // Retrieve the stored contact number from localStorage
//         const storedContact = JSON.parse(localStorage.getItem('contact'));
//         console.log('Stored Contact:', storedContact);

//         if (storedContact) {
//           // Fetch the user details from the backend using the contact number
//           const response = await axios.post('/user', { contact: storedContact });
//           console.log('Backend Response:', response.data);

//           if (response.data) {
//             // Save the user details in state and localStorage
//             setUser(response.data);
//             localStorage.setItem('user', JSON.stringify(response.data));
//           } else {
//             console.log('No user data returned from backend.');
//           }
//         } else {
//           console.log('No contact number found in localStorage.');
//         }
//       } catch (error) {
//         console.error('Error fetching user:', error);
//       }
//     };

//     fetchUser();
//   }, []);

//   console.log('User:', user); // Check user state here

//   return (
//     <div>
//       <h1>User are here</h1>
//       <div>
//         <h1>Dashboard</h1>
//         {user ? (
//           <div>
//             <p>Welcome, {user.name}</p>
//             <p>Your contact number is: {user.contact}</p>
//             <p>Your location is: {user.location}</p>
//           </div>
//         ) : (
//           <p>Please log in.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default User;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useUser from '../../Hooks/useUser';

const User = () => {
  const { user, loading, error } = useUser();
  // const [user, setUser] = useState(null);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       // Retrieve the stored contact number from localStorage
  //       const storedContact = JSON.parse(localStorage.getItem('contact'));

  //       if (storedContact) {
  //         // Fetch the user details from the backend using the contact number
  //         const response = await axios.post('http://localhost:5000/user', { contact: storedContact });

  //         if (response.data) {
  //           // Save the user details in state and localStorage
  //           setUser(response.data);
  //           localStorage.setItem('user', JSON.stringify(response.data));
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user:', error);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <p>Welcome, {user.name}</p>
          <p>Your contact number is: {user.contact}</p>
        </div>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
};

export default User;
