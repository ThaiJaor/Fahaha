import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "./../../setup/axios";
import Card from "../Card/Card";

const BooksFilter = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(12); // Số lượng cuốn sách trên mỗi trang
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isDiscounted, setIsDiscounted] = useState(false);
  const [bformats, setBFormats] = useState([]);
  const [selectedBFormats, setSelectedBFormats] = useState([]);
  const [minSalePrice, setMinSalePrice] = useState("");
  const [maxSalePrice, setMaxSalePrice] = useState("");
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const location = useLocation();
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchFilteredBooks = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const filters = Object.fromEntries(params.entries());

        const response = await axios.get("/books", { params: filters });
        setBooks(response.data.results);
      } catch (error) {
        console.error("Error fetching filtered books:", error);
      }
    };

    fetchFilteredBooks();
  }, [location.search, currentPage]);

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

  const handleCategorySelect = (category) => {
    const index = selectedCategories.indexOf(category);
    if (index === -1) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      const updatedCategories = [...selectedCategories];
      updatedCategories.splice(index, 1);
      setSelectedCategories(updatedCategories);
    }
  };

  // Function to handle B format selection
  const handleBFormatSelect = (bformat) => {
    const index = selectedBFormats.indexOf(bformat);
    if (index === -1) {
      setSelectedBFormats([...selectedBFormats, bformat]);
    } else {
      const updatedBFormats = [...selectedBFormats];
      updatedBFormats.splice(index, 1);
      setSelectedBFormats(updatedBFormats);
    }
  };

  // Function to apply filters
  const applyFilters = () => {
    const filters = {
      categories: selectedCategories.join(","),
      is_discounted: isDiscounted ? "true" : "",
      bformat: selectedBFormats.join(","),
      min_sale_price: minSalePrice,
      max_sale_price: maxSalePrice,
      min_year: minYear,
      max_year: maxYear,
    };

    // You can now use the filters object to update the query string or fetch data
    console.log("Applied filters:", filters);
  };
  return (
    <div className="container py-3">
      <div
        className="pb-2 px-0 pt-3"
        style={{ backgroundColor: "white", borderRadius: "8px" }}
      >
        <div className="row">
          <div className="col-3 filter"></div>
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
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
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
                      className={`page-item ${
                        currentPage === index + 1 ? "active" : ""
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
                    className={`page-item ${
                      currentPage === Math.ceil(books.length / booksPerPage)
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
