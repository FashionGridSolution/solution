import React from 'react'
import Navbar from '../components/Navbar'
import Caraousel from '../components/Caraousel'
import Categories from '../components/Categories'
import Recommendations from '../components/Recommendations'
import SearchBased from '../components/SearchBased'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import AuthProvider from '../components/Context/authContext'
export default function Homepage(){
  const navigate=useNavigate();
  const {user}=AuthProvider();
  console.log(user);
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
