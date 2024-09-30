"use client"
import React from 'react'
import { Tabs } from './ui/tabs';
import MakeModel from './form/MakeModel';
import SpecsForm from './form/SpecsForm';
import ServiceForm from './form/ServiceForm';

export default function Tabtrails() {
    const tabs = [
        {
          title: "Product",
          value: "product",
          content: (
            <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-90">
                <MakeModel/>
            </div>
          ),
        },
        {
          title: "Specification",
          value: "Specification",
          content: (
            <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
              <SpecsForm/>
              </div>
          ),
        },
        {
          title: "Services",
          value: "Services",
          content: (
            <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
              <ServiceForm/>
              </div>
          ),
        },
       
      ];
     
      return (
        <div className="h-screen md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-5 bg-black rounded-lg p-2">
          <Tabs tabs={tabs} />
        </div>
      );
}
