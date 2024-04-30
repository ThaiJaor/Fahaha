import "./Card.scss";
import { useNavigate } from 'react-router-dom';

const Card = ({ data }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/books/${data.id}`);
  };

  return (
    <>
      <div className="card mb-2" style={{ width: "18rem", border: "0" }} onClick={handleCardClick}>
        <a href="">
          <img
            src={data.image}
            className="card-img-top mt-3"
            alt="Product Image"
            style={{ height: "25rem"}}
          />
          <div className="card-body">
            <h5 className="card-title fs-6 fw-bold text-dark">{data.title}</h5>
            <div className="card-text">
              {data.is_discounted && data.promotion && ( // Kiểm tra nếu có khuyến mãi
                <div
                  className="sale_off sale_off text-white bg-danger px-2 py-1 rounded position-absolute"
                  style={{ left: "5.5rem" }}
                >
                  -{data.promotion.discount}%
                </div>
              )}
              <div className="price text-danger fw-bold me-5">
                {data.sale_price}$
              </div>
              {data.is_discounted && data.price && ( // Kiểm tra nếu có giá gốc
                <div className="cost text-secondary fs-6 text-decoration-line-through mb-0">
                  {data.price}
                </div>
              )}
            </div>
          </div>
        </a>
      </div>
    </>
  );
};


export default Card;
