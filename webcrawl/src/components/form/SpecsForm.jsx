"use client";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { querySpecsSchema } from "@/formSchema/querySpecsSchema";

function SpecsForm() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(querySpecsSchema),
        defaultValues: {
            itemName: "",
            itemType: "",
            specifications: [], // Ensure you initialize specifications as an array
        },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'specifications', // Updated to match the correct name
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="container mx-auto max-w-lg ">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Item Name Field */}
                <div className="text-lg space-y-2">
                    <label className="block font-semibold">Item Name</label>
                    <input
                        {...register("itemName")}
                        className="w-full p-2 border border-gray-300 rounded-lg text-lg focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.itemName && (
                        <p className="text-red-500 text-sm">{errors.itemName.message}</p>
                    )}
                </div>

                {/* Item Type Field */}
                <div className="text-lg space-y-2">
                    <label className="block font-semibold">Item Type</label>
                    <select
                        {...register("itemType")}
                        className="w-full p-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    >
                        <option value="">Select Type</option>
                        <option value="Type 1">Type 1</option>
                        <option value="Type 2">Type 2</option>
                    </select>
                    {errors.itemType && (
                        <p className="text-red-500 text-sm">{errors.itemType.message}</p>
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

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full p-2 bg-black text-white text-lg rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Search
                </button>
            </form>
        </div>
    );
}

export default SpecsForm;
