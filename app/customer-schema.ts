import z from "zod";

export const customerSchema = z.object({
  name: z.string().min(3).max(25),
  address: z.string(),
  phone: z.string().min(10).max(15),
  city: z.string().min(3),
  gst: z.string().min(15).max(16),
});
