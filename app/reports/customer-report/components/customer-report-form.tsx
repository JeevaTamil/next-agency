"use client";

import { reportSchema } from "@/app/zod-schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useAgencyStore } from "@/store/agencyStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Customer } from "@prisma/client";
import { Box } from "@radix-ui/themes";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SearchableTextField from "../../components/searchable-text-field";

export type reportFormData = z.infer<typeof reportSchema>;

interface Params {
  customers: Customer[];
  handleFormSubmit: (data: any) => void;
}

const CustomerReportForm = ({ customers, handleFormSubmit }: Params) => {
  const { agencyId } = useAgencyStore();

  const form = useForm<reportFormData>({
    resolver: zodResolver(reportSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    console.log("Form is being submitted");
    console.log("Submitted data:", data);
    const billEntries = await fetchBillEntries(data.id);
    console.log(billEntries);
    handleFormSubmit(billEntries);
  });

  const fetchBillEntries = async (customerId: number) => {
    try {
      const response = await axios.get(`/api/bill-entries`, {
        params: {
          customerId,
          agencyId,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching bill entries:", error);
      throw error;
    }
  };

  return (
    <Card className="max-w-xs p-5 mb-5 gap-5 ">
      <Box className="">
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <Box className="grid space-y-4">
              <SearchableTextField
                form={form}
                name="id"
                label="Customer"
                searchList={customers}
              />
              <Button variant="default" type="submit">
                Submit
              </Button>
            </Box>
          </form>
        </Form>
      </Box>
    </Card>
  );
};

export default CustomerReportForm;
