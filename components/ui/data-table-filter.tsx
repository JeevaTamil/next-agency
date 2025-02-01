import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import { Button } from "./button";
import { Box } from "@radix-ui/themes";
import { Filter } from "lucide-react";
import { Input } from "./input";

const DataTableFilter = ({
  filterColumn,
  table,
}: {
  filterColumn: string[];
  table: any;
}) => {
  return (
    // <Sheet>
    //   <SheetTrigger>
    //     <Button variant="outline">
    //       <Box className="flex items-center space-x-2">
    //         <Filter />
    //         <span>Filter</span>
    //       </Box>
    //     </Button>
    //   </SheetTrigger>
    //   <SheetContent>
    <Box className="grid grid-cols-3 max-w-xl">
      {filterColumn.map((e) => (
        <div className="flex items-center p-2 max-w-sm">
          <Input
            placeholder={`Filter ${e}...`}
            value={(table.getColumn(e)?.getFilterValue() as string) ?? ""}
            onChange={(event) => {
              console.log(event.target.value.toString);
              table.getColumn(e)?.setFilterValue(event.target.value);
            }}
            className="max-w-sm"
          />
        </div>
      ))}
    </Box>
    //   </SheetContent>
    // </Sheet>
  );
};

export default DataTableFilter;
