"use client";

import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Propes {
  data: any;
  type: "Customer" | "Supplier";
}

type BillEntry = {
  id: number;
  billDate: string;
  billNumber: string;
  customerId: number;
  supplierId: number;
  productQty: number;
  lrNumber: string;
  lrDate: string;
  transportId: number;
  freight: number;
  netAmount: number;
  taxType: string;
  grossAmount: number;
  customer: { id: number; name: string; city: string; phone: string };
  supplier: { id: number; name: string; city: string; phone: string };
  transport: { id: number; name: string };
  payments: {
    id: number;
    date: string;
    billEntryId: number;
    transactionAmount: number;
    bankId: number;
    mode: string;
    referenceNumber: string;
    additionalNote: string;
  }[];
  unPaidDays: number;
  unPaidAmount: number;
};

type GroupedData = Record<number, BillEntry[]>;

const groupBySupplierId = (data: BillEntry[]): GroupedData => {
  return data.reduce((acc: GroupedData, entry: BillEntry) => {
    const supplierId = entry.supplierId;
    if (!acc[supplierId]) {
      acc[supplierId] = [];
    }
    acc[supplierId].push(entry);
    return acc;
  }, {});
};

const groupByCustomerId = (data: BillEntry[]): GroupedData => {
  return data.reduce((acc: GroupedData, entry: BillEntry) => {
    const customerId = entry.customerId;
    if (!acc[customerId]) {
      acc[customerId] = [];
    }
    acc[customerId].push(entry);
    return acc;
  }, {});
};

const GeneratePdfReport = ({ data, type }: Propes) => {
  if (data === null) {
    return <div></div>;
  }

  const groupedData =
    type === "Customer"
      ? groupBySupplierId(data.data)
      : groupByCustomerId(data.data);
  console.log("GroupedData", groupedData);

  console.log("Received from PDF generator:", data.data);
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
    doc.setFontSize(15);
    doc.text(`${type} Report`, 14, 14); // Title of the document

    doc.outline;

    // Header with customer details
    doc.setFontSize(10);

    if (type === "Customer") {
      const customer = data.data[0].customer;
      addText(doc, `Customer Name: ${customer.name}`);
      addText(doc, `City: ${customer.city}`);
      addText(doc, `Contact: ${customer.phone}`);
      const today = new Date().toLocaleDateString();
      addText(doc, `Report generated on: ${today}`);
    } else {
      const supplier = data.data[0].supplier;
      addText(doc, `Supplier Name: ${supplier.name}`);
      addText(doc, `City: ${supplier.city}`);
      addText(doc, `Contact: ${supplier.phone}`);
      const today = new Date().toLocaleDateString();
      addText(doc, `Report generated on: ${today}`);
    }

    // Draw a line (optional, if desired)
    const y = getYPosition();
    doc.line(14, y, 200, y); // Example line position

    // Start position for tables
    let startY = getYPosition() - 5;

    const headers = [
      "S.No",
      "Bill No",
      "Bill Date",
      type === "Customer" ? "Supplier" : "Customer",
      "Gross",
      "Balance",
      "Unpaid days",
    ];

    for (const [id, bills] of Object.entries(groupedData)) {
      console.log(`${type} ID: ${id}`);
      let body: any[] = [];
      let totalGross = 0;
      let totalUnpaid = 0;
      bills.forEach((bill, index) => {
        const partyName =
          type === "Customer"
            ? `${bill.supplier.name},${bill.supplier.city} `
            : `${bill.customer.name},${bill.customer.city} `;
        const row = [
          index + 1,
          bill.billNumber,
          (new Date(bill.billDate) as any).toLocaleDateString(),
          partyName,
          bill.grossAmount.toFixed(2),
          bill.unPaidAmount.toFixed(2),
          bill.unPaidDays.toString(),
        ];
        body.push(row);
        totalGross += bill.grossAmount;
        totalUnpaid += bill.unPaidAmount;
        console.log(`body`, body);
        console.log(
          `  Bill Number: ${bill.billNumber}, Gross Amount: ${bill.grossAmount}`
        );
      });

      // Add a summary row
      body.push([
        "",
        "",
        "",
        "Total",
        totalGross.toFixed(2),
        totalUnpaid.toFixed(2),
        "",
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
      startY = (doc as any).lastAutoTable.finalY; // Move 10 units down for spacing
    }

    // doc.save("table.pdf");
    doc.output("dataurlnewwindow"); // To check PDF generation
  };

  return (
    <div>
      <Button onClick={generatePDF}>Generate Report</Button>
    </div>
  );
};

export default GeneratePdfReport;
