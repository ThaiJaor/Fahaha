import React, { useEffect } from 'react';
import { Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ children }) {
    const navigate = useNavigate()
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/sign_in');
        }
    }, [isAuthenticated]);

    return isAuthenticated === true ? children : null;
}

export default PrivateRoute;
