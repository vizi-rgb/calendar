"use client";
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
import { useState } from "react";
import { pl } from "date-fns/locale";
import { customMonthCaptionFormatter } from "@/util/calendar-utils";

interface PropType {
  onChange: (value: Date | undefined) => void;
  onBlur: () => void;
  value: Date;
  disabled?: boolean;
}

const EventDatePicker = (field: PropType) => {
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

  const handleSelect = (date: Date | undefined): void => {
    if (!date) {
      return;
    }

    field.onChange(date);
    setPopoverOpen(false);
  };

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={field.disabled}
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal w-full",
            !field.value && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {field.value ? format(field.value, "PPP") : <span>Wybierz datę</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          locale={pl}
          formatters={{
            formatCaption: customMonthCaptionFormatter,
          }}
          mode="single"
          selected={field.value}
          onSelect={handleSelect}
          onDayBlur={field.onBlur}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default EventDatePicker;
