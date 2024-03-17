"use client";
import { useAppSelector } from "@/lib/hooks";

export default function CalendarViews() {
  const selectedView = useAppSelector((state) => state.timeline.value);

  return <p>{selectedView}</p>;
}
