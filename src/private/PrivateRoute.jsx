
import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../provider/AuthContext';
import Loader from '../components/Loader/Loader';

const PrivateRoute = ({children}) => {

    const location = useLocation();
    const {user, loading } = use(AuthContext);
    if(loading){
         return <Loader></Loader>
    }
    if(!user){
        return <Navigate state={location.pathname} to='/auth/login'></Navigate>
    
    }
    return children;
};

export default PrivateRoute;
