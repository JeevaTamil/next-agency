"use client";

import { customerSchema } from "@/app/customer-schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { prisma } from "@/prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title } from "@radix-ui/react-dialog";
import { Box, Text } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";

type customerFormData = z.infer<typeof customerSchema>;

const AddCustomerForm = () => {
  const router = useRouter();

  const form = useForm<customerFormData>({
    resolver: zodResolver(customerSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await axios.post("/api/customers", data).then((res) => {
      console.log(res);
    });
    router.refresh();
    
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <Box>
          <Text size="6">Add Customer</Text>
        </Box>
        <Box className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="ABC Firm" {...field} />
                </FormControl>
                {/* <FormDescription>This is your public display name.</FormDescription> */}
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
                  <Input placeholder="Chennai" {...field} />
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
                  <Input placeholder="123 st, xyz road" {...field} />
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
                  <Input placeholder="BGFB34FR434" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          
          <Button variant="default" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </Form>
  );
};

export default AddCustomerForm;
