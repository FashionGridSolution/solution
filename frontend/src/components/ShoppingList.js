import React from "react";
import ListHeader from "./utils/ListHeader";
import "./ShoppingList.css";
import ItemList from "./utils/ItemList";
const ShoppingList = (props) => {
  return (
    <div>
      <div className="container bg-light mt-5">
        <ListHeader/>
        <ItemList searchQuery={props.searchQuery}/>
      </div>

    </div>
  );
};

export default ShoppingList;
