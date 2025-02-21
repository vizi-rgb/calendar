import axios, { AxiosError } from "axios";
import endpoints from "../api/endpoints";
import User from "@/dto/user";
import jwt, { JwtPayload } from "jsonwebtoken";

import {
  AuthResponse,
  EmailVerificationRequest,
  LoginRequest,
  RegisterRequest,
} from "@/dto/auth";

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

const decodeJwt = (token: string) => {
  return jwt.decode(token, { complete: true });
};

const userApiClient = axios.create({
  baseURL: endpoints.USER_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const UserService = {
  checkIfEmailIsTaken: (credentials: EmailVerificationRequest) =>
    userApiClient.get(`/v1/email/${credentials.email}`),

  register: (user: RegisterRequest) =>
    userApiClient.post<AuthResponse>("/v1/register", user),

  login: ({
    credentials,
    onSuccess,
    onError,
    doFinally,
  }: {
    credentials: LoginRequest;
    onSuccess: (response: any) => void;
    onError: (error: AxiosError) => void;
    doFinally: () => void;
  }) => {
    userApiClient
      .post<AuthResponse>("/v1/authenticate", credentials)
      .then(async (response) => {
        const accessToken = response.data.token;
        const decoded = decodeJwt(accessToken);
        if (!decoded || !(decoded.payload as CustomJwtPayload).userId) {
          throw new Error("Invalid token");
        }

        const user = (
          await UserService.getUser(
            (decoded.payload as CustomJwtPayload).userId,
          )
        ).data;

        onSuccess({ accessToken, user });
      })
      .catch(onError)
      .finally(doFinally);
  },

  getUser: (userId: string) => userApiClient.get<User>(`/v1/${userId}`),

  verifyEmail: (userId: string, token: string) =>
    userApiClient.post(`/v1/${userId}/verify/${token}`),

  refresh() {
    return userApiClient.post("/v1/refresh");
  },
};

export default UserService;
