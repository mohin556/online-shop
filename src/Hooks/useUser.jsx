import { useState, useEffect } from 'react';
import axios from 'axios';

const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedContact = JSON.parse(localStorage.getItem('contact'));

        if (storedContact) {
          const response = await axios.post('https://shop-server-pi.vercel.app/user', { contact: storedContact });

          if (response.data) {
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
          }
        } else {
          console.log('No contact number found in localStorage.');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error, setUser };
};

export default useUser;
