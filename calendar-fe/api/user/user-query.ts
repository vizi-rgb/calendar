import { EmailVerificationRequest } from "@/dto/auth";
import { useQuery } from "react-query";
import { useUserApiClient } from "@/api/user/user-axios.config";

export const useUserEmailIsTakenQuery = (
  credentials: EmailVerificationRequest,
) => {
  const userApiClient = useUserApiClient();
  return useQuery({
    queryKey: ["email", credentials.email],
    queryFn: async () => {
      const res = await userApiClient.get(`/v1/email/${credentials.email}`);
      return res.data;
    },
  });
};

export const useUserGetQuery = (userId: string) => {
  const userApiClient = useUserApiClient();
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const res = await userApiClient.get(`/v1/${userId}`);
      return res.data;
    },
  });
};
