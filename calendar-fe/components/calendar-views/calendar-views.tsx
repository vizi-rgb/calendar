"use client";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import "./custom-calendar.css";
import "moment/locale/pl";
import moment from "moment-timezone";
import { useAppSelector } from "@/lib/hooks";
import React, { useCallback, useMemo } from "react";
import {
  CALENDAR_VIEWS,
  convertToZonedDateTime,
  timelineOptionToBigCalendarView,
  withDefaultPageable,
  withDefaultPeriod,
} from "@/util/calendar-utils";
import { useEventsQuery } from "@/api/event/event-query";
import { TimelineOption } from "@/constants/timeline-option";
import { YearView } from "@/components/calendar-views/year-view";
import { GetEventsResponse } from "@/api/event/event-dto";

type DateFormatFn = (date: Date, culture: string, localizer: any) => string;

moment.locale("pl");
const localizer = momentLocalizer(moment);

const formats = {
  weekdayFormat: (date, culture, localizer) =>
    localizer.format(date, "dddd", culture),
  dateFormat: (date, culture, localizer) =>
    localizer.format(date, "D", culture),
  dayFormat: (date, culture, localizer) =>
    localizer.format(date, "dddd D", culture),
} as { [key: string]: DateFormatFn };

export function MyBigCalendarViewsWrapper() {
  const selectedView = useAppSelector((state) => state.calendar.timeline);
  const selectedDate = useAppSelector((state) => state.calendar.date);
  const authorization = useAppSelector((state) => state.authorization);
  const userUuid = authorization?.user?.userId ?? null;

  const defaultPeriod = useMemo(
    () => withDefaultPeriod(new Date(selectedDate)),
    [selectedDate],
  );

  const query = useEventsQuery(userUuid, defaultPeriod, withDefaultPageable());
  const events = query?.data?.content ?? [];

  if (selectedView === TimelineOption.Year) {
    return <YearView date={new Date(selectedDate)} />;
  }

  return (
    <MyBigCalendarViews
      events={events}
      selectedView={selectedView}
      selectedDate={selectedDate}
    />
  );
}

const MyBigCalendarViews = React.memo(
  ({
    events,
    selectedView,
    selectedDate,
  }: {
    events: GetEventsResponse[];
    selectedView: TimelineOption;
    selectedDate: string;
  }) => {
    const bigCalendarView = useMemo(
      () => timelineOptionToBigCalendarView(selectedView),
      [selectedView],
    );

    const startAccessor = useCallback(
      (event: GetEventsResponse) =>
        convertToZonedDateTime(event.startDateTime, event.zoneId),
      [],
    );

    const endAccessor = useCallback(
      (event: GetEventsResponse) =>
        convertToZonedDateTime(event.endDateTime, event.zoneId),
      [],
    );

    const titleAccessor = useCallback(
      (event: GetEventsResponse) => event.title,
      [],
    );

    return (
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor={startAccessor}
        endAccessor={endAccessor}
        titleAccessor={titleAccessor}
        allDayAccessor={() => false}
        resourceAccessor={() => ""}
        toolbar={false}
        formats={formats}
        date={new Date(selectedDate)}
        view={bigCalendarView}
        views={CALENDAR_VIEWS}
        scrollToTime={new Date()}
      />
    );
  },
);

MyBigCalendarViews.displayName = "MyBigCalendarViews";
