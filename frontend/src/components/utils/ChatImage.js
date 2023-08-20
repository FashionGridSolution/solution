import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ChatImage = ({ productid }) => {
  console.log("-------->    ",productid);
  const navigate = useNavigate();
  const onClickHandler=()=>{
    navigate(`/product/${productid}`)
  }
  const [product, setProduct] = useState(null);
  const AddToCardHandler =async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const accessToken = userInfo.token; // Get the Bearer token from userInfo
      const {data}=await axios.post('http://127.0.0.1:8080/api/user/cart',{productId:productid},{
        headers: {
          Authorization: `Bearer ${accessToken}`
          }})
    } catch (error) {
      
    }
  };
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
        // console.log(product)
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productid]);

  return (
    // <div className="card mb-2" style={{ width: "12rem", margin: "0 4px" ,height:"400px"}} >
      <div className="card mb-2" style={{ width: "12rem", height: "400px", margin: "0 4px" }}>
      <img
        src={
          product?.images[0] ||
          "https://yt3.googleusercontent.com/cT40lDWqE99Ch52R3ftuAExjmjF-yZiY5rUSv_0Q3NXhcqzmiax8ReXuS4Qe53Fizcaw4hEX=s900-c-k-c0x00ffffff-no-rj"
        }
        className="card-img-top"
        alt="..."
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <div className="card-body">
        <h5 className="card-title">
        <a
            href={`/product/${productid}`}
            target="_blank"
              className="link-secondary">
              {product?.name || "Hey"}
            </a>
           </h5>
        <p className="card-text">
          {product?.description
            ? product.description.length > 50
              ? `${product.description.substring(0, 50)}...`
              : product.description
            : "No Description"}
        </p>
        <span className="buy" type="button" onClick={AddToCardHandler}>Add To Cart +</span>
      </div>
    </div>
  );
};

export default ChatImage;
