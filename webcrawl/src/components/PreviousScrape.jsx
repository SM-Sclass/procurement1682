import React from 'react'

function PreviousScrape() {
    return (
        <>
            <ServiceHistory/>
        </>
    )
}

function ProductHistory() {
    const results = [
        { name: "Router", type: "Networking Device", make: "Amazon", model: "Model A", specifications: "802.11ac, Dual-Band" },
        { name: "Varactor Diode", type: "Electronic Component", make: "Flipkart", model: "Model B", specifications: "High Frequency" },
        { name: "Ethernet Cable", type: "Cabling", make: "Ebay", model: "Model C", specifications: "Cat 6, 1000 Mbps" }
    ];

    return (
        <div></div>
    )

}

function ServiceHistory() {
    const results = [
        { name: "Router", type: "Networking Device", make: "Amazon", model: "Model A", specifications: "802.11ac, Dual-Band" },
        { name: "Varactor Diode", type: "Electronic Component", make: "Flipkart", model: "Model B", specifications: "High Frequency" },
        { name: "Ethernet Cable", type: "Cabling", make: "Ebay", model: "Model C", specifications: "Cat 6, 1000 Mbps" }
    ];
    return (
        <div className="container flex flex-col items-center mx-auto p-4">
            <h2 className="text-xl font-semibold mt-8 mb-4">Product History</h2>
            <div className="overflow-x-auto ">
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-900 text-white">
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Type</th>
                            <th className="px-4 py-2 border">Make</th>
                            <th className="px-4 py-2 border">Model</th>
                            <th className="px-4 py-2 border">Specifications</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((product, index) => (
                            <tr key={index} className="bg-gray-900 hover:bg-gray-700">
                                <td className="px-4 py-2 border">{product.name}</td>
                                <td className="px-4 py-2 border">{product.type}</td>
                                <td className="px-4 py-2 border">{product.make}</td>
                                <td className="px-4 py-2 border">{product.model}</td>
                                <td className="px-4 py-2 border">{product.specifications}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

}
export default PreviousScrape