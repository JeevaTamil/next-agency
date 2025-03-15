import { Button } from "@/components/ui/button";
import { Box, Text } from "@radix-ui/themes";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import PaymentsListPage from "./components/payments-list-page";

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
