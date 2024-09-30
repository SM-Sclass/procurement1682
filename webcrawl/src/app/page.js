<<<<<<< HEAD
import Showcase from "@/components/Showcase";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-items-center min-h-screen">
      <Showcase/>
=======
"use client";
import React from 'react';

function HistoricalResults() {
  // Static results with new fields
  const results = [
    { name: "Router", type: "Networking Device", make: "Amazon", model: "Model A", specifications: "802.11ac, Dual-Band" },
    { name: "Varactor Diode", type: "Electronic Component", make: "Flipkart", model: "Model B", specifications: "High Frequency" },
    { name: "Ethernet Cable", type: "Cabling", make: "Ebay", model: "Model C", specifications: "Cat 6, 1000 Mbps" }
  ];

  return (
    <div className="flex flex-col space-y-4 p-4">
      <h2 className="text-2xl font-bold">Search History</h2>
      <table className="table-auto w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Type</th>
            <th className="border border-gray-300 px-4 py-2">Make</th>
            <th className="border border-gray-300 px-4 py-2">Model</th>
            <th className="border border-gray-300 px-4 py-2">Specifications</th>
            <th className="border border-gray-300 px-4 py-2">Results</th> {/* New column for results */}
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{result.name}</td>
              <td className="border border-gray-300 px-4 py-2">{result.type}</td>
              <td className="border border-gray-300 px-4 py-2">{result.make}</td>
              <td className="border border-gray-300 px-4 py-2">{result.model}</td>
              <td className="border border-gray-300 px-4 py-2">{result.specifications}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button className="text-blue-500 hover:underline">View Results</button> {/* Placeholder button */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen p-8 sm:p-20">
      {/* Upper Section */}
      <div className="flex-1 bg-gray-100"></div>

      {/* Lower Section with Historical Results */}
      <div className="flex-1 bg-white border-t-2 border-gray-300 p-8">
        <HistoricalResults />
      </div>
>>>>>>> c2daa8b33837251f60324fba3b256981c75175b5
    </main>
  );
}
