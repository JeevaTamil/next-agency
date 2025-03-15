"use client";

import { Box } from "@radix-ui/themes";
import GeneratePdfReport from "../components/generate-pdf-report";
import CustomerReportForm from "./components/customer-report-form";
import { prisma } from "@/prisma/client";
import { useEffect, useState } from "react";
import CustomerReportWrapper from "./components/customer-report-wrapper";
import axios from "axios";
import { useAgencyStore } from "@/store/agencyStore";
import { Customer } from "@prisma/client";

const CustomerReport = async () => {
  // const customers = await prisma.customer.findMany();
  // console.log(customers);

  const { agencyId } = useAgencyStore(); // ✅ Get agencyId from Zustand
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch customers when agencyId changes
  useEffect(() => {
    if (!agencyId) return;

    async function fetchCustomers() {
      console.log("Fetch customers for agencyId:", agencyId);
      setLoading(true);
      try {
        const res = await axios.get(`/api/customers`, { params: { agencyId } });
        const data = res.data.data;
        console.log("Fetched customers data:", data);
        setCustomers(data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
        setCustomers([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCustomers();
  }, [agencyId]); // ✅ Reloads when agencyId changes

  return (
    <Box>
      <CustomerReportWrapper customers={customers} />
    </Box>
  );
};

export default CustomerReport;
