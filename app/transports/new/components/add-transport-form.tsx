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
import { transportSchema } from "@/app/zod-schema";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type transportFormData = z.infer<typeof transportSchema>;

const AddTransportForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<transportFormData>({
    resolver: zodResolver(transportSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    console.log(data);
    try {
      await axios
        .post("/api/transports", {
          name: data.name,
        })
        .then((res) => {
          toast({
            title: "Transport Created",
            description: `Transport ${data.name} has been added successfully`,
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
                    placeholder="Name of the transport"
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

export default AddTransportForm;
