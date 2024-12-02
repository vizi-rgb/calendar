import { GetEventsRequest, GetEventsResponse } from "@/api/event/event-dto";
import Page, { PageableRequest } from "@/api/pageable";
import { useQuery } from "react-query";
import { useEventApiClient } from "@/api/event/event-axios.config";
import { AxiosError } from "axios";
import { useUserTokenRefreshMutation } from "@/api/user/user-mutation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setAccessToken } from "@/lib/features/authorization/authorization-slice";

export const useEventsQuery = (
  userUuid: string,
  getEventsRequest: GetEventsRequest,
  pageable?: PageableRequest | undefined,
) => {
  const eventApi = useEventApiClient();
  const refreshMutation = useUserTokenRefreshMutation();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(
    (state) => state.authorization.accessToken,
  );

  return useQuery({
    queryKey: ["events", userUuid, JSON.stringify(getEventsRequest)],
    queryFn: async () => {
      try {
        const res = await eventApi.get<Page<GetEventsResponse>>(userUuid, {
          params: {
            from: getEventsRequest.from,
            to: getEventsRequest.to,
            zoneId: getEventsRequest.zoneId,
            ...pageable,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        return res.data;
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response?.status === 401) {
          console.log("Refreshing token");
          refreshMutation
            .mutateAsync()
            .then(async (data) => {
              console.log("Token refreshed");
              console.log(data);
              dispatch(setAccessToken(data.data.token));
              const res = await eventApi.get<Page<GetEventsResponse>>(
                userUuid,
                {
                  params: {
                    from: getEventsRequest.from,
                    to: getEventsRequest.to,
                    zoneId: getEventsRequest.zoneId,
                    ...pageable,
                  },
                  headers: {
                    Authorization: `Bearer ${data.data.token}`,
                  },
                },
              );

              return res.data;
            })
            .catch(() => {
              console.log("Token refresh failed");
              return Promise.reject(error);
            });
        }
      }
    },
  });
};
