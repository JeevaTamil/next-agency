import { prisma } from "@/prisma/client";
import { Box } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import BillEntryTablePage from "../components/bill-entries-table";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

const BillEntryDetailPage = async ({ params }: { params: { id: string } }) => {
  const billEntry = await prisma.billEntry.findUnique({
    where: {
      id: parseInt(params.id),
    },
    include: {
      customer: {
        select: {
          name: true,
        },
      },
      supplier: {
        select: {
          name: true,
        },
      },
      transport: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!billEntry) {
    return notFound();
  }

  return (
    <Box>
      <BillEntryTablePage billEntry={billEntry} />
      <Box className="my-5">
        <Box className="flex items-center space-x-3">
          <h3>Payments</h3>
          <Button variant="outline">
            <Link href={`/bill-entries/${params.id}/payments/new`}>
              <Box className="flex items-center space-x-2">
                <PlusSquare />
                <span>Add Bill Entry</span>
              </Box>
            </Link>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BillEntryDetailPage;
