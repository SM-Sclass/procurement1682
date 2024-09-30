"use client";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { queryMakeModelSchema } from "@/formSchema/queryMakeModelSchema";
import { ScrapDataContext } from "@/context/ScrapeDataContent";

function MakeModel() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(queryMakeModelSchema),
    defaultValues: {
      product_name: "",
      item_type: "",
      make: "",
      model: "",
    },
  });

  const { setProducts } = useContext(ScrapDataContext);

  const onSubmit = async (data) => {
    console.log("Form data:", data); // Logging form data before sending request

    try {
      const response = await fetch('http://127.0.0.1:8000/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const result = await response.json();
        console.log("API response data:", result); // Logging API response
        setProducts(result.products || []); // Handle undefined or missing products
      } else {
        console.error('Error fetching data:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <div className="container mx-auto max-w-lg ">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-lg space-y-2">
          <label className="block font-semibold">Product Name</label>
          <input
            {...register("product_name")}
            className="w-full p-2 border border-gray-300 rounded-lg text-lg focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
          />
          {errors.product_name && (
            <p className="text-red-500 text-sm">
              {errors.product_name?.message || "Product Name is required"}
            </p>
          )}
        </div>

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
            <p className="text-red-500 text-sm">
              {errors.item_type?.message || "Item Type is required"}
            </p>
          )}
        </div>

        <div className="text-lg space-y-2">
          <label className="block font-semibold">Make</label>
          <input
            {...register("make")}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
          />
          {errors.make && (
            <p className="text-red-500 text-sm">{errors.make?.message || "Make is required"}</p>
          )}
        </div>

        <div className="text-lg space-y-2">
          <label className="block font-semibold">Model</label>
          <input
            {...register("model")}
            className="w-full p-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.model && (
            <p className="text-red-500 text-sm">{errors.model?.message || "Model is required"}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-black text-white text-lg rounded-lg focus:outline-none transition ease-in-out hover:-translate-y-1 hover:scale-110"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default MakeModel;
