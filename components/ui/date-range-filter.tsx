import { Box } from "@radix-ui/themes";
import React from "react";
import { Label } from "./label";
import { Input } from "./input";

interface DateRangeFilterProps {
  from: string;
  to: string;
  setFrom: (value: string) => void;
  setTo: (value: string) => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  from,
  to,
  setFrom,
  setTo,
}) => {
  return (
    <Box className="flex space-x-2">
      <Box>
        <Label htmlFor="from">From</Label>
        <Input
          type="date"
          id="from"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
      </Box>
      <Box>
        <Label htmlFor="to">To</Label>
        <Input
          type="date"
          id="to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </Box>
    </Box>
  );
};

export default DateRangeFilter;
