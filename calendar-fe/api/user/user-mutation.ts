import { useMutation } from "react-query";
import { useUserApiClient } from "@/api/user/user-axios.config";
import { RegisterRequest } from "@/dto/auth";
import {
  clearAuthorizedUser,
  setAccessToken,
} from "@/lib/features/authorization/authorization-slice";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/route-contants";
import { AxiosError } from "axios";

export const useUserTokenRefreshMutation = () => {
  const userApiClient = useUserApiClient();
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => await userApiClient.post("/v1/refresh"),
    onSuccess: (data) => {
      dispatch(setAccessToken(data.data.token));
    },
    onError: (error: AxiosError) => {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
      ) {
        dispatch(clearAuthorizedUser());
        router.push(ROUTES.LOGIN);
      }
    },
  });
};

export const useUserVerifyEmailMutation = () => {
  const userApiClient = useUserApiClient();

  return useMutation({
    mutationFn: async ({
      userId,
      token,
    }: {
      userId: string;
      token: string;
    }) => {
      return userApiClient.post(`/v1/${userId}/verify/${token}`);
    },
  });
};

export const useUserRegisterMutation = () => {
  const userApiClient = useUserApiClient();

  return useMutation({
    mutationFn: async (user: RegisterRequest) => {
      return userApiClient.post("/v1/register", user);
    },
  });
};
