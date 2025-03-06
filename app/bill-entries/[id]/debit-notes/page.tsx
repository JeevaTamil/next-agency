import { Button } from "@/components/ui/button";
import { Box, Text } from "@radix-ui/themes";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import React from "react";
import DebitNoteListPage from "./components/debit-note-list-page";

const DebitNotesPage = async ({ params }: { params: { id: string } }) => {
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
            <Link href={`/bill-entries/${params.id}/debit-notes/new`}>
              <Box className="flex items-center space-x-2">
                <PlusSquare />
                <span>Add Debit Note</span>
              </Box>
            </Link>
          </Button>
        </Box>
      </Box>
      <DebitNoteListPage billEntryId={params.id} />
    </Box>
  );
};

export default DebitNotesPage;
