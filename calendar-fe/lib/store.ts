import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./features/sidebar/sidebar-slice";
import timelineReducer from "./features/timeline/timeline-slice";
import authorizationReducer from "./features/authorization/authorization-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      sidebar: sidebarReducer,
      timeline: timelineReducer,
      authorization: authorizationReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
