"use client";

import { useAgencyStore } from "@/store/agencyStore";
import { Agency } from "@prisma/client";
import { Separator } from "@radix-ui/react-separator";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function AgencySelector() {
  const { agencyId, setAgencyId } = useAgencyStore();
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchAgencies() {
      try {
        const res = await axios.get("/api/agencies");
        console.log("API Data:", res.data);
        setAgencies(res.data.data); // ✅ Extract actual array
      } catch (error) {
        console.error("Failed to fetch agencies:", error);
        setAgencies([]); // ✅ Prevent errors
      }
    }

    fetchAgencies();

    // ✅ Load agency from localStorage on page load
    const storedAgency = localStorage.getItem("agencyId");
    if (storedAgency) {
      setAgencyId(Number(storedAgency));
    }
  }, [setAgencyId]);

  const handleValueChange = (value: string) => {
    setAgencyId(Number(value));
    localStorage.setItem("agencyId", value); // ✅ Store in localStorage
  };

  return (
    <Select value={agencyId?.toString()} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Agency">
          {agencies.find((a) => a.id === agencyId)?.name || "Select Agency"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Agency</SelectLabel>
          {agencies.map((agency) => (
            <SelectItem key={agency.id} value={agency.id.toString()}>
              {agency.name}
            </SelectItem>
          ))}
          <Separator className="m-5" orientation="horizontal" />
          <Button variant="outline">
            <Link className="m-5" href="/agencies/new">
              Add New Agency
            </Link>
          </Button>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
