import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { days, daysEN } from "@/constants/calendar-view-contants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

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

const RepetitiveEventField = () => {
  const [value, setValue] = useState<string>("daily");

  return (
    <>
      <Select onValueChange={setValue} value={value}>
        <SelectTrigger>
          <SelectValue placeholder="Wybierz" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="daily">Codziennie</SelectItem>
          <SelectItem value="workdays">Od poniedziałku do piątku</SelectItem>
          <SelectItem value="weekly">Co tydzień</SelectItem>
          <SelectItem value="monthly">Co miesiąc</SelectItem>
          <SelectItem value="annually">Co rok</SelectItem>
          <SelectItem value="custom">Niestandardowe</SelectItem>
        </SelectContent>
      </Select>
      {value === "custom" && (
        <div className="py-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <small>Powtarzaj w:</small>
                  <ToggleGroup
                    variant="outline"
                    type="multiple"
                    className="justify-start"
                    onValueChange={(e) => console.log(e)}
                  >
                    {days.map((day, index) => (
                      <ToggleGroupItem key={day} value={daysEN[index]}>
                        {day.at(0)}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <small>Co </small>
                  <Input type="number" className="w-20"></Input>
                  <Select defaultValue="day">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">dzień</SelectItem>
                      <SelectItem value="week">tydzień</SelectItem>
                      <SelectItem value="month">miesiąc</SelectItem>
                      <SelectItem value="year">rok</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export const AddEventForm = () => {
  const [isRepetitive, setIsRepetitive] = useState<boolean>(false);

  return (
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
        <div className="flex items-center space-x-2">
          <Switch
            id="is-repetitive"
            checked={isRepetitive}
            onCheckedChange={setIsRepetitive}
          />
          <Label htmlFor="is-repetitive">Powtarza się?</Label>
        </div>
        {isRepetitive && (
          <div className="grid gap-2">
            <RepetitiveEventField />
          </div>
        )}
        <div className="grid gap-2">
          <Label htmlFor="description">Opis</Label>
          <Textarea id="description" />
        </div>
      </div>
    </form>
  );
};
