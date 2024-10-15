import { format } from "date-fns";
import { pl } from "date-fns/locale";

export const customMonthCaptionFormatter = (date: Date): string => {
  const formattedCaption = format(date, "LLLL y", { locale: pl });
  return formattedCaption.charAt(0).toUpperCase() + formattedCaption.slice(1);
};
