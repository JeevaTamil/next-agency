import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CommonEntity } from "@/types/common-types";
import { Box } from "@radix-ui/themes";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import {
  Controller,
  UseFormReturn
} from "react-hook-form";
import { billEntryFormData } from "./add-bill-entry-form";

type Props = {
  form: UseFormReturn<billEntryFormData>;
  name: string;
  label: string;
  searchList: CommonEntity[];
};

const SearchableTextField = ({ form, name, label, searchList }: Props) => {
  const [selectedName, setSelectedName] = useState<string | null>(null);

  return (
    <Controller
      control={form.control}
      name={name as keyof billEntryFormData}
      render={({ field }) => (
        <FormItem>
          <Box className="grid space-y-4">
            <FormLabel className="justify-start">{label}</FormLabel>
            <Popover>
              <PopoverTrigger asChild className="justify-start min-w-52">
                <FormControl>
                  <Button variant="outline" role="combobox">
                    {selectedName || `Select a ${label.toLowerCase()}`}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent>
                <Command>
                  <CommandInput
                    placeholder={`Search for a ${label.toLowerCase()}`}
                  />
                  <CommandList>
                    <CommandEmpty>No {label} found</CommandEmpty>
                    <CommandGroup>
                      {searchList.map((item) => (
                        <CommandItem
                          key={item.id}
                          value={item.name}
                          onSelect={() => {
                            field.onChange(item.id);
                            setSelectedName(item.name);
                          }}
                        >
                          <span>{item.name}</span>
                          {item.id === field.value && (
                            <Check className="opacity-80" />
                          )}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </Box>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SearchableTextField;
