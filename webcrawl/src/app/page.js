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
      <div className="flex flex-col sm:flex-row bg-gray-100 items-center justify-between p-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Welcome to Our Product Search Website</h1>
          <p className="mt-4 text-gray-700">
          This platform is used for finding products and services through web scraping, 
          providing better results using data processing and machine learning.
          </p>
        </div>
        <div className="flex-1 mt-4 sm:mt-0 ">
          <img src="/img/image.png" alt="Description" className="w-full h-auto rounded-full shadow-lg" />
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
        <div className="bg-white border rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold">Search By Product</h3>
          <p className="mt-2 text-gray-600">Find products based on your specific needs.</p>
        </div>
        <div className="bg-white border rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold">Search By Specification</h3>
          <p className="mt-2 text-gray-600">Look up products by their technical specifications.</p>
        </div>
        <div className="bg-white border rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold">Search By Service</h3>
          <p className="mt-2 text-gray-600">Discover services related to your needs.</p>
        </div>
      </div>
      <br />

      {/* Lower Section with Historical Results */}
      <div className="flex-1 bg-white border-t-2 border-gray-300 p-8">
        <HistoricalResults />
      </div>
    </main>
  );
}
