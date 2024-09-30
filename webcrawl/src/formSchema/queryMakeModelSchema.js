import { z } from 'zod'

export const queryMakeModelSchema = z.object({
  product_name: z.string().min(1, "Item Name is required"),
  item_type: z.string().min(1, "Item Type is required"),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required")
});
