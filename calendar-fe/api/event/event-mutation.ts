import { useMutation, useQueryClient } from "react-query";
import { EventFormSchemaData } from "@/components/forms/event-form/event-form.schema";
import { AxiosHeaders } from "axios";
import { eventApiClient } from "@/api/event/event-axios";

export const useEventMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      event,
      authToken,
    }: {
      event: EventFormSchemaData;
      authToken: string | null;
    }) => {
      if (!authToken) {
        return null;
      }

      const header: AxiosHeaders = new AxiosHeaders({
        Authorization: "Bearer " + authToken,
      });

      return eventApiClient.post("", event, { headers: header });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
