import { prisma } from "@/prisma/client";
import React from "react";
import AddCustomerForm from "../../components/add-customer-form";

const EditCustomerPage = async ({ params }: { params: { id: string } }) => {
  const customer = await prisma.customer.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!customer) {
    return <div>Customer not found</div>;
  }

  return <AddCustomerForm customer={customer} />;
};

export default EditCustomerPage;
