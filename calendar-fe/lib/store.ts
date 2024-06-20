import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./features/sidebar/sidebar-slice";
import authorizationReducer from "./features/authorization/authorization-slice";
import calendarReducer from "./features/calendar/calendar-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      sidebar: sidebarReducer,
      calendar: calendarReducer,
      authorization: authorizationReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
