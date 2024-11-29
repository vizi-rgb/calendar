import axios from "axios";
import endpoints from "@/endpoints";

export const eventApiClient = axios.create({
  baseURL: endpoints.EVENT_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
