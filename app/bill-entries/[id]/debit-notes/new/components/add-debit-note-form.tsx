"use client";

import { debitNoteSchema, taxTypeEnum } from "@/app/zod-schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { BillEntryWithComputedProps } from "@/types/common-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Transport } from "@prisma/client";
import { Box } from "@radix-ui/themes";
import axios from "axios";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SearchableTextField from "../../../payments/new/components/searchable-text-field";

export type debitNoteFormData = z.infer<typeof debitNoteSchema>;

interface AddDebitNoteFormProps {
  transports: Transport[];
  billEntry: BillEntryWithComputedProps;
}

const AddDebitNoteForm = ({ billEntry, transports }: AddDebitNoteFormProps) => {
  const form = useForm<debitNoteFormData>({
    resolver: zodResolver(debitNoteSchema),
  });

  const onSubmit = form.handleSubmit(
    async (data) => {
      console.log("Form is being submitted");
      console.log("Submitted data:", data);
      try {
        await axios
          .post(`/api/bill-entries/${billEntry.id}/debit-notes`, {
            ...data,
            billEntryId: billEntry.id,
          })
          .then((res) => {
            if (res.status === 201) {
              toast({
                title: "Entry Created",
                description: `Debit Note has been added successfully`,
              });
              router.push(`/bill-entries/${billEntry.id}`);
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

  const router = useRouter();
  return (
    <Card className="p-5">
      <Box className="max-w-5xl">
        <h3 className="my-3">Bill Entry details</h3>
        <Card className="p-5 m-3 space-y-4">
          <Box className="grid grid-cols-3 gap-4">
            <Box className="col-start-1">
              <Label htmlFor="billNumber">Bill Number</Label>
              <Input
                disabled
                type="number"
                id="billNumber"
                value={billEntry.billNumber}
              />
            </Box>

            <Box className="col-start-2">
              <Label htmlFor="billDate">Bill Date</Label>
              <Input
                disabled
                type="text"
                id="billDate"
                value={billEntry.billDate.toDateString()}
              />
            </Box>

            <Box className="col-start-3">
              <Label htmlFor="unPaidDays">Un Paid Days</Label>
              <Input
                disabled
                type="text"
                id="unPaidDays"
                value={billEntry.unPaidDays}
              />
            </Box>
            <Box>
              <Label htmlFor="customer">Customer</Label>
              <Input
                disabled
                type="text"
                id="customer"
                value={billEntry.customer.name}
              />
            </Box>

            <Box>
              <Label htmlFor="supplier">Supplier</Label>
              <Input
                disabled
                type="text"
                id="supplier"
                value={billEntry.supplier.name}
              />
            </Box>

            <Box>
              <Label htmlFor="grossAmount">Gross Amount</Label>
              <Input
                disabled
                type="text"
                id="grossAmount"
                value={billEntry.grossAmount}
              />
            </Box>
            {billEntry.paidAmount > 0 && (
              <Box>
                <Label htmlFor="debitNoteReturnAmount">
                  Debit Note Return Amount
                </Label>
                <Input
                  disabled
                  type="text"
                  id="debitNoteReturnAmount"
                  value={billEntry.debitNoteAmount}
                />
              </Box>
            )}
            {billEntry.paidAmount > 0 && (
              <Box>
                <Label htmlFor="paidAmount">Paid Amount</Label>
                <Input
                  disabled
                  type="text"
                  id="paidAmount"
                  value={billEntry.paidAmount}
                />
              </Box>
            )}

            <Box>
              <label htmlFor="balanceAmount">Balance Amount</label>
              <Input
                disabled
                type="text"
                id="balanceAmount"
                value={(
                  billEntry.grossAmount -
                  billEntry.paidAmount -
                  billEntry.debitNoteAmount
                ).toFixed(2)}
              />
            </Box>
          </Box>
        </Card>
      </Box>

      {/* <BillEntryDetailCard
        params={{
          billEntry: billEntry,
        }}
      /> */}

      <Separator className="my-10" orientation="horizontal" />

      <Form {...form}>
        <form onSubmit={onSubmit}>
          <Box className="max-w-5xl">
            <h3 className="my-3">Add Debit Note</h3>
            <Card className="p-5 m-3 space-y-4">
              <Box className="grid grid-cols-3 gap-4">
                <Box>
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
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
                </Box>
                <Box>
                  <FormField
                    control={form.control}
                    name="returnAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Return Amount</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} placeholder="10000" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Box>
                <Box>
                  <SearchableTextField
                    form={form}
                    name="transportId"
                    label="Transport"
                    searchList={transports}
                  />
                </Box>
                <Box>
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
                </Box>

                <Box>
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
                </Box>

                <Box>
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
                </Box>

                <Box>
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
                </Box>

                <Box className="col-start-1">
                  <FormField
                    control={form.control}
                    name="additionalNote"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes</FormLabel>
                        <FormControl>
                          <div>
                            <Textarea
                              {...field}
                              placeholder="Type your message here."
                              id="additionalNotes"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Box>
              </Box>
              <Button variant="default" type="submit">
                Submit
              </Button>
            </Card>
          </Box>
        </form>
      </Form>
    </Card>
  );
};

export default AddDebitNoteForm;
