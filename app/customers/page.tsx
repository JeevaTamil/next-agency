import { DataTable } from "@/components/ui/data-table";
import { prisma } from "@/prisma/client";
import { columns } from "./columns";
import { Box, Container, Flex, Text } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import Link from "next/link";

const CustomersPage = async () => {
  const customers = await prisma.customer.findMany();

  return (
    <Box>
      <Box className="flex justify-between items-center">
        <Box>
          <Text>
            <strong>Customers</strong>
          </Text>
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
      <DataTable columns={columns} data={customers} />
    </Box>
  );
};

export default CustomersPage;
