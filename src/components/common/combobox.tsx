"use client"

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]
// TODO: passing debounce search user goes here
export function CommonCombobox({ value, setValue }: { value: string, setValue: React.Dispatch<React.SetStateAction<string | undefined>> }) {
  const [open, setOpen] = React.useState(false)
  const [filteredValues, setFilteredValue] = React.useState([{ value: "", label: "" }]);

  const handleValueChange = (value: string) => {
    // api search user goes here
    setFilteredValue(frameworks.filter(framework => framework.label.toLowerCase().includes(value.toLowerCase())))
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Type to search..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" onValueChange={handleValueChange} />
          <CommandList>
            <CommandEmpty>Not found.</CommandEmpty>
            <CommandGroup>
              {filteredValues.map((el) => (
                <CommandItem
                  key={el.value}
                  value={el.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {el.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === el.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
