import axios from "axios";
import endpoints from "../endpoints";
import User from "@/dto/user";

import {
  AuthResponse,
  EmailVerificationRequest,
  LoginRequest,
  RegisterRequest,
} from "@/dto/auth";

const userApiClient = axios.create({
  baseURL: endpoints.USER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const UserService = {
  checkIfEmailIsTaken: (credentials: EmailVerificationRequest) =>
    userApiClient.get(`/v1/email/${credentials.email}`),

  register: (user: RegisterRequest) =>
    userApiClient.post<AuthResponse>("/v1/register", user),

  login: (credentials: LoginRequest) =>
    userApiClient.post<AuthResponse>("/v1/authenticate", credentials),

  getUser: (userId: string) => userApiClient.get<User>(`/v1/${userId}`),

  verifyEmail: (userId: string, token: string) =>
    userApiClient.post(`/v1/${userId}/verify/${token}`),
};

export default UserService;
