"use client";
import { useAppSelector } from "@/lib/hooks";
import { TimelineOption } from "@/app/constants/timeline-option";
import * as React from "react";

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

const range = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
};

const YearView = () => {
  return (
    <div className="grid grid-cols-4 grid-rows-3 gap-20 h-full">
      {range(0, 11).map((number) => (
        <div className="grid grid-cols-7 grid-rows-7">
          <p className="col-span-7 font-bold border-b mb-1">{months[number]}</p>
          {range(0, 6).map((number) => (
            <p className="text-center " key={number}>
              {days[number].at(0)}
            </p>
          ))}
          {range(1, 35).map((number) => (
            <div
              key={number}
              className="hover:bg-accent transition-colors duration-100 ease-in rounded-lg flex flex-row justify-center items-center"
            >
              {number}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const MonthView = () => {
  return (
    <div className="grid grid-cols-7 grid-rows-[auto_repeat(5,_minmax(0,_1fr))] h-full">
      {range(0, 6).map((number) => (
        <p key={number} className="p-2 font-bold border-b mb-1">
          {days[number]}
        </p>
      ))}
      {range(1, 35).map((number) => (
        <div
          key={number}
          className="p-2 hover:bg-accent transition-colors duration-100 ease-in rounded-lg"
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
  let selectedView = useAppSelector((state) => state.timeline.value);

  switch (selectedView) {
    case TimelineOption.Year:
      return <YearView />;
    case TimelineOption.Month:
      return <MonthView />;
    case TimelineOption.Day:
      return <DayView />;
    default:
      return <WeekView />;
  }
}
