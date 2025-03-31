import { Button } from "@/components/ui/button";
import { Box } from "@radix-ui/themes";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import React from "react";

interface Props {
  data: any;
}

const GenerateAgencyPDFReport = ({ data }: Props) => {
  if (data === null) {
    return <Box>Please select the supplier</Box>;
  } else if (data.length === 0) {
    return <Box>No Data Found</Box>;
  }

  console.log("Received from agency report PDF generator:", data);
  let addressStartY = 20;
  const startX = 14;

  const addText = (doc: jsPDF, text: string) => {
    doc.text(text, startX, getYPosition());
  };

  const getYPosition = () => {
    addressStartY += 5;
    return addressStartY;
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    // Set up header (example)
    doc.setFontSize(12);
    doc.text(`Agent Commission Report`, 14, 14); // Title of the document

    const supplier = data[0].billEntry.supplier;
    addText(doc, `Supplier Name: ${supplier.name}`);
    addText(doc, `City: ${supplier.city}`);
    addText(doc, `Contact: ${supplier.phone}`);
    addText(doc, `Commission: ${supplier.commission}`);
    const today = new Date().toLocaleDateString();
    addText(doc, `Report generated on: ${today}`);

    // Draw a line (optional, if desired)
    const y = getYPosition();
    doc.line(14, y, 200, y); // Example line position

    // Start position for tables
    let startY = getYPosition() - 5;

    const headers = [
      "S.No",
      "Bill No",
      "Bill Date",
      "Customer",
      "Transaction Date",
      "Transaction Amount",
      "Payment Mode",
      "Commission Amount",
    ];

    let body: any[] = [];
    let totalCommissionAmount = 0;
    let totalTransactionAmount = 0;

    data.forEach((item: any, index: number) => {
      const row = [
        index + 1,
        item.billEntry.billNumber,
        new Date(item.billEntry.billDate).toLocaleDateString(),
        item.billEntry.customer.name,
        new Date(item.date).toLocaleDateString(),
        parseFloat(item.transactionAmount).toFixed(2),
        item.mode,
        parseFloat(item.agentCommission.commissionAmount).toFixed(2),
      ];
      body.push(row);
      totalCommissionAmount += item.agentCommission.commissionAmount;
      totalTransactionAmount += item.transactionAmount;
    });

    body.push([
      "",
      "",
      "",
      "",
      "Total T. Amount",
      `${totalTransactionAmount.toFixed(2)}`,
      "Total Commission Amount",
      `${totalCommissionAmount.toFixed(2)}`,
    ]);

    autoTable(doc, {
      startY: startY + 5, // Small gap before the table
      theme: "grid",
      head: [headers],
      headStyles: {
        halign: "center",
        valign: "middle",
      },
      body: body,
      bodyStyles: {
        halign: "center",
        valign: "middle",
      },
    });

    doc.output("dataurlnewwindow"); // To check PDF generation
  };

  return (
    <div>
      <Button onClick={generatePDF}>Generate Report</Button>
    </div>
  );
};

export default GenerateAgencyPDFReport;
