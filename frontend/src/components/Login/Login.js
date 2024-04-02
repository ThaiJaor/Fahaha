import React, { useState, useEffect } from "react";
import "./Login.scss";
import Logo from "../../assets/Logo.png";
import Book from "../../assets/Book.png";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/slices/userSlices";
function Login(props) {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const isLoading = useSelector(state => state.user.isLoading);
  const Register = () => {
    navigate("/sign_up");
  };
  const handleLogin = (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password
    }
    try {
      dispatch(login(loginData));
    } catch (error) {
      console.log('Error in login', error);
    }
  }
  useEffect(() => {
    // Kiểm tra nếu isAuthenticated là true thì chuyển hướng đến trang chính
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, isLoading]);
  return (
    <>
      <section
        className="login-form"
        style={{
          backgroundColor: "#9A616D",
          backgroundImage:
            "url(https://i.pinimg.com/564x/9d/fd/af/9dfdaf8cc86f67d81d41b1d254629498.jpg)",
        }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div
                className="card"
                style={{
                  borderRadius: "1rem",
                  backgroundColor: "#C65150",
                }}
              >
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img src={Logo} className="img-fluid" alt="Logo" />
                    <img
                      src={Book}
                      className="img-fluid"
                      alt="Logo"
                      style={{ paddingBottom: "8em", paddingTop: "2rem" }}
                    />
                  </div>
                  <div
                    className="col-md-6 col-lg-7 d-flex align-items-center"
                    style={{ borderRadius: "1rem", backgroundColor: "white" }}
                  >
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={(e) => { handleLogin(e) }}>
                        <div className="d-flex align-items-center justify-content-center mb-3 pb-1">
                          <i
                            className="fas fa-cubes fa-2x me-3"
                            style={{ color: "#ff6219" }}
                          ></i>
                          <span className="h1 fw-bold mb-0">Sign-up</span>
                        </div>
                        <div className="d-flex flex-column">
                          <a
                            className="btn btn-primary btn-lg btn-block mb-2"
                            style={{ backgroundColor: "#3b5998" }}
                            href="#!"
                            role="button"
                          >
                            <i className="fab fa-facebook-f me-2"></i>Continue
                            with Facebook
                          </a>
                          <a
                            className="btn btn-primary btn-lg btn-block"
                            style={{ backgroundColor: "#55acee" }}
                            href="#!"
                            role="button"
                          >
                            <i className="fab fa-google me-2"></i>Continue with
                            Google
                          </a>
                        </div>
                        <div className="divider d-flex align-items-center my-4">
                          <p className="text-center fw-bold mx-3 mb-0 text-muted">
                            OR
                          </p>
                        </div>
                        <div className="form-outline mb-4">
                          <label>Email:</label>
                          <input
                            type="email"
                            id="email"
                            className="form-control form-control-lg"
                            placeholder="Email"
                            style={{ fontSize: "1rem" }}
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label>Password:</label>
                          <input
                            type="password"
                            id="password"
                            className="form-control form-control-lg"
                            placeholder="Password"
                            style={{ fontSize: "1rem" }}
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                          />
                        </div>
                        <div className="pt-1 mb-4 d-grid gap-2">
                          <button
                            type="submit"
                            className="btn btn-lg btn-block text-light"
                            style={{ backgroundColor: "#FF6C6B" }}

                          >
                            Sign In
                          </button>
                        </div>
                        {/* <div className="d-flex justify-content-around align-items-center mb-4">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="form1Example3"
                              checked
                            />
                            <label className="form-check-label" for="form1Example3">
                              {" "}
                              Remember me{" "}
                            </label>
                          </div>
                          <a href="#!">Forgot password?</a>
                        </div> */}
                        <div className="d-grid">
                          <button
                            className="btn btn-outline-success btn-block"
                            onClick={Register}
                          >
                            Create New Account
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
