import React from "react";
import ProductCard from "./utils/ProductCard";

const SearchBased = () => {
  return (
    <div className="mt-2 mb-5">
      <div className="container mt-5" >
        <div className="row mb-2">
          <h3 className=" mt-3"> Based On Your Search History</h3>
        </div>
        
        <div className="row d-flex">
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
          
          
        </div>
      </div>
    </div>
  );
};

export default SearchBased;
