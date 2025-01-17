import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Box } from "@radix-ui/themes";
import { PlusSquare } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AddCustomerForm from "./add-customer-form";

const CustomerForm = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <PlusSquare />
        </SheetTrigger>
        <SheetContent side="right" className="min-w-[700px]">
          {/* <ScrollArea>
            <SheetTitle>Add Customer</SheetTitle>
          </ScrollArea> */}
          <AddCustomerForm
            onSubmit={(value) => {
              setOpen(value);
            }}
          />
        </SheetContent>
      </Sheet>
    </Box>
  );
};

export default CustomerForm;
