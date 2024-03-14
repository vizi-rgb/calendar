"use client";
import { ModeToggle } from "@/components/topbar/mode-toggle";
import Settings from "@/components/topbar/settings";
import Notifications from "@/components/topbar/notifications";
import Tasks from "@/components/topbar/tasks";
import CreateButton from "@/components/topbar/create-button";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Command, CommandInput } from "@/components/ui/command";
import AvatarWithName from "@/components/topbar/avatar-with-name";
import DatePicker from "@/components/topbar/date-picker";
import { useAppDispatch } from "@/lib/hooks";
import { toggleSidebar } from "@/lib/features/sidebar/sidebar-slice";

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
  return (
    <Command>
      <CommandInput placeholder="Type a command or search..." />
    </Command>
  );
}

function TimelineOptions() {
  let options = ["1D", "5D", "1T", "1M", "1R"];

  return (
    <Tabs defaultValue="1D" className="">
      <TabsList className="grid w-full grid-cols-5">
        {options.map((option) => (
          <TabsTrigger key={option} value={option} className="px-1.5">
            {option}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

export default function Topbar() {
  const dispatch = useAppDispatch();

  const handleHamburgerClick = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className="py-3">
      <div className="grid grid-cols-3 items-center">
        <div className="flex flex-row items-center gap-x-10 justify-self-start">
          <div className="flex flex-row gap-x-2 items-center">
            <Hamburger onClick={handleHamburgerClick} />
            <h3>Kalendarz</h3>
          </div>
          <DatePicker />
          <TimelineOptions />
        </div>
        <div className="justify-self-center w-[400px]">
          <CommandWrapper />
        </div>
        <div className="flex flex-row items-center justify-self-end gap-x-10">
          <CreateButton />
          <IconButtons />
          <AvatarWithName />
        </div>
      </div>
      {/*<div className="py-2">*/}
      {/*  <SideBar setIsOpen={false} />*/}
      {/*</div>*/}
    </div>
  );
}
