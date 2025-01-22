"use client";

import { billEntrySchema } from "@/app/zod-schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Customer, Supplier, Transport } from "@prisma/client";
import { Box } from "@radix-ui/themes";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SearchableTextField from "./searchable-text-field";

export type BillEntryFormData = z.infer<typeof billEntrySchema>;

interface AddBillEntryFormProps {
  customers: Customer[];
  suppliers: Supplier[];
  transports: Transport[];
}

const AddBillEntryForm = ({
  customers,
  suppliers,
  transports,
}: AddBillEntryFormProps) => {
  const [customersOpen, setCustomersOpen] = useState(false);

  const form = useForm<BillEntryFormData>({
    resolver: zodResolver(billEntrySchema),
  });

  const netAmount = form.watch("netAmount");

  useEffect(() => {
    if (netAmount) {
      const grossAmount = (netAmount * 1.05).toFixed(2);
      form.setValue("grossAmount", parseFloat(grossAmount));
    } else {
      form.setValue("grossAmount", 0);
    }
  }, [netAmount, form]);

  const onSubmit = form.handleSubmit((data) => {
    console.log("Form is being submitted");
    console.log("Submitted data:", data);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <Box className="space-y-4">
          <Box className="grid grid-cols-3 space-x-5">
            <Card className="p-5 space-y-4">
              <FormField
                control={form.control}
                name="billNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bill Number</FormLabel>
                    <FormControl>
                      <Input placeholder="12345" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="billDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bill Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={
                          field.value
                            ? format(new Date(field.value), "yyyy-MM-dd")
                            : ""
                        }
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SearchableTextField
                form={form}
                name="customer.name"
                label="Customer"
                searchList={customers}
              />

              <SearchableTextField
                form={form}
                name="supplier.name"
                label="Supplier"
                searchList={suppliers}
              />
            </Card>

            <Card className="p-5 space-y-4">
              <FormField
                control={form.control}
                name="productQty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Qty</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} placeholder="25" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lrNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LR Number</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        placeholder="253455"
                        // onChange={(e) => field.onChange(parseInt(field.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lrDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LR Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={
                          field.value
                            ? format(new Date(field.value), "yyyy-MM-dd")
                            : ""
                        }
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SearchableTextField
                form={form}
                name="transport.name"
                label="Transport"
                searchList={transports}
              />
            </Card>

            <Card className="p-5 space-y-4">
              <FormField
                control={form.control}
                name="fright"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fright</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} placeholder="250.00" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="netAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Net Amount</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} placeholder="10000" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="taxType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Tax Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="c_s_gst">C/S GST</SelectItem>
                        <SelectItem value="i_gst">I GST</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="grossAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gross Amount</FormLabel>
                    <FormControl>
                      <Input
                        disabled={true}
                        type="number"
                        {...field}
                        placeholder="10500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Card>
          </Box>

          <Button variant="default" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </Form>
  );
};

export default AddBillEntryForm;
