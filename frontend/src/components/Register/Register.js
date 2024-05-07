import React, { useState, useEffect } from "react";
import "./Register.scss";
import Logo from "../../assets/Logo.png";
import Book from "../../assets/Book.png";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../redux/slices/userSlices";
import { toast } from "react-toastify";

function Register(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registered, setRegistered] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);

  const handleRegister = (e) => {
    e.preventDefault();
    // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/;

    // Kiểm tra mật khẩu nhập lại
    if (password !== confirmPassword) {
      setIsValidConfirmPassword(false);
      toast.error("Passwords do not match!");
      return;
    }

    // Kiểm tra xem email có hợp lệ không
    if (!email) {
      setIsValidEmail(false);
      toast.error("Email is required");
      return;
    }
    let re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      setIsValidEmail(false);
      toast.error("Please enter a valid email address");
      return;
    }

    // Kiểm tra xem username có hợp lệ không
    if (!username) {
      setIsValidUsername(false);
      toast.error("Username is required");
      return;
    }

    // Kiểm tra xem password có hợp lệ không
    if (!password) {
      setIsValidPassword(false);
      toast.error("Password is required");
      return;
    }

    if (!passwordRegex.test(password)) {
      setIsValidPassword(false);
      toast.error(
        "Password must have at least eight characters, at most 32 characters, at least one uppercase letter, one lowercase letter and one number"
      );
      return;
    }
    const registerData = {
      email: email,
      username: username,
      password: password,
      password2: confirmPassword,
    };

    // Gửi yêu cầu đăng ký đến backend
    try {
      dispatch(register(registerData)).then((response) => {
        // Nếu đăng ký thành công, chuyển hướng sang trang đăng nhập
        if (response.payload.detail === "Register User Successfully") {
          setRegistered(true);
        }
      });
    } catch (error) {
      console.error("Error in register", error);
    }
  };
  useEffect(() => {
    if (registered) {
      navigate("/sign_in");
    }
  }, [registered, navigate]);
  const Login = () => {
    navigate("/sign_in");
  };
  return (
    <>
      <section
        className="signup-form"
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
                    <a href="http://localhost:3000">
                      <img src={Logo} className="img-fluid" alt="Logo" />
                    </a>
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
                      <form onSubmit={handleRegister}>
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
                            name="email"
                            className="form-control form-control-lg"
                            placeholder="Email address"
                            style={{ fontSize: "1rem" }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <label>Username:</label>
                          <input
                            type="username"
                            id="username"
                            name="username"
                            className="form-control form-control-lg"
                            placeholder="Username"
                            style={{ fontSize: "1rem" }}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label>Password:</label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control form-control-lg"
                            placeholder="Password"
                            style={{ fontSize: "1rem" }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label>Confirm Password:</label>
                          <input
                            type="password"
                            id="password2"
                            name="confirmPassword"
                            className="form-control form-control-lg"
                            placeholder="Confirm Password"
                            style={{ fontSize: "1rem" }}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                        <div className="pt-1 mb-4 d-grid gap-2">
                          <button
                            type="submit"
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
