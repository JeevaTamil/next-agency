import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { prisma } from "@/prisma/client";
import { Box, Text } from "@radix-ui/themes";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import { columns } from "./columns";

const BankPage = async () => {
  const banks = await prisma.bank.findMany();

  return (
    <Box>
      <Box className="flex justify-between items-center">
        <Box>
          <h1 className="text-2xl font-bold mb-5">Banks</h1>
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
