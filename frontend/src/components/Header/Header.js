import "./Header.scss";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";

const Header = (props) => {
  const navigate = useNavigate();
  const Home = () => {
    navigate("/");
  };
  return (
    <>
      <div className="header d-flex">
        <div
          className="container-fluid fixed-top"
          style={{ backgroundColor: "#F0F0F0" }}
        >
          <div
            className="container topbar d-none d-lg-block"
            style={{ backgroundColor: "#FF6C6B" }}
          >
            <div className="d-flex justify-content-between">
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
              <a href="index.html" className="navbar-brand">
                <h1 className="text-primary display-6">
                  <img src={Logo} alt="Logo" style={{ width: "400px" }} />
                </h1>
              </a>
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
                    className="form-control border-2 border-secondary py-3 px-4 rounded-pill"
                    type="number"
                    placeholder="Search"
                  />
                  <button
                    type="submit"
                    className="btn btn-danger border-2 border-secondary py-3 px-4 position-absolute rounded-pill text-white h-100"
                    style={{ top: "0", right: "0" }}
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </div>
              </div>
              <div className="col-4 d-flex" style={{ color: "gray" }}>
                <div class="my-auto mx-4">
                  <i class="fa-solid fa-bell fs-1 d-flex justify-content-center"></i>
                  <div className="">Notification</div>
                </div>
                <div class="position-relative mx-4 my-auto">
                  <i class="fa-solid fa-cart-shopping fs-1 d-flex justify-content-center"></i>
                  <span
                    class="position-absolute bg-warning rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                    style={{ top: "-10px", right: "-5px" }}
                  >
                    3
                  </span>
                  <div className="text-center">Cart</div>
                </div>
                <div class="my-auto mx-4 navbar-nav">
                  <i class="fa-solid fa-user fs-1 d-flex justify-content-center nav-item dropdown"></i>
                  <div className="">Profile</div>
                </div>
              </div>
            </nav>
          </div>
          <div
            className="d-flex justify-content-center"
            style={{ backgroundColor: "#6FD4A8" }}
          >
            <img
              src="https://cdn0.fahasa.com/media/wysiwyg/Thang-03-2024/NCCDinhTi_T323_BannerHeader_1263x60.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
