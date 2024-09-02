import { Metadata } from "next";
import { MyBigCalendarViews } from "@/components/calendar-views/calendar-views";

export const metadata: Metadata = {
  title: "Kalendarz",
};

export default function Calendar() {
  return (
    <main className="grow">
      {/*<CalendarViews />*/}
      <MyBigCalendarViews />
    </main>
  );
}
