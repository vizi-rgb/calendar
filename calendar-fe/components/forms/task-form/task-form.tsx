import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppSelector } from "@/lib/hooks";
import { ChangeEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import EventDatePicker from "@/components/forms/event-form/event-date-picker";
import { Textarea } from "@/components/ui/textarea";
import { TaskFormSchema } from "@/components/forms/task-form/task-form.schema";
import { ErrorMessageText } from "@/util/validation-utils";
import EventService from "@/services/event-service";
import { AxiosResponse } from "axios";
import { Switch } from "@/components/ui/switch";

const getToday = (hour?: number, minute?: number): Date => {
  const today = new Date();
  today.setHours(hour ?? today.getHours(), minute ?? today.getMinutes(), 0, 0);
  return today;
};

const getTimeString = (date: Date): string => {
  return date.toTimeString().slice(0, 5);
};

export const AddTaskForm = () => {
  const currentHour = new Date().getHours();

  const {
    control,
    handleSubmit,
    register,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(TaskFormSchema),
    reValidateMode: "onChange",
    defaultValues: {
      startDateTime: getToday(currentHour + 1, 0),
      endDateTime: getToday(currentHour + 2, 0),
      isWithoutSpecificDate: false,
    },
  });

  const authToken = useAppSelector((state) => state.authorization.accessToken);

  const isWithoutSpecificDate = watch("isWithoutSpecificDate");

  const onSubmit = (data: any) => {
    const eventService = new EventService();

    eventService
      .createTask(data, authToken!)
      .then((response: AxiosResponse) => {
        console.log(response);
      });
  };

  const onTimeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const hour: number = Number.parseInt(e.target.value.slice(0, 2));

    const minute: number = Number.parseInt(e.target.value.slice(3, 5));

    const startDate = getValues("startDateTime");
    startDate.setHours(hour, minute);
    setValue("startDateTime", startDate);
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
              name="startDateTime"
              render={({ field: { onChange, onBlur, value } }) => (
                <EventDatePicker
                  disabled={isWithoutSpecificDate}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            <Input
              disabled={isWithoutSpecificDate}
              type="time"
              className="max-w-max"
              defaultValue={getTimeString(getValues("startDateTime"))}
              onChange={onTimeInputChange}
            />
          </div>
          {errors.startDateTime && (
            <ErrorMessageText message={errors.startDateTime.message} />
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor={"date"}>Data zakończenia</Label>
          <div className="flex flex-row gap-x-2">
            <Controller
              control={control}
              name="endDateTime"
              render={({ field: { onChange, onBlur, value } }) => (
                <EventDatePicker
                  disabled={isWithoutSpecificDate}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            <Input
              disabled={isWithoutSpecificDate}
              type="time"
              className="max-w-max"
              defaultValue={getTimeString(getValues("endDateTime"))}
              onChange={onTimeInputChange}
            />
          </div>
          {errors.endDateTime && (
            <ErrorMessageText message={errors.endDateTime.message} />
          )}
        </div>
        <Controller
          name="isWithoutSpecificDate"
          control={control}
          render={({ field: { onChange, value } }) => (
            <div className="flex items-center space-x-2">
              <Switch checked={value} onCheckedChange={onChange} />
              <Label htmlFor="is-repetitive">Bez konkretnej daty</Label>
            </div>
          )}
        />
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

export default AddTaskForm;
