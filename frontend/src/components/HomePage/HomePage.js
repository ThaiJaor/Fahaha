import "./HomePage.scss";
import ImageSteper from "../ImageSlider/ImageSlider.js";
import FlashSaleSlider from "../ImageSlider/FlashSale/FlashSaleSlider.js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBooks,
  fetchCategories,
  fetchAllBookDetails,
  fetchPromotions,
  fetchPublishers,
} from "../../redux/slices/bookSlice.js";
import "../../assets/css/theme.scss";
import Card from "../Card/Card.js";

const HomePage = (props) => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const categories = useSelector((state) => state.books.categories);
  const bookDetails = useSelector((state) => state.books.bookDetails);
  const promotions = useSelector((state) => state.books.promotions);
  const publishers = useSelector((state) => state.books.publishers);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [randomCategories, setRandomCategories] = useState([]);
  const [randomPublishers, setRandomPublishers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [randomBooks, setRandomBooks] = useState([]);

  const [activeTab, setActiveTab] = useState("rating");

  const [saleBooks, setSaleBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dispatch actions to fetch data from the server
        await Promise.all([
          dispatch(fetchBooks()),
          dispatch(fetchCategories()),
          dispatch(fetchAllBookDetails()).then(() => {
            // Sau khi fetchAllBookDetails hoàn thành, gọi fetchPromotions
            dispatch(fetchPromotions());
            dispatch(fetchPublishers());
          }),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [dispatch]);
  useEffect(() => {
    // Chỉ chạy khi promotions thay đổi
    if (promotions && promotions.length > 0) {
      // Chọn ngẫu nhiên một promotion
      const randomPromotion =
        promotions[Math.floor(Math.random() * promotions.length)];
      setSelectedPromotion(randomPromotion);
      console.log(randomPromotion);

      // Lọc ra những cuốn sách có promotion tương ứng
      const saleBooks = bookDetails.filter((book) => {
        return book.promotion && book.promotion.id === randomPromotion.id;
      });
      setSaleBooks(saleBooks);
      console.log(saleBooks);
    }
  }, [promotions]);
  useEffect(() => {
    const randomCategories = [...categories]
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
    const randomPublishers = [...publishers]
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
    setRandomCategories(randomCategories);
    setRandomPublishers(randomPublishers);
  }, [categories, publishers]);

  //Lấy ảnh ngẫu nhiên theo cate
  const getRandomBookImage = (categoryId) => {
    const filteredBooks = bookDetails.filter((book) => {
      return book.categories.some((cat) => cat.id === categoryId);
    });

    if (filteredBooks.length === 0) return null;

    const randomBook =
      filteredBooks[Math.floor(Math.random() * filteredBooks.length)];
    return randomBook.image;
  };
  //Lấy ảnh ngẫu nhiên theo tác giả
  const getRandomBookImagePublisher = (publisherID) => {
    const filteredBooks = bookDetails.filter((book) => {
      return book.publisher.id === publisherID;
    });

    if (filteredBooks.length === 0) return null;

    const randomBook =
      filteredBooks[Math.floor(Math.random() * filteredBooks.length)];
    return randomBook.image;
  };

  //Filter theo tab

  const tabs = [
    { id: "rating", label: "Sách được đánh giá cao" },
    { id: "sold", label: "Sách HOT trong ngày" },
  ];

  const filterDataByTab = (tab) => {
    switch (tab) {
      case "rating":
        // Lọc dữ liệu theo rating cao
        return bookDetails.filter((item) => item.rating >= 4.5);
      case "sold":
        // Lọc dữ liệu theo số lượng sách đã bán (sold)
        return bookDetails.filter((item) => item.sold > 100);
      default:
        return [];
    }
  };

  const getRandomBooks = (data) => {
    const shuffled = data.sort(() => 0.5 - Math.random()); // Xáo trộn mảng
    return shuffled.slice(0, 8); // Chọn 8 phần tử đầu tiên
  };

  useEffect(() => {
    const updateRandomData = () => {
      const filteredData = filterDataByTab(activeTab);
      const randomBooksData = getRandomBooks(filteredData);
      setFilteredData(filteredData);
      setRandomBooks(randomBooksData);
    };

    updateRandomData();
  }, [activeTab, bookDetails]);

  // Function để set activeTab mới khi chọn tab
  const handleActiveTab = (tabId) => {
    setActiveTab(tabId);
  };

  const [topRatedBooks, setTopRatedBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedTab, setSelectedTab] = useState("2");

  const tabs2 = [
    { id: "2", label: "Biography" },
    { id: "3", label: "Business Finance Law" },
    { id: "4", label: "Childrens Books" },
    { id: "9", label: "Entertainment" },
    { id: "10", label: "Food Drink" },
    { id: "15", label: "Humour" },
  ];
  useEffect(() => {
    if (selectedTab) {
      const categoryId = parseInt(selectedTab);
      const filteredBooks = bookDetails.filter((book) =>
        book.categories.some((cat) => cat.id === categoryId)
      );
      const sortedBooks = filteredBooks.sort((a, b) => b.rating - a.rating);
      const top5Books = sortedBooks.slice(0, 5);
      setTopRatedBooks(top5Books);
      setSelectedBook(top5Books[0]);
    }
  }, [selectedTab, bookDetails]);
  const handleBookHover = (book) => {
    setSelectedBook(book);
  };
  const handleTabChange = (tabId) => {
    setSelectedTab(tabId);
  };

  return (
    <>
      <div className="content" style={{ backgroundColor: "#f0f0f0" }}>
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
          <FlashSaleSlider saleBooks={saleBooks} />
        </div>

        {/* Phần categories*/}

        <section className="pt-md-9 category" id="service">
          <div className="container">
            <div className="mb-7 text-center">
              <h5 className="fs-5 text-secondary">CATEGORIES </h5>
            </div>
            <div className="row">
              {randomCategories.map((item, index) => (
                <div
                  className="col-lg-3 col-sm-6 mb-6"
                  style={{ zIndex: "1" }}
                  key={index}
                >
                  <div
                    className="card service-card shadow-hover rounded-3 text-center align-items-center"
                    style={{ height: "15rem" }}
                  >
                    <div className="card-body p-xxl-4 p-4">
                      <img
                        className="img-category"
                        width="75"
                        alt="Service"
                        src={getRandomBookImage(item.id)}
                      />
                      <div className="my-3 category-title fs-2">
                        {item.name}
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
                      onClick={() => handleActiveTab(tab.id)}
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
                {randomBooks.map((item, index) => (
                  <div
                    className="col-xxl-3 col-xl-4 col-md-6 flex justify-content-center align-items-center"
                    key={index}
                  >
                    <Card data={item} />
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
        {/* Kết thúc phần categories*/}

        {/* Phần publishers*/}

        <section className="pt-md-9 category" id="service">
          <div className="container">
            <div className="mb-7 text-center">
              <h5 className="fs-5 text-secondary">PUBLISHERS </h5>
            </div>
            <div className="row">
              {randomPublishers.map((item, index) => (
                <div
                  className="col-lg-3 col-sm-6 mb-6"
                  style={{ zIndex: "1" }}
                  key={index}
                >
                  <div
                    className="card service-card shadow-hover rounded-3 text-center align-items-center"
                    style={{ height: "15rem" }}
                  >
                    <div className="card-body p-xxl-4 p-4">
                      <img
                        className="img-category"
                        width="75"
                        alt="Service"
                        src={getRandomBookImagePublisher(item.id)}
                      />
                      <div className="my-3 publishers-title fs-2">
                        {item.name}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="product rating xuhuong container pb-5">
          <div
            className="title p-3 d-flex"
            style={{ backgroundColor: "#333333", borderRadius: "8px 8px 0 0" }}
          >
            <div className="ms-2 fs-4 fw-bold text-white align-items-center">
              Đánh giá cao
            </div>
          </div>
          <div
            className="container-fluid"
            style={{ backgroundColor: "white", borderRadius: "0 0 8px 8px" }}
          >
            <div className="row">
              <ul className="nav nav-tabs mb-3" id="myTab" role="tablist">
                {tabs2.map((tab) => (
                  <li className="nav-item" key={tab.id}>
                    <button
                      className={`nav-link ${
                        selectedTab === tab.id ? "active" : ""
                      }`}
                      onClick={() => handleTabChange(tab.id)}
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
                <div
                  className="col-lg-4"
                  style={{ borderRight: "1px #d7d7d7 solid" }}
                >
                  {topRatedBooks.map((book, index) => (
                    <div
                      key={index}
                      className="d-flex mt-3"
                      onMouseEnter={() => handleBookHover(book)}
                    >
                      <div className="col-2 d-flex justify-content-center flex-column">
                        <div> {index + 1} </div>
                        <div>
                          {" "}
                          <i
                            className="fa-solid fa-arrow-up"
                            style={{ color: "green" }}
                          ></i>{" "}
                        </div>
                      </div>
                      <div className="d-flex">
                        <img
                          className="img-small"
                          style={{ width: "100px", height: "100px" }}
                          src={book.image}
                          alt=""
                        />
                        <div className="ms-3 d-flex flex-column">
                          <div className="title fs-6"> {book.title} </div>
                          <div className="title fs-6">
                            {" "}
                            Lượt bán: {book.sold}{" "}
                          </div>
                          <div className="rating fw-bold text-danger">
                            Đánh giá: {book.rating}{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="col-lg-8">
                  {selectedBook && (
                    <div className="ms-2">
                      <h3>{selectedBook.title}</h3>
                      <p>Author: {selectedBook.author}</p>
                      <p>Category: {selectedBook.categories[0].name}</p>
                      {/* Add other details as needed */}
                    </div>
                  )}
                </div>
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
        {/* Phần publishers*/}
      </div>
    </>
  );
};
export default HomePage;
