import "./FlashSaleSlider.scss";
import React, { useEffect, useState } from "react";
const $ = window.$;

const FlashSaleSlider = (props) => {
  useEffect(() => {
    $(".product-carousel").owlCarousel({
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
    // Tính thời gian còn lại
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 15); // Thêm 15 ngày
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;
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
  }, []);

  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });

  // Số lượng items hiển thị
  const itemCount = 8;
  const Items = new Array(itemCount).fill(null);
  return (
    <>
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
              <div class="countdown">
                <span className="fs-4 text-white bg-secondary ms-3 p-2 rounded ">
                  {countdown.days}
                </span>
                <span className="fs-4 mx-2">:</span>
                <span className="fs-4 text-white bg-secondary p-2 rounded">
                  {countdown.hours}
                </span>
                <span className="fs-4 mx-2">:</span>
                <span className="fs-4 text-white bg-danger p-2 rounded">
                  {countdown.minutes}
                </span>
              </div>
            </div>
          </div>
          <div className="owl-carousel product-carousel justify-content-center">
            {Items.map((item, index) => (
              <div
                className="border border-dark rounded-3 position-relative vesitable-item"
                style={{ backgroundColor: "#fff" }}
              >
                <div className="vesitable-img">
                  <img
                    src="https://cdn0.fahasa.com/media/catalog/product/i/m/image_200752.jpg"
                    className="img-fluid w-100 rounded-top"
                    alt=""
                  />
                </div>
                <div
                  className="sale text-white bg-danger px-3 py-1 rounded-pill position-absolute"
                  style={{ top: "10px", right: "10px" }}
                >
                  50%
                </div>
                <div className="p-4 rounded-bottom">
                  <div className="fs-5 fw-bold">Chìa khóa hạnh phúc</div>
                  <div className="mt-3 d-flex">
                    <div className="price text-danger fs-5 fw-bold me-3">
                      $4.99
                    </div>
                    <div className="cost text-secondary fs-5 text-decoration-line-through mb-0">
                      $10
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FlashSaleSlider;