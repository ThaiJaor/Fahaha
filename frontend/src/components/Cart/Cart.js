import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { useDispatch, useSelector } from 'react-redux';
import { faTrashCan, faPlus, faMinus, } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addBookToCart, removeBookFromCart, reduceBookQuantity, updateBookQuantity } from '../../redux/slices/cartSlice';
import axios from './../../setup/axios.js';
import "./Cart.scss"
function Cart(props) {
    const carts = useSelector((state) => state.cart.books);
    const [books, setBooks] = useState([]);
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
        console.log("check id cart", id);
        let bookIndex = checkExistBook(id);
        if (bookIndex >= 0) {
            let currentBooks = [...books];
            currentBooks.splice(bookIndex, 1);
            setBooks(currentBooks)
            dispatch(removeBookFromCart({ id: id }));
        }


    }
    const getBooks = async () => {
        carts.forEach(async (book, index) => {
            let data = await axios.get(`/books/${book.id}/`)
            let bookData = data.data;

            let bookIndex = checkExistBook(book.id);
            if (bookIndex < 0) {
                let currentBooks = [...books];
                currentBooks.push(bookData);
                setBooks(currentBooks);
            }

        });

    }
    useEffect(() => {
        getBooks();
    }, [carts])

    return (
        <Container className='pt-5' style={{ height: "100vh" }}>


            <h1>CART ({books.length})</h1>

            <div className='row border border-1 rounded-1 cart-header mb-3'>
                <div className='col-7'>Book</div>
                <div className='col-2'>Quantity</div>
                <div className='col-2'>Total price</div>
                <div className='col-1'></div>

            </div>
            <div className='row border border-1 rounded-1 cart-body mb-3'>
                {
                    books.map((book, index) => {
                        return (
                            <>
                                <div className='col-7 d-flex p-3 '>
                                    <div>
                                        <img src={book.image} />
                                    </div>
                                    <div className='d-flex flex-column justify-content-between mx-3'>
                                        <p>{book.title}</p>
                                        <div className='d-flex'>
                                            {book.sale_price ?

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
                                <hr />
                            </>
                        )
                    })
                }
            </div>
        </Container>
    );
}

export default Cart;