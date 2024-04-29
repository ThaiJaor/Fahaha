import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { useDispatch, useSelector } from 'react-redux';
import { faTrashCan, faPlus, faMinus, } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addBookToCart, removeBookFromCart, reduceBookQuantity, updateBookQuantity } from '../../redux/slices/cartSlice';
import axios from './../../setup/axios.js';
import "./Cart.scss"
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button.js';

function Cart(props) {
    const navigate = useNavigate();
    const carts = useSelector((state) => state.cart.books);
    const [books, setBooks] = useState([]);
    const [totalMoney, setTotalMoney] = useState(0)
    const dispatch = useDispatch()
    const checkExistBook = (id) => {
        for (let index = 0; index < books.length; index++) {
            if (books[index].id === id) {
                return index;
            }
        }
        return -1;
    }
    const addBookQuantityByOne = (id) => {
        dispatch(addBookToCart({ id: id, quantity: 1 }))
    }
    const reduceBookQuantityByOne = (id) => {
        dispatch(reduceBookQuantity({ id: id, quantity: 1 }));
    }
    const changeBookQuantity = (id, quantity) => {
        dispatch(updateBookQuantity({ id: id, quantity: quantity }))
    }

    const deleteBookFromCart = async (id) => {
        let bookIndex = checkExistBook(id);
        if (bookIndex >= 0) {
            let currentBooks = [...books];
            currentBooks.splice(bookIndex, 1);
            setBooks(currentBooks)
            dispatch(removeBookFromCart({ id: id }));
        }


    }
    const getBooks = async () => {

        const promises = carts.map(async (item) => {
            try {
                const data = await axios.get(`/books/${item.id}/`);
                let bookData = await data.data;
                bookData.quantity = item.quantity;
                return bookData;
            } catch (error) {
                console.log(error);
            }
        });

        try {
            const resolvedBooks = await Promise.all(promises);
            console.table(resolvedBooks)
            setBooks(resolvedBooks.filter(Boolean));
        } catch (error) {
            console.log(error);
        }
    };

    const OneStepCheckOut = () => {
        navigate("/onestepcheckout")
    }

    useEffect(() => {
        if (carts.length > 0)
            getBooks();
    }, [carts])

    useEffect(() => {
        let sum = 0;
        books.forEach((item) => {
            sum += item.sale_price * item.quantity;
        });
        setTotalMoney(sum);
    }, [books, carts]);

    return (
        <Container className='pt-5' style={{ height: "100%" }}>


            <div className='row'>
                <h1 className='col-12'>CART ({books.length})</h1>
            </div>

            <div className='row ' >
                <div className='cart-block col-8 '>
                    <div className='border border-2 rounded-1 cart-header mb-3 p-2'>
                        <div className='row '>
                            <div className='col-7'>Book</div>
                            <div className='col-2'>Quantity</div>
                            <div className='col-2'>Total price</div>
                            <div className='col-1'></div>

                        </div>
                    </div>

                    <div className=' border border-2 rounded-1 cart-body p-1'>
                        {
                            books && books.length > 0 && books.map((book, index) => {
                                return (
                                    <>
                                        <div className='row' key={`book-${book.id}`}>
                                            <div className='col-7 d-flex p-3 ' >
                                                <div>
                                                    <img src={book.image} />
                                                </div>
                                                <div className='d-flex flex-column justify-content-between mx-3'>
                                                    <p>{book.title}</p>
                                                    <div className='d-flex'>
                                                        {book.promotion ?

                                                            <>
                                                                <h5 >{book.sale_price} $</h5>
                                                                <p className='text-decoration-line-through mx-2'>{book.price} $</p>
                                                            </>
                                                            :
                                                            <>
                                                                <p>{book.price} $</p>
                                                            </>
                                                        }
                                                    </div>

                                                </div>
                                            </div>
                                            <div className='col-2 p-3 d-flex align-items-center quantity-area user-select-none'>

                                                <span className='down-btn ' onClick={() => { reduceBookQuantityByOne(book.id) }}><FontAwesomeIcon icon={faMinus} /></span>
                                                <input type='number'
                                                    min="1"
                                                    max="999"
                                                    value={carts[index]?.quantity}
                                                    onChange={(e) => { changeBookQuantity(book.id, e.target.value) }}
                                                    className='text-center w-auto mx-2 border-0 '
                                                />
                                                <span className='up-btn ' onClick={() => { addBookQuantityByOne(book.id) }} ><FontAwesomeIcon icon={faPlus} /></span>

                                            </div>
                                            <div className='col-2 p-3 d-flex align-items-center'>{(book.sale_price ? book.sale_price * carts[index]?.quantity : book.price * carts[index]?.quantity).toFixed(2)} $</div>
                                            <div className='col-1 p-3 d-flex align-items-center delete-btn' onClick={() => { deleteBookFromCart(book.id) }}><FontAwesomeIcon icon={faTrashCan} /></div>

                                        </div>
                                        <hr />
                                    </>

                                )
                            })
                        }
                    </div>
                </div>
                <div className='block-total-cart  col-4 '>
                    <div className='total-cart-contain d-flex flex-column gap-2 border border-2 p-3 rounded-2'>
                        <div className="total-cart-page d-flex  justify-content-between align-items-center ">
                            <div className="title-cart-page-left ">Total price</div>
                            <div className="number-cart-page-right ">
                                <span className="price">{totalMoney.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="total-cart-page title-final-total d-flex justify-content-between align-items-center">
                            <div className="title-cart-page-left">Total price(included VAT)</div>
                            <div className="number-cart-page-right">
                                <span className="price">{totalMoney.toFixed(2)}</span>
                            </div>
                        </div>

                        <Button variant='danger' onClick={() => { OneStepCheckOut() }}>Checkout</Button>

                    </div>
                </div>
            </div>



        </Container>
    );
}

export default Cart;