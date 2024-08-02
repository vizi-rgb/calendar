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
import { array, date, mixed, number, object, string } from "yup";
import { Frequency } from "@/constants/event-constants";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { If, Then } from "react-if";
import { format } from "date-fns";

const schema = object({
  title: string()
    .required("Tytuł jest wymagany")
    .test(
      "is-not-empty",
      "Tytuł nie może być pusty",
      (value) => value?.trim().length > 0,
    )
    .max(100, "Maksymalnie 100 znaków"),

  startDateTime: date().required("Data rozpoczęcia jest wymagana"),

  frequency: mixed<Frequency>()
    .required("Częstotliwość jest wymagana")
    .default(Frequency.ONETIME),

  interval: number().required("Interwał jest wymagany").default(1),

  daysOfWeek: array()
    .of(string().oneOf(daysEN))
    .min(1, "Wybierz co najmniej jeden dzień"),

  description: string().max(500, "Maksymalnie 500 znaków"),
});

const ErrorMessageText = ({ message }: { message?: string }) => {
  return <small className="text-destructive">{message}</small>;
};

export const AddEventForm = () => {
  const [isRepetitive, setIsRepetitive] = useState<boolean>(false);
  const [frequency, setFrequency] = useState<string>("");

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="create-event-form">
      <div className="grid gap-4 pt-5">
        <div className="grid gap-2">
          <Label htmlFor="title">Tytuł</Label>
          <Input id="title" autoFocus={true} {...register("title")} />
          {errors.title && <ErrorMessageText message={errors.title.message} />}
        </div>
        <div className="grid gap-2">
          <Label htmlFor={"date"}>Data wydarzenia</Label>

          <Controller
            control={control}
            name="startDateTime"
            render={({ field: { onChange, onBlur, value } }) => (
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
                    {value ? format(value, "PPP") : <span>Wybierz datę</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={value}
                    onSelect={onChange}
                    onDayBlur={onBlur}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.startDateTime && (
            <ErrorMessageText message={errors.startDateTime.message} />
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="is-repetitive"
            checked={isRepetitive}
            onCheckedChange={setIsRepetitive}
          />
          <Label htmlFor="is-repetitive">Powtarza się?</Label>
        </div>
        <If condition={isRepetitive}>
          <Then>
            <div className="grid gap-2">
              <Controller
                name="frequency"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(value: string) => {
                      field.onChange(
                        value === "custom" ? Frequency.DAILY : value,
                      );
                      setFrequency(value);
                    }}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={Frequency.DAILY.toString()}>
                        Codziennie
                      </SelectItem>
                      <SelectItem value={Frequency.WEEKLY.toString()}>
                        Co tydzień
                      </SelectItem>
                      <SelectItem value={Frequency.MONTHLY.toString()}>
                        Co miesiąc
                      </SelectItem>
                      <SelectItem value={Frequency.YEARLY.toString()}>
                        Co rok
                      </SelectItem>
                      <SelectItem value="custom">Niestandardowe</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <If condition={frequency === "custom"}>
                <Then>
                  <div className="py-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <small>Powtarzaj w:</small>
                            <Controller
                              name={"daysOfWeek"}
                              control={control}
                              render={({ field }) => (
                                <ToggleGroup
                                  variant="outline"
                                  type="multiple"
                                  className="justify-start"
                                  onValueChange={field.onChange}
                                >
                                  {days.map((day, index) => (
                                    <ToggleGroupItem
                                      key={day}
                                      value={daysEN[index]}
                                    >
                                      {day.at(0)}
                                    </ToggleGroupItem>
                                  ))}
                                </ToggleGroup>
                              )}
                            />
                          </div>
                          <div className="flex flex-row items-center gap-2">
                            <small>Co </small>
                            <Input
                              {...register("interval")}
                              type="number"
                              className="w-20"
                            />
                            <Controller
                              name={"frequency"}
                              control={control}
                              render={({ field }) => (
                                <Select
                                  defaultValue={field.value}
                                  value={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem
                                      value={Frequency.DAILY.toString()}
                                    >
                                      dzień
                                    </SelectItem>
                                    <SelectItem
                                      value={Frequency.WEEKLY.toString()}
                                    >
                                      tydzień
                                    </SelectItem>
                                    <SelectItem
                                      value={Frequency.MONTHLY.toString()}
                                    >
                                      miesiąc
                                    </SelectItem>
                                    <SelectItem
                                      value={Frequency.YEARLY.toString()}
                                    >
                                      rok
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </Then>
              </If>
            </div>
          </Then>
        </If>
        <div className="grid gap-2">
          <Label htmlFor="description">Opis</Label>
          <Textarea id="description" {...register("description")} />
          {errors.description && (
            <ErrorMessageText message={errors.description.message} />
          )}
        </div>
      </div>
    </form>
  );
};
