"use client"

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import * as React from "react"

import { getAllUsersByUsername, UserType } from "@/api/user"
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

// TODO: passing debounce search user goes here
export function CommonCombobox({ value, setValue }: { value: string, setValue: React.Dispatch<React.SetStateAction<string | undefined>> }) {
  const [open, setOpen] = React.useState(false)
  const [filteredValues, setFilteredValue] = React.useState<UserType[]>([]);

  const debounceSearch = (value: string, timeoutMs: number = 500) => {

    if (value.trim() === "") {
      setFilteredValue([]);
    } else {
      setTimeout(async () => {
        const result: UserType[] = await getAllUsersByUsername({ username: value }) as UserType[];
        console.log(result);
        setFilteredValue(result);
      }, timeoutMs);
    }
  }

  function showFullname(inputValue: string) {
    if (inputValue.trim() === "") return;
    console.log(inputValue);
    const resultUser = filteredValues.find(user => user.firstName?.includes(inputValue) || user.lastName?.includes(inputValue) || user.username.includes(inputValue));
    return resultUser?.firstName + " " + resultUser?.lastName;
  }
  function firstNameInitial(user: UserType) {
    return user.firstName + " " + user.lastName?.substring(0, 1) + "."
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
            ? showFullname(value)
            : "Type to search..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search user..." className="h-9" onValueChange={debounceSearch} />
          <CommandList>
            <CommandEmpty>Not found.</CommandEmpty>
            <CommandGroup>
              {filteredValues.map((user) => (
                <CommandItem
                  key={user.username}
                  value={user.username}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {firstNameInitial(user)}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === firstNameInitial(user) ? "opacity-100" : "opacity-0"
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
