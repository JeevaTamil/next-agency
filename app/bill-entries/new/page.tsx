"use client"; // ✅ Convert to Client Component

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAgencyStore } from "@/store/agencyStore"; // ✅ Import Zustand store
import { Customer, Supplier, Transport } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import AddBillEntryForm from "./components/add-bill-entry-form";

export default function NewBillEntryPage() {
  const { agencyId } = useAgencyStore(); // ✅ Get agencyId from Zustand
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [transports, setTransports] = useState<Transport[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch customers, suppliers, and transports when agencyId changes
  useEffect(() => {
    console.log("Current agencyId:", agencyId); // 🔍 Check if agencyId is set

    if (!agencyId) {
      console.warn("Skipping fetch: agencyId is missing"); // 🚨 Debugging Log
      return;
    }

    async function fetchData() {
      console.log("Fetching data for agencyId:", agencyId); // 🔍 Confirm fetch execution
      setLoading(true);
      try {
        const [customersRes, suppliersRes, transportsRes] = await Promise.all([
          axios.get(`/api/customers`, { params: { agencyId } }),
          axios.get(`/api/suppliers`, { params: { agencyId } }),
          axios.get(`/api/transports`),
        ]);

        console.log("Fetched customers:", customersRes.data.data);
        console.log("Fetched suppliers:", suppliersRes.data.data);
        console.log("Fetched transports:", transportsRes.data.data);

        setCustomers(customersRes.data.data);
        setSuppliers(suppliersRes.data.data);
        setTransports(transportsRes.data.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setCustomers([]);
        setSuppliers([]);
        setTransports([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [agencyId]);

  return (
    <Card className="max-w-5xl">
      <CardHeader>Add Bill Entry</CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading...</p> // ✅ Show loading state
        ) : (
          <AddBillEntryForm
            customers={customers}
            suppliers={suppliers}
            transports={transports}
          />
        )}
      </CardContent>
    </Card>
  );
}
