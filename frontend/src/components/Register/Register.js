import React from "react";
import "./Register.scss";
import Logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";

function Register(props) {
  const navigate = useNavigate();
  const Login = () => {
    navigate("/sign_in");
  };
  return (
    <>
      <section
        className="vh-100"
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
                  </div>
                  <div
                    className="col-md-6 col-lg-7 d-flex align-items-center"
                    style={{ borderRadius: "1rem", backgroundColor: "white" }}
                  >
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form>
                        <div className="d-flex align-items-center justify-content-center mb-3 pb-1">
                          <i
                            className="fas fa-cubes fa-2x me-3"
                            style={{ color: "#ff6219" }}
                          ></i>
                          <span className="h1 fw-bold mb-0">Sign-up</span>
                        </div>
                        <div className="form-outline mb-4">
                          <label>Email:</label>
                          <input
                            type="email"
                            id="email"
                            className="form-control form-control-lg"
                            placeholder="Email address"
                            style={{ fontSize: "1rem" }}
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <label>Username:</label>
                          <input
                            type="username"
                            id="username"
                            className="form-control form-control-lg"
                            placeholder="Username"
                            style={{ fontSize: "1rem" }}
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
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label>Confirm Password:</label>
                          <input
                            type="password"
                            id="form1Example23"
                            className="form-control form-control-lg"
                            placeholder="Confirm Password"
                            style={{ fontSize: "1rem" }}
                          />
                        </div>
                        <div className="pt-1 mb-4 d-grid gap-2">
                          <button
                            type="button"
                            className="btn btn-lg btn-blockt text-light"
                            style={{ backgroundColor: "#FF6C6B" }}
                          >
                            Sign Up
                          </button>
                        </div>
                        <div className="d-grid">
                          <button
                            className="btn btn-outline-success btn-block"
                            onClick={Login}
                          >
                            Already've have an account? Login
                          </button>
                        </div>
                        <div className="divider d-flex align-items-center my-4">
                          <p className="text-center fw-bold mx-3 mb-0 text-muted">
                            OR
                          </p>
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

export default Register;