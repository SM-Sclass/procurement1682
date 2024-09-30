"use client"
import React, {useContext} from 'react'
import Tabtrails from '@/components/Tabtrails'
import { ScrapDataContext } from '@/context/ScrapeDataContent';
import ScrapContent from '@/components/ScrapContent';


function query() {
  const { products } = useContext(ScrapDataContext);
  
  return (
    <div className="min-h-screen my-10">
      <div className=" container h-full flex flex-col items-center bg-black rounded-lg">
        <h1 className="text-xl my-3 p-3">Query your Requirments</h1>
          <Tabtrails />
          <ScrapContent products={products}/>
      </div>
    </div>
  )
}

export default query