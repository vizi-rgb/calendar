"use client";
import axios, { AxiosError } from "axios";
import endpoints from "@/api/endpoints";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useUserTokenRefreshMutation } from "@/api/user/user-mutation";
import { setAccessToken } from "@/lib/features/authorization/authorization-slice";

export const useEventApiClient = () => {
  const accessToken = useAppSelector(
    (state) => state.authorization.accessToken,
  );

  const refreshTokenMutation = useUserTokenRefreshMutation();
  const dispatch = useAppDispatch();

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
        refreshTokenMutation.mutateAsync().then((data) => {
          dispatch(setAccessToken(data.data.token));
          client.defaults.headers.common.Authorization = `Bearer ${data.data.token}`;
        });
      }

      return Promise.reject(error);
    },
  );

  return client;
};
