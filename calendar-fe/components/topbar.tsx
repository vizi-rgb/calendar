import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Settings from "@/components/settings";
import Notifications from "@/components/notifications";
import Tasks from "@/components/tasks";
import CreateButton from "@/components/create-button";
import { Button } from "@/components/ui/button";
import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Command, CommandInput } from "@/components/ui/command";

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

function AvatarWithName() {
  return (
    <div className="flex flex-row items-center gap-x-2.5">
      <small>Cristiano Ronaldo</small>
      <Avatar className="size-10">
        <AvatarImage src="https://pbs.twimg.com/media/FDN3LodUYAASbHm?format=jpg&name=4096x4096" />
        <AvatarFallback>WN</AvatarFallback>
      </Avatar>
    </div>
  );
}

function Hamburger() {
  return (
    <Button variant="ghost" size="icon">
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
    <Tabs defaultValue="day" className="">
      <TabsList className="grid w-full grid-cols-5">
        {options.map((option) => (
          <TabsTrigger key={option} value={option} className="px-2">
            {option}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

function SelectedDate() {
  return (
    <div className="flex flex-row items-center gap-x-1">
      <Button variant="ghost" size="icon">
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
      <p>Luty 2024</p>
      <Button variant="ghost" size="icon">
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default function Topbar() {
  return (
    <div className="py-2 px-5">
      <div className="grid grid-cols-3 items-center">
        <div className="flex flex-row items-center gap-x-10 justify-self-start">
          <div className="flex flex-row gap-x-2 items-center">
            <Hamburger />
            <h3>Kalendarz</h3>
          </div>
          <SelectedDate />
          <TimelineOptions />
        </div>
        <div className="justify-self-stretch">
          <CommandWrapper />
        </div>
        <div className="flex flex-row items-center justify-self-end gap-x-10">
          <CreateButton />
          <IconButtons />
          <AvatarWithName />
        </div>
      </div>
    </div>
  );
}
