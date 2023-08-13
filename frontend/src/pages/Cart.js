import React from 'react'
import Cartitems from '../components/Cartitems'
import Navbar from '../components/Navbar'
import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
const Cart = () => {
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
       <Cartitems/>
    </div>
  )
}

export default Cart