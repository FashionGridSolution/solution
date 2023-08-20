import React from "react";
import "./ProductPage.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import axios from "axios";
const ProductPage = (props) => {
  const AddToCardHandler = async () => {
    console.log(product._id);
    try {
      const userInfo = await JSON.parse(localStorage.getItem("userInfo"));
      const accessToken = await userInfo.token; // Get the Bearer token from userInfo
      const { data } = await axios.post(
        "http://127.0.0.1:8080/api/user/cart",
        { productId: product._id },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(data);
    } catch (error) {}
  };
  const { productid } = useParams();
  const [product, setProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const accessToken = userInfo.token; // Get the Bearer token from userInfo
        const response = await axios.get(
          `http://127.0.0.1:8080/api/product/${productid}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        // console.log(response.data);
        setProduct(response.data);
        console.log(response.data);
        // console.log(product)
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productid]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="container py-4 my-4 mx-auto d-flex flex-column">
        <div className="header">
          <div className="row r1">
            <div className="col-md-9 abc">
              <h1>{product.name}</h1>
            </div>
            <div className="col-md-3 text-right pqr">
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
            </div>
            <p className="text-right para">{product.brand}</p>
          </div>
          <p className="text-right para">Price: ₹{product.price}</p>{" "}
          {/* Add price here */}
        </div>
        <div className="container-body mt-4">
          <div className="row r3">
            <div className="col-md-8">{product.description}</div>
            <div
              className="carousel slide col-md-4"
              data-bs-ride="carousel"
              id={`carouselExample-${product.id}`}
            >
              <div className="carousel-inner">
                {product.images?.map((image, index) => (
                  <div
                    key={index}
                    className={`carousel-item fixed-height-image ${
                      index === 0 ? "active" : ""
                    }`}
                  >
                    <img
                      src={image}
                      className="d-block w-100 "
                      alt={`Slide ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target={`#carouselExample-${product.id}`}
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
                data-bs-target={`#carouselExample-${product.id}`}
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            <div className="row">
              <span
                className="buy-prod"
                type="button"
                onClick={AddToCardHandler}
              >
                Add To Cart +
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
