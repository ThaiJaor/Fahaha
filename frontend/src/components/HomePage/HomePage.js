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
import Chatbot from "../Chatbot/Chatbot.js";

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

      // Lọc ra những cuốn sách có promotion tương ứng
      const saleBooks = bookDetails.filter((book) => {
        return book.promotion && book.promotion.id === randomPromotion.id;
      });
      setSaleBooks(saleBooks);
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
                  className="col-lg-5"
                  style={{ borderRight: "1px #d7d7d7 solid" }}
                >
                  {topRatedBooks.map((book, index) => (
                    <div
                      key={index}
                      className="d-flex mt-3 showbook"
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
                <div className="col-lg-7">
                  {selectedBook && (
                    <div className="ms-2">
                      <div className="d-flex">
                        <img
                          className="ms-3"
                          src={selectedBook.image}
                          style={{ width: "30%", height: "30%" }}
                        />
                        <div className="m-3">
                          <div className="fs-3 fw-bold">
                            {selectedBook.title}
                          </div>
                          <div className="fs-6">
                            Tác giả: {selectedBook.author}
                          </div>
                          <div>Nhà xuất bản: {selectedBook.publisher.name}</div>

                          <div className="text-danger fw-bold my-3">
                            {" "}
                            {selectedBook.sale_price}$
                          </div>
                          <div className="fs-4 fw-bold">
                            {selectedBook.title}
                          </div>
                          <div className="fs-6">
                            {" "}
                            {selectedBook.description}
                          </div>
                        </div>
                      </div>

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

        <Chatbot />

        <div className="image-slider p-5">
          <section className="pt-5 pb-5 mx-5">
            <div className="">
              <div className="top d-flex pt-3 px-3">
                <div className="col-6">
                  <h2 className="mb-3">RECOMMEND</h2>
                </div>
                <div className="col-6 text-right d-flex justify-content-end align-items-center">
                  <a
                    className="btn btn-primary mb-3 mr-1 mx-3"
                    href="#carouselExampleIndicators2"
                    role="button"
                    data-bs-slide="prev"
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                  </a>
                  <a
                    className="btn btn-primary mb-3"
                    href="#carouselExampleIndicators2"
                    role="button"
                    data-bs-slide="next"
                  >
                    <i className="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              </div>

              <div className="p-3 bot">
                <div
                  id="carouselExampleIndicators2"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <div class="row">

                                <div class="col-md-4 mb-3">
                                    <div class="card">
                                        <img class="img-fluid" alt="100%x280" src="https://images.unsplash.com/photo-1532781914607-2031eca2f00d?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=7c625ea379640da3ef2e24f20df7ce8d" />
                                        <div class="card-body">
                                            <h4 class="card-title">Special title treatment</h4>
                                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>

                                        </div>

                                    </div>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <div class="card">
                                        <img class="img-fluid" alt="100%x280" src="https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=42b2d9ae6feb9c4ff98b9133addfb698" />
                                        <div class="card-body">
                                            <h4 class="card-title">Special title treatment</h4>
                                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>

                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <div class="card">
                                        <img class="img-fluid" alt="100%x280" src="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=3d2e8a2039c06dd26db977fe6ac6186a" />
                                        <div class="card-body">
                                            <h4 class="card-title">Special title treatment</h4>
                                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="carousel-item">
                            <div class="row">

                                <div class="col-md-4 mb-3">
                                    <div class="card">
                                        <img class="img-fluid" alt="100%x280" src="https://images.unsplash.com/photo-1532771098148-525cefe10c23?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=3f317c1f7a16116dec454fbc267dd8e4"/>
                                        <div class="card-body">
                                            <h4 class="card-title">Special title treatment</h4>
                                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>

                                        </div>

                                    </div>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <div class="card">
                                        <img class="img-fluid" alt="100%x280" src="https://images.unsplash.com/photo-1532715088550-62f09305f765?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=ebadb044b374504ef8e81bdec4d0e840"/>
                                        <div class="card-body">
                                            <h4 class="card-title">Special title treatment</h4>
                                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>

                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <div class="card">
                                        <img class="img-fluid" alt="100%x280" src="https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=0754ab085804ae8a3b562548e6b4aa2e"/>
                                        <div class="card-body">
                                            <h4 class="card-title">Special title treatment</h4>
                                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="carousel-item">
                            <div class="row">

                                <div class="col-md-4 mb-3">
                                    <div class="card">
                                        <img class="img-fluid" alt="100%x280" src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=ee8417f0ea2a50d53a12665820b54e23"/>
                                        <div class="card-body">
                                            <h4 class="card-title">Special title treatment</h4>
                                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>

                                        </div>

                                    </div>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <div class="card">
                                        <img class="img-fluid" alt="100%x280" src="https://images.unsplash.com/photo-1532777946373-b6783242f211?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=8ac55cf3a68785643998730839663129"/>
                                        <div class="card-body">
                                            <h4 class="card-title">Special title treatment</h4>
                                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>

                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <div class="card">
                                        <img class="img-fluid" alt="100%x280" src="https://images.unsplash.com/photo-1532763303805-529d595877c5?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=5ee4fd5d19b40f93eadb21871757eda6"/>
                                        <div class="card-body">
                                            <h4 class="card-title">Special title treatment</h4>
                                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

    </>
  );
};
export default HomePage;
