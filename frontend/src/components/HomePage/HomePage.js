import React from "react";
import "./HomePage.scss";
import ImageSteper from "../ImageSlider/ImageSlider.js";

const HomePage = (props) => {
  return (
    <>
      <div className="content" style={{ backgroundColor: "#F0F0F0" }}>
        <div className="container d-block">
          <div className="d-flex p-3 justify-content-center align-items-center">
            <div className="col-11 col-xl-8 d-flex ">
              <ImageSteper />
            </div>
            <div className="col-xl-4 d-none d-xl-flex flex-column">
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/Thang-03-2024/392x156_sacombank_t3.jpg"
                alt="1"
                className="m-3 mb-0  me-0 rounded-3"
              />
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/Thang-03-2024/392x156_zalopay_t3.jpg"
                alt="1"
                className="m-3 me-0 rounded-3"
              />
            </div>
          </div>
          <div className="d-flex">
            <div className="col-sm-3 col-md-3 col-xs-6 px-3">
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/Thang-03-2024/Banner_Quatang_310x210.png"
                className="w-100"
                alt="1"
              />
            </div>
            <div className="col-sm-3 col-md-3 col-xs-6 px-3">
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/Thang-03-2024/Trangforeignbooks_0324_smallbanner_310x210.png"
                className="w-100"
                alt="1"
              />
            </div>
            <div className="col-sm-3 col-md-3 col-xs-6 px-3">
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/Thang-03-2024/BlindBoxT1123_Banner_SmallBanner_310x210.png"
                className="w-100"
                alt="1"
              />
            </div>
            <div className="col-sm-3 col-md-3 col-xs-6 px-3">
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/Thang-03-2024/Saigonbooks_Gold_Ver2_SmallBanner_310x210.png"
                className="w-100"
                alt="1"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;
