import axios, { AxiosHeaders, AxiosInstance, AxiosResponse } from "axios";
import endpoints from "@/api/endpoints";
import { EventFormSchema } from "@/components/forms/event-form/event-form.schema";
import { TaskFormSchema } from "@/components/forms/task-form/task-form.schema";

class EventService {
  private eventApiClient: AxiosInstance;
  private taskApiClient: AxiosInstance;

  constructor() {
    this.eventApiClient = axios.create({
      baseURL: endpoints.EVENT_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.taskApiClient = axios.create({
      baseURL: endpoints.TASK_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  createEvent(
    event: typeof EventFormSchema,
    authToken: string,
  ): Promise<AxiosResponse> {
    const header: AxiosHeaders = new AxiosHeaders({
      Authorization: "Bearer " + authToken,
    });

    return this.eventApiClient.post<typeof EventFormSchema>("", event, {
      headers: header,
    });
  }

  createTask(
    task: typeof TaskFormSchema,
    authToken: string,
  ): Promise<AxiosResponse> {
    const header: AxiosHeaders = new AxiosHeaders({
      Authorization: "Bearer " + authToken,
    });

    return this.taskApiClient.post<typeof TaskFormSchema>("", task, {
      headers: header,
    });
  }
}

export default EventService;
