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
import { faker } from "@faker-js/faker";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

type customerFormData = z.infer<typeof customerSchema>;

const AddCustomerForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<customerFormData>({
    resolver: zodResolver(customerSchema),
  });

  const addDummyCustomer = () => {
    form.setValue("name", faker.company.name());
    form.setValue("city", faker.location.city());
    form.setValue("address", faker.location.streetAddress());
    form.setValue(
      "phone",
      `${faker.number.int({ min: 7000000000, max: 9999999999 })}`
    );
    form.setValue("gst", faker.string.alphanumeric(15).toUpperCase());
  };

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const storedAgency = localStorage.getItem("agencyId");
      const dataWithAgency = {
        ...data,
        agencyId: storedAgency ? Number(storedAgency) : 1,
      };
      await axios.post("/api/customers", dataWithAgency).then((res) => {
        if (res.status === 201) {
          toast({
            title: "Customer Created",
            description: `Customer ${data.name} has been added successfully`,
          });
          router.push("/customers");
          router.refresh();
        } else {
          toast({
            title: "Error occured",
            description: `${(res.data as any).message}`,
            variant: "destructive",
          });
        }
      });
    } catch (error) {
      toast({
        title: "Error occured",
        description: `${(error as any).message}`,
        variant: "destructive",
      });
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="max-w-md">
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
          <Box className="flex gap-x-5">
            <Button variant="default" type="submit">
              Submit
            </Button>

            <Button variant="default" onClick={addDummyCustomer}>
              Add Dummy Customer
            </Button>
          </Box>
        </Box>
      </form>
    </Form>
  );
};

export default AddCustomerForm;
