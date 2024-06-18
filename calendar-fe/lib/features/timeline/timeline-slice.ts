import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TimelineOption } from "@/app/constants/timeline-option";

let initialTimeline: TimelineOption =
  (localStorage.getItem("timeline") as TimelineOption) ?? TimelineOption.Day;

interface TimelineState {
  value: TimelineOption;
}

const initialState: TimelineState = {
  value: initialTimeline,
};

const timelineSlice = createSlice({
  name: "timeline",
  initialState,
  reducers: {
    setTimeline(state, action: PayloadAction<TimelineOption>) {
      state.value = action.payload;
      localStorage.setItem("timeline", action.payload);
    },
  },
});

export const { setTimeline } = timelineSlice.actions;
export default timelineSlice.reducer;
