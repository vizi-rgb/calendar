import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TimelineOption } from "@/components/topbar/timeline-select";

interface TimelineState {
  value: TimelineOption;
}

const initialState: TimelineState = {
  value: TimelineOption.Day,
};

const timelineSlice = createSlice({
  name: "timeline",
  initialState,
  reducers: {
    setTimeline(state, action: PayloadAction<TimelineOption>) {
      state.value = action.payload;
    },
  },
});

export const { setTimeline } = timelineSlice.actions;
export default timelineSlice.reducer;
