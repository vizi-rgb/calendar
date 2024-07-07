"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddEventForm } from "@/components/forms/event-form/event-form";

const EventSheet = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) => {
  const [type, setType] = useState<"event" | "task">("event");

  const handleTypeChange = (e: string) => {
    setType(e as "event" | "task");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            Dodaj {type === "event" ? "wydarzenie" : "zadanie"}
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <Tabs defaultValue={type} onValueChange={handleTypeChange}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="event">Wydarzenie</TabsTrigger>
            <TabsTrigger value="task">Zadanie</TabsTrigger>
          </TabsList>
          <TabsContent value="event">
            <AddEventForm />
          </TabsContent>
          <TabsContent value="task">
            <p>Not implemented</p>
          </TabsContent>
        </Tabs>

        <SheetFooter className="pt-5">
          <SheetClose className={buttonVariants({ variant: "outline" })}>
            Anuluj
          </SheetClose>
          <Button variant="default">Dodaj</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default function CreateEventButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <EventSheet open={isOpen} onOpenChange={setIsOpen} />
      <Button variant="default" onClick={() => setIsOpen(true)}>
        Utwórz
      </Button>
    </>
  );
}
