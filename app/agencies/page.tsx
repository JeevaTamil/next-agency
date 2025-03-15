import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { prisma } from "@/prisma/client";
import { Box, Text } from "@radix-ui/themes";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import { columns } from "./columns";

const AgencyPage = async () => {
  const agencies = await prisma.agency.findMany();

  return (
    <Box>
      <Box className="flex justify-between items-center">
        <Box>
          <Text>
            <strong>Agencies</strong>
          </Text>
        </Box>
        <Box>
          <Button variant="outline">
            <Link href="/agencies/new">
              <Box className="flex items-center space-x-2">
                <PlusSquare />
                <span>Add Bank</span>
              </Box>
            </Link>
          </Button>
        </Box>
      </Box>
      <DataTable columns={columns} data={agencies} />
    </Box>
  );
};

export default AgencyPage;
