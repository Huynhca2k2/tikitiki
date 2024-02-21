import React from 'react'
import Hero from '../Compoments/Hero/Hero'
import Popular from '../Compoments/Popular/Popular'
import Offers from '../Compoments/Offers/Offers'
import NewCollections from '../Compoments/NewCollections/NewCollections'
import NewsLetter from '../Compoments/NewsLetter/NewsLetter'

const Shop = () => {
  return (
    <div>
        <Hero/>
        <Popular/>
        <Offers/>
        <NewCollections/>
        <NewsLetter/>
    </div>
  )
}

export default Shop
