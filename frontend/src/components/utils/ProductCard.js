import React from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
const ProductCard = (props) => {
  const navigate = useNavigate();

  const AddToCardHandler = async () => {
    console.log(props);
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const accessToken = userInfo.token; // Get the Bearer token from userInfo
      const { data } = await axios.post(
        "http://127.0.0.1:8080/api/user/cart",
        { productId: props.id },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(data);
    } catch (error) {}
  };
  return (
    <div className="col-md-4 my-2" style={{ maxWidth: "200px" }}>
      <div className="card  h-100">
        <div className="image-container">
          <div className="first">
            <div className="d-flex justify-content-between align-items-center">
              <span className="wishlist">
                <i className="fa fa-heart-o" />
              </span>
            </div>
          </div>
          {/* Insert caraousel here */}

          <div
            className="carousel slide"
            data-bs-ride="carousel"
            id={`carouselExample-${props.id}`}
          >
            <div className="carousel-inner">
              {props.images?.map((image, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <img
                    src={image}
                    className="d-block w-100 tmb_pic"
                    alt={`Slide ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target={`#carouselExample-${props.id}`}
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target={`#carouselExample-${props.id}`}
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="product-detail-container p-2 text-center h-100 mt-auto  d-flex flex-column">
          <p>
            <a
              href={`/product/${props.id}`}
              target="_blank"
              className="link-secondary"
            >
              <h5>{props.name}</h5>
            </a>
          </p>
          <span className="new-price">Rs. {props.price}</span>
          <div className="d-flex justify-content-between align-items-center pt-1">
            {props.description
              ? props.description.length > 50
                ? props.description.substring(0, 50) + "..."
                : props.description
              : "No Description"}
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
          <div className="d-flex justify-content-between align-items-center pt-1 mt-auto">
            <div>
              <i className="fa fa-star-o rating-star" />
              <span className="rating-number">{props.brand}</span>
            </div>
            <span className="buy" type="button" onClick={AddToCardHandler}>
              Add To Cart +
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
