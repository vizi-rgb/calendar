"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React from "react";
import User from "@/dto/user";
import {
  AuthorizationState,
  storeAuthorizedUser,
} from "@/lib/features/authorization/authorization-slice";
import { useStore } from "react-redux";
import { setTimeline } from "@/lib/features/calendar/calendar-slice";
import { TimelineOption } from "@/constants/timeline-option";
import { setIsToggled } from "@/lib/features/sidebar/sidebar-slice";

interface StoreState {
  authorization: {
    user: User | null;
    accessToken: string | null;
  };
  calendar: {
    timeline: string;
    date: string;
  };
  sidebar: {
    isToggled: boolean;
  };
}

export default function StoreInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const store = useStore();

  const timeline: TimelineOption = useAppSelector(
    (state) => state.calendar.timeline,
  );
  const authorization: AuthorizationState = useAppSelector(
    (state) => state.authorization,
  );
  const sidebarToggled: boolean = useAppSelector(
    (state) => state.sidebar.isToggled,
  );

  React.useEffect(() => {
    if (localStorage.getItem("state")) {
      const state: StoreState = JSON.parse(
        localStorage.getItem("state") as string,
      );
      dispatch(
        storeAuthorizedUser({
          user: state.authorization.user,
          accessToken: state.authorization.accessToken,
        }),
      );

      dispatch(setTimeline(state.calendar.timeline as TimelineOption));
      dispatch(setIsToggled(state.sidebar.isToggled));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("state", JSON.stringify(store.getState()));
  }, [authorization, timeline, sidebarToggled]);

  return <>{children}</>;
}
