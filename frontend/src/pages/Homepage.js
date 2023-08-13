import React from 'react'
import { useNavigate } from 'react-router-dom'
import Caraousel from '../components/Caraousel'
import Categories from '../components/Categories'
import Navbar from '../components/Navbar'
import Recommendations from '../components/Recommendations'
import SearchBased from '../components/SearchBased'
import { useEffect } from 'react'
export default function Homepage(){
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
        <Caraousel/>
        <Categories/>
        <Recommendations/>
        <SearchBased/>
    </div>
  )
}
