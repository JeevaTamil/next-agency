import z from "zod";

export const customerSchema = z.object({
  name: z.string().min(3).max(25),
  address: z.string(),
  phone: z.string().min(10).max(15),
  city: z.string().min(3),
  gst: z.string().min(15).max(16),
});

export const supplierSchema = z.object({
  name: z.string().min(3).max(25),
  address: z.string(),
  phone: z.string().min(10).max(15),
  city: z.string().min(3),
  gst: z.string().min(15).max(16),
  commission: z
    .string({
      message: "Commission should be between 0 and 5",
    })
    .min(0)
    .max(5),
});
