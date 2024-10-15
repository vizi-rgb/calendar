import { boolean, date, object, string } from "yup";

export const TaskFormSchema = object({
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

  isWithoutSpecificDate: boolean().required(
    "Czy zadanie nie ma określonej daty?",
  ),

  description: string().max(500, "Maksymalnie 500 znaków"),
});
