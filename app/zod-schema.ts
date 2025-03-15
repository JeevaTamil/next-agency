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

export const taxTypeEnum = z.enum(["C/S GST", "I GST"]);
export const paymentModeEnum = z.enum(["Cheque", "Cash", "NEFT", "UPI", "DD"]);

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

  freight: z.preprocess((arg) => parseFloat(arg as string), z.number().min(1)),
  netAmount: z.preprocess(
    (arg) => parseFloat(arg as string),
    z.number().min(1)
  ),
  taxType: taxTypeEnum,
  grossAmount: z.preprocess(
    (arg) => parseFloat(arg as string),
    z.number().min(1)
  ),
});

export const paymentSchema = z
  .object({
    date: z.preprocess((arg) => {
      if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
    }, z.date()),

    transactionAmount: z.preprocess(
      (arg) => parseFloat(arg as string),
      z.number().min(1)
    ),

    bankId: z.number().int().positive().optional(), // Initially optional

    mode: paymentModeEnum,

    referenceNumber: z.string().min(3).max(25).optional(), // Optional
    additionalNote: z.string().optional(), // Optional
  })
  .refine(
    (data) => {
      // Ensure bankId is required for non-cash payments
      if (data.mode !== "Cash") {
        return !!data.bankId;
      }
      return true;
    },
    { message: "Bank ID is required for non-cash payments", path: ["bankId"] }
  );

export const bankSchema = z.object({
  name: z.string().min(3).max(25),
});

export const agencySchema = z.object({
  name: z.string().min(3).max(25),
});

export const reportSchema = z.object({
  id: z.number().int().positive(),
});

export const debitNoteSchema = z.object({
  date: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  }, z.date()),
  transportId: z.number().int().positive(),
  productQty: z.preprocess(
    (arg) => parseFloat(arg as string),
    z.number().min(1)
  ),
  lrNumber: z.string().min(3).max(25),
  lrDate: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  }, z.date()),

  returnAmount: z.preprocess(
    (arg) => parseFloat(arg as string),
    z.number().min(1)
  ),
  taxType: taxTypeEnum,
  additionalNote: z.string().optional(), // Optional
});
