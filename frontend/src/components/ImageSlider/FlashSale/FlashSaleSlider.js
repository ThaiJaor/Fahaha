import "./FlashSaleSlider.scss";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const $ = window.$;

const FlashSaleSlider = ({ saleBooks }) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    if (saleBooks.length > 0) {
      $(document).ready(function () {
        $(" .product-carousel").owlCarousel({
          autoplay: true,
          smartSpeed: 1500,
          center: false,
          dots: true,
          loop: true,
          margin: 25,
          nav: true,
          navText: [
            '<i class="fa-solid fa-arrow-right"></i>',
            '<i class="fa-solid fa-arrow-left"></i>',
          ],
          responsiveClass: true,
          responsive: {
            0: {
              items: 1,
            },
            576: {
              items: 1,
            },
            768: {
              items: 2,
            },
            992: {
              items: 3,
            },
            1200: {
              items: 4,
            },
          },
        });
      });
      setDataLoaded(true);
    }
  }, [saleBooks]);

  useEffect(() => {
    if (saleBooks.length > 0) {
      const endDate = new Date(saleBooks[0].promotion.end_date);
      const intervalId = setInterval(() => {
        const now = new Date().getTime();
        const distance = endDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        setCountdown({ days, hours, minutes });

        if (distance < 0) {
          clearInterval(intervalId);
          setCountdown({ days: 0, hours: 0, minutes: 0 });
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [saleBooks]);

  const handleClick = (id) => {
    navigate(`/books/${id}`);
  };
  return (
    <>
      {!dataLoaded && (
        <div className="container d-flex justify-content-center ">
          <div
            className="spinner-border text-danger text-center mt-3"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {dataLoaded && (
        <div
          className="container-fluid vesitable my-5"
          style={{
            backgroundImage:
              "url(https://cdn0.fahasa.com/media/fahasa_web_image/flash_sale_background_image.jpg)",
          }}
        >
          <div className="container">
            <div className="pt-4">
              <div className="bg-light p-4 rounded d-flex">
                <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/flashsale/label-flashsale.svg?q=" />
                <div className="countdown d-flex">
                  <div className="fs-4 text-white bg-secondary ms-3 p-2 rounded ">
                    {countdown.days}
                  </div>
                  <div className="fs-4 mx-2">:</div>
                  <div className="fs-4 text-white bg-secondary p-2 rounded">
                    {countdown.hours}
                  </div>
                  <div className="fs-4 mx-2">:</div>
                  <div className="fs-4 text-white bg-danger p-2 rounded">
                    {countdown.minutes}
                  </div>
                </div>
              </div>
            </div>
            <div className="owl-carousel owl-theme product-carousel justify-content-center">
              {saleBooks.map((item, index) => (
                <div
                  className="border border-dark rounded-3 position-relative vesitable-item"
                  style={{ backgroundColor: "#fff" }}
                  onClick={() => handleClick(item.id)}
                >
                  <div className="vesitable-img">
                    <img
                      src={item.image}
                      className="img-fluid rounded-top"
                      alt=""
                      style={{ height: "25rem" }}
                    />
                  </div>
                  <div
                    className="sale_off text-white bg-danger px-3 py-1 rounded-pill position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  >
                    {item.promotion.discount}%
                  </div>
                  <div className="p-4 rounded-bottom">
                    <div className="fw-bold" style={{ fontSize: "0.85rem" }}>
                      {item.title}
                    </div>
                    <div className="mt-3 d-flex">
                      <div className="price_sale text-danger fs-5 fw-bold me-3">
                        {item.sale_price}0đ
                      </div>
                      <div className="cost text-secondary fs-6 text-decoration-line-through mb-0">
                        {item.price}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FlashSaleSlider;
