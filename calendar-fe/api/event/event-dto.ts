export interface GetEventsResponse {
  id: string;
  startDateTime: string;
  endDateTime: string;
  zoneId: string;
  title: string;
  description: string;
  type: string;
}

export interface GetEventsRequest {
  from: string;
  to: string;
  zoneId: string;
}
