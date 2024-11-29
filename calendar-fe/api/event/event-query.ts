import { GetEventsRequest, GetEventsResponse } from "@/api/event/event-dto";
import Page, { PageableRequest } from "@/api/pageable";
import { useQuery } from "react-query";
import { eventApiClient } from "@/api/event/event-axios";

export const useEventsQuery = (
  userUuid: string | null,
  getEventsRequest: GetEventsRequest,
  authToken: string | null,
  pageable?: PageableRequest | undefined,
) => {
  return useQuery({
    queryKey: ["events", userUuid, JSON.stringify(getEventsRequest)],
    queryFn: async () => {
      if (!userUuid || !authToken) {
        return null;
      }

      const res = await eventApiClient.get<Page<GetEventsResponse>>(userUuid, {
        params: {
          from: getEventsRequest.from,
          to: getEventsRequest.to,
          zoneId: getEventsRequest.zoneId,
          ...pageable,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      return res.data;
    },
  });
};
