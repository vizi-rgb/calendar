import { GetEventsRequest, GetEventsResponse } from "@/api/event/event-dto";
import Page, { PageableRequest } from "@/api/pageable";
import { useQuery } from "react-query";
import { useEventApiClient } from "@/api/event/event-axios.config";

export const useEventsQuery = (
  userUuid: string,
  getEventsRequest: GetEventsRequest,
  pageable?: PageableRequest | undefined,
) => {
  const eventApi = useEventApiClient();
  console.log("Here we go again");

  return useQuery({
    queryKey: ["events", userUuid, JSON.stringify(getEventsRequest)],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const res = await eventApi.get<Page<GetEventsResponse>>(userUuid, {
        params: {
          from: getEventsRequest.from,
          to: getEventsRequest.to,
          zoneId: getEventsRequest.zoneId,
          ...pageable,
        },
      });

      return res.data;
    },
  });
};
