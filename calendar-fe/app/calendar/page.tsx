import CalendarViews from "@/components/calendar-views";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalendarz",
};

export default function Calendar() {
  return (
    <main>
      <CalendarViews />
    </main>
  );
}
