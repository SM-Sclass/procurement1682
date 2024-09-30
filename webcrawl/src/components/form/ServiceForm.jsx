"use client";
import React, {useState} from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { queryServiceSchema } from "@/formSchema/queryServiceSchema";

function ServiceForm() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(queryServiceSchema),
        defaultValues: {
            serviceType:"", // Location
            location: "", // Service Type
            description: [], // Initialize specifications as an array
        },
    });
    const [products, setProducts] = useState([]);
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'description',
    });

    const onSubmit = async(data,e) => {
        e.preventDefault();

        const response = await fetch('http://127.0.0.1:8000/scrape', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const data = await response.json();
            setProducts(data.products); // Assuming your API returns { products: [...] }
        } else {
            console.error('Error fetching data');
        }
    };

    return (
        <div className="container mx-auto max-w-lg ">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="text-lg space-y-2">
                    <label className="block font-semibold">Service Type</label>
                    <select
                        {...register("serviceType")}
                        className="w-full p-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    >
                        <option value="">Select Type</option>
                        <option value="Type 1">Type 1</option>
                        <option value="Type 2">Type 2</option>
                    </select>
                    {errors.serviceType && (
                        <p className="text-red-500 text-sm">{errors.serviceType.message}</p>
                    )}
                </div>
                
                <div className="text-lg space-y-2">
                    <label className="block font-semibold">Location</label>
                    <input
                        {...register("location")}
                        className="w-full p-2 border border-gray-300 rounded-lg text-lg focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.location && (
                        <p className="text-red-500 text-sm">{errors.location.message}</p>
                    )}
                </div>

                <div className="text-lg space-y-2">
                    <label className="flex font-semibold space-x-3">Description</label>
                    <button type="button" onClick={() => append({ descpName: '' })} className="text-blue-500">
                        +
                    </button>
                    {fields.map((item, index) => (
                        <div key={item.id} className="flex items-center space-x-2">
                            <input
                                {...register(`description.${index}.descpName`)} // Add required validation here if needed
                                className="w-full p-2 border border-gray-300 rounded-lg text-lg focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
                            />
                            <button type="button" onClick={() => remove(index)} className="text-red-500">
                                −
                            </button>
                            {errors.description && errors.description[index]?.descpName && (
                                <p className="text-red-500 text-sm">{errors.description[index].descpName.message}</p>
                            )}
                        </div>
                    ))}
                    {fields.length === 0 && (
                        <p className="text-red-500 text-sm">{errors.description?.[0]?.descpName?.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full p-2 bg-black text-white text-lg rounded-lg  focus:outline-none transition ease-in-out  hover:-translate-y-1 hover:scale-110"
                >
                    Search
                </button>
            </form>
        </div>
    );
}

export default ServiceForm;
