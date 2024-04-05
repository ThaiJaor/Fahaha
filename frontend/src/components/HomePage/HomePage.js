import React from "react";
import "./HomePage.scss";
import ImageSteper from "../ImageSlider/ImageSlider.js";
import FlashSaleSlider from "../ImageSlider/FlashSale/FlashSaleSlider.js";
import "../../assets/css/theme.scss";

const HomePage = (props) => {
  const categoryData = [
    {
      image:
        "https://cdn0.fahasa.com/media/wysiwyg/icon-menu/category/van-hoc.png",
      title: "Văn Học",
    },
    {
      image:
        "https://cdn0.fahasa.com/media/wysiwyg/hieu_kd/2023-08-frame/TLKN.png",
      title: "Tâm Lý Kỹ Năng",
    },
    {
      image:
        "https://cdn0.fahasa.com/media/wysiwyg/hieu_kd/2023-08-frame/output-onlinepngtools.png",
      title: "Sách Ngoại Ngữ Học",
    },
    {
      image:
        "https://cdn0.fahasa.com/media/wysiwyg/Duy-VHDT/ngoai-van-t1-24(1).jpg",
      title: "Ngoại Văn",
    },
  ];
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
        <div>
          <FlashSaleSlider />
        </div>
        <section className="pt-md-9 category" id="service">
          <div className="container">
            <div className="position-absolute z-index--1 end-0 d-none d-lg-block">
              <img
                src="assets/img/category/shape.svg"
                style={{ maxWidth: "200px" }}
                alt="service"
              />
            </div>
            <div className="mb-7 text-center">
              <h5 className="fs-5 text-secondary">CATEGORY </h5>
            </div>
            <div className="row">
              {categoryData.map((item, index) => (
                <div className="col-lg-3 col-sm-6 mb-6" style={{ zIndex: "1" }}>
                  <div className="card service-card shadow-hover rounded-3 text-center align-items-center">
                    <div className="card-body p-xxl-4 p-4">
                      {" "}
                      <img
                        className="img-category"
                        src={item.image}
                        width="75"
                        alt="Service"
                      />
                      <h4 className="my-3 category-title">{item.title}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default HomePage;
