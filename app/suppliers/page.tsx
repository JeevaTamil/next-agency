"use client"; // ✅ Convert to Client Component

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useAgencyStore } from "@/store/agencyStore"; // ✅ Import Zustand store
import { Supplier } from "@prisma/client";
import { Box, Text } from "@radix-ui/themes";
import axios from "axios";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { columns } from "./columns";

export default function SuppliersPage() {
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
      {/* Header Section */}
      <Box className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-5">Suppliers</h1>
        <Button variant="outline">
          <Link href="/suppliers/new">
            <Box className="flex items-center space-x-2">
              <PlusSquare />
              <span>Add Supplier</span>
            </Box>
          </Link>
        </Button>
      </Box>

      {/* ✅ Show loading state */}
      {loading ? (
        <p>Loading suppliers...</p>
      ) : suppliers.length > 0 ? (
        <DataTable columns={columns} data={suppliers} />
      ) : (
        <p>No suppliers found for this agency.</p>
      )}
    </Box>
  );
}
