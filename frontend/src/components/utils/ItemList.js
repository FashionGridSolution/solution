import React from "react";
import FilterBar from "./FilterBar";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const ItemList = ({ currentPage, products, setProducts }) => {
  // const [products, setProducts] = useState([]);
  const itemsPerPage = 15;
  useEffect(() => {
    console.log("Fetching data for page:", currentPage);
    const getItems = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const accessToken = userInfo.token; // Get the Bearer token from userInfo
        const { data } = await axios.get(" http://127.0.0.1:8080/api/product", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setProducts(data);
        console.log(data);
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error("Server responded with status:", error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received from the server");
        } else {
          // Something else happened
          console.error("Error:", error.message);
        }
      }
    };
    getItems();
  }, [currentPage, products]);

  // Calculate the index range of products to display for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  // const currentProducts = products;

  return (
    <div className="d-flex">
      <FilterBar />
      <div id="products">
        <div className="row mx-0 w-100">
          {currentProducts
            ? currentProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  description={product.description}
                  category_main={product.category_main}
                  category_secondary={product.category_secondary}
                  category_tertiary={product.category_tertiary}
                  price={product.price}
                  brand={product.brand}
                  images={product.images}
                  features={product.features}
                />
              ))
            : "Loading Products"}
        </div>
      </div>
    </div>
  );
};

export default ItemList;
