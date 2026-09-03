"use client";

import * as React from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

/**
 * Date picker theo pattern shadcn (Popover + Calendar + Button).
 * Nếu truyền `name`, component render 1 `<input type="hidden">` giá trị `yyyy-MM-dd`
 * để submit được trong `<form action={serverAction}>`.
 */
function DatePicker({
  id,
  name,
  value,
  defaultValue,
  onChange,
  placeholder = "Chọn ngày",
  disabled = false,
  disablePast = false,
  className,
  triggerClassName,
}: {
  id?: string;
  name?: string;
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  disablePast?: boolean;
  className?: string;
  triggerClassName?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [internal, setInternal] = React.useState<Date | undefined>(defaultValue);
  const date = value ?? internal;

  const handleSelect = (next: Date | undefined) => {
    if (value === undefined) setInternal(next);
    onChange?.(next);
    setOpen(false);
  };

  return (
    <>
      {name ? (
        <input
          type="hidden"
          name={name}
          value={date ? format(date, "yyyy-MM-dd") : ""}
        />
      ) : null}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              type="button"
              variant="outline"
              id={id}
              disabled={disabled}
              className={cn(
                "h-9 w-full justify-between rounded-md px-2.5 text-base font-normal md:text-sm",
                !date && "text-muted-foreground",
                triggerClassName,
              )}
            >
              {date ? format(date, "dd/MM/yyyy") : placeholder}
              <CalendarIcon className="size-4 shrink-0 opacity-60" />
            </Button>
          }
        />
        <PopoverContent
          align="start"
          className={cn("w-auto p-0", className)}
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            defaultMonth={date}
            autoFocus
            locale={vi}
            className="[--cell-size:2.15rem]"
            disabled={disablePast ? { before: new Date() } : undefined}
          />
        </PopoverContent>
      </Popover>
    </>
  );
}

export { DatePicker };
