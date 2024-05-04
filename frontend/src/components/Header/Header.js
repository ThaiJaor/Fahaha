import "./Header.scss";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/esm/Container";
import { logout } from "../../redux/slices/userSlices";
const Header = (props) => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartSize = useSelector(state => state.cart.size)
  const Home = () => {
    navigate("/");
  };
  const Login = () => {
    navigate("/sign_in");
  };
  const SignUp = () => {
    navigate("/sign_up");
  };
  const Account = () => {
    navigate("/account")
  }
  const Cart = () => {
    navigate("/cart")
  }

  const Logout = async () => {
    await dispatch(logout());
    navigate("/sign_in");
  }
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
          <div className="container px-0 py-1">
            <nav
              className="navbar navbar-light bg-white w-100 navbar-expand-xl"
              style={{ borderRadius: "10px" }}
            >
              <div className="navbar-brand" style={{ cursor: "pointer" }}>
                <h1 className="text-primary display-6 ">
                  <img
                    className="ms-5 d-none d-xl-block"
                    src={Logo}
                    alt="Logo"
                    style={{ width: "80%" }}
                    onClick={() => { Home() }}
                  />
                </h1>
              </div>
              <button
                className="navbar-toggler py-2 px-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse"
              >
                <span
                  className="fa fa-bars"
                  style={{ color: "#81c408" }}
                ></span>
              </button>
              <div
                className="collapse navbar-collapse bg-white"
                id="navbarCollapse"
              >
                <div className="navbar-nav mx-auto">
                  <div className="nav-item dropdown">
                    <a
                      href="#"
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      <i className="fa-solid fa-table-list fs-1"></i>
                    </a>
                    <div className="dropdown-menu m-0 bg-secondary rounded-0">
                      <a href="cart.html" className="dropdown-item">
                        Cart
                      </a>
                      <a href="chackout.html" className="dropdown-item">
                        Chackout
                      </a>
                      <a href="testimonial.html" className="dropdown-item">
                        Testimonial
                      </a>
                      <a href="404.html" className="dropdown-item">
                        404 Page
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex m-3 col-4">
                <div
                  className="position-relative mx-auto"
                  style={{ width: "100%" }}
                >
                  <input
                    className="form-control border-2 border-secondary px-4 rounded-pill"
                    type="number"
                    placeholder="Search"
                  />
                  <button
                    type="submit"
                    className="btn btn-danger border-2 border-secondary px-4 position-absolute rounded-pill text-white h-100"
                    style={{ top: "0", right: "0" }}
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </div>
              </div>
              <div className="col-lg-4 d-flex" style={{ color: "gray" }}>
                <div className="my-auto mx-4">
                  <i className="fa-solid fa-bell fs-3 d-flex justify-content-center"></i>
                  <div className="">Notification</div>
                </div>
                <div className="position-relative mx-4 my-auto">
                  <i className="fa-solid fa-cart-shopping fs-3 d-flex justify-content-center" style={{ cursor: "pointer" }} onClick={() => { Cart() }}></i>
                  <span
                    className="position-absolute bg-warning rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                    style={{ top: "-10px", right: "-5px" }}
                  >
                    {cartSize}
                  </span>
                  <div className="text-center">Cart</div>
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
                      <div className="text-center">Profile</div>
                    </div>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                      style={{ width: "12rem" }}
                    >
                      {!isAuthenticated ?
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
                        :
                        <>
                          <li className="d-flex justify-content-center my-3">
                            <button
                              type="button"
                              className="btn btn-outline-danger fw-bold fs-4"
                              style={{ width: "80%" }}
                              onClick={() => { Account() }}
                            >
                              Account
                            </button>
                          </li>
                          <li className="d-flex justify-content-center my-3">
                            <button
                              type="button"
                              className="btn btn-outline-danger fw-bold fs-4"
                              style={{ width: "80%" }}
                              onClick={() => { Logout() }}
                            >
                              Log out
                            </button>
                          </li>
                        </>

                      }


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
