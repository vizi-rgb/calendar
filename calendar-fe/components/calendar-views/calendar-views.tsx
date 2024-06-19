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
  return (
    <div className="grid grid-cols-4 grid-rows-3 gap-20 h-full">
      {range(0, 11).map((monthNo) => (
        <div className="grid grid-cols-7 grid-rows-7">
          <p className="col-span-7 font-bold border-b mb-1">
            {months[monthNo]}
          </p>
          {range(0, 6).map((number) => (
            <p className="text-center " key={number}>
              {days[number].at(0)}
            </p>
          ))}
          {range(1, 35).map((dayNo) => (
            <div
              key={dayNo}
              className={
                "hover:font-bold cursor-pointer transition-colors duration-100 ease-in rounded-lg flex flex-row justify-center items-center" +
                (dayNo === day && monthNo === month ? " bg-accent" : "")
              }
            >
              {dayNo}
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
  return <div>Week View</div>;
};

const DayView = () => {
  return (
    <div className="grid grid-cols-[min-content_minmax(0,_1fr)] grid-rows-[24] gap-20">
      {range(1, 24).map((number) => (
        <div key={number}>{`${number}:00`}</div>
      ))}
      {range(1, 24).map((number) => (
        <div key={number}>Event</div>
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
    case TimelineOption.Day:
      return <DayView />;
    default:
      return <WeekView />;
  }
}
