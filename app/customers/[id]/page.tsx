import { prisma } from "@/prisma/client";
import React from "react";

const CustomerDetailPage = async ({ params }: { params: { id: string } }) => {
  const customer = await prisma.customer.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  return <div>CustomerDetailPage</div>;
};

export default CustomerDetailPage;
