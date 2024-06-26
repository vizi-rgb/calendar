export enum TimelineOption {
  Day = "1D",
  WorkWeek = "5D",
  Week = "1T",
  Month = "1M",
  Year = "1R",
}

export const TimelineOptionMap: { [key: string]: TimelineOption } = {
  Day: TimelineOption.Day,
  WorkWeek: TimelineOption.WorkWeek,
  Week: TimelineOption.Week,
  Month: TimelineOption.Month,
  Year: TimelineOption.Year,
};
