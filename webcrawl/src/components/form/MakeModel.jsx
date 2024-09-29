"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { queryMakeModelSchema } from "@/formSchema/queryMakeModelSchema";

function MakeModel() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(queryMakeModelSchema),
    defaultValues: {
      itemName: "",
      itemType: "",
      make: "",
      model: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="container mx-auto max-w-lg ">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-lg space-y-2">
          <label className="block font-semibold">Item Name</label>
          <input
            {...register("itemName")}
            className="w-full p-2 border border-gray-300 rounded-lg text-lg focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
          />
          {errors.itemName && <p className="text-red-500 text-sm">{errors.itemName?.message || "Item Name is required"}</p>}
        </div>

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
          {errors.itemType && <p className="text-red-500 text-sm">{errors.itemType?.message || "Item Type is required"}</p>}
        </div>

        <div className="text-lg space-y-2">
          <label className="block font-semibold">Make</label>
          <input
            {...register("make")}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.make && <p className="text-red-500 text-sm">{errors.make?.message || "Make is required"}</p>}
        </div>

        <div className="text-lg space-y-2">
          <label className="block font-semibold">Model</label>
          <input
            {...register("model")}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.model && <p className="text-red-500 text-sm">{errors.model?.message || "Model is required"}</p>}
        </div>

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

export default MakeModel;
