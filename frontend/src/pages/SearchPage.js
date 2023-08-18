import React from 'react'
import './SearchPage.css';
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';

import Navbar from '../components/Navbar';
import axios from 'axios';
const SearchPage = () => {
    const { searchId } = useParams();
  const [product, setProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("")
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const accessToken = userInfo.token; // Get the Bearer token from userInfo
        const response = await axios.get(`/api/product/${productid}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
        console.log(response.data);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productid]);

  if (!product) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <div>
    <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
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
  </div>
  <div className="container-body mt-4">
    <div className="row r3">
      <div className="col-md-5 p-0 klo">
        <ul>
            {product.features?(product.features.map((feature) => (<li>feature</li>))):(<li>no features</li>)}
        </ul>
      </div>
      <div className="col-md-7 w-100">
        {" "}
        <img
          src="https://assetscdn1.paytm.com/images/catalog/product/K/KI/KIDTORADO-MUSCUTORA65799297FD22C/1564571511644_0.jpg"
          width="90%"
          height="95%"
        />{" "}
      </div>
    </div>
  </div>
  <div className="row">
    <div className='col-md-8'>
        {product.description}
    </div>
    <div className='col-md-4'>
        <button className='btn btn-warning'>Add to Cart</button>
        </div>
  </div>
</div>
</div>
  )
}

export default SearchPage