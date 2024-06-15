import axios, { AxiosResponse } from "axios";
import GoogleIdTokenRequest, {
  GoogleIdTokenResponse,
} from "@/services/dto/google-oauth";
import AuthResponse from "@/services/dto/auth-response";
import endpoints from "@/endpoints";

const oauthClient = axios.create({
  baseURL: endpoints.OAUTH_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const tokenExchangeUri = "https://oauth2.googleapis.com/token";

const OauthService = {
  exchangeGoogleCode: (req: GoogleIdTokenRequest) => {
    const params = new URLSearchParams();
    params.append("code", req.code);
    params.append("client_id", req.client_id);
    params.append("client_secret", req.client_secret);
    params.append("redirect_uri", req.redirect_uri);
    params.append("grant_type", req.grant_type);

    return axios.post<GoogleIdTokenResponse>(tokenExchangeUri, params);
  },

  authenticateWithGoogle: (
    idToken: string,
  ): Promise<AxiosResponse<AuthResponse>> => {
    return oauthClient.post<AuthResponse>("/v1/google", { idToken });
  },
};
export default OauthService;
