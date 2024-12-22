import React from 'react';
import useUser from '../Hooks/useUser';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user,loading } = useUser();
    const location = useLocation();

    if(loating) {
        return <progress className='progress w-56'></progress>
    }
    if(user) {
        return children;
    }
    return  <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default PrivateRoute;