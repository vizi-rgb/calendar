import { array, boolean, date, mixed, number, object, string } from "yup";
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

  endDateTime: date().required("Data zakończenia jest wymagana"),

  isRepetitive: boolean().required("Czy powtarzalne jest wymagane"),

  frequency: mixed<Frequency>().required("Częstotliwość jest wymagana"),

  description: string().max(500, "Maksymalnie 500 znaków"),

  zoneId: string().default(Intl.DateTimeFormat().resolvedOptions().timeZone),

  customFrequency: object({
    interval: number(),
    frequency: mixed<Frequency>(),
    daysOfWeek: array().of(string().oneOf(daysEN)),
  }).when("frequency", {
    is: Frequency.CUSTOM,
    then: () =>
      object({
        interval: number().required("Interwał jest wymagany").min(1),
        frequency: mixed<Frequency>().required("Częstotliwość jest wymagana"),
        daysOfWeek: array()
          .of(string().oneOf(daysEN))
          .min(1, "Wybierz przynajmniej jeden dzień"),
      }),
    otherwise: () => object().notRequired(),
  }),
});
