import { Box } from "@radix-ui/themes";
import { Input } from "./input";

const DataTableFilter = ({
  filterColumn,
  table,
}: {
  filterColumn: string[];
  table: any;
}) => {
  return (
    <Box className="grid grid-cols-3 max-w-xl">
      {filterColumn.map((e) => (
        <div key={e} className="flex items-center pr-2 max-w-sm">
          <Input
            placeholder={`Filter ${e}...`}
            id={e}
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
  );
};

export default DataTableFilter;
