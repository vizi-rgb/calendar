"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import * as React from "react";
import { useState } from "react";
import { format, setDefaultOptions } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { pl } from "date-fns/locale";
import { useAppDispatch } from "@/lib/hooks";
import {
  nextMonth,
  previousMonth,
} from "@/lib/features/calendar/calendar-slice";

function CalendarPopover() {
  const today = new Date();
  setDefaultOptions({ locale: pl });

  const [date, setDate] = useState<Date | undefined>(today);

  let formatDate = () => {
    if (!date) return;
    let formattedDate = format(date, "LLLL y");
    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    return formattedDate;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"}>{formatDate()}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          locale={pl}
          mode="single"
          selected={date}
          initialFocus
          onSelect={setDate}
        />
      </PopoverContent>
    </Popover>
  );
}

export default function DatePicker() {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-row items-center gap-x-0.5">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => dispatch(previousMonth())}
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
      <CalendarPopover />
      <Button variant="ghost" size="icon" onClick={() => dispatch(nextMonth())}>
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
