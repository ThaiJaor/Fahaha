
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from "./../../setup/axios.js"
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
function OrderDetail(props) {
    const { id } = useParams();
    const [order, setOrder] = useState({})
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const fetchOrder = async (id) => {
        try {
            const response = await axios.get(`order/${id}/`)
            const orderData = response.data;
            if (orderData) {
                setOrder(orderData);
                if (orderData.items && orderData.items.length > 0) {
                    const promises = orderData.items.map(async (item) => {
                        try {
                            const data = await axios.get(`/books/${item.item_id}/`);
                            let bookData = await data.data;
                            bookData.quantity = item.quantity;
                            bookData.item_id = bookData.id;
                            console.log("check bookData", bookData)
                            return bookData;
                        } catch (error) {
                            console.log(error);
                        }
                    });

                    try {
                        const resolvedBooks = await Promise.all(promises);
                        setBooks(resolvedBooks);

                    } catch (error) {
                        console.log(error);
                    }
                }

            } else {
                toast.error("not found order")
            }
        } catch (error) {
            console.log(error);
            toast.error(error)
        }
    }
    const goDetailBook = (id) => {
        navigate(`/books/${id}`)
    }
    useEffect(() => {
        fetchOrder(id);
    }, [id])
    return (
        <Container className='vh-100 py-3'>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                <Row>
                    <Col sm={3} >
                        <Nav variant="pills" className="flex-column border border-3 rounded-3" style={{ backgroundColor: "white" }}>
                            <Nav.Item>
                                <Nav.Link eventKey="first">Order detail</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Orders</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9} >
                        <Tab.Content className='border border-3 rounded-3' style={{ backgroundColor: "white" }}>
                            <Tab.Pane eventKey="first" >
                                <Form className='row p-2'>

                                    <Form.Group className="mb-1" as={Col} md="6">
                                        <Form.Label>Created date</Form.Label>
                                        <Form.Control type="text" value={new Date(order.created_at).toLocaleString()} />
                                    </Form.Group>
                                    <Form.Group className="mb-1" as={Col} md="6">
                                        <Form.Label>Status</Form.Label>
                                        <Form.Control type="text" value={order.status} />
                                    </Form.Group>
                                    <Form.Group className="mb-1" as={Col} md="6">
                                        <Form.Label>Payment method</Form.Label>
                                        <Form.Control type="text" value={order.payment_method} />
                                    </Form.Group>
                                    <Form.Group className="mb-1" as={Col} md="6">
                                        <Form.Label>Payment amount</Form.Label>
                                        <Form.Control type="text" value={`${order.payment_amount} ${order.payment_currency}`} />
                                    </Form.Group>
                                    <Form.Group className="mb-1" as={Col} md="6">
                                        <Form.Label>Recipient name</Form.Label>
                                        <Form.Control type="text" value={order.recipient_name} />
                                    </Form.Group>
                                    <Form.Group className="mb-1" as={Col} md="6">
                                        <Form.Label>Phone number</Form.Label>
                                        <Form.Control type="text" value={order.phone_number} />
                                    </Form.Group>
                                    <Form.Group className="mb-1" as={Col} md="12">
                                        <Form.Label>Shipping address</Form.Label>
                                        <Form.Control type="text" value={order.shipping_address} />
                                    </Form.Group>
                                    <Form.Group className="mb-1" as={Col} md="12">
                                        <Form.Label>Note</Form.Label>
                                        <Form.Control as="textarea" rows={2} value={order.note} />
                                    </Form.Group>

                                </Form></Tab.Pane>
                            <Tab.Pane eventKey="second" className='p-2'>
                                {
                                    books && books.length > 0 && books.map((book, index) => {
                                        return (
                                            <div key={`book-${book.id}`}>
                                                <div className='row d-flex align-items-center justify-content-center' >
                                                    <div className='col-2 d-flex p-3 ' >
                                                        <div>
                                                            <img src={book.image} style={{ maxWidth: "8rem" }} />
                                                        </div>
                                                    </div>
                                                    <div className='col-4 d-flex align-items-center'>
                                                        <a onClick={() => { goDetailBook(book.id) }} style={{ cursor: "pointer", textDecoration: "underline", color: "red" }}>{book.title}</a>
                                                    </div>
                                                    <div className='col-2 d-flex flex-column justify-content-center align-items-center'>
                                                        {book.promotion ?

                                                            <>
                                                                <span >{book.sale_price} $</span>
                                                                <span className='text-decoration-line-through mx-2'>{book.price} $</span>
                                                            </>
                                                            :
                                                            <>
                                                                <span>{book.price} $</span>
                                                            </>
                                                        }
                                                    </div>
                                                    <div className='col-2 p-3 d-flex align-items-center quantity-area user-select-none'>
                                                        <span>{book.quantity ? book.quantity : ""}</span>
                                                    </div>
                                                    <div className='col-2 p-3 d-flex align-items-center'>{(book.sale_price ? book.sale_price * book.quantity : book.price * book.quantity).toFixed(2)} $</div>

                                                </div>
                                                <hr />
                                            </div>

                                        )
                                    })
                                }
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>





        </Container>
    );
}

export default OrderDetail;