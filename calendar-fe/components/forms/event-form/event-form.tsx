import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { days, daysEN } from "@/constants/calendar-view-contants";
import { Card, CardContent } from "@/components/ui/card";
import { Frequency } from "@/constants/event-constants";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { If, Then } from "react-if";
import { EventFormSchema } from "@/components/forms/event-form/event-form.schema";
import EventDatePicker from "@/components/forms/event-form/event-date-picker";
import EventFrequencySelect, {
  SelectOption,
} from "@/components/forms/event-form/event-frequency-select";

const ErrorMessageText = ({ message }: { message?: string }) => {
  return <small className="text-destructive">{message}</small>;
};

export const AddEventForm = () => {
  const [isRepetitive, setIsRepetitive] = useState<boolean>(false);
  const [frequency, setFrequency] = useState<string>(Frequency.DAILY);

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

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EventFormSchema),
    reValidateMode: "onSubmit",
    defaultValues: {
      frequency: Frequency.ONETIME,
      interval: 1,
    },
  });

  const handleSetRepetitive = (isRepetitive: boolean): void => {
    const frequency: Frequency = isRepetitive
      ? Frequency.DAILY
      : Frequency.ONETIME;
    setIsRepetitive(isRepetitive);
    setValue("frequency", frequency);
  };

  const handleEventFrequencySelect = (frequency: string): void => {
    setFrequency(frequency);
    if (frequency === Frequency.CUSTOM) {
      setValue("frequency", Frequency.DAILY);
    }
  };

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
              <EventDatePicker
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
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
            onCheckedChange={handleSetRepetitive}
          />
          <Label htmlFor="is-repetitive">Powtarza się?</Label>
        </div>
        <If condition={isRepetitive}>
          <Then>
            <div className="grid gap-2">
              <Controller
                name="frequency"
                control={control}
                render={({ field: { onChange } }) => (
                  <EventFrequencySelect
                    onChange={(frequency: string) => {
                      onChange(frequency);
                      handleEventFrequencySelect(frequency);
                    }}
                    value={frequency}
                    selectOptions={selectOptions}
                  />
                )}
              />
              <If condition={frequency === Frequency.CUSTOM}>
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
                              {...register("interval")}
                              type="number"
                              className="w-20"
                            />
                            <Controller
                              name={"frequency"}
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                <EventFrequencySelect
                                  onChange={onChange}
                                  value={value}
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
