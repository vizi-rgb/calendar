"use client";
import axios, { AxiosError } from "axios";
import endpoints from "@/api/endpoints";
import { useAppSelector } from "@/lib/hooks";
import { useUserTokenRefreshMutation } from "@/api/user/user-mutation";

export const useEventApiClient = () => {
  const accessToken = useAppSelector(
    (state) => state.authorization.accessToken,
  );

  let refreshTokenMutation = useUserTokenRefreshMutation();

  const client = axios.create({
    baseURL: endpoints.EVENT_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  client.interceptors.response.use(
    (response) => response,

    (error: AxiosError) => {
      if (error.response?.status === 401) {
        refreshTokenMutation.mutate();
        client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      }
    },
  );

  return client;
};
