"use client"
import React, {useContext,useEffect} from 'react'
import Tabtrails from '@/components/Tabtrails'
import { ScrapDataContext } from '@/context/ScrapeDataContent';
import ScrapContent from '@/components/ScrapContent';


function query() {
  const { products } = useContext(ScrapDataContext);
  let passProducts = products;
  useEffect(()=>{
    passProducts= products;
  },[products])
  console.log([products])
  return (
      <div className="h-full flex flex-col items-center m-5">
          <Tabtrails />
          <ScrapContent products={products}/>
      </div>
  )
}

export default query