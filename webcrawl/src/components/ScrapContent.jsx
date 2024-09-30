"use client";

function ScrapContent({ products }) {
  console.log(products, "HERE");

  // Extract unique headers dynamically from the keys of the first product
  const headers = products.length > 0 ? Object.keys(products[0]) : [];

  return (
    <div className="container mx-auto p-4 bg-black rounded-lg">
      {Array.isArray(products) && products.length > 0 ? ( // Ensure products is an array
        <>
          <h2 className="text-xl font-semibold mt-8 mb-4">Output Results</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr className="bg-black text-white">
                  {headers.map((header) => (
                    <th key={header} className="px-4 py-2 border">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    {headers.map((header) => (
                      <td key={header} className="px-4 py-2 border">
                        {header === "Source Link" ? (
                          <a
                            href={product[header]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            Link
                          </a>
                        ) : (
                          product[header]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        ""// Fallback when products is not an array or is empty
      )}
    </div>
  );
}

export default ScrapContent;
