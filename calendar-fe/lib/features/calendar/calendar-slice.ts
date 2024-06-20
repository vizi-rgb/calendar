import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TimelineOption } from "@/app/constants/timeline-option";

let initialTimeline: TimelineOption =
  (localStorage.getItem("timeline") as TimelineOption) ?? TimelineOption.Day;

interface CalendarState {
  timeline: TimelineOption;
  date: Date;
}

const initialState: CalendarState = {
  timeline: initialTimeline,
  date: new Date(),
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setTimeline(state, action: PayloadAction<TimelineOption>) {
      state.timeline = action.payload;
      localStorage.setItem("timeline", action.payload);
    },
    previousDate(state) {
      const newDate = new Date(state.date);

      if (state.timeline === TimelineOption.Month) {
        newDate.setMonth(newDate.getMonth() - 1);
      } else if (state.timeline === TimelineOption.Year) {
        newDate.setFullYear(newDate.getFullYear() - 1);
      }

      state.date = newDate;
    },
    nextDate(state) {
      const newDate = new Date(state.date);

      if (state.timeline === TimelineOption.Month) {
        newDate.setMonth(newDate.getMonth() + 1);
      } else if (state.timeline === TimelineOption.Year) {
        newDate.setFullYear(newDate.getFullYear() + 1);
      }

      state.date = newDate;
    },
    previousMonth(state) {
      const newDate = new Date(state.date);
      newDate.setMonth(newDate.getMonth() - 1);

      state.date = newDate;
    },
    nextMonth(state) {
      const newDate = new Date(state.date);
      newDate.setMonth(newDate.getMonth() + 1);

      state.date = newDate;
    },
  },
});

export const { setTimeline, previousMonth, nextMonth, previousDate, nextDate } =
  calendarSlice.actions;
export default calendarSlice.reducer;
