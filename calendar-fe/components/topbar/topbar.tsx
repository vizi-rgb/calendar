"use client";
import { ModeToggle } from "@/components/topbar/mode-toggle";
import Settings from "@/components/topbar/settings";
import Notifications from "@/components/topbar/notifications";
import Tasks from "@/components/topbar/tasks";
import CreateEventButton from "@/components/topbar/create-event-button";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Command, CommandInput } from "@/components/ui/command";
import AvatarWithName from "@/components/topbar/avatar-with-name";
import DatePicker from "@/components/topbar/date-picker";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toggleSidebar } from "@/lib/features/sidebar/sidebar-slice";
import TimelineSelect from "@/components/topbar/timeline-select";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/route-contants";

function IconButtons() {
  return (
    <div className="flex flex-row gap-x-1">
      <Tasks />
      <ModeToggle />
      <Notifications />
      <Settings />
    </div>
  );
}

function Hamburger(prop: { onClick?: () => void }) {
  return (
    <Button variant="ghost" size="icon" onClick={prop.onClick}>
      <HamburgerMenuIcon className="size-5" />
    </Button>
  );
}

function CommandWrapper() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Command className="rounded-lg border">
        <CommandInput placeholder="Wyszukiwanie" />
      </Command>
    </>
  );
}

export default function Topbar({
  isCalendarView = true,
}: {
  isCalendarView: boolean | undefined;
}) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.authorization.user);
  const router = useRouter();

  const handleHamburgerClick = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className="py-3">
      <div className="grid grid-cols-3 items-center">
        <div className="flex flex-row items-center gap-x-10 justify-self-start">
          <div className="flex flex-row gap-x-2 items-center">
            <Hamburger onClick={handleHamburgerClick} />
            <h3
              className="hover:underline"
              onClick={() => router.push(ROUTES.CALENDAR)}
            >
              Kalendarz
            </h3>
          </div>
          {isCalendarView && (
            <>
              <DatePicker />
              <TimelineSelect />
            </>
          )}
        </div>
        <div className="justify-self-center w-[400px]">
          <CommandWrapper />
        </div>
        <div className="flex flex-row items-center justify-self-end gap-x-10">
          {isCalendarView && <CreateEventButton />}
          <IconButtons />
          <AvatarWithName
            name={user?.name}
            surname={user?.surname}
            email={user?.email}
            pictureUrl={user?.pictureUrl}
          />
        </div>
      </div>
    </div>
  );
}
