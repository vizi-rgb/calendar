import axios, { AxiosPromise } from "axios";
import endpoints from "../endpoints";
import UserResource from "@/services/dto/user-resource";
import RegisterResponse from "@/services/dto/register-response";

const userApiClient = axios.create({
  baseURL: endpoints.USER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const UserService = {
  checkIfEmailIsTaken: (email: string): Promise<AxiosPromise> => {
    return userApiClient.get(`/v1/email/${email}`);
  },

  register: async (user: UserResource) => {
    return userApiClient.post<RegisterResponse>("/v1/register", user);
  },

  getUser: (userId: string) => userApiClient.get<UserResource>(`/v1/${userId}`),
};
export default UserService;
