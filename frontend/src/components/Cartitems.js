import React from "react";
import "./CartItems.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Cartitems = () => {
  
  async function getItems() {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const accessToken = userInfo.token;
      const { data } = await axios.get(
        " http://127.0.0.1:8080/api/user/cart",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setCartItemList(data.items);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  const checkoutHandler=async()=>{
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const accessToken = userInfo.token;
      const {data}=await axios.post('http://127.0.0.1:8080/api/user/checkout/',{},{
        headers: {
          Authorization: `Bearer ${accessToken}`
          }})
          console.log(data);
          getItems();
    } catch (error) {
      console.log(error);
    }
  }
  const [cartItemList, setCartItemList] = useState("");
  useEffect(() => {
    
    getItems();
    console.log(cartItemList);
  }, []);
  const removeProductHandler = async (product) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const accessToken = userInfo.token;
      await axios.delete(
        ` http://127.0.0.1:8080/api/user/cart/${product._id}`,{},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      getItems();
      console.log("Product successfully deleted", product.name);
    } catch (error) {
      console.log(`Error occured ${error}`);
    }
  };
  const AddToCardHandler =async (productId) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const accessToken = userInfo.token; // Get the Bearer token from userInfo
      const {data}=await axios.post('http://127.0.0.1:8080/api/user/cart',{productId:productId},{
        headers: {
          Authorization: `Bearer ${accessToken}`
          }})
      getItems();
      console.log(data);
    } catch (error) {
      console.log(`Error occured ${error}`);
    }
  };
  const DecrementToCartHandler =async (productId) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const accessToken =userInfo.token; // Get the Bearer token from userInfo
      console.log(accessToken)
      const { data } =await axios.put(`http://127.0.0.1:8080/api/user/cart/${productId}`,{},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
        console.log(data);
      getItems();
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Server responded with status:', error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server');
      } else {
        // Something else happened
        console.error('Error:', error.message);
      }
    }
  };
  const navigate = useNavigate();
  return (
    <div className="snippet my-5 py-2">
      <div className="card">
        <div className="row">
          <div className="col-md-8 cart">
            <div className="title">
              <div className="row">
                <div className="col">
                  <h4>
                    <b>Shopping Cart</b>
                  </h4>
                </div>
                <div className="col align-self-center text-right text-muted">
                  {cartItemList.length === 0 ? "0" : cartItemList.length} items
                </div>
              </div>
            </div>

            {cartItemList.length !== 0
              ? cartItemList.map((item, index) => (
                  <div key={index} className="row border-top border-bottom">
                    <div className="row main align-items-center">
                      <div className="col-2">
                        <img
                          className="img-fluid"
                          src="https://i.imgur.com/1GrakTl.jpg"
                        />
                      </div>
                      <div className="col">
                        <div className="row text-muted">
                          {item.product.brand}
                        </div>
                        <div className="row">{item.product.name}</div>
                      </div>
                      <div className="col">
                        <a href="#" onClick={()=>DecrementToCartHandler(item.product._id)}>
                        - </a>
                        <a href="#" className="border">
                          {item.quantity}
                        </a>
                        <a href="#" onClick={()=>AddToCardHandler(item.product._id)}>+</a>
                      </div>
                      <div className="col">
                        Rs. {item.product.price}{" "}
                        <span
                          className="close"
                          type="button"
                          onClick={() => removeProductHandler(item.product)}
                        >
                          ✕
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              : "No items in cart"}
            <div className="back-to-shop">
              <a href="#">
                ←
                <span className="text-muted" onClick={() => navigate("/shop")}>
                  Back to shop
                </span>
              </a>
            </div>
          </div>
          <div className="col-md-4 summary">
            <div>
              <h5>
                <b>Summary</b>
              </h5>
            </div>
            <hr />
            <div className="row">
              <div className="col" style={{ paddingLeft: 0 }}>
                ITEMS 3
              </div>
              <div className="col text-right">€ 132.00</div>
            </div>
            <form>
              <p>SHIPPING</p>
              <select>
                <option className="text-muted">Standard-Delivery- €5.00</option>
              </select>
              {/* <p>GIVE CODE</p>
              <input id="code" placeholder="Enter your code" /> */}
            </form>
            <div
              className="row"
              style={{
                borderTop: "1px solid rgba(0,0,0,.1)",
                padding: "2vh 0",
              }}
            >
              <div className="col">TOTAL PRICE</div>
              <div className="col text-right">€ 137.00</div>
            </div>
            <button className="btn" onClick={checkoutHandler}>CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cartitems;
