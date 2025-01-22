import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";
import { Customer } from "@prisma/client";

interface SearchInputProps {
  searchList: Customer[];
}

export function FilterSearchInput({ searchList }: SearchInputProps) {
  const [value, setValue] = useState("");
  return (
    <Command
      inputMode="text"
      className="bg-black w-[250px] rounded-lg  border-gray-400 text-txtWhite relative"
    >
      <CommandInput
        className="h-full"
        value={value}
        onValueChange={(e) => setValue(e)}
        placeholder="search..."
      />
      {value && (
        <CommandList className="border-none">
          <CommandEmpty>No results found</CommandEmpty>
          <CommandGroup heading="Customers">
            {searchList.map((item) => {
              return (
                <CommandItem key={item.id}>
                  <span>{item.name}</span>
                  <span>{item.id ?? ""}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      )}
    </Command>
  );
}
