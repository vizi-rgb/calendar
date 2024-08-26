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
      const newDate = new Date(state.date);

      if (state.timeline === TimelineOption.Month) {
        newDate.setMonth(newDate.getMonth() - 1);
      } else if (state.timeline === TimelineOption.Year) {
        newDate.setFullYear(newDate.getFullYear() - 1);
      }

      state.date = newDate.toISOString();
    },
    nextDate(state) {
      const newDate = new Date(state.date);

      if (state.timeline === TimelineOption.Month) {
        newDate.setMonth(newDate.getMonth() + 1);
      } else if (state.timeline === TimelineOption.Year) {
        newDate.setFullYear(newDate.getFullYear() + 1);
      }

      state.date = newDate.toISOString();
    },
    previousMonth(state) {
      const newDate = new Date(state.date);
      newDate.setMonth(newDate.getMonth() - 1);

      state.date = newDate.toISOString();
    },
    nextMonth(state) {
      const newDate = new Date(state.date);
      newDate.setMonth(newDate.getMonth() + 1);

      state.date = newDate.toISOString();
    },
  },
});

export const {
  setTimeline,
  previousMonth,
  nextMonth,
  previousDate,
  nextDate,
  previousTimeline,
  nextTimeline,
} = calendarSlice.actions;
export default calendarSlice.reducer;
