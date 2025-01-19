"use client";

import { supplierSchema } from "@/app/zod-schema";
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

type supplierFormData = z.infer<typeof supplierSchema>;

const AddSupplierForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<supplierFormData>({
    resolver: zodResolver(supplierSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    console.log(data);
    try {
      await axios.post("/api/suppliers", { data }).then((res) => {
        toast({
          title: "Supplier Created",
          description: `Supplier ${data.name} has been added successfully`,
        });
        console.log(res);
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error occured",
        description: `${(error as any).message}`,
        variant: "destructive",
      });
    }
    router.push("/suppliers");
    router.refresh();
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <Box className="space-y-4">
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

          <FormField
            control={form.control}
            name="commission"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Commission</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="3.0"
                    min="0"
                    max="5"
                    step="0.1"
                    {...field}
                  />
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

export default AddSupplierForm;
