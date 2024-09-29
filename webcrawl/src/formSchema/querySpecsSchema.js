import { z } from 'zod';

export const querySpecsSchema = z.object({
  itemName: z.string().min(1, "Item Name is required"),
  itemType: z.string().min(1, "Item Type is required"),
  specifications: z
    .array(
      z.object({
        specName: z.string().min(1, "Specification is required"),
      })
    )
    .min(1, "At least one specification is required"),
});
