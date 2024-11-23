import axios from "axios";
import endpoints from "@/endpoints";
import { GetEventsRequest, GetEventsResponse } from "@/api/event/event-dto";
import Page from "@/api/pageable";

const eventApiClient = axios.create({
  baseURL: endpoints.EVENT_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const eventApi = {
  async getEvents(
    userUuid: string | null,
    getRequest: GetEventsRequest | null,
    authToken: string | null,
  ) {
    if (
      !getRequest ||
      !getRequest.from ||
      !getRequest.to ||
      !getRequest.zoneId ||
      !userUuid ||
      !authToken
    ) {
      throw new Error("Invalid request parameters");
    }

    const response = await eventApiClient.get<Page<GetEventsResponse>>(
      userUuid,
      {
        params: {
          from: getRequest.from,
          to: getRequest.to,
          zoneId: getRequest.zoneId,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );

    return response.data;
  },
};

export default eventApi;
