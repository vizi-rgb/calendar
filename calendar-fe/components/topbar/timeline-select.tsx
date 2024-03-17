"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as React from "react";
import { useAppDispatch } from "@/lib/hooks";
import { setTimeline } from "@/lib/features/timeline/timeline-slice";

export enum TimelineOption {
  Day = "1D",
  WorkWeek = "5D",
  Week = "1T",
  Month = "1M",
  Year = "1R",
}

export default function TimelineSelect() {
  const dispatch = useAppDispatch();
  const handleTimelineClick = (e: unknown, key: string) => {
    const timelineOption = TimelineOption[key as keyof typeof TimelineOption];
    dispatch(setTimeline(timelineOption));
  };

  const enumEntries = Object.entries(TimelineOption);

  return (
    <Tabs defaultValue="1D" className="">
      <TabsList className="grid w-full grid-cols-5">
        {enumEntries.map(([key, value]) => (
          <TabsTrigger
            key={key}
            value={value}
            onClick={(event) => handleTimelineClick(event, key)}
            className="px-1.5"
          >
            {value}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
