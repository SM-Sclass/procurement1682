import { z } from 'zod'

export const queryMakeModelSchema = z.object({
  itemName: z.string().min(1, "Item Name is required"),
  itemType: z.string().min(1, "Item Type is required"),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required")
});
