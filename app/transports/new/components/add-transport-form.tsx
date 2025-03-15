"use client";

import { transportSchema } from "@/app/zod-schema";
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

type transportFormData = z.infer<typeof transportSchema>;

const AddTransportForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<transportFormData>({
    resolver: zodResolver(transportSchema),
  });

  const addDummyTransport = () => {
    form.setValue(
      "name",
      faker.string.alpha({ length: { min: 3, max: 10 } }).toUpperCase()
    );
  };

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
    router.push("/transports");
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

          <Box className="flex space-x-4">
            <Button variant="default" type="submit">
              Submit
            </Button>
            <Button variant="default" onClick={addDummyTransport}>
              Add Dummy Transport
            </Button>
          </Box>
        </Box>
      </form>
    </Form>
  );
};

export default AddTransportForm;
