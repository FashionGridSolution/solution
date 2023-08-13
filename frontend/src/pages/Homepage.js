import React from 'react'
import Navbar from '../components/Navbar'
import Caraousel from '../components/Caraousel'
import Categories from '../components/Categories'
import Recommendations from '../components/Recommendations'
import SearchBased from '../components/SearchBased'

export default function Homepage(){
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
