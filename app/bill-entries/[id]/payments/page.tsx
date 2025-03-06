import { DataTable } from "@/components/ui/data-table";
import { prisma } from "@/prisma/client";
import React from "react";
import { columns } from "./columns";
import PaymentsListPage from "./components/payments-list-page";
import { Box, Text } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusSquare } from "lucide-react";

const PaymentsPage = async ({ params }: { params: { id: string } }) => {
  return (
    <Box>
      <Box className="flex justify-between items-center">
        <Box>
          <Text>
            <strong>Payments</strong>
          </Text>
        </Box>
        <Box>
          <Button variant="outline">
            <Link href={`/bill-entries/${params.id}/payments/new`}>
              <Box className="flex items-center space-x-2">
                <PlusSquare />
                <span>Add Payments</span>
              </Box>
            </Link>
          </Button>
        </Box>
      </Box>
      <PaymentsListPage billEntryId={params.id} />
    </Box>
  );
};

export default PaymentsPage;
