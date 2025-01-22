"use client";

import {
  billEntrySchema,
  taxTypeEnum,
  transportSchema,
} from "@/app/zod-schema";
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
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Customer, Supplier, Transport } from "@prisma/client";
import { Box } from "@radix-ui/themes";
import axios from "axios";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SearchableTextField from "./searchable-text-field";

export type billEntryFormData = z.infer<typeof billEntrySchema>;
type transportFormData = z.infer<typeof transportSchema>;

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
  const form = useForm<billEntryFormData>({
    resolver: zodResolver(billEntrySchema),
  });

  const netAmount = form.watch("netAmount");
  const router = useRouter();

  useEffect(() => {
    if (netAmount) {
      const grossAmount = (netAmount * 1.05).toFixed(2);
      form.setValue("grossAmount", parseFloat(grossAmount));
    } else {
      form.setValue("grossAmount", 0);
    }
  }, [netAmount, form]);

  const onSubmit = form.handleSubmit(
    async (data) => {
      console.log("Form is being submitted");
      console.log("Submitted data:", data);
      try {
        await axios.post("/api/bill-entries", data).then((res) => {
          if (res.status === 201) {
            toast({
              title: "Entry Created",
              description: `Bill Entry has been added successfully`,
            });
            router.push("/bill-entries");
            router.refresh();
          } else {
            toast({
              title: "Error occured",
              description: `${res}`,
            });
          }
          console.log(res.data);
        });
      } catch (error) {
        toast({
          title: "Error occured",
          description: `${(error as any).message}`,
          variant: "destructive",
        });
      }
    },
    (errors) => {
      console.log("Validation errors:", errors);
    }
  );
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
                name="customerId"
                label="Customer"
                searchList={customers}
              />

              <SearchableTextField
                form={form}
                name="supplierId"
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
                name="transportId"
                label="Transport"
                searchList={transports}
              />
            </Card>

            <Card className="p-5 space-y-4">
              <FormField
                control={form.control}
                name="freight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Freight</FormLabel>
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
                        {taxTypeEnum.options.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
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
