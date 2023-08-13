import React from 'react'
import Navbar from '../components/Navbar'
import ShoppingList from '../components/ShoppingList';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const ShoppingPage = () => {
  const navigate=useNavigate();
  useEffect(() => {
    const userinfo=JSON.parse(localStorage.getItem("userInfo"));

    if(!userinfo){
      navigate("/login");
    }
  }, [navigate])
  return (
    <div>
        <Navbar/>
        
        <ShoppingList/>
    </div>
  )
}

export default ShoppingPage;