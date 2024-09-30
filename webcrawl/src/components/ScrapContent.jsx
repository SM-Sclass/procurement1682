"use client"
import { useContext } from 'react';
import { ScrapDataContext } from '@/context/ScrapeDataContent';// Make sure the import path is correct

function ScrapContent({products}) {
    console.log(products, "HERE")
  return (
    <div className="container mx-auto p-4 bg-black rounded-lg">
      {Array.isArray(products) && products.length > 0 ? ( // Ensure products is an array
        <>
          <h2 className="text-xl font-semibold mt-8 mb-4">Output Results</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr className="bg-black text-white">
                  <th className="px-4 py-2 border">Title</th>
                  <th className="px-4 py-2 border">Price</th>
                  <th className="px-4 py-2 border">Source Name</th>
                  <th className="px-4 py-2 border">Source Link</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border">{product.Title}</td>
                    <td className="px-4 py-2 border">{product.Price}</td>
                    <td className="px-4 py-2 border">{product['Source Name']}</td>
                    <td className="px-4 py-2 border">
                      <a
                        href={product['Source Link']}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Link
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p>No products available</p> // Fallback when products is not an array or is empty
      )}
    </div>
  );
}

export default ScrapContent;
