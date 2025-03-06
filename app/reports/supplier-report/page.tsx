import { Box } from "@radix-ui/themes";
import { prisma } from "@/prisma/client";
import SupplierReportWrapper from "./components/supplier-report-wrapper";

const SupplierReport = async () => {
  const suppliers = await prisma.supplier.findMany();
  console.log(suppliers);

  return (
    <Box>
      <SupplierReportWrapper suppliers={suppliers} />
    </Box>
  );
};

export default SupplierReport;
