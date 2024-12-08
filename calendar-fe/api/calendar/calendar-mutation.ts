import { useMutation } from "react-query";
import { useCalendarApiClient } from "@/api/calendar/calendar-axios.config";
import { useAppSelector } from "@/lib/hooks";

export const useCalendarExportMutation = () => {
  const calendarApiClient = useCalendarApiClient();
  const user = useAppSelector((state) => state.authorization.user);

  return useMutation({
    mutationFn: async (userId: string) => {
      const res = await calendarApiClient.get(`/v1/export/${userId}`, {
        responseType: "blob",
      });

      // create file link in browser's memory
      const href = URL.createObjectURL(res.data);

      // create "a" HTML element with href to file & click
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", user.email + ".ics"); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    },
    retry: (count) => count < 2,
  });
};
