"use client";

import { bankSchema } from "@/app/zod-schema";
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

type bankFormData = z.infer<typeof bankSchema>;

const AddBankForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<bankFormData>({
    resolver: zodResolver(bankSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    console.log(data);
    try {
      await axios
        .post("/api/banks", {
          name: data.name,
        })
        .then((res) => {
          toast({
            title: "Bank Created",
            description: `Bank ${data.name} has been added successfully`,
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
    router.push("/banks");
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
                    placeholder="Name of the bank"
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

export default AddBankForm;
