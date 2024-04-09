import "./HomePage.scss";
import ImageSteper from "../ImageSlider/ImageSlider.js";
import FlashSaleSlider from "../ImageSlider/FlashSale/FlashSaleSlider.js";
import React, { useEffect, useState } from "react";

import "../../assets/css/theme.scss";
import Card from "../Card/Card.js";

const saleData = [
  {
    image:
      "https://cdn0.fahasa.com/media/catalog/product/d/0/d05de9a6-527e-4d3e-ab14-fb1a0b27508c.jpg",
    price: "517.000",
    title: "Combo Sách [Manga] Dược Sư Tự Sự (Bộ 11 Tập)",
    sale_off: 9,
    tab: "daytrend",
  },
  {
    image:
      "https://cdn0.fahasa.com/media/catalog/product/c/o/combo-1907202300.jpg",
    price: "665.000",
    title: "Combo Sách Tam Thể - Tập 1 + 2 + 3 (Bộ 3 Cuốn)",
    sale_off: 25,
    tab: "daytrend",
  },
  {
    image:
      "https://cdn0.fahasa.com/media/catalog/product/b/i/bia-mem_luat-tam-thuc-vu-tru-nhat-nguyen-luan.jpg",
    price: "288.000",
    title: "Luật Tâm Thức - Vũ Trụ Nhất Nguyên Luận",
    sale_off: 20,
    tab: "daytrend",
  },
  {
    image:
      "https://cdn0.fahasa.com/media/catalog/product/8/9/8936067605693.jpg",
    price: "130.000",
    title: "Khéo Ăn Nói Sẽ Có Được Thiên Hạ (Tái Bản 2022)",
    sale_off: 38,
    tab: ["daytrend", "hotprice"],
  },
  {
    image:
      "https://cdn0.fahasa.com/media/catalog/product/m/o/montessori---phuong-phap-gd-toan-dien-cho-tre-0-_-6-t----b_a-1.jpg",
    price: "119.000",
    title: "Montessori - Phương Pháp Giáo Dục Toàn Diện Cho Trẻ",
    sale_off: 27,
    tab: "daytrend",
  },
  {
    image:
      "https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-tr_c-gcpy-2-1.jpg",
    price: "125.000",
    title: "Ghi Chép Pháp Y - Tập 2 - Khi Tử Thi Biết Nói",
    sale_off: 27,
    tab: ["bestseller", "hotprice"],
  },
  {
    image:
      "https://cdn0.fahasa.com/media/catalog/product/z/5/z5123503468834_d081cebe512336c54ed45485ecde94e0.jpg",
    price: "144.000",
    title: "Bộ Manga - Attack On Titan: Tập 1 - 3 (Bộ 3 Tập)",
    sale_off: 5,
    tab: "daytrend",
  },
  {
    image:
      "https://cdn0.fahasa.com/media/catalog/product/0/5/055cd615-0716-4f98-9ca7-33aef03b4fad.jpg",
    price: "450.000",
    title: "Combo Sách Ghi Chép Pháp Y (Bộ 3 cuốn)",
    sale_off: 30,
    tab: ["daytrend", "hotprice"],
  },
  {
    image:
      "https://cdn0.fahasa.com/media/catalog/product/9/7/9780593640340.jpg",
    price: "229.000",
    title: "Dune (Movie Tie-In)",
    sale_off: 5,
    tab: ["daytrend", "hotprice"],
  },
  {
    image:
      "https://cdn0.fahasa.com/media/catalog/product/8/9/8935270703837.jpg",
    price: "339.000",
    title: "Súng, Vi Trùng và Thép",
    sale_off: 35,
    tab: "bestseller",
  },
  {
    image:
      "https://cdn0.fahasa.com/media/catalog/product/8/9/8935270703905.jpg",
    price: "159.000",
    title: "Bàn cờ lớn  ",
    sale_off: 35,
    tab: "hotprice",
  },
];

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

  const [salePrices, setSalePrices] = useState([]);
  useEffect(() => {
    const calculatedSalePrices = saleData.map((item) => {
      const originalPrice = parseFloat(item.price);
      const salePrice = originalPrice - (originalPrice * item.sale_off) / 100;
      return salePrice.toFixed(2);
    });
    setSalePrices(calculatedSalePrices);
  }, []);

  //Filter theo tab
  const [activeTab, setActiveTab] = useState("daytrend");

  const tabs = [
    { id: "daytrend", label: "Xu hướng theo ngày" },
    { id: "hotprice", label: "Sách HOT - Giảm Sốc" },
    { id: "bestseller", label: "Bestseller Ngoại Văn" },
  ];

  const filterDataByTab = (tab) => {
    return saleData.filter((item) => {
      if (Array.isArray(item.tab)) {
        // Nếu tab của item là một mảng
        return item.tab.includes(tab); // Trả về true nếu tab được chọn nằm trong mảng tab của item
      } else {
        // Nếu tab của item là một giá trị duy nhất
        return item.tab === tab; // Trả về true nếu tab được chọn bằng tab của item
      }
    });
  };
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
                      <img
                        className="img-category"
                        src={item.image}
                        width="75"
                        alt="Service"
                      />
                      <div className="my-3 category-title fs-2">
                        {item.title}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="product xuhuong container pb-5">
          <div
            className="title p-3 d-flex"
            style={{ backgroundColor: "#FCDDEF", borderRadius: "8px 8px 0 0" }}
          >
            <img
              className="mx-2 "
              src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/icon_dealhot_new.png"
              style={{ width: "32px", height: "32px" }}
            />
            <div className="fs-4 fw-bold align-items-center">
              Xu Hướng Mua Sắm
            </div>
          </div>
          <div
            className="container-fluid"
            style={{ backgroundColor: "white", borderRadius: "0 0 8px 8px" }}
          >
            <div className="row">
              <ul className="nav nav-tabs mb-3" id="myTab" role="tablist">
                {tabs.map((tab) => (
                  <li className="nav-item" key={tab.id}>
                    <button
                      className={`nav-link ${
                        activeTab === tab.id ? "active" : ""
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                      aria-selected="true"
                      type="button"
                      role="tab"
                      data-bs-toggle="tab"
                    >
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="container">
              <div className="row pb-2">
                {filterDataByTab(activeTab).map((item, index) => (
                  <div
                    className="col-xxl-3 col-xl-4 col-md-6 flex justify-content-center align-items-center"
                    key={index}
                  >
                    <Card data={item} salePrice={salePrices[index]} />
                  </div>
                ))}
              </div>
              <div class="btn d-flex justify-content-center pb-4">
                <button
                  type="button outline"
                  class="btn btn-outline-danger fw-bold fs-5"
                  style={{ width: "16rem" }}
                >
                  Xem Thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;
