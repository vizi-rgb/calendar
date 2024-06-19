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

const daysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};

const range = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
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

  const month = date.getMonth();
  const newDate = new Date(date);
  newDate.setDate(1);

  const daysInCurrentMonth = daysInMonth(month + 1, date.getFullYear());
  const daysInPreviousMonth = daysInMonth(month, date.getFullYear());
  const toFill = (6 + newDate.getDay()) % 7;
  const startFromDay = daysInPreviousMonth - toFill + 1;
  const rest = 35 - daysInCurrentMonth - toFill;

  return (
    <div className="grid grid-cols-7 grid-rows-[auto_repeat(5,_minmax(0,_1fr))] h-full gap-px">
      {range(0, 6).map((number) => (
        <p key={number} className="p-2 font-bold border-b mb-1">
          {days[number]}
        </p>
      ))}
      {range(0, toFill - 1).map((number) => (
        <div key={number} className="p-2 hover:bg-accent text-muted rounded-lg">
          {startFromDay + number}
        </div>
      ))}
      {range(1, daysInCurrentMonth).map((number) => (
        <div
          key={number}
          className={cn(
            "p-2 hover:bg-accent rounded-lg",
            number == currentDate.getDate() &&
              currentDate.getMonth() == date.getMonth() &&
              currentDate.getFullYear() == date.getFullYear()
              ? "bg-accent"
              : "",
          )}
        >
          {number}
        </div>
      ))}
      {range(1, rest).map((number) => (
        <div
          key={number}
          className={cn("p-2 hover:bg-accent text-muted rounded-lg")}
        >
          {number}
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
