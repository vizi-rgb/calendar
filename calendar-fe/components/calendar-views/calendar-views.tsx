"use client";
import { useAppSelector } from "@/lib/hooks";
import { TimelineOption } from "@/app/constants/timeline-option";
import * as React from "react";
import { cn } from "@/lib/utils";

const days = [
  "Poniedziałek",
  "Wtorek",
  "Środa",
  "Czwartek",
  "Piątek",
  "Sobota",
  "Niedziela",
];

const months = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień",
];

const enum DayType {
  PREVIOUS,
  CURRENT,
  NEXT,
}

const daysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const range = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
};

const calculateDayArray = (month: number, year: number) => {
  const daysInCurrentMonth = daysInMonth(month, year);
  const daysInPreviousMonth = daysInMonth(month - 1, year);

  const newDate = new Date(year, month, 1);
  const toFill = (6 + newDate.getDay()) % 7;

  const rows = Math.ceil((daysInCurrentMonth + toFill) / 7);
  const rest = rows * 7 - daysInCurrentMonth - toFill;
  const calculatedArray: number[][] = [];

  for (let i = 0; i < toFill; i++) {
    calculatedArray.push([
      daysInPreviousMonth - toFill + i + 1,
      DayType.PREVIOUS,
    ]);
  }

  for (let i = 1; i <= daysInCurrentMonth; i++) {
    calculatedArray.push([i, DayType.CURRENT]);
  }

  for (let i = 1; i <= rest; i++) {
    calculatedArray.push([i, DayType.NEXT]);
  }

  return calculatedArray;
};

const YearView = ({ date }: { date: Date }) => {
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  let key = 1;
  console.log(date);

  const currentDate = new Date();
  const { currentMonth, currentDay, currentYear } = {
    currentMonth: currentDate.getMonth(),
    currentDay: currentDate.getDate(),
    currentYear: currentDate.getFullYear(),
  };

  return (
    <div className="grid grid-cols-1 grid-rows-12 md:grid-cols-2 md:grid-rows-6 lg:grid-cols-4 lg:grid-rows-3 gap-x-20 gap-y-10 h-full">
      {range(0, 11).map((monthNo) => (
        <div className="grid grid-cols-7 auto-rows-fr" key={key++}>
          <p className="col-span-7 font-bold border-b mb-1">
            {months[monthNo]}
          </p>
          {range(0, 6).map((number) => (
            <p className="text-center " key={key++}>
              {days[number].at(0)}
            </p>
          ))}
          {calculateDayArray(monthNo, year).map(([_day, type]) => (
            <div
              key={key++}
              className={cn(
                "hover:font-bold cursor-pointer transition-all duration-200 ease-in-out rounded-lg flex flex-row justify-center items-center",
                type === DayType.PREVIOUS ? "text-muted" : "",
                type === DayType.NEXT ? "text-muted" : "",
                _day === currentDay &&
                  monthNo === currentMonth &&
                  year === currentYear &&
                  type === DayType.CURRENT
                  ? " bg-accent"
                  : "",
              )}
            >
              {_day}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const MonthView = ({ date }: { date: Date }) => {
  const currentDate = new Date();
  const daysArray = calculateDayArray(date.getMonth(), date.getFullYear());
  let key = 1;

  const isToday = (day: number, month: number) => {
    return (
      day === currentDate.getDate() &&
      month === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    );
  };

  return (
    <div className="grid grid-cols-7 grid-rows-[auto] auto-rows-fr h-full gap-px">
      {range(0, 6).map((number) => (
        <p key={number} className="p-2 font-bold border-b mb-1">
          {days[number]}
        </p>
      ))}

      {daysArray.map(([day, type]) => (
        <div
          key={key++}
          className={cn(
            "p-2 hover:bg-accent rounded-lg",
            type === DayType.PREVIOUS ? "text-muted" : "",
            type === DayType.NEXT ? "text-muted" : "",
            isToday(day, date.getMonth()) && type == DayType.CURRENT
              ? "bg-accent"
              : "",
          )}
        >
          {day}
        </div>
      ))}
    </div>
  );
};

const WeekView = () => {
  return (
    <div className="grid grid-cols-7 auto-rows-min">
      {range(0, 6).map((number) => (
        <p key={number} className="p-2 font-bold border-b mb-1">
          {days[number]}
        </p>
      ))}
    </div>
  );
};

const WorkWeekView = () => {
  return (
    <div className="grid grid-cols-5 auto-rows-min">
      {range(0, 4).map((number) => (
        <p key={number} className="p-2 font-bold border-b mb-1">
          {days[number]}
        </p>
      ))}
    </div>
  );
};

const DayView = () => {
  return (
    <div className="grid grid-cols-1 grid-rows-[24] gap-20">
      {range(0, 0).map((number) => (
        <p key={number} className="p-2 font-bold border-b mb-1">
          {days[number]}
        </p>
      ))}
    </div>
  );
};

export default function CalendarViews() {
  let selectedView = useAppSelector((state) => state.calendar.timeline);
  let date = useAppSelector((state) => state.calendar.date);

  switch (selectedView) {
    case TimelineOption.Year:
      return <YearView date={date} />;
    case TimelineOption.Month:
      return <MonthView date={date} />;
    case TimelineOption.Week:
      return <WeekView />;
    case TimelineOption.WorkWeek:
      return <WorkWeekView />;
    case TimelineOption.Day:
      return <DayView />;
    default:
      return <WeekView />;
  }
}
