import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./features/sidebar/sidebar-slice";
import authorizationReducer from "./features/authorization/authorization-slice";
import calendarReducer from "./features/calendar/calendar-slice";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist/es/constants";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["accessToken", "date"],
};

export const makeStore = () => {
  return configureStore({
    reducer: {
      sidebar: persistReducer(persistConfig, sidebarReducer),
      calendar: persistReducer(persistConfig, calendarReducer),
      authorization: persistReducer(persistConfig, authorizationReducer),
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

export const persistor = persistStore(makeStore());

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
