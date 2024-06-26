"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import * as React from "react";
import { format, setDefaultOptions } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { pl } from "date-fns/locale";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { nextDate, previousDate } from "@/lib/features/calendar/calendar-slice";
import { TimelineOption } from "@/constants/timeline-option";

function CalendarPopover({
  inputDate,
  timeline,
}: {
  inputDate: Date;
  timeline: TimelineOption;
}) {
  const date = new Date(inputDate);
  setDefaultOptions({ locale: pl });

  console.log({ inputDate });

  const doSomething = () => {};

  let formatDate = () => {
    if (!date) return;

    let formattedDate;
    if (timeline !== TimelineOption.Year) {
      formattedDate = format(date, "LLLL y");
      formattedDate =
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    } else {
      formattedDate = format(date, "y");
    }
    return formattedDate;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-32" variant={"ghost"}>
          {formatDate()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          locale={pl}
          mode="single"
          selected={date}
          initialFocus
          onSelect={doSomething}
        />
      </PopoverContent>
    </Popover>
  );
}

export default function DatePicker() {
  const dispatch = useAppDispatch();
  const selectedDate = useAppSelector((state) => state.calendar.date);
  const selectedTimeline = useAppSelector((state) => state.calendar.timeline);

  return (
    <div className="flex flex-row items-center gap-x-0.5">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => dispatch(previousDate())}
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
      <CalendarPopover inputDate={selectedDate} timeline={selectedTimeline} />
      <Button variant="ghost" size="icon" onClick={() => dispatch(nextDate())}>
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
