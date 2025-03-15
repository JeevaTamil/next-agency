"use client";

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
import { Box } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { agencySchema } from "@/app/zod-schema";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type agencyFormData = z.infer<typeof agencySchema>;

const AddAgencyForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<agencyFormData>({
    resolver: zodResolver(agencySchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    console.log(data);
    try {
      await axios
        .post("/api/agencies", {
          name: data.name,
        })
        .then((res) => {
          toast({
            title: "Agency Created",
            description: `Agency ${data.name} has been added successfully`,
          });
          console.log(res);
        });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error occured",
        description: `${error as any}`,
        variant: "destructive",
      });
    }
    router.push("/agencies");
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
                    id="agency-name"
                    placeholder="Name of the agency"
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

          <Button variant="default" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </Form>
  );
};

export default AddAgencyForm;
