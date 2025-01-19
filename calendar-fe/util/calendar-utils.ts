import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { View, Views } from "react-big-calendar";
import { PageableRequest } from "@/api/pageable";
import { GetEventsRequest } from "@/api/event/event-dto";
import { TimelineOption } from "@/constants/timeline-option";
import moment from "moment-timezone";

export const customMonthCaptionFormatter = (date: Date): string => {
  const formattedCaption = format(date, "LLLL y", { locale: pl });
  return formattedCaption.charAt(0).toUpperCase() + formattedCaption.slice(1);
};

export const combineDateAndTime = (date: Date, time: string): Date => {
  const [hours, minutes] = time.split(":").map(Number);
  const combined = new Date(date);
  combined.setHours(hours, minutes, 0, 0);
  return combined;
};

export const combineDateAndTimeUTC = (date: Date, time: string): Date => {
  const [hours, minutes] = time.split(":").map(Number);
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes,
      0,
      0,
    ),
  );
};

export const toUtcDateWithoutChangingTime = (date: Date): Date => {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds(),
    ),
  );
};

export const timelineOptionToBigCalendarView = (
  option: TimelineOption,
): View => {
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

export const convertToZonedDateTime = (
  utcDate: string,
  zoneId: string,
): Date => {
  return moment.tz(utcDate, zoneId).toDate();
};

export const withDefaultPeriod = (date: Date): GetEventsRequest => ({
  from: new Date(Date.UTC(date.getFullYear(), 0, 1)).toISOString(),
  to: new Date(Date.UTC(date.getFullYear(), 11, 31)).toISOString(),
  zoneId: Intl.DateTimeFormat().resolvedOptions().timeZone,
});

export const withDefaultPageable = (): PageableRequest => ({
  page: 0,
  size: 500,
});

export const CALENDAR_VIEWS = [
  Views.MONTH,
  Views.WEEK,
  Views.WORK_WEEK,
  Views.DAY,
];
