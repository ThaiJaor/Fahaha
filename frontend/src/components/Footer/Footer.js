import "./Footer.scss";
import React, { useState } from "react";

const Footer = (props) => {
  return (
    <>
      <div
        className="container-fluid footer"
        style={{ backgroundColor: "#f0f0f0" }}
      >
        <div
          className="container py-5 bg-white"
          style={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
        >
          <div
            className="pb-4 mb-4"
            style={{ borderBottom: "1px solid rgba(226, 175, 24, 0.5)" }}
          >
            <div className="row g-4">
              <div className="col-lg-4 d-flex justify-content-center align-items-center">
                <div className="d-flex align-items-center ">
                  <i className="fs-4 fa-solid fa-envelope mx-3"></i>
                  <div className="fs-4 fw-bold text-dark mb-0">
                    ĐĂNG KÝ NHẬN BẢN TIN
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="position-relative mx-auto">
                  <input
                    className="form-control border border-danger w-100 py-3 px-4 rounded-pill"
                    type="number"
                    placeholder="Your Email"
                  />
                  <button
                    type="submit"
                    className="btn btn-danger border border-secondary py-3 px-4 position-absolute rounded-pill text-white"
                    style={{ top: "0", right: "0" }}
                  >
                    Đăng ký
                  </button>
                </div>
              </div>
              <div className="col-lg-4 d-flex justify-content-center align-items-center">
                <div className="d-flex justify-content-center align-items-center">
                  <a
                    className="btn  btn-outline-secondary me-2 btn-md-square rounded-circle"
                    href=""
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    className="btn btn-outline-secondary me-2 btn-md-square rounded-circle"
                    href=""
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    className="btn btn-outline-secondary me-2 btn-md-square rounded-circle"
                    href=""
                  >
                    <i className="fab fa-youtube"></i>
                  </a>
                  <a
                    className="btn btn-outline-secondary btn-md-square rounded-circle"
                    href=""
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <div className="footer-item ms-5">
                <div className="">
                  <div className="fs-1 fw-bold text-danger mb-0">FAHAHA</div>
                  <div className="text-secondary mb-0">Bookstore</div>
                </div>
                <div className="mb-4">
                  Công Ty Cổ Phần Phát Hành Sách TP HCM - FAHASA
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex flex-column text-start footer-item">
                <h4 className="text-dark mb-3">DỊCH VỤ</h4>
                <a className="btn-link" href="">
                  About Us
                </a>
                <a className="btn-link" href="">
                  Contact Us
                </a>
                <a className="btn-link" href="">
                  Privacy Policy
                </a>
                <a className="btn-link" href="">
                  Terms & Condition
                </a>
                <a className="btn-link" href="">
                  Return Policy
                </a>
                <a className="btn-link" href="">
                  FAQs & Help
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex flex-column text-start footer-item">
                <h4 className="text-dark mb-3">TÀI KHOẢN CỦA TÔI</h4>
                <a className="btn-link" href="">
                  My Account
                </a>
                <a className="btn-link" href="">
                  Shop details
                </a>
                <a className="btn-link" href="">
                  Shopping Cart
                </a>
                <a className="btn-link" href="">
                  Wishlist
                </a>
                <a className="btn-link" href="">
                  Order History
                </a>
                <a className="btn-link" href="">
                  International Orders
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-item">
                <h4 className="text-dark mb-3">LIÊN HỆ</h4>
                <p>Address: 1429 Netus Rd, NY 48247</p>
                <p>Email: Example@gmail.com</p>
                <p>Phone: +0123 4567 8910</p>
                <p>Payment Accepted</p>
                <img src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/vnpay_logo.png" className="img-fluid" style={{maxWidth: "120px"}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
