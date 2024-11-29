import { format } from "date-fns";
import { pl } from "date-fns/locale";

export const customMonthCaptionFormatter = (date: Date): string => {
  const formattedCaption = format(date, "LLLL y", { locale: pl });
  return formattedCaption.charAt(0).toUpperCase() + formattedCaption.slice(1);
};

export const combineDateAndTime = (date: Date, time: string): Date => {
  const [hours, minutes] = time.split(":").map(Number);
  const combined = new Date(date);
  combined.setHours(hours, minutes, 0, 0);
  return combined;
};

export const combineDateAndTimeUTC = (date: Date, time: string): Date => {
  const [hours, minutes] = time.split(":").map(Number);
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes,
      0,
      0,
    ),
  );
};

export const toUtcDateWithoutChangingTime = (date: Date): Date => {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds(),
    ),
  );
};
