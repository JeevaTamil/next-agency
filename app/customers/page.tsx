"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useAgencyStore } from "@/store/agencyStore";
import { Customer } from "@prisma/client";
import { Box, Text } from "@radix-ui/themes";
import axios from "axios";
import { Loader2, PlusSquare } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { columns } from "./columns";

const CustomersPage = () => {
  // const customers = await prisma.customer.findMany();

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
      <Box className="flex justify-between items-center">
        <Box>
          <h1 className="text-2xl font-bold mb-5">Customers</h1>
        </Box>
        <Box>
          <Button variant="outline">
            <Link href="/customers/new">
              <Box className="flex items-center space-x-2">
                <PlusSquare />
                <span>Add Customer</span>
              </Box>
            </Link>
          </Button>
        </Box>
      </Box>
      {loading ? (
         <div className="flex flex-col items-center justify-center h-full space-y-2 t-50">
         <Loader2 className="animate-spin" />
         <p>Loading...</p>
       </div>
      ) : customers.length > 0 ? (
        <DataTable
          columns={columns}
          data={customers}
          filterColumn={["name", "city"]}
        />
      ) : (
        <p>No customers found for this agency.</p>
      )}
      {/* <DataTable columns={columns} data={customers} /> */}
    </Box>
  );
};

export default CustomersPage;
