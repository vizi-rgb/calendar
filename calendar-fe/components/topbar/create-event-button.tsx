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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DatePickField = () => {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Wybierz datę</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

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
            <form>
              <div className="grid gap-4 pt-5">
                <div className="grid gap-2">
                  <Label htmlFor="title">Tytuł</Label>
                  <Input id="title" autoFocus={true} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={"date"}>Data wydarzenia</Label>
                  <DatePickField />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Opis</Label>
                  <Textarea id="description" />
                </div>
              </div>
            </form>
          </TabsContent>
          <TabsContent value="task">
            <form>
              <div className="grid gap-4 pt-5">
                <div className="grid gap-2">
                  <Label htmlFor="title">Tytuł</Label>
                  <Input id="title" autoFocus={true} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={"date"}>Data zadania</Label>
                  <DatePickField />
                </div>
              </div>
            </form>
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
