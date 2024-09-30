import { z } from 'zod';

export const querySpecsSchema = z.object({
  product_name: z.string().min(1, "Product Name is required"),
  item_type: z.string().min(1, "Item Type is required"),
  specifications: z
    .array(
      z.object({
        specName: z.string().min(1, "Specification is required"),
      })
    )
    .min(1, "At least one specification is required"),
  desired_price: z
    .string()
    .min(1, "Desired Price is required") // Ensure a value is entered
    .transform((val) => parseFloat(val)) // Convert the string to a float
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "Desired Price must be a positive number",
    }) // Ensure the number is valid and non-negative
});
