"use client";

import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Box } from "@radix-ui/themes";
import React, { useState } from "react";
import SearchableTextField from "../../components/searchable-text-field";
import { useForm } from "react-hook-form";
import { reportFormData } from "../../customer-report/components/customer-report-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reportSchema } from "@/app/zod-schema";
import { Supplier } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useAgencyStore } from "@/store/agencyStore";
import axios from "axios";
import GenerateAgencyPDFReport from "../../components/generate-agency-report-pdf";
import { useToast } from "@/hooks/use-toast";

interface Params {
  suppliers: Supplier[];
}

const SupplierPicker = ({ suppliers }: Params) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState(null);
  const { agencyId } = useAgencyStore(); // ✅ Get agencyId from Zustand
  const form = useForm<reportFormData>({
    resolver: zodResolver(reportSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    console.log("Form is being submitted");
    const supplierId = data.id;
    const updatedData = {
      supplierId,
      agencyId,
    };

    console.log("Submitted data:", updatedData);

    try {
      await axios
        .get("/api/reports/agent-commission", {
          params: {
            supplierId,
            agencyId,
          },
        })
        .then((response) => {
          console.log("Response:", response.data);
          setFormData(response.data.report);
        })
        .catch((error) => {
          console.error("Error:", error);
          toast({
            title: "Error",
            description: `Failed to fetch agency commission entries: ${error.response.data.message}`,
            variant: "destructive",
          });
        });
    } catch (error) {
      console.error("Error fetching agenct commission entries:", error);
    }

    // Perform any action with the selected supplier ID
  });

  return (
    <Box>
      <Card className="max-w-xs p-5 mb-5 gap-5 ">
        <Box className="">
          <Form {...form}>
            <form onSubmit={onSubmit}>
              <Box className="grid space-y-4">
                <SearchableTextField
                  form={form}
                  name="id"
                  label="Supplier"
                  searchList={suppliers}
                />
                <Button variant="default" type="submit">
                  Submit
                </Button>
              </Box>
            </form>
          </Form>
        </Box>
      </Card>

      <GenerateAgencyPDFReport data={formData} />
    </Box>
  );
};

export default SupplierPicker;
