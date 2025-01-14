import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Box } from "@radix-ui/themes";
import React from "react";

const CustomerForm = () => {
  return (
    <Box>
      <Sheet>
        <SheetTrigger>d</SheetTrigger>
        <SheetContent side="left" className="max-w-80">
          <ScrollArea>
            <SheetTitle>Title</SheetTitle>
            <SheetHeader>
              {Array.from({ length: 20 }).map((i) => (
                <input
                  type="text"
                  placeholder="Name"
                  className="border-emerald-100 p-3"
                />
              ))}
            </SheetHeader>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </Box>
  );
};

export default CustomerForm;
