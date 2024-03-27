import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ImageSlider.scss";

const ImageSteper = (props) => {
  const images = [
    "https://cdn0.fahasa.com/media/magentothem/banner7/MayTinh_Slide_840x320_1.jpg",
    "https://cdn0.fahasa.com/media/magentothem/banner7/NCCDinhTi_T323_BannerSlide_840x320.jpg",
    "https://cdn0.fahasa.com/media/magentothem/banner7/BachVietT3_Slide_840x320.jpg",
    "https://cdn0.fahasa.com/media/magentothem/banner7/tranglego_resize_slidebanner_840x320_2.png",
  ];

  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        {images.map((image, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : ""}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
      <div className="carousel-inner ">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""} `}
            data-bs-interval="10000"
          >
            <img
              src={image}
              className="d-block w-100"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default ImageSteper;
