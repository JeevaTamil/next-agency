"use client";

import { reportSchema } from "@/app/zod-schema";
import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@radix-ui/themes";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SearchableTextField from "../../components/searchable-text-field";
import { Customer } from "@prisma/client";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import axios from "axios";
import GeneratePdfReport from "../../components/generate-pdf-report";
import { useAgencyStore } from "@/store/agencyStore";

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
