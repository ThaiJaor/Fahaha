import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Container from "react-bootstrap/esm/Container";
import axios from "./../../../setup/axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  faPlus,
  faMinus,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
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
import Recommend from "../../Recommend/Recommend.js";
function Detail(props) {
  const [book, setBook] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const handleAddToCart = async () => {
    await dispatch(createCart({ item_id: book.id, quantity: quantity }));
    await dispatch(fetchCartData());
  };
  const handleBuyNow = async () => {
    await dispatch(createCart({ item_id: book.id, quantity: quantity || 1 }));
    await dispatch(fetchCartData());
    navigate("/cart");
  };
  return (
    <div className="container">
      <div className="d-flex justify-content-center px-0 py-5" style={{ backgroundColor: "white", borderRadius: "8px"}}>

        <div className="col-4  d-flex justify-content-center">
            <img src={book.image} class="book-view-image" />
          </div>
        <div className="col-8 d-flex flex-column">
          <div className="fs-1 fw-bold">{book.title}</div>
          <div>Nhà cung cấp: {book.city_country}</div>
          <div>Nhà xuất bản: {book.publisher?.name}</div>

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
      
      <div className="mt-3 p-3">
        <div>Book information</div>
        <p>PLU: {book.isbn}</p>
        <p>Supplier: {book.city_country}</p>
        <p>Author: {book.author}</p>
        <p>Publisher: {book.publisher?.name}</p>
        <p>Year: {book.year}</p>
        <p>Form: {book.format}</p>
        <hr />
        <h6>{book.title}</h6>
        <p>{book.description}</p>
      </div>
      <Recommend recommendedBooks={recommendedBooks} />
    </div>
  );
}

export default Detail;
