"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Box } from "@radix-ui/themes";

import { paymentModeEnum, paymentSchema } from "@/app/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BillEntryWithComputedProps } from "@/types/common-types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SearchableTextField from "./searchable-text-field";
import { Bank } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import BillEntryDetailPage from "../../../page";
import BillEntryDetailCard from "../../../components/bill-entry-detail-card";
import { Separator } from "@/components/ui/separator";
import { faker } from "@faker-js/faker";

export type paymentFormData = z.infer<typeof paymentSchema>;

interface AddPaymentFormProps {
  banks: Bank[];
  billEntry: BillEntryWithComputedProps;
}

const AddPaymentForm = ({ billEntry, banks }: AddPaymentFormProps) => {
  const form = useForm<paymentFormData>({
    resolver: zodResolver(paymentSchema),
  });

  const router = useRouter();

  const addDummyPayment = () => {
    const balance = (
      billEntry.grossAmount -
      billEntry.paidAmount -
      billEntry.debitNoteAmount
    ).toFixed(2);

    form.setValue("date", faker.date.soon({ days: 90 }));
    form.setValue(
      "transactionAmount",
      parseFloat(faker.commerce.price({ min: 5000, max: parseFloat(balance) }))
    );
    form.setValue("bankId", faker.number.int({ min: 1, max: 3 }));
    form.setValue(
      "referenceNumber",
      faker.number.int({ min: 100000, max: 999999 }).toString()
    );
    form.setValue("mode", faker.helpers.arrayElement(paymentModeEnum.options));
    form.setValue("additionalNote", faker.lorem.sentence());
  };

  const onSubmit = form.handleSubmit(
    async (data) => {
      console.log("Form is being submitted");
      console.log("Submitted data:", data);
      try {
        await axios
          .post(`/api/bill-entries/${billEntry.id}/payments`, {
            ...data,
            billEntryId: billEntry.id,
          })
          .then((res) => {
            if (res.status === 201) {
              toast({
                title: "Entry Created",
                description: `Payment has been added successfully`,
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
            <h3 className="my-3">Add Payment</h3>
            <Card className="p-5 m-3 space-y-4">
              <Box className="grid grid-cols-3 gap-4">
                <Box>
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transaction Date</FormLabel>
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
                    name="transactionAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transaction Amount</FormLabel>
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
                    name="bankId"
                    label="Bank"
                    searchList={banks}
                  />
                </Box>

                <Box>
                  <FormField
                    control={form.control}
                    name="referenceNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reference Number</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} placeholder="" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Box>
                <Box>
                  <FormField
                    control={form.control}
                    name="mode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Payment Mode" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {paymentModeEnum.options.map((option) => (
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
                {/* <Box>
                  <FormField
                    control={form.control}
                    name="billEntryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bill Entry Id</FormLabel>
                        <FormControl>
                          <Input
                            disabled
                            type="text"
                            {...field}
                            placeholder=""
                            value={billEntry.id}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Box> */}

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
              <Box className="flex space-x-4">
                <Button variant="default" type="submit">
                  Submit
                </Button>
                <Button variant="default" onClick={addDummyPayment}>
                  Add Dummy Payment
                </Button>
              </Box>
            </Card>
          </Box>
        </form>
      </Form>
    </Card>
  );
};

export default AddPaymentForm;
