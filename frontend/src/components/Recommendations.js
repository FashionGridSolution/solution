import React from "react";
import ProductCard from "./utils/ProductCard";

const Recommendations = () => {
  return (
    <div className="bg-white mt-2 pb-5">
      <div className="container mt-5" >
        <div className="row mb-2 ">
          <h3 className=" mt-3"> Our recommendations for you</h3>
        </div>
        
        <div className="row d-flex ">
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
          
          
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
