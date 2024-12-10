import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { days, daysEN } from "@/constants/calendar-view-contants";
import { Card, CardContent } from "@/components/ui/card";
import { Frequency } from "@/constants/event-constants";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { If, Then } from "react-if";
import {
  EventFormSchema,
  EventFormSchemaData,
} from "@/components/forms/event-form/event-form.schema";
import EventDatePicker from "@/components/forms/event-form/event-date-picker";
import EventFrequencySelect, {
  SelectOption,
} from "@/components/forms/event-form/event-frequency-select";
import { useAppSelector } from "@/lib/hooks";
import { ErrorMessageText } from "@/util/validation-utils";
import {
  combineDateAndTime,
  combineDateAndTimeUTC,
} from "@/util/calendar-utils";
import { useEventMutation } from "@/api/event/event-mutation";

const selectOptions: SelectOption[] = [
  { value: Frequency.DAILY, label: "Codziennie" },
  { value: Frequency.WEEKLY, label: "Co tydzień" },
  { value: Frequency.MONTHLY, label: "Co miesiąc" },
  { value: Frequency.YEARLY, label: "Co rok" },
  { value: Frequency.CUSTOM, label: "Niestandardowe" },
];

const selectOptionsForCustomFrequency: SelectOption[] = [
  { value: Frequency.DAILY, label: "dzień" },
  { value: Frequency.WEEKLY, label: "tydzień" },
  { value: Frequency.MONTHLY, label: "miesiąc" },
  { value: Frequency.YEARLY, label: "rok" },
];

const getToday = (hour?: number, minute?: number): Date => {
  const today = new Date();
  today.setHours(hour ?? today.getHours(), minute ?? today.getMinutes(), 0, 0);
  return today;
};

const getTimeString = (date: Date): string => {
  return date.toTimeString().slice(0, 5);
};

export const AddEventForm = () => {
  const currentHour = new Date().getHours();

  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EventFormSchema),
    reValidateMode: "onChange",
    defaultValues: {
      startDate: getToday(currentHour + 1, 0),
      endDate: getToday(currentHour + 2, 0),
      startTime: getTimeString(getToday(currentHour + 1, 0)),
      endTime: getTimeString(getToday(currentHour + 2, 0)),
      frequency: Frequency.ONETIME,
      isRepetitive: false,
      customFrequency: {
        interval: 1,
        frequency: Frequency.DAILY,
        daysOfWeek: [],
      },
    },
  });

  const isRepetitiveWatch: boolean = watch("isRepetitive");
  const frequencyWatch: Frequency = watch("frequency");
  const authToken = useAppSelector((state) => state.authorization.accessToken);
  const eventMutation = useEventMutation();

  const onSubmit = (data: EventFormSchemaData) => {
    console.log(combineDateAndTime(data.startDate, data.startTime));
    const startDateTime = combineDateAndTimeUTC(
      data.startDate,
      data.startTime,
    ).toISOString();

    const endDateTime = combineDateAndTimeUTC(
      data.endDate,
      data.endTime,
    ).toISOString();

    const event = {
      ...data,
      startDateTime,
      endDateTime,
    };

    eventMutation.mutate({ event, authToken });
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
          <Label htmlFor={"date"}>Data rozpoczęcia</Label>
          <div className="flex flex-row gap-x-2">
            <Controller
              control={control}
              name="startDate"
              render={({ field: { onChange, onBlur, value } }) => (
                <EventDatePicker
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            <Input
              type="time"
              className="max-w-max"
              {...register("startTime")}
            />
          </div>
          {errors.startDate && (
            <ErrorMessageText message={errors.startDate.message} />
          )}
          {errors.startTime && (
            <ErrorMessageText message={errors.startTime.message} />
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor={"date"}>Data zakończenia</Label>
          <div className="flex flex-row gap-x-2">
            <Controller
              control={control}
              name="endDate"
              render={({ field: { onChange, onBlur, value } }) => (
                <EventDatePicker
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            <Input type="time" className="max-w-max" {...register("endTime")} />
          </div>
          {errors.endDate && (
            <ErrorMessageText message={errors.endDate.message} />
          )}
          {errors.endTime && (
            <ErrorMessageText message={errors.endTime.message} />
          )}
        </div>
        <Controller
          name="isRepetitive"
          control={control}
          render={({ field: { onChange, value } }) => (
            <div className="flex items-center space-x-2">
              <Switch
                id="is-repetitive"
                checked={value}
                onCheckedChange={(value: boolean) => {
                  onChange(value);

                  const setFrequency: Frequency = value
                    ? Frequency.DAILY
                    : Frequency.ONETIME;
                  setValue("frequency", setFrequency);
                }}
              />
              <Label htmlFor="is-repetitive">Powtarza się?</Label>
            </div>
          )}
        />
        <If condition={isRepetitiveWatch}>
          <Then>
            <div className="grid gap-2">
              <Controller
                name="frequency"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <EventFrequencySelect
                    onChange={onChange}
                    value={value}
                    selectOptions={selectOptions}
                  />
                )}
              />
              <If condition={frequencyWatch === Frequency.CUSTOM}>
                <Then>
                  <div className="py-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <small>Powtarzaj w:</small>
                            <Controller
                              name="customFrequency.daysOfWeek"
                              control={control}
                              render={({ field: { onChange } }) => (
                                <ToggleGroup
                                  variant="outline"
                                  type="multiple"
                                  className="justify-start"
                                  onValueChange={onChange}
                                >
                                  {days.map((day: string, index: number) => (
                                    <ToggleGroupItem
                                      key={day}
                                      value={daysEN[index]}
                                    >
                                      {day[0]}
                                    </ToggleGroupItem>
                                  ))}
                                </ToggleGroup>
                              )}
                            />
                          </div>
                          <div className="flex flex-row items-center gap-2">
                            <small>Co </small>
                            <Input
                              {...register("customFrequency.interval")}
                              type="number"
                              className="w-20"
                            />
                            <Controller
                              name="customFrequency.frequency"
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                <EventFrequencySelect
                                  onChange={onChange}
                                  value={value ?? Frequency.DAILY}
                                  selectOptions={
                                    selectOptionsForCustomFrequency
                                  }
                                />
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
