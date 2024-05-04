import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { useSelector } from 'react-redux';
import axios from "./../../../setup/axios.js"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function OneStepCheckOut(props) {
    const navigate = useNavigate();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const cart = useSelector(state => state.cart.books);
    const [books, setBooks] = useState([])
    const [totalMoney, setTotalMoney] = useState(0)
    const [orderDetail, setOrderDetail] = useState({
        recipient_name: "",
        phone_number: "",
        shipping_address: "",
        note: "",
    })
    const [validate, setValidate] = useState({
        recipient_name: false,
        phone_number: false,
        shipping_address: false,
        items: false,
    })
    const [validated, setValidated] = useState(false);
    const backToCart = () => {
        navigate("/cart")
    }
    const isValidPhoneNumber = (phoneNumber) => {
        const phoneNumberPattern = /^\d{10}$/; // Mẫu để kiểm tra 10 chữ số
        return phoneNumberPattern.test(phoneNumber);
    };
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        // if (form.checkValidity() === false) {
        //     event.preventDefault();
        //     event.stopPropagation();
        // }
        event.preventDefault();
        if (
            orderDetail.recipient_name.trim() === "" ||
            !isValidPhoneNumber(orderDetail.phone_number) ||
            orderDetail.shipping_address.trim() === ""
        ) {
            // Nếu có bất kỳ điều kiện nào không đúng, đặt validated thành false
            setValidated(false);
            alert("Please fill in all required fields correctly!");
        } else {
            // Nếu tất cả các điều kiện đều đúng, có thể gửi form

            try {
                // const data = [...orderDetail.items]
                const res = await axios.get("/vnpay-payment-url/");
                console.log(res);
                const vnpay_payment_url = res.data.vnpay_payment_url;

                if (vnpay_payment_url) {
                    if (!orderDetail.note || orderDetail.note === "") {
                        setOrderDetail({ ...orderDetail, note: "no note" })
                    }
                    // document.cookie = `order=${JSON.stringify(orderDetail)}`;
                    localStorage.setItem('order', JSON.stringify(orderDetail));
                    window.location.href = vnpay_payment_url;
                }
            } catch (error) {
                console.log(error);
                toast.error("some things is wrong")
            }



            setValidated(true);
        }
    };
    const getBooks = async () => {
        console.log("check carts", cart);
        const promises = cart.map(async (item) => {
            try {
                const data = await axios.get(`/books/${item.item_id}/`);
                let bookData = await data.data;
                bookData.quantity = item.quantity;
                bookData.item_id = bookData.id;
                return bookData;
            } catch (error) {
                console.log(error);
            }
        });

        try {
            const resolvedBooks = await Promise.all(promises);
            setBooks(resolvedBooks.filter(Boolean));
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (cart.length > 0)
            getBooks();
    }, [cart])
    useEffect(() => {
        let sum = 0;
        books.forEach((item) => {
            sum += item.sale_price * item.quantity;
        });
        setTotalMoney(sum);
    }, [books, cart]);
    return (
        <Container style={{ height: "100%" }} className='pt-4' >
            <div className='row mb-3' style={{ backgroundColor: "white" }}>
                <div className='col-12 py-2'>
                    <Form noValidate onSubmit={handleSubmit} >
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom01" className='mb-2'>
                                <Form.Label>Recipient name</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter recipient name"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                        value={orderDetail.recipient_name}
                                        onChange={(e) => {
                                            if (e.target.value.length > 0) {
                                                setValidated(false);
                                            }
                                            else {
                                                setValidated(true)
                                            }
                                            setOrderDetail({ ...orderDetail, recipient_name: e.target.value })
                                        }}
                                        isInvalid={orderDetail.recipient_name.length <= 0}
                                        isValid={orderDetail.recipient_name.length > 0}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a recipient name.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom02" className='mb-2'>
                                <Form.Label>Phone number</Form.Label>
                                <InputGroup >
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter phone number"
                                        aria-describedby="inputGroupPrepend"
                                        className="rounded-2"
                                        required
                                        value={orderDetail.phone_number}
                                        onChange={(e) => {
                                            if (!isValidPhoneNumber(e.target.value)) {
                                                setValidated(false);
                                            }
                                            else {
                                                setValidated(true)
                                            }
                                            setOrderDetail({ ...orderDetail, phone_number: e.target.value })
                                        }}
                                        isInvalid={!isValidPhoneNumber(orderDetail.phone_number)}
                                        isValid={isValidPhoneNumber(orderDetail.phone_number)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a valid phone number .
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustomUsername" className='mb-2'>
                                <Form.Label>Shipping address</Form.Label>
                                <InputGroup hasValidation>
                                    {/* <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text> */}
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter shipping address"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                        value={orderDetail.shipping_address}
                                        onChange={(e) => {
                                            if (e.target.value.length > 0) {
                                                setValidated(false);
                                            }
                                            else {
                                                setValidated(true)
                                            }
                                            setOrderDetail({ ...orderDetail, shipping_address: e.target.value })
                                        }}
                                        isInvalid={orderDetail.shipping_address.length <= 0}
                                        isValid={orderDetail.shipping_address.length > 0}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a shipping address.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            {/* <Form.Group as={Col} md="6" controlId="validationCustom03" className='mb-2'>
                                <Form.Label>Bank</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Select aria-label="Default select example" required
                                        value={orderDetail.bank}
                                        onChange={(e) => {
                                            if (e.target.value.length > 0) {
                                                setValidated(false);
                                            }
                                            else {
                                                setValidated(true)
                                            }
                                            setOrderDetail({ ...orderDetail, bank: e.target.value })
                                        }}
                                        isInvalid={orderDetail.bank.length <= 0}
                                        isValid={orderDetail.bank.length > 0}
                                    >
                                        <option value='' disabled defaultValue>Choose your bank</option>
                                        <option value="NCB">NCB</option>
                                        <option value="EXIMBANK">EXIMBANK</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a bank.
                                    </Form.Control.Feedback>
                                </InputGroup>

                            </Form.Group> */}
                        </Row>
                        <Row>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Note</Form.Label>
                                <Form.Control as="textarea" rows={3} value={orderDetail.note} onChange={(e) => setOrderDetail({ ...orderDetail, note: e.target.value })} />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom01">

                                <div className=''>

                                    <div className='total-cart-contain d-flex flex-column gap-2 border border-2 p-3 rounded-2'>
                                        <div className="total-cart-page d-flex  justify-content-between align-items-center ">
                                            <div className="title-cart-page-left ">Total bill</div>
                                            <div className="number-cart-page-right ">
                                                <span className="price">{totalMoney.toFixed(2)} $</span>
                                            </div>
                                        </div>
                                        <Button variant='success' onClick={() => { backToCart() }}>Edit your cart</Button>
                                        <Button type="submit" variant='danger'>Make payment</Button>
                                    </div>

                                </div>
                            </Form.Group>


                        </Row>

                    </Form>
                </div>

            </div>
            <div className='row' style={{ backgroundColor: "white" }}>
                <h6 className='col-12 mt-2'>CHECK YOUR ORDER AGAIN</h6>
                <div className='col-12'>
                    {
                        books && books.length > 0 && books.map((book, index) => {
                            return (
                                <div key={`book-${book.id}`}>
                                    <div className='row' >
                                        <div className='col-2 d-flex p-3 ' >
                                            <div>
                                                <img src={book.image} style={{ maxWidth: "8rem" }} />
                                            </div>
                                        </div>
                                        <div className='col-4 d-flex align-items-center'>
                                            <span>{book.title}</span>
                                        </div>
                                        <div className='col-2 d-flex flex-column justify-content-center align-items-center'>
                                            {book.promotion ?

                                                <>
                                                    <span >{book.sale_price} $</span>
                                                    <span className='text-decoration-line-through mx-2'>{book.price} $</span>
                                                </>
                                                :
                                                <>
                                                    <p>{book.price} $</p>
                                                </>
                                            }
                                        </div>
                                        <div className='col-2 p-3 d-flex align-items-center quantity-area user-select-none'>
                                            <span>{cart[index]?.quantity}</span>
                                        </div>
                                        <div className='col-2 p-3 d-flex align-items-center'>{(book.sale_price ? book.sale_price * cart[index]?.quantity : book.price * cart[index]?.quantity).toFixed(2)} $</div>

                                    </div>
                                    <hr />
                                </div>

                            )
                        })
                    }
                </div>
            </div>
        </Container>
    );
}

export default OneStepCheckOut;