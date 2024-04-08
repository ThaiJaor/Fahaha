import "./Card.scss";

const Card = ({ data, salePrice }) => {
  return (
    <>
      <div className="card mb-2" style={{ width: "18rem", border: "0" }}>
        <a href="">
          <img
            src={data.image}
            className="card-img-top mt-3"
            alt="Product Image"
          />
          <div className="card-body">
            <h5 className="card-title fs-6 fw-bold text-dark">{data.title}</h5>
            <div className="card-text">
              <div
                className="sale_off sale_off text-white bg-danger px-2 py-1 rounded position-absolute"
                style={{ left: "5.5rem" }}
              >
                -{data.sale_off}%
              </div>
              <div className="price text-danger fw-bold me-5">
                {salePrice}0đ
              </div>
              <div className="cost text-secondary fs-6 text-decoration-line-through mb-0">
                {data.price}
              </div>
            </div>
          </div>
        </a>
      </div>
    </>
  );
};

export default Card;
