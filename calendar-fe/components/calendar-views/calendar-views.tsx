"use client";
import { useAppSelector } from "@/lib/hooks";
import { TimelineOption } from "@/constants/timeline-option";
import * as React from "react";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { days, DayType, months } from "@/constants/calendar-view-contants";
import {
  Calendar as BigCalendar,
  DateLocalizer,
  momentLocalizer,
  View,
  Views,
} from "react-big-calendar";
import "./custom-calendar.css";
import "moment/locale/pl";
import moment from "moment-timezone";
import { GetEventsResponse } from "@/api/event/event-dto";
import { useEventsQuery } from "@/api/event/event-query";
import { toUtcDateWithoutChangingTime } from "@/util/calendar-utils";
import { PageableRequest } from "@/api/pageable";

type DateFormatFn = (
  date: Date,
  culture: string,
  localizer: DateLocalizer,
) => string;

const timelineOptionToBigCalendarView = (option: TimelineOption): View => {
  switch (option) {
    case TimelineOption.Day:
      return Views.DAY;
    case TimelineOption.Week:
      return Views.WEEK;
    case TimelineOption.WorkWeek:
      return Views.WORK_WEEK;
    case TimelineOption.Month:
      return Views.MONTH;
    default:
      return Views.WEEK;
  }
};

const convertToZonedDateTime = (utcDate: Date, zoneId: string): Date => {
  return moment.utc(utcDate).tz(zoneId).toDate();
};

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

const YearView = ({ date }: { date: Date }) => {
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
export function MyBigCalendarViewsWrapper() {
  const selectedView: TimelineOption = useAppSelector(
    (state) => state.calendar.timeline,
  );

  const selectedDate: Date = new Date(
    useAppSelector((state) => state.calendar.date),
  );

  const authorization = useAppSelector((state) => state.authorization);
  const userUuid = authorization?.user?.userId ?? null;
  const authToken = authorization?.accessToken ?? null;

  const today = new Date();
  const from = new Date(
    today.getFullYear(),
    today.getMonth() - 6,
    1,
  ).toISOString();
  const to = new Date(
    today.getFullYear(),
    today.getMonth() + 6,
    1,
  ).toISOString();
  const zoneId = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const pageable: PageableRequest = {
    page: 0,
    size: 500,
  };

  const query = useEventsQuery(
    userUuid,
    {
      from,
      to,
      zoneId,
    },
    authToken,
    pageable,
  );

  if (selectedView === TimelineOption.Year) {
    return <YearView date={selectedDate} />;
  }

  const events = (query ? query.data?.content : []) ?? [];
  return <MyBigCalendarViews events={events} />;
}

export function MyBigCalendarViews({
  events,
}: {
  events: GetEventsResponse[];
}) {
  moment.locale("pl");
  const localizer = momentLocalizer(moment);

  const formats = useMemo(
    () =>
      ({
        weekdayFormat: (date, culture, localizer) =>
          localizer.format(date, "dddd", culture),
        dateFormat: (date, culture, localizer) =>
          localizer.format(date, "D", culture),
        dayFormat: (date, culture, localizer) =>
          localizer.format(date, "dddd D", culture),
      }) as { [key: string]: DateFormatFn },
    [],
  );

  const selectedView = useAppSelector((state) => state.calendar.timeline);
  const selectedDate = useAppSelector((state) => state.calendar.date);

  let bigCalendarView: View = timelineOptionToBigCalendarView(selectedView);

  return (
    <BigCalendar
      localizer={localizer}
      events={events}
      startAccessor={(event) =>
        convertToZonedDateTime(
          toUtcDateWithoutChangingTime(new Date(event.startDateTime)),
          event.zoneId,
        )
      }
      endAccessor={(event) =>
        convertToZonedDateTime(
          toUtcDateWithoutChangingTime(new Date(event.endDateTime)),
          event.zoneId,
        )
      }
      titleAccessor={(event) => event.title}
      allDayAccessor={() => false}
      resourceAccessor={() => ""}
      toolbar={false}
      formats={formats}
      date={selectedDate}
      view={bigCalendarView}
      views={[Views.MONTH, Views.WEEK, Views.WORK_WEEK, Views.DAY]}
      scrollToTime={new Date()}
    />
  );
}
