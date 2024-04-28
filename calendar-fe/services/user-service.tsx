import axios, { AxiosPromise } from "axios";
import endpoints from "../endpoints";
import RegisterUserRequest from "@/services/dto/register-user-request";

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

  register: async (user: RegisterUserRequest) => {
    return userApiClient.post("/v1/register", user);
  },
};
export default UserService;
