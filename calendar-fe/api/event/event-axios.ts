"use client";
import axios, { AxiosError } from "axios";
import endpoints from "@/api/endpoints";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/route-contants";
import { clearAuthorizedUser } from "@/lib/features/authorization/authorization-slice";

export const useEventApiClient = () => {
  const accessToken = useAppSelector(
    (state) => state.authorization.accessToken,
  );
  const router = useRouter();
  const dispatch = useAppDispatch();

  return useMemo(() => {
    const client = axios.create({
      baseURL: endpoints.EVENT_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    client.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    });

    client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
          dispatch(clearAuthorizedUser());
          router.push(ROUTES.LOGIN);
        }

        return Promise.reject(error);
      },
    );

    return client;
  }, [accessToken]);
};
