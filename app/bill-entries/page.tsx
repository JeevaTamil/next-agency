"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { prisma, prismaExt } from "@/prisma/client";
import { Box, Text } from "@radix-ui/themes";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import { columns } from "./columns";
import { useAgencyStore } from "@/store/agencyStore";
import { useEffect, useState } from "react";
import axios from "axios";
import { BillEntry } from "@prisma/client";

const BillEntriesPage = () => {
  const { agencyId } = useAgencyStore(); // ✅ Get agencyId from Zustand
  const [billEntries, setBillEntries] = useState<BillEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch bill entries when agencyId changes
  useEffect(() => {
    if (!agencyId) return;

    async function fetchBillEntries() {
      console.log("Fetching bill entries for agencyId:", agencyId);
      setLoading(true);
      try {
        const res = await axios.get(`/api/bill-entries`, {
          params: { agencyId },
        });
        const data = res.data.data;
        console.log("Fetched bill entries data:", data);
        setBillEntries(data);
      } catch (error) {
        console.error("Failed to fetch bill entries:", error);
        setBillEntries([]);
      } finally {
        setLoading(false);
      }
    }

    fetchBillEntries();
  }, [agencyId]);

  // const billEntries = await prismaExt.billEntry.findMany({
  //   include: {
  //     customer: {
  //       select: {
  //         id: true,
  //         name: true,
  //       },
  //     },
  //     supplier: {
  //       select: {
  //         id: true,
  //         name: true,
  //       },
  //     },
  //     transport: {
  //       select: {
  //         id: true,
  //         name: true,
  //       },
  //     },
  //   },
  // });

  return (
    <Box>
      <Box className="flex justify-between items-center">
        <Box>
          <Text>
            <strong>Bill Entries</strong>
          </Text>
        </Box>
        <Box>
          <Button variant="outline">
            <Link href="/bill-entries/new">
              <Box className="flex items-center space-x-2">
                <PlusSquare />
                <span>Add Bill Entry</span>
              </Box>
            </Link>
          </Button>
        </Box>
      </Box>
      {loading ? (
        <p>Loading bill entries...</p>
      ) : billEntries.length > 0 ? (
        <DataTable
          columns={columns}
          data={billEntries}
          filterColumn={["Customer", "Supplier", "Bill Number"]}
        />
      ) : (
        <p>No bill entries found for this agency.</p>
      )}

      {/* <DataTable
        columns={columns}
        data={billEntries}
        filterColumn={["Customer", "Supplier", "Bill Number"]}
      /> */}
    </Box>
  );
};

export default BillEntriesPage;
