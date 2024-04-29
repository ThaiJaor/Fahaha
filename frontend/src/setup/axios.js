import axios from "axios";
import { toast } from 'react-toastify';

const baseURL = "http://127.0.0.1:8000/api/"
const instance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
});

instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const jwtToken = localStorage.getItem('access') || null;
    if (jwtToken) {
        config.headers.Authorization = `Bearer ${jwtToken}`;
    } else {
        delete config.headers.Authorization;
    }
    config.headers["Content-Type"] = "application/json";
    config.headers.Accept = "application/json";
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error.response?.status || 500;

    switch (status) {
        // authentication (token related issues)
        case 401: {
            toast.error("Unauthorized the user, please login again ...");
            localStorage.setItem("access", null);
            if (window.location.pathname !== "/sign_in") {
                window.location.href = "/sign_in";
            }
            // Reload the page after logout
            return Promise.reject(error);
        }
        // forbidden (permission related issues)
        case 403: {
            break;
        }
        // Other error cases can be handled similarly
        default: {
            break;
        }
    }
    return Promise.reject(error);
});

instance.defaults.withCredentials = true;

export default instance;
