import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Box, Text } from "@radix-ui/themes";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import React from "react";
import { columns } from "./columns";
import { prisma } from "@/prisma/client";
import { format } from "date-fns";

const BillEntriesPage = async () => {
  const billEntries = await prisma.billEntry.findMany({
    include: {
      customer: {
        select: {
          id: true,
          name: true,
        },
      },
      supplier: {
        select: {
          id: true,
          name: true,
        },
      },
      transport: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

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
      <DataTable columns={columns} data={billEntries} href="bill-entries" />
    </Box>
  );
};

export default BillEntriesPage;
