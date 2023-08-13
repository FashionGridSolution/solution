import React from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
const ProductCard = (props) => {
  const navigate = useNavigate();
  console.log(props);
  return (
   
    <div className="col-md-4 my-2">
      <div className="card">
        <div className="image-container">
          <div className="first">
            <div className="d-flex justify-content-between align-items-center">
              <span className="discount">-25%</span>
              <span className="wishlist">
                <i className="fa fa-heart-o" />
              </span>
            </div>
          </div>
          {/* Insert caraousel here */}

          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-ride="carousel"
            data-interval="false"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  className="d-block w-100  tmb_pic"
                  src="../images/carouselpic.jpg"
                  alt="First slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block tmb_pic"
                  src="../images/carouselpic2.jpg"
                  alt="Second slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100  tmb_pic"
                  src="../images/carouselpic3.jpg"
                  alt="Third slide"
                />
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleControls"
              role="button"
              data-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleControls"
              role="button"
              data-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
        <div className="product-detail-container p-2 text-center">
          <p>
            <a
            href={`/product/${props.id}`}
            target="_blank"
              className="link-secondary">
              <h3>{props.name}</h3>
            </a></p>
            <span className="new-price">Rs. {props.price}</span>
          <div className="d-flex justify-content-between align-items-center pt-1">
            {props.description?(props.description.length > 50
              ? props.description.substring(0, 50) + "..."
              : props.description):("No Description")}
            {/* <div className="color-select d-flex ">
              <input type="button" name="grey" className="btn btn_card creme" />
              <input type="button" name="red" className="btn btn_card red ml-2" />
              <input type="button" name="blue" className="btn btn_card blue ml-2" />
            </div> */}
            {/* <div className="d-flex ">
              <span className="item-size mr-2 btn btn_card" type="button">
                S
              </span>
              <span className="item-size mr-2 btn btn_card" type="button">
                M
              </span>
              <span className="item-size btn btn_card" type="button">
                L
              </span>
            </div> */}
            {/* <div className="d-flex">
              {props.category_main}
            </div> */}
          </div>
          <div className="d-flex justify-content-between align-items-center pt-1">
            <div>
              <i className="fa fa-star-o rating-star" />
              <span className="rating-number">{props.brand}</span>
            </div>
            <span className="buy">Add To Cart +</span>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default ProductCard;
