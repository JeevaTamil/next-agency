import { Button } from "@/components/ui/button";
import { prisma } from "@/prisma/client";
import { Box, Text } from "@radix-ui/themes";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

const BankPage = async () => {
  const banks = await prisma.bank.findMany();

  return (
    <Box>
      <Box className="flex justify-between items-center">
        <Box>
          <Text>
            <strong>Banks</strong>
          </Text>
        </Box>
        <Box>
          <Button variant="outline">
            <Link href="/banks/new">
              <Box className="flex items-center space-x-2">
                <PlusSquare />
                <span>Add Bank</span>
              </Box>
            </Link>
          </Button>
        </Box>
      </Box>
      <DataTable columns={columns} data={banks} />
    </Box>
  );
};

export default BankPage;
