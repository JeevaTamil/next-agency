import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { prisma, prismaExt } from "@/prisma/client";
import { Box, Text } from "@radix-ui/themes";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import { columns } from "./columns";
import { differenceInDays } from "date-fns";

const BillEntriesPage = async () => {
  const billEntries = await prismaExt.billEntry.findMany({
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

  console.log(billEntries);

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
      <DataTable
        columns={columns}
        data={billEntries}
        filterColumn={["Customer", "Supplier"]}
      />
    </Box>
  );
};

export default BillEntriesPage;
