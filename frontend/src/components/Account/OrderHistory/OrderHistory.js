import React, { useEffect, useState } from 'react';
import axios from "./../../../setup/axios.js"
import ReactPaginate from 'react-paginate';
import Table from 'react-bootstrap/Table';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faL, faPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function OrderHistory(props) {
    const [listOrders, setListOrders] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [currentLimit, setCurrentLimit] = useState(5);
    const [status, setStatus] = useState("");
    const [ordering, setOrdering] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const navigate = useNavigate();
    const handlePageClick = async (event) => {
        const selectedPage = +event.selected + 1;
        setCurrentPage(prev => selectedPage);
        await fetchOrders(ordering, paymentMethod, status, selectedPage, currentLimit);
    };
    const fetchOrders = async (ordering, paymentMethod, status, page, limit) => {
        const currentPage = page || 1;
        const currentLimit = limit || 5
        try {
            const response = await axios.get(`orders/?ordering=${ordering || ""}&payment_method=${paymentMethod || ""}&status=${status || ""}&offset=${(currentPage - 1) * currentLimit}&limit=${currentLimit}`);
            const ordersData = response.data;
            setTotalPages(Math.ceil(ordersData.count / currentLimit));
            setListOrders(ordersData.results)
        } catch (error) {
            toast.error();
            console.log(error);
        }
    }
    const handleSearch = async () => {
        await fetchOrders(ordering, paymentMethod, status, currentPage, currentLimit);
    }
    useEffect(() => {
        fetchOrders();
    }, [])
    return (
        <div className='order-list-table p-2'>
            <Navbar expand="lg" className="bg-body-tertiary d-flex justify-content-between">
                <div className='d-flex gap-1'>
                    <Nav>
                        <Form.Select aria-label="Default select example" onClick={(e) => { setStatus(e.target.value) }}>
                            <option value="" disabled selected>Filter by status</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="delivered">Delivered</option>
                            <option value="processing">Processing</option>
                            <option value="shipping">Shipping</option>
                        </Form.Select>
                    </Nav>
                    <Nav>
                        <Form.Select aria-label="Default select example" onClick={(e) => { setOrdering(e.target.value) }}>
                            <option value="" disabled selected>Filter by ordering</option>
                            <option value="created_at">Created date ascending</option>
                            <option value="-created_at">Created date descending</option>
                            <option value="total_price">Total price ascending</option>
                            <option value="-total_price">Total price descending</option>
                        </Form.Select>
                    </Nav>
                    <Nav>
                        <Form.Select aria-label="Default select example" onClick={(e) => { setPaymentMethod(e.target.value) }}>
                            <option value="" disabled selected>Filter by payment method</option>
                            <option value="VNPAY">VNPAY</option>
                        </Form.Select>
                    </Nav>
                </div>

                <Nav>
                    <Button variant="danger" className='add-circle-btn' onClick={() => { handleSearch() }}>
                        <span> Search </span>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Button>
                </Nav>


            </Navbar>
            <Table bordered hover  >
                <thead >
                    <tr>
                        <th>#</th>
                        <th>Total amount</th>
                        <th>Date created</th>
                        <th>Status</th>
                        <th>Receiver</th>
                        <th>Address</th>
                        <th>Phone number</th>
                        <th>Payment method</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listOrders && listOrders.length > 0 && listOrders.map((order, index) => {
                            return (
                                <tr key={order.id} onClick={() => { navigate(`/order/detail/${order.id}`) }} style={{ cursor: "pointer" }} >
                                    <td>{(index + 1) + ((currentPage - 1) * currentLimit)}</td>
                                    <td>{order.payment_amount} {order.payment_currency}</td>
                                    <td>{new Date(order.created_at).toLocaleString()}</td>
                                    <td>{order.status}</td>
                                    <td>{order.recipient_name}</td>
                                    <td>{order.shipping_address}</td>
                                    <td>{order.phone_number}</td>
                                    <td>{order.payment_method}</td>
                                </tr>
                            )
                        })

                    }

                </tbody>
            </Table>
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={4}
                marginPagesDisplayed={2}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={currentPage - 1}

            />
        </div>
    );
}

export default OrderHistory;