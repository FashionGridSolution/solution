import React from "react";
import ListHeader from "./utils/ListHeader";
import "./ShoppingList.css";
import ItemList from "./utils/ItemList";
import { useState } from "react";
const ShoppingList = (props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    if (page < 1) {
      return;
    }
    
    console.log('Page changed to:', page);
    setCurrentPage(page);
  };
  const [products, setProducts] = useState([]);

  return (
    <div>
      <div className="container bg-light mt-5">
      <ListHeader onPageChange={handlePageChange} currentPage={currentPage} products={products} setProducts={setProducts}/>
        <ItemList searchQuery={props.searchQuery} currentPage={currentPage} products={products} setProducts={setProducts}/>
      </div>

    </div>
  );
};

export default ShoppingList;
