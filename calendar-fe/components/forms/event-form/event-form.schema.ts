import { array, date, mixed, number, object, string } from "yup";
import { Frequency } from "@/constants/event-constants";
import { daysEN } from "@/constants/calendar-view-contants";

export const EventFormSchema = object({
  title: string()
    .required("Tytuł jest wymagany")
    .test(
      "is-not-empty",
      "Tytuł nie może być pusty",
      (value: string): boolean => value?.trim().length > 0,
    )
    .max(100, "Maksymalnie 100 znaków"),

  startDateTime: date().required("Data rozpoczęcia jest wymagana"),

  frequency: mixed<Frequency>().required("Częstotliwość jest wymagana"),

  interval: number().required("Interwał jest wymagany"),

  daysOfWeek: array()
    .of(string().oneOf(daysEN))
    .min(1, "Wybierz co najmniej jeden dzień"),

  description: string().max(500, "Maksymalnie 500 znaków"),
});
