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

export const { setTimeline, previousMonth, nextMonth } = calendarSlice.actions;
export default calendarSlice.reducer;
