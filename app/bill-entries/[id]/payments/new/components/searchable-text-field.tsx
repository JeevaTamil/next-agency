import React, { useState } from "react";
import {
  Controller,
  UseFormReturn,
  ControllerRenderProps,
} from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ChevronsUpDown, Check } from "lucide-react";
import { CommonEntity } from "@/types/common-types";

import { Box } from "@radix-ui/themes";
import { paymentFormData } from "./add-payment-form";
import { debitNoteFormData } from "../../../debit-notes/new/components/add-debit-note-form";

import { FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: string;
  label: string;
  searchList: CommonEntity[];
};

const SearchableTextField = <T extends FieldValues>({ form, name, label, searchList }: Props<T>) => {
  const [selectedName, setSelectedName] = useState<string | null>(null);

  return (
    <Controller
      control={form.control}
      name={name as Path<T>}
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
                      {/* <CommandItem
                        key="addNew"
                        value="addNew"
                        onSelect={() => {}}
                      > */}
                      {/* <Button className="w-full" variant="outline">
                        Add New
                      </Button> */}
                      {/* </CommandItem> */}
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
