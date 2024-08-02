export interface CreateEventRequest {
  title: string;
  description?: string;
  startDateTime: string;
  endDateTime?: string;
  frequency: number;
  interval: number;
  daysOfWeek: string[];
}
