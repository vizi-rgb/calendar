import { days, DayType, months } from "@/constants/calendar-view-contants";
import { cn } from "@/lib/utils";
import * as React from "react";

const daysInMonth = (month: number, year: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const range = (start: number, end: number): number[] => {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
};

const calculateDayArray = (month: number, year: number): number[][] => {
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

export const YearView = ({ date }: { date: Date }) => {
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  let key = 1;

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
