import { DataTable } from "@/components/ui/data-table";
import { prisma } from "@/prisma/client";
import { Box, Container, Flex, Text } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import { columns } from "./columns";

const SuppliersPage = async () => {
  const suppliers = await prisma.supplier.findMany();

  return (
    <Box>
      <Box className="flex justify-between items-center">
        <Box>
          <Text>
            <strong>Suppliers</strong>
          </Text>
        </Box>
        <Box>
          <Button variant="outline">
            <Link href="/suppliers/new">
              <Box className="flex items-center space-x-2">
                <PlusSquare />
                <span>Add Supplier</span>
              </Box>
            </Link>
          </Button>
        </Box>
      </Box>
      <DataTable columns={columns} data={suppliers} />
    </Box>
  );
};

export default SuppliersPage;
