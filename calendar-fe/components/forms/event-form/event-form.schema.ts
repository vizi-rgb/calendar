import {
  array,
  boolean,
  date,
  InferType,
  mixed,
  number,
  object,
  string,
} from "yup";
import { Frequency } from "@/constants/event-constants";
import { daysEN } from "@/constants/calendar-view-contants";
import { combineDateAndTime } from "@/util/calendar-utils";

export const EventFormSchema = object({
  title: string()
    .required("Tytuł jest wymagany")
    .test(
      "is-not-empty",
      "Tytuł nie może być pusty",
      (value: string): boolean => value?.trim().length > 0,
    )
    .max(100, "Maksymalnie 100 znaków"),

  startDate: date().required("Data rozpoczęcia jest wymagana"),

  startTime: string()
    .required("Czas rozpoczęcia jest wymagany")
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Nieprawidłowy format czasu"),

  endDate: date().required("Data zakończenia jest wymagana"),

  endTime: string()
    .required("Czas zakończenia jest wymagany")
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Nieprawidłowy format czasu"),

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
}).test("end-date-time-after-start", function (values) {
  if (
    values.startDate &&
    values.startTime &&
    values.endDate &&
    values.endTime
  ) {
    const startDateTime = combineDateAndTime(
      values.startDate,
      values.startTime,
    );
    const endDateTime = combineDateAndTime(values.endDate, values.endTime);
    if (endDateTime <= startDateTime) {
      return this.createError({
        path: "endDate",
        message: "Data i czas zakończenia muszą być późniejsze niż rozpoczęcia",
      });
    }
  }
  return true;
});

export type EventFormSchemaData = InferType<typeof EventFormSchema>;
