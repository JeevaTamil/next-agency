import { DataTable } from "@/components/ui/data-table";
import { prisma } from "@/prisma/client";
import React from "react";
import { columns } from "./columns";
import PaymentsListPage from "../components/payments-list-page";

const PaymentsPage = async ({ params }: { params: { id: string } }) => {
  return <PaymentsListPage billEntryId={params.id} />;
};

export default PaymentsPage;
