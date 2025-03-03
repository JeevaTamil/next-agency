"use client";

import { Button } from "@/components/ui/button";
import { faker } from "@faker-js/faker";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import React, { useState } from "react";

interface Propes {
  data: any;
}

const GeneratePdfReport = ({ data }: Propes) => {
  console.log("Received from PDF generator:", data);
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
    doc.text("Customer Report", 14, 14); // Title of the document

    doc.outline;

    // Header with customer details
    doc.setFontSize(10);
    const customerName = faker.company.name();
    const customerAddress = faker.location.streetAddress();
    const customerCity = faker.location.city();
    const customerState = faker.location.state();
    const customerZip = faker.location.zipCode();
    const customerPhone = faker.phone.number();
    const customerEmail = faker.internet.email();

    addText(doc, `Customer Name: ${customerName}`);
    addText(
      doc,
      `Address: ${customerAddress}, ${customerCity}, ${customerState}, ${customerZip}`
    );
    addText(doc, `Contact: ${customerPhone}, ${customerEmail}`);
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
      "Supplier",
      "Gross",
      "Balance",
      "Unpaid days",
    ];

    const suppliers = Array.from({ length: 10 }, (_, i) => {
      return faker.company.name();
    });

    suppliers.forEach((supplier) => {
      const body = Array.from(
        { length: Math.floor(Math.random() * 15) },
        (_, i) => [
          (i + 1).toString(),
          `Bill No ${i + 1}`,
          `2023-10-${(i % 30) + 1}`,
          `${supplier}`,
          (Math.random() * 1000).toFixed(2),
          (Math.random() * 500).toFixed(2),
          Math.floor(Math.random() * 100).toString(),
        ]
      );

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
    });

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
