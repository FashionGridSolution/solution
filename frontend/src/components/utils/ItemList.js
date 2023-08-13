import React from 'react'
import FilterBar from './FilterBar'
import ProductCard from './ProductCard'

const ItemList = () => {
  return (
    <div className='d-flex'>
        <FilterBar/>
        <div id="products">
  <div className="row mx-0 w-100">
    
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
    
    
  </div>{" "}
</div>

    </div>
  )
}

export default ItemList