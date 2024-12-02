import axios from "axios";
import endpoints from "@/api/endpoints";

export const useUserApiClient = () => {
  return axios.create({
    baseURL: endpoints.USER_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};
