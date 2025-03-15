"use client";

import { useAgencyStore } from "@/store/agencyStore";
import { Supplier } from "@prisma/client";
import { Box } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import SupplierReportWrapper from "./components/supplier-report-wrapper";

const SupplierReport = () => {
  // const suppliers = await prisma.supplier.findMany();
  // console.log(suppliers);

  const { agencyId } = useAgencyStore(); // ✅ Get agencyId from Zustand
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch suppliers when agencyId changes
  useEffect(() => {
    if (!agencyId) return;

    async function fetchSuppliers() {
      console.log("Fetching suppliers for agencyId:", agencyId);
      setLoading(true);
      try {
        const res = await axios.get(`/api/suppliers`, { params: { agencyId } });
        const data = res.data.data;
        console.log("Fetched suppliers data:", data);
        setSuppliers(data);
      } catch (error) {
        console.error("Failed to fetch suppliers:", error);
        setSuppliers([]);
      } finally {
        setLoading(false);
      }
    }

    fetchSuppliers();
  }, [agencyId]); // ✅ Reloads when agencyId changes

  return (
    <Box>
      <SupplierReportWrapper suppliers={suppliers} />
    </Box>
  );
};

export default SupplierReport;
