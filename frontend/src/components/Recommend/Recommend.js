import "./Recommend.scss";

const Recommend = ({ recommendedBooks }) => {
  const numCarouselItems = Math.ceil(recommendedBooks.length / 3);

  return (
    <div className="image-slider p-5">
      <section className="pb-5 mx-5">
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
              <div className="carousel-inner">
                {[...Array(numCarouselItems)].map((_, index) => (
                  <div
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                    key={index}
                  >
                    <div className="row">
                      {[0, 1, 2].map((cardIndex) => {
                        const recommendedBookIndex = index * 3 + cardIndex;
                        const recommendedBook =
                          recommendedBooks[recommendedBookIndex];
                        if (!recommendedBook) return null;
                        return (
                          <div className="col-md-4 mb-3" key={cardIndex}>
                            <div className="card">
                              <a
                                href={`/books/${recommendedBook.id}`}
                                className="flag-link"
                              >
                                <div className="d-flex justify-content-center">
                                  <img
                                    className="img-fluid"
                                    src={recommendedBook.image}
                                  />
                                </div>

                                <div className="card-body">
                                  <div className="card-title fs-6 fw-bold">
                                    {recommendedBook.title}
                                  </div>
                                  <div className="card-text text-uppercase">
                                    <div className="price text-danger fw-bold">
                                      {recommendedBook.price}
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Recommend;
