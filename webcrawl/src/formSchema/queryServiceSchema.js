import { z } from "zod";

export const queryServiceSchema = z.object({
    service_type: z.string().min(1, "Service Type is required"), // Correctly updated to itemType
    location: z.string().min(1, "Location is required"), // Correctly updated to itemName
    description: z.array(
        z.object({
            descpName: z.string().min(1, "Description is required"), // Specification required field
        })
    ).min(1, "At least one Description  is required"), // Ensure at least one specification
});
