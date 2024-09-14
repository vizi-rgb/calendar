import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TimelineOption } from "@/constants/timeline-option";

export interface CalendarState {
  timeline: TimelineOption;
  date: string;
}

const initialState: CalendarState = {
  timeline: TimelineOption.Day,
  date: new Date().toISOString(),
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState: initialState,
  reducers: {
    setTimeline(state, action: PayloadAction<TimelineOption>) {
      state.timeline = action.payload;
    },
    previousTimeline(state) {
      switch (state.timeline) {
        case TimelineOption.WorkWeek:
          state.timeline = TimelineOption.Day;
          break;
        case TimelineOption.Week:
          state.timeline = TimelineOption.WorkWeek;
          break;
        case TimelineOption.Month:
          state.timeline = TimelineOption.Week;
          break;
        case TimelineOption.Year:
          state.timeline = TimelineOption.Month;
          break;
        default:
          break;
      }
    },
    nextTimeline(state) {
      switch (state.timeline) {
        case TimelineOption.Day:
          state.timeline = TimelineOption.WorkWeek;
          break;
        case TimelineOption.WorkWeek:
          state.timeline = TimelineOption.Week;
          break;
        case TimelineOption.Week:
          state.timeline = TimelineOption.Month;
          break;
        case TimelineOption.Month:
          state.timeline = TimelineOption.Year;
          break;
        default:
          break;
      }
    },
    previousDate(state) {
      const newDate: Date = new Date(state.date);

      switch (state.timeline) {
        case TimelineOption.Year:
          newDate.setFullYear(newDate.getFullYear() - 1);
          break;
        case TimelineOption.Month:
          newDate.setMonth(newDate.getMonth() - 1);
          break;
        case TimelineOption.Week:
        case TimelineOption.WorkWeek:
          newDate.setDate(newDate.getDate() - 7);
          break;
        case TimelineOption.Day:
          newDate.setDate(newDate.getDate() - 1);
          break;
      }

      state.date = newDate.toISOString();
    },
    nextDate(state) {
      const newDate: Date = new Date(state.date);

      switch (state.timeline) {
        case TimelineOption.Year:
          newDate.setFullYear(newDate.getFullYear() + 1);
          break;
        case TimelineOption.Month:
          newDate.setMonth(newDate.getMonth() + 1);
          break;
        case TimelineOption.Week:
        case TimelineOption.WorkWeek:
          newDate.setDate(newDate.getDate() + 7);
          break;
        case TimelineOption.Day:
          newDate.setDate(newDate.getDate() + 1);
          break;
      }

      state.date = newDate.toISOString();
    },
    setDate(state, action: PayloadAction<string>) {
      state.date = action.payload;
    },
  },
});

export const {
  setTimeline,
  previousTimeline,
  nextTimeline,
  previousDate,
  nextDate,
  setDate,
} = calendarSlice.actions;
export default calendarSlice.reducer;
