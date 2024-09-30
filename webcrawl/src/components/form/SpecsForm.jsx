"use client";
import React, {useContext} from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { querySpecsSchema } from "@/formSchema/querySpecsSchema";
import { ScrapDataContext } from "@/context/ScrapeDataContent";

function SpecsForm() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(querySpecsSchema),
        defaultValues: {
            product_name: "",
            item_type: "",
            specifications: [],
            desired_price: 0// Ensure you initialize specifications as an array
        },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'specifications', // Updated to match the correct name
    });
    const { setProducts } = useContext(ScrapDataContext);

    const onSubmit = async (data) => {
        console.log("Form data:", data); // Logging form data before sending request

        try {
            const response = await fetch('http://127.0.0.1:8000/SpecificScrape', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const result = await response.json();
                console.log("API response data:", result); // Logging API response
                setProducts(result || []); // Handle undefined or missing products
            } else {
                console.error('Error fetching data:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    return (
        <div className="container mx-auto max-w-lg h-full ">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Item Name Field */}
                <div className="text-lg space-y-2">
                    <label className="block font-semibold">Product Name</label>
                    <input
                        {...register("product_name")}
                        className="w-full p-2 border border-gray-300 rounded-lg text-lg focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.product_name && (
                        <p className="text-red-500 text-sm">{errors.product_name.message}</p>
                    )}
                </div>

                {/* Item Type Field */}
                <div className="text-lg space-y-2">
                    <label className="block font-semibold">Item Type</label>
                    <select
                        {...register("item_type")}
                        className="w-full p-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    >
                        <option value="">Select Type</option>
                        <option value="electronic">Electronic</option>
                        <option value="appliance">Appliance</option>
                    </select>
                    {errors.item_type && (
                        <p className="text-red-500 text-sm">{errors.item_type.message}</p>
                    )}
                </div>

                {/* Specifications Field */}
                <div className="text-lg space-y-2">
                    <label className="flex font-semibold space-x-3">Specifications</label>
                    <button type="button" onClick={() => append({ specName: '' })} className="text-blue-500">
                        +
                    </button>
                    {fields.map((item, index) => (
                        <div key={item.id} className="flex items-center space-x-2">
                            <input
                                {...register(`specifications.${index}.specName`)}
                                className="w-full p-2 border border-gray-300 rounded-lg text-lg focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
                            />
                            <button type="button" onClick={() => remove(index)} className="text-red-500">
                                −
                            </button>
                            {errors.specifications && errors.specifications[index]?.specName && (
                                <p className="text-red-500 text-sm">{errors.specifications[index].specName.message}</p>
                            )}
                        </div>
                    ))}
                    {errors.specifications && errors.specifications.length === 0 && (
                        <p className="text-red-500 text-sm">{errors.specifications.message}</p>
                    )}
                </div>
                <div className="text-lg space-y-2">
                    <label className="block font-semibold">Desired Price</label>
                    <input
                        {...register("desired_price")}
                        className="w-full p-2 border border-gray-300 rounded-lg text-lg focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.desired_price && (
                        <p className="text-red-500 text-sm">{errors.desired_price.message}</p>
                    )}
                </div>
                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full p-2 bg-black text-white text-lg rounded-lg  focus:outline-none transition ease-in-out hover:-translate-y-1 hover:scale-110 "
                >
                    Search
                </button>

            </form>
        </div>
    );
}

export default SpecsForm;
