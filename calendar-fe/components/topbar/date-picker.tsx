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
import {
  nextDate,
  previousDate,
  setDate,
} from "@/lib/features/calendar/calendar-slice";
import { TimelineOption } from "@/constants/timeline-option";

function customMonthCaptionFormatter(date: Date): string {
  const formattedCaption = format(date, "LLLL y", { locale: pl });
  return formattedCaption.charAt(0).toUpperCase() + formattedCaption.slice(1);
}

function getMonday(date: Date): Date {
  let localDate: Date = new Date(date);
  let day: number = localDate.getDay();
  let diff: number = localDate.getDate() - day + (day == 0 ? -6 : 1);
  return new Date(localDate.setDate(diff));
}

function getFriday(date: Date): Date {
  let monday: Date = getMonday(date);
  let diff: number = monday.getDate() + 4;
  return new Date(monday.setDate(diff));
}

function getSunday(date: Date): Date {
  let monday: Date = getMonday(date);
  let diff: number = monday.getDate() + 6;
  return new Date(monday.setDate(diff));
}

function formatWeekViews(firstDate: Date, secondDate: Date): string {
  if (firstDate.getMonth() === secondDate.getMonth()) {
    return format(firstDate, "MMM y");
  }

  return format(firstDate, "MMM") + " - " + format(secondDate, "MMM y");
}

function formatDate(date: Date, timeline: TimelineOption): string {
  if (!date) return "";

  switch (timeline) {
    case TimelineOption.Year:
      return format(date, "y");
    case TimelineOption.Month:
      return format(date, "LLLL y");
    case TimelineOption.Week:
      return formatWeekViews(getMonday(date), getSunday(date));
    case TimelineOption.WorkWeek:
      return formatWeekViews(getMonday(date), getFriday(date));
    case TimelineOption.Day:
      return format(date, "d MMMM y");
  }
}

function CalendarPopover() {
  const date: Date = new Date(useAppSelector((state) => state.calendar.date));
  const timeline: TimelineOption = useAppSelector(
    (state) => state.calendar.timeline,
  );
  const dispatch = useAppDispatch();

  setDefaultOptions({ locale: pl });

  const setSelectedDate = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      dispatch(setDate(selectedDate.toISOString()));
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-36 capitalize" variant={"ghost"}>
          {formatDate(date, timeline)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setSelectedDate}
          defaultMonth={date}
          locale={pl}
          formatters={{
            formatCaption: customMonthCaptionFormatter,
          }}
          required
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
        onClick={() => dispatch(previousDate())}
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
      <CalendarPopover />
      <Button variant="ghost" size="icon" onClick={() => dispatch(nextDate())}>
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
