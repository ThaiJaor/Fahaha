import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../Card/Card";
import axios from "../../setup/axios";

const BooksFilter = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(12); // Số lượng cuốn sách trên mỗi trang
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedFormats, setSelectedFormats] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minYear, setMinYear] = useState(1900);
  const [maxYear, setMaxYear] = useState(2024);
  const [currentYear, setCurrentYear] = useState(minYear);
  const [selectedPriceScale, setSelectedPriceScale] = useState("");
  const [discounted, setDiscounted] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isChecked, setIsChecked] = useState({});
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const [visibleCategories, setVisibleCategories] = useState(6);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const location = useLocation();
  const nagivate = useNavigate();

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("categories/");
        setCategories(response.data.results);
      } catch (error) {
        console.error("Error fetching recommended books:", error);
      }
    };

    fetchCategories();
  }, []);
  useEffect(() => {
    // Parse query parameters from URL and update state accordingly
    const params = new URLSearchParams(location.search);
    setSelectedCategories(params.getAll("categories"));
    setSelectedFormats(params.getAll("bformat"));
    setMinPrice(params.get("min_sale_price") || "");
    setMaxPrice(params.get("max_sale_price") || "");
    setMinYear(params.get("min_year") || 1900);
    setMaxYear(params.get("max_year") || 2024);
    setDiscounted(params.has("is_discounted"));
    setSearchKeyword(params.get("search") || "");
  }, [location.search]);

  useEffect(() => {
    const fetchFilteredBooks = async () => {
      try {
        const params = new URLSearchParams();
        selectedCategories.forEach((category) =>
          params.append("categories", category)
        );
        selectedFormats.forEach((format) => params.append("bformat", format));
        if (searchKeyword !== "") params.set("search", searchKeyword);
        if (minPrice !== "") params.set("min_sale_price", minPrice);
        if (maxPrice !== "") params.set("max_sale_price", maxPrice);
        if (minYear !== "") params.set("min_year", minYear);
        if (maxYear !== "") params.set("max_year", maxYear);
        if (discounted) params.set("is_discounted", true);

        params.set("limit", 1000);
        const response = await axios.get("/books", { params });
        setBooks(response.data.results);
      } catch (error) {
        console.error("Error fetching filtered books:", error);
      }
    };

    fetchFilteredBooks();
  }, [
    selectedCategories,
    selectedFormats,
    minPrice,
    maxPrice,
    minYear,
    maxYear,
    discounted,
    searchKeyword,
  ]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(books.length / booksPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleToggleCategories = () => {
    setShowAllCategories(!showAllCategories);
    if (showAllCategories) {
      setVisibleCategories(6);
    } else {
      setVisibleCategories(26);
    }
  };
  useEffect(() => {
    const initialCheckedState = {};
    categories.forEach((category) => {
      initialCheckedState[category.id] = selectedCategories.includes(category.id.toString()) || selectedCategories.some(c => c.split('_').includes(category.id.toString()));
    });
    setIsChecked(initialCheckedState);
  }, [categories, selectedCategories]);
  useEffect(() => {
    const updatedCategories = Object.keys(isChecked).filter((id) => isChecked[id]);
    const categoryString = updatedCategories.join("_");
    nagivate(`/filter?categories=${categoryString}`);
  }, [isChecked, nagivate]);

  const handleCategoryChange = (categoryId) => {
    // Cập nhật state mới khi checkbox được click
    setIsChecked((prevState) => ({
      ...prevState,
      [categoryId]: !prevState[categoryId], // Đảo ngược trạng thái check/uncheck khi click
    }));

    const updatedCategories = Object.keys(isChecked).filter((id) => isChecked[id]);

    const categoryString = updatedCategories.join("_");

    nagivate(`/filter?categories=${categoryString}`);
  };

  
  const handleFormatChange = (format) => {
    setSelectedFormats([format]);
  };

  const handlePriceChange = (value) => {
    setSelectedPriceScale(value);
    const [min, max] = value.split("-");
    setMinPrice(min);
    setMaxPrice(max);
  };

  const handleDiscountedChange = () => {
    setDiscounted(!discounted);
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    selectedCategories.forEach((category) =>
      params.append("categories", category)
    );
    selectedFormats.forEach((format) => params.append("bformat", format));
    if (minPrice !== "") params.set("min_sale_price", minPrice);
    if (maxPrice !== "") params.set("max_sale_price", maxPrice);
    if (minYear !== "") params.set("min_year", minYear);
    if (maxYear !== "") params.set("max_year", maxYear);
    if (discounted) params.set("is_discounted", true);

    nagivate(`/filter?${params.toString()}`);
  };

  const handleYearChange = (e) => {
    const yearValue = parseInt(e.target.value);
    setCurrentYear(yearValue);
    setMaxYear(yearValue);
  };
  return (
    <div className="container py-3">
      <div
        className="pb-2 px-0 pt-3"
        style={{ backgroundColor: "white", borderRadius: "8px" }}
      >
        <div className="row">
          <div className="col-3 filter category p-5">
            <div className="cate fs-1">CATEGORIES</div>
            {categories.slice(0, visibleCategories).map((category) => (
              <div key={category.id} className="form-check cate" id="cate">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={category.name}
                  id={category.id}
                  checked={isChecked[category.id]}
                  onChange={() => handleCategoryChange(category.id)}
                />
                <label className="form-check-label" htmlFor={category.id}>
                  {category.name}
                </label>
              </div>
            ))}
            {categories.length > visibleCategories && (
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={handleToggleCategories}
              >
                {showAllCategories ? "Collapse" : "See More"}
              </button>
            )}
            <hr />
            <div className="price fs-1">PRICE SCALE</div>
            <div class="form-check price">
              <input
                class="form-check-input"
                type="checkbox"
                value="0-10"
                id="price-0-10"
                checked={selectedPriceScale === "0-10"}
                onChange={() => handlePriceChange("0-10")}
              />
              <label class="form-check-label" for="flexCheckDefault">
                0 - 10$
              </label>
            </div>
            <div class="form-check price">
              <input
                class="form-check-input"
                type="checkbox"
                value="10-50"
                id="price-10-50"
                checked={selectedPriceScale === "10-50"}
                onChange={() => handlePriceChange("10-50")}
              />
              <label class="form-check-label" for="flexCheckDefault">
                10 - 50$
              </label>
            </div>
            <div class="form-check price">
              <input
                class="form-check-input"
                type="checkbox"
                value="50-100"
                id="price-50-100"
                checked={selectedPriceScale === "50-100"}
                onChange={() => handlePriceChange("50-100")}
              />
              <label class="form-check-label" for="flexCheckDefault">
                50 - 100$
              </label>
            </div>
            <div class="form-check price">
              <input
                class="form-check-input"
                type="checkbox"
                value="100up"
                id="price-100up"
                checked={selectedPriceScale === "100up"}
                onChange={() => handlePriceChange("100up")}
              />
              <label class="form-check-label" for="flexCheckDefault">
                100 Up
              </label>
            </div>
            <hr />
            <div className="format fs-1">FORMAT</div>
            <div class="form-check format">
              <input
                class="form-check-input"
                type="checkbox"
                value="PaperBack"
                id="PaperBack"
                checked={selectedFormats.includes("PaperBack")}
                onChange={() => handleFormatChange("PaperBack")}
              />
              <label class="form-check-label" for="flexCheckDefault">
                PaperBack
              </label>
            </div>
            <div class="form-check format">
              <input
                class="form-check-input"
                type="checkbox"
                value="HardBack"
                id="HardBack"
                checked={selectedFormats.includes("HardBack")}
                onChange={() => handleFormatChange("HardBack")}
              />
              <label class="form-check-label" for="flexCheckDefault">
                HardBack
              </label>
            </div>
            <hr />
            <div className="discount fs-1">DISCOUNTED</div>
            <div class="form-check discount">
              <input
                class="form-check-input"
                type="checkbox"
                id="discount"
                checked={discounted}
                onChange={handleDiscountedChange}
              />
              <label class="form-check-label" for="flexCheckDefault">
                Have discount
              </label>
            </div>
            <hr />
            <div className="year fs-1">YEAR: 1900 - {currentYear}</div>

            <div class="form-check year">
              <input
                type="range"
                class="form-range"
                min="1900"
                max="2024"
                step="1"
                value={currentYear}
                onChange={handleYearChange}
              />
            </div>
          </div>
          <div className="col-9 px-3">
            <div className="title fs-4 fw-bold">
              KẾT QUẢ: {books.length} sản phẩm
              <hr />
            </div>
            <div className="xuhuong show  row">
              {currentBooks.map((book) => (
                <div
                  key={book.id}
                  className="col-xxl-4 col-xl-6 flex justify-content-center align-items-center"
                >
                  <Card data={book} />
                </div>
              ))}
            </div>
            {/* Pagination */}
            <div className="d-flex justify-content-center align-items-center">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li
                    className={`page-item ${currentPage === 1 ? "disabled" : ""
                      }`}
                  >
                    <a
                      className="page-link"
                      href="javascript:;"
                      onClick={handlePrevPage}
                    >
                      <i className="fa-solid fa-angle-left"></i>
                    </a>
                  </li>
                  {Array.from({
                    length: Math.ceil(books.length / booksPerPage),
                  }).map((_, index) => (
                    <li
                      key={index}
                      className={`page-item ${currentPage === index + 1 ? "active" : ""
                        }`}
                    >
                      <a
                        className="page-link"
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </a>
                    </li>
                  ))}
                  <li
                    className={`page-item ${currentPage === Math.ceil(books.length / booksPerPage)
                      ? "disabled"
                      : ""
                      }`}
                  >
                    <a className="page-link" onClick={handleNextPage}>
                      <i className="fa-solid fa-angle-right"></i>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksFilter;