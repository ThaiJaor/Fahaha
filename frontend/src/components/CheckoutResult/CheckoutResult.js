import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from './../../setup/axios.js';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartData } from '../../redux/slices/cartSlice.js';
import ClipLoader from "react-spinners/ClipLoader";
function CheckoutResult(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true);
    const [vnp_ResponseCode, setVnpResponseCode] = useState("00")
    function getErrorMessage(responseCode) {
        switch (responseCode) {
            case '00':
                return 'Giao dịch thành công';
            case '07':
                return 'Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).';
            case '09':
                return 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.';
            case '10':
                return 'Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần.';
            case '11':
                return 'Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.';
            case '12':
                return 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.';
            case '13':
                return 'Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.';
            case '24':
                return 'Giao dịch không thành công do: Khách hàng hủy giao dịch.';
            case '51':
                return 'Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.';
            case '65':
                return 'Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.';
            case '75':
                return 'Ngân hàng thanh toán đang bảo trì.';
            case '79':
                return 'Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch.';
            case '99':
                return 'Các lỗi khác (lỗi còn lại, không có trong danh sách mã lỗi đã liệt kê).';
            default:
                return 'Mã lỗi không hợp lệ.';
        }
    }
    const createOrder = async (data) => {
        try {
            const queryString = window.location.search;
            console.log("Query parameters:", queryString);
            const res = await axios.post(`/vnpay-response/${queryString}`, data);
            await dispatch(fetchCartData());
            // Cookies.remove("order");
            localStorage.removeItem("order");
            setIsLoading(false);
        } catch (error) {
            console.error("Error creating order:", error);
            toast.error("Error creating order. Please try again later.");
            // Cookies.remove("order");
            localStorage.removeItem("order");
            setIsLoading(false);
        }
    };
    const handleBackToHome = async () => {
        await dispatch(fetchCartData());
        navigate("/");
    };

    useEffect(() => {
        // window.location.reload();
        const searchParams = new URLSearchParams(location.search);
        const responseCode = searchParams.get('vnp_ResponseCode');
        setVnpResponseCode(responseCode || "99");
        const orderData = localStorage.getItem("order");
        try {
            createOrder(JSON.parse(orderData));
        } catch (error) {
            toast.error(error);
            console.error("Error parsing order data:", error);
        }

    }, [location.search]);
    return (
        <>
            {isLoading ?
                <div className='d-flex justify-content-center align-items-center flex-column vh-100'>
                    <ClipLoader
                        color={"#000000"}
                        loading={isLoading}
                        // cssOverride={}
                        size={100}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                    <span>Loading...</span>
                </div>

                :
                <div class="vh-100 d-flex justify-content-center align-items-center ">
                    <div class="card col-md-4 bg-white shadow-md p-5">
                        <div class="mb-4 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75"
                                fill="currentColor" className={vnp_ResponseCode === "00" ? "bi bi-check-circle text-success" : "bi bi-x-circle text-danger"} viewBox="0 0 16 16">
                                {
                                    vnp_ResponseCode === "00" ?
                                        <>
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                            <path
                                                d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                                        </>
                                        :
                                        <>
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                        </>

                                }

                            </svg>
                        </div>
                        <div class="text-center">
                            <h1>{vnp_ResponseCode === "00" ? "Thank You !" : "Sorry !"}</h1>
                            <p>{getErrorMessage(vnp_ResponseCode)}</p>
                            <button class="btn btn-outline-success" onClick={() => { handleBackToHome() }} >Back Home</button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default CheckoutResult;