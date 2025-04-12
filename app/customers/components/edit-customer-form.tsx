"use client";

import { customerSchema } from "@/app/zod-schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

type customerFormData = z.infer<typeof customerSchema>;

interface EditCustomerFormProps {
  customer: customerFormData & { id: number }; // Include `id` for editing
}

const EditCustomerForm = ({ customer }: EditCustomerFormProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<customerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: customer, // Pre-fill the form with existing customer data
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const updatedData = { ...data, id: customer.id }; // Include the customer ID
      await axios.put("/api/customers", updatedData).then((res) => {
        if (res.status === 200) {
          toast({
            title: "Customer Updated",
            description: `Customer ${data.name} has been updated successfully`,
          });
          router.push("/customers");
          router.refresh();
        } else {
          toast({
            title: "Error occurred",
            description: `${(res.data as any).message}`,
            variant: "destructive",
          });
        }
      });
    } catch (error) {
      toast({
        title: "Error occurred",
        description: `${(error as any).message}`,
        variant: "destructive",
      });
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <Box className="space-y-4">
          <Box className="grid grid-cols-3 gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ABC Firm"
                      onInput={(e) => {
                        e.currentTarget.value =
                          e.currentTarget.value.toUpperCase();
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Chennai"
                      onInput={(e) => {
                        e.currentTarget.value =
                          e.currentTarget.value.toUpperCase();
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123 st, xyz road"
                      onInput={(e) => {
                        e.currentTarget.value =
                          e.currentTarget.value.toUpperCase();
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="987..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gst"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GST</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="BGFB34FR434"
                      onInput={(e) => {
                        e.currentTarget.value =
                          e.currentTarget.value.toUpperCase();
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Box>
          <Box className="flex gap-x-5">
            <Button variant="default" type="submit">
              Update
            </Button>
          </Box>
        </Box>
      </form>
    </Form>
  );
};

export default EditCustomerForm;