import "./Header.scss";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/esm/Container";
import { logout } from "../../redux/slices/userSlices";

import React, { useEffect, useState } from "react";
import {
  fetchCategories,
  fetchPromotions,
  fetchPublishers,
} from "../../redux/slices/bookSlice.js";
const $ = window.$;
const Header = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartSize = useSelector((state) => state.cart.size);
  const [showDropdown, setShowDropdown] = useState(false);
  const categories = useSelector((state) => state.books.categories);
  const promotions = useSelector((state) => state.books.promotions);
  const publishers = useSelector((state) => state.books.publishers);
  const [searchKeyword, setSearchKeyword] = useState("");
  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };
  const handleSearch = () => {
    const formattedKeyword = searchKeyword.trim().replace(/\s+/g, "+");
    window.location.href = `/filter?search=${formattedKeyword}`;
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const Login = () => {
    navigate("/sign_in");
  };
  const SignUp = () => {
    navigate("/sign_up");
  };
  const Account = () => {
    navigate("/account");
  };
  const Cart = () => {
    navigate("/cart");
  };

  const Logout = async () => {
    await dispatch(logout());
    navigate("/sign_in");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(fetchCategories()),
          dispatch(fetchPromotions()),
          dispatch(fetchPublishers()),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      <div className="header d-flex">
        <div className="container-fluid" style={{ backgroundColor: "#f0f0f0" }}>
          <div
            className="container topbar d-none d-lg-block"
            style={{ backgroundColor: "#FF6C6B" }}
          >
            <div className="d-none d-lg-flex justify-content-between">
              <div className="top-info ps-2">
                <div className="me-3">
                  <i className="fa-solid fa-phone me-2 text-success">
                    {" "}
                    Hotline{" "}
                  </i>
                  <a href="#" className="text-white">
                    (+84) 123123123
                  </a>
                </div>
              </div>
              <div className="top-link pe-5">
                <nav
                  className="navbar navbar-expand-xl"
                  style={{ height: "100%" }}
                >
                  <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav mx-auto">
                      <div className="nav-item dropdown">
                        <a
                          href="#"
                          className="nav-link dropdown-toggle"
                          data-bs-toggle="dropdown"
                        >
                          Eng
                        </a>
                        <div className="dropdown-menu m-0 bg-secondary rounded-0">
                          <div className="dropdown-item">VN</div>
                          <div className="dropdown-item">Eng</div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex m-3 me-0"></div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <div className="container py-1">
            <nav
              className="navbar navbar-light bg-white w-100 navbar-expand-xl"
              style={{ borderRadius: "10px" }}
            >
              <div className="navbar-brand" style={{ cursor: "pointer" }}>
                <a href="/" className="text-primary display-6 ">
                  <img
                    className="ms-5 d-none d-xl-block"
                    src={Logo}
                    alt="Logo"
                    style={{ width: "80%" }}
                  />
                </a>
              </div>
              <div class="content col-1 d-none d-xl-block">
                <div class="row justify-content-center text-center">
                  <div class="">
                    <div class="dropdown custom-dropdown">
                      <div
                        class="dropdown-link"
                        aria-haspopup="true"
                        aria-expanded="false"
                        className="d-flex"
                        onClick={() => setShowDropdown(!showDropdown)}
                        style={{ cursor: "pointer" }}
                      >
                        <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_menu.svg" />
                        <i className="fa-solid fa-chevron-down d-flex justify-content-center align-items-center"></i>
                      </div>

                      <div
                        className={`dropdown-menu check active`}
                        aria-labelledby="dropdownMenuButton"
                      >
                        <div class="mega-menu d-flex">
                          <div>
                            <h3 class="text-primary">Categories</h3>
                            <ul class="list-unstyled border-primary">
                              {categories.map((category) => (
                                <li key={category.id}>
                                  <a href={`/filter?categories=${category.id}`}>
                                    {category.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h3 class="text-warning">Publisher</h3>
                            <ul class="list-unstyled border-warning">
                              {publishers.map((publisher) => (
                                <li key={publisher.id}>
                                  <a href={`/filter?publisher=${publisher.id}`}>
                                    {publisher.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h3 class="text-danger">Promotions</h3>
                            <ul class="list-unstyled border-danger">
                              {promotions.map((promotion) => (
                                <li key={promotion.id}>
                                  <a href="#">{promotion.name}</a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex m-3 col-6 col-lg-5">
                <div
                  className="position-relative mx-auto"
                  style={{ width: "100%" }}
                >
                  <input
                    className="form-control border-2 border-secondary px-4 rounded-pill"
                    type="text"
                    placeholder="Search"
                    value={searchKeyword}
                    onChange={handleSearchChange}
                    onKeyPress={handleKeyPress}
                  />
                  <button
                    type="submit"
                    className="btn btn-danger border-2 border-secondary px-4 position-absolute rounded-pill text-white h-100"
                    style={{ top: "0", right: "0" }}
                    onClick={handleSearch}
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </div>
              </div>
              <div className="col-3 d-flex" style={{ color: "gray" }}>
                <div className="position-relative my-auto mx-4">
                  <i
                    className="fa-solid fa-heart fs-3 d-flex justify-content-center"
                    style={{ cursor: "pointer" }}
                  ></i>
                  <span
                    className="position-absolute bg-warning rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                    style={{ top: "-10px", right: "-5px" }}
                  >
                    {cartSize}
                  </span>
                  <div className="wishlist text-center d-none d-md-block">
                    Favorites
                  </div>
                </div>
                <div className="position-relative mx-4 my-auto">
                  <i
                    className="fa-solid fa-cart-shopping fs-3 d-flex justify-content-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      Cart();
                    }}
                  ></i>
                  <span
                    className="position-absolute bg-warning rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                    style={{ top: "-10px", right: "-5px" }}
                  >
                    {cartSize}
                  </span>
                  <div className="text-center d-none d-md-block">Cart</div>
                </div>
                <div className="my-auto mx-4">
                  <div className="dropdown">
                    <div
                      className="dropdown-toggle profile"
                      type="button"
                      id="dropdownMenuButton"
                      data-mdb-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa-solid fa-user fs-3 d-flex justify-content-center nav-item dropdown"></i>
                      <div className="text-center d-none d-md-block">
                        Profile
                      </div>
                    </div>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                      style={{ width: "12rem" }}
                    >
                      {!isAuthenticated ? (
                        <>
                          <li className="d-flex justify-content-center my-3">
                            <button
                              type="button"
                              className="btn btn-outline-danger fw-bold fs-4"
                              style={{ width: "80%" }}
                              onClick={Login}
                            >
                              Sign In
                            </button>
                          </li>
                          <li className="d-flex justify-content-center mb-3">
                            <button
                              type="button"
                              className="btn btn-outline-danger fw-bold fs-4"
                              style={{ width: "80%" }}
                              onClick={SignUp}
                            >
                              Sign Up
                            </button>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="d-flex justify-content-center my-3">
                            <button
                              type="button"
                              className="btn btn-outline-danger fw-bold fs-4"
                              style={{ width: "80%" }}
                              onClick={() => {
                                Account();
                              }}
                            >
                              Account
                            </button>
                          </li>
                          <li className="d-flex justify-content-center my-3">
                            <button
                              type="button"
                              className="btn btn-outline-danger fw-bold fs-4"
                              style={{ width: "80%" }}
                              onClick={() => {
                                Logout();
                              }}
                            >
                              Log out
                            </button>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          {/* <div
            className="d-none d-xl-flex justify-content-center"
            style={{ backgroundColor: "#6FD4A8" }}
          >
            <img
              src="https://cdn0.fahasa.com/media/wysiwyg/Thang-03-2024/NCCDinhTi_T323_BannerHeader_1263x60.jpg"
              alt=""
            />
          </div> */}
        </div>
      </div>
    </>
  );
};
export default Header;
