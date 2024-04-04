import React, { useEffect } from 'react';
import { Route, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchUser } from '../redux/slices/userSlices';
import Spinner from 'react-bootstrap/Spinner';
import Login from '../components/Login/Login';
import Container from 'react-bootstrap/esm/Container';
function PrivateRoute({ children }) {
    const location = useLocation;
    const navigate = useNavigate()
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const dispatch = useDispatch()
    const isError = useSelector(state => state.user.isError);
    const isLoading = useSelector(state => state.user.isLoading);

    useEffect(() => {
        dispatch(fetchUser());
    }, []);

    if (isLoading && !isAuthenticated) {
        return (
            <Container className='mt-3'>
                <div>
                    <Spinner animation="border" className='mx-auto' />
                </div>
                <div>
                    <h3>Loading data ...</h3>
                </div>
            </Container>
        )
    }
    else if (!isLoading && !isAuthenticated) {
        navigate("/sign_in")
    }
    else {
        return children;
    }

}

export default PrivateRoute;
