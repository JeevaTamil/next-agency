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

export const transportSchema = z.object({
  name: z.string().min(3).max(25),
});

export const billEntrySchema = z.object({
  billDate: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  }, z.date()),
  billNumber: z.string().min(3).max(25),

  customerId: z.number().int().positive(),
  supplierId: z.number().int().positive(),
  transportId: z.number().int().positive(),
  productQty: z.preprocess(
    (arg) => parseFloat(arg as string),
    z.number().min(1)
  ),
  lrNumber: z.string().min(3).max(25),
  lrDate: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  }, z.date()),

  fright: z.preprocess((arg) => parseFloat(arg as string), z.number().min(1)),
  netAmount: z.preprocess(
    (arg) => parseFloat(arg as string),
    z.number().min(1)
  ),
  taxType: z.string().min(3).max(10),
  grossAmount: z.preprocess(
    (arg) => parseFloat(arg as string),
    z.number().min(1)
  ),
});
