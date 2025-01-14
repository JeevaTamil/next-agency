import { DataTable } from "@/components/ui/data-table";
import { prisma } from "@/prisma/client";
import { columns } from "./columns";
import { Box, Container, Flex, Text } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import CustomerForm from "./components/customer-form";

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
          <CustomerForm />
        </Box>
      </Box>
      <DataTable columns={columns} data={customers} />
    </Box>
  );
};

export default CustomersPage;
