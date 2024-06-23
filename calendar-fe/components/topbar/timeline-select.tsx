"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setTimeline } from "@/lib/features/calendar/calendar-slice";
import { TimelineOption } from "@/app/constants/timeline-option";

export default function TimelineSelect() {
  const dispatch = useAppDispatch();
  const handleTimelineClick = (e: unknown, value: TimelineOption) => {
    dispatch(setTimeline(value));
  };
  const value = useAppSelector((state) => state.calendar.timeline);

  const enumEntries = Object.entries(TimelineOption);

  return (
    <Tabs value={value} defaultValue={value ?? TimelineOption.Day} className="">
      <TabsList className="grid w-full grid-cols-5">
        {enumEntries.map(([key, value]) => (
          <TabsTrigger
            key={key}
            value={value}
            onClick={(event) => handleTimelineClick(event, value)}
            className="px-1.5"
          >
            {value}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
