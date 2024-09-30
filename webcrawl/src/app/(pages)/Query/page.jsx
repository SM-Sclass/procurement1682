"use client"
import React, {useContext} from 'react'
import Tabtrails from '@/components/Tabtrails'
import { ScrapDataContext } from '@/context/ScrapeDataContent';
import ScrapContent from '@/components/ScrapContent';


function query() {
  const { products } = useContext(ScrapDataContext);
  
  return (
    <div className="min-h-screen mb-5">
      <div className=" container h-full flex flex-col items-center bg-black rounded-lg">
          <Tabtrails />
          <ScrapContent products={products}/>
      </div>
    </div>
  )
}

export default query