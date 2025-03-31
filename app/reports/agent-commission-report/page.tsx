import { prisma } from "@/prisma/client";
import React from "react";
import SupplierPicker from "./components/supplier-picker";
import { Box } from "@radix-ui/themes";

const AgentCommissionReportPage = async () => {
  const suppliers = await prisma.supplier.findMany();

  return (
    <Box>
      <h1 className="text-2xl font-bold mb-5">Agent Commission Report</h1>
      <SupplierPicker suppliers={suppliers} />
    </Box>
  );
};

export default AgentCommissionReportPage;
