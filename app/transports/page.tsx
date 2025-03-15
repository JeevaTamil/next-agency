import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { prisma } from "@/prisma/client";
import { Box, Text } from "@radix-ui/themes";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import { columns } from "./columns";

const TransportPage = async () => {
  const transports = await prisma.transport.findMany();

  return (
    <Box>
      <Box className="flex justify-between items-center">
        <Box>
          <Text>
            <strong>Transports</strong>
          </Text>
        </Box>
        <Box>
          <Button variant="outline">
            <Link href="/transports/new">
              <Box className="flex items-center space-x-2">
                <PlusSquare />
                <span>Add Transport</span>
              </Box>
            </Link>
          </Button>
        </Box>
      </Box>
      <DataTable columns={columns} data={transports} />
    </Box>
  );
};

export default TransportPage;
