import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Container from "react-bootstrap/esm/Container";
import axios from "./../../../setup/axios";
import _ from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import { faPlus, faMinus, faCartShopping, faStar, faPen, faA, faB, faC, faD, faE, faF, faG, faH, faI, faJ, faK, faL, faM, faN, faO, faP, faQ, faR, faS, faT, faU, faV, faW, faX, faY, faZ } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  addBookToCart,
  removeBookFromCart,
  reduceBookQuantity,
  updateBookQuantity,
  createCart,
  fetchCartData,
} from "./../../../redux/slices/cartSlice.js";
import "./Detail.scss";
import ModalBookRating from '../../../Modal/ModalBookRating/ModalBookRating.js';
import ReactPaginate from 'react-paginate';
import Recommend from "../../Recommend/Recommend.js";
function Detail(props) {
  const [book, setBook] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModalBookRating, setShowModalBookRating] = useState(false);
  const [ratingList, setRatingList] = useState([]);
  const user = useSelector(state => state.user.user)
  const [currentCommentPage, setCurrentCommentPage] = useState(1);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  const [totalPages, setTotalPages] = useState(10);
  const getBookData = async () => {
    if (!isNaN(id)) {
      let response = await axios.get(`/books/${id}/`);
      setBook(response.data);
    }
  };
  useEffect(() => {
    getBookData();
  }, []);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  useEffect(() => {
    const fetchRecommendedBooks = async () => {
      try {
        const response = await axios.get(`recommendations-book/${id}/`);
        setRecommendedBooks(response.data);
      } catch (error) {
        console.error("Error fetching recommended books:", error);
      }
    };

    fetchRecommendedBooks();
  }, []);
  const fetchRatingList = async (currentCommentPage) => {
    if (!isNaN(id)) {
      let response = await axios.get(`/ratings/?book=${id}&ordering=${"-created_at"}`);
      setRatingList(response.data.results)
    }
  }
  useEffect(() => {
    getBookData();
    fetchRatingList();
  }, [])

  const handleAddToCart = async () => {
    await dispatch(createCart({ item_id: book.id, quantity: quantity }));
    await dispatch(fetchCartData());
  }
  const handleBuyNow = async () => {
    await dispatch(createCart({ item_id: book.id, quantity: quantity || 1 }));
    await dispatch(fetchCartData());
    navigate("/cart")
  }
  const onHideModalBookRating = async () => {
    setShowModalBookRating(false);
    await fetchRatingList();
    await getBookData();
  }
  const handlePageClick = async (event) => {
    const selectedPage = +event.selected + 1;
    setCurrentCommentPage(prev => selectedPage);
    await fetchRatingList(selectedPage);
  };
  const getIconFromFirstLetter = (letter) => {
    const lowercaseLetter = letter.toLowerCase();
    const iconMap = {
      a: faA,
      b: faB,
      c: faC,
      d: faD,
      e: faE,
      f: faF,
      g: faG,
      h: faH,
      i: faI,
      j: faJ,
      k: faK,
      l: faL,
      m: faM,
      n: faN,
      o: faO,
      p: faP,
      q: faQ,
      r: faR,
      s: faS,
      t: faT,
      u: faU,
      v: faV,
      w: faW,
      x: faX,
      y: faY,
      z: faZ
    };
    return iconMap[lowercaseLetter];
  };
  return (
    <div className="container pt-3">
      <div className="d-flex justify-content-center px-0 py-5" style={{ backgroundColor: "white", borderRadius: "8px"}}>

        <div className="col-4  d-flex justify-content-center">
            <img src={book.image} class="book-view-image" />
          </div>
        <div className="col-8 d-flex flex-column">
          <div className="fs-1 fw-bold mb-2">{book.title}</div>
          <div className="mb-2">Nation: {book.city_country}</div>
          <div className="mb-2">Publishing company: <span style={{ color: "#2489F4", cursor: "pointer" }} onClick={() => { navigate(`/filter/publisher/${book.publisher?.id}`) }}>{book.publisher?.name}</span></div>
          <div className="d-flex mb-2 flex-wrap">
            {
              book.categories && book.categories.length > 0 && book.categories.map((item, index) => {
                return (
                  <Button style={{ fontSize: "14px" }} onClick={() => { navigate(`/filter/categories/${item.id}`) }} variant="danger" className="border border-1 rounded-pill p-1 me-2">{item.name}</Button>
                )

              })
            }

          </div>
          {book.promotion ? (
            <>
              <div
                className="flashsale-product p-1 mt-3"
                style={{ width: "fit-content" }}
              >
                <div className="flashsale-banner ">
                  <img
                    src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/flashsale/label-flashsale.svg?q=105577"
                    className="p-1"
                  />
                </div>
              </div>
              <div className="price-box d-flex mt-3">
                <div className="special-price">
                  <h1>{book.sale_price} $</h1>
                </div>
                <div className="old-price mx-3 d-flex align-items-center gap-2">
                  <span className="price text-decoration-line-through">
                    {book.price}
                  </span>
                  <span className="discount-percent p-2">
                    {book.promotion.discount} %
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="price-box d-flex ">
                <div className="special-price">
                  <h1>{book.price} $</h1>
                </div>
              </div>
            </>
          )}

          <div className="product-view-quantity-box d-flex mt-3">
            <label>Quantity:</label>
            <div className="mx-3 border border-1 rounded-1 p-1 quantity-area user-select-none">
              <span
                className="down-btn "
                onClick={() => {
                  setQuantity(quantity - 1 >= 1 ? quantity - 1 : quantity);
                }}
              >
                <FontAwesomeIcon icon={faMinus} />
              </span>
              <input
                type="number"
                min="1"
                max="999"
                value={quantity}
                className="text-center w-auto mx-2 border-0 "
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              ></input>
              <span
                className="up-btn "
                onClick={() => {
                  setQuantity(quantity + 1 <= 999 ? quantity + 1 : quantity);
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </span>
            </div>
          </div>

          <div className="book-view-add-box row mt-3 ">
            <Button
              variant="outline-danger col-5"
              onClick={() => {
                handleAddToCart();
              }}
            >
              <FontAwesomeIcon icon={faCartShopping} /> Add to cart
            </Button>
            <Button
              variant="danger col-5 ms-2"
              onClick={() => {
                handleBuyNow();
              }}
            >
              Buy now
            </Button>
          </div>
        </div>
      </div>

      <div
        className="mt-3 p-3"
        style={{ backgroundColor: "white", borderRadius: "8px" }}
      >
        <div className="fs-3 fw-bold mb-3">Book information</div>
        <table class="table table-borderless">
          <tbody>
            <tr>
              <td>ISBN:</td> <td>{book.isbn}</td>
            </tr>
            <tr>
              <td>Supplier:</td> <td>{book.city_country}</td>
            </tr>
            <tr>
              <td>Author:</td> <td>{book.author}</td>
            </tr>
            <tr>
              <td>Publisher:</td> <td>{book.publisher?.name}</td>
            </tr>
            <tr>
              <td>Year:</td> <td>{book.year}</td>
            </tr>
            <tr>
              <td>Form:</td> <td>{book.format}</td>
            </tr>
          </tbody>
        </table>
        <hr /> <h6>{book.title}</h6> <p>{book.description}</p>

      </div>
      <div className='mt-3 p-3'
      style={{ backgroundColor: "white", borderRadius: "8px" }}>
        <hr />
        <h4>Book reviews</h4>
        <div className='d-flex justify-content-around'>
          <div className='d-flex flex-column justify-content-center align-items-center p-4'>
            <div className='d-flex  align-items-end'>
              <h2>{Math.floor(book.rating)}</h2>
              <h4>/5</h4>
            </div>

            <div>
              {[...Array(5)].map((star, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  className={index + 1 <= book.rating ? "fa-regular fa-star me-1 text-warning" : "fa-regular fa-star me-1"}
                />
              ))}
            </div>
            <span>{`(${book.rating_count} previews)`} </span>
          </div>
          <div className='d-flex align-items-center justify-content-center flex-grow-1'>
            {
              !_.isEmpty(user) && <>
                <Button variant='outline-danger' onClick={() => { setShowModalBookRating(true) }}> <FontAwesomeIcon
                  icon={faPen}
                /> Write a review</Button>
              </>
            }
            {
              _.isEmpty(user) && <>
                <span>Only members can write comments. Please <span style={{ color: "#2489F4", cursor: "pointer" }} onMouseEnter={(e) => { e.target.style.color = 'red' }} onMouseLeave={(e) => { e.target.style.color = '#2489F4' }} onClick={() => { navigate("/sign_in") }}>log in</span> or <span onClick={() => { navigate("/sign_up") }} style={{ color: "#2489F4", cursor: "pointer" }} onMouseOver={(e) => { e.target.style.color = 'red' }} onMouseLeave={(e) => { e.target.style.color = '#2489F4' }}>register</span>.</span>
              </>
            }


          </div>
        </div>
        <div>
          {ratingList && ratingList.length > 0 && ratingList.map((item, index) => {
            const firstLetter = item.user_email.charAt(0).toLowerCase();
            const Icon = getIconFromFirstLetter(firstLetter);
            if (item.comment) {
              return (
                <div key={item.id} className='mb-3 d-flex align-items-start'>
                  <FontAwesomeIcon
                    className='border border-1 p-3 rounded-circle '
                    style={{ backgroundColor: "#dc3545", color: "white" }}
                    icon={Icon}
                  />
                  <div className='mx-2 d-flex flex-column'>
                    <div className='d-flex'>
                      <h6>{item.user_email} </h6>
                      <span className='mx-2' style={{ fontSize: "14px" }}>{new Date(item.created_at).toLocaleString()}</span>
                    </div>
                    <div>
                      {[...Array(5)].map((star, index) => (
                        <FontAwesomeIcon
                          key={index}
                          icon={faStar}
                          className={index + 1 <= item.rating ? "fa-regular fa-star me-1 text-warning" : "fa-regular fa-star me-1"}
                        />
                      ))}
                    </div>


                    <span>{item.comment}</span>
                  </div>
                </div>
              )
            }

          })}
        </div>
      </div>
      <ModalBookRating
        show={showModalBookRating}
        onHide={onHideModalBookRating}
        book_id={id}
      />
      <Recommend recommendedBooks={recommendedBooks} title={"RELEATED BOOKS"}/>
    </div>
  );
}

export default Detail;
