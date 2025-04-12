import { prisma } from "@/prisma/client";
import React from "react";
import AddSupplierForm from "../../components/add-supplier-form";

const EditSupplierPage = async ({ params }: { params: { id: string } }) => {
  const supplier = await prisma.supplier.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!supplier) {
    return <div>Customer not found</div>;
  }

  return <AddSupplierForm supplier={supplier} />;
};

export default EditSupplierPage;
