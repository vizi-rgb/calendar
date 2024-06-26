"use client";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import oauthService from "@/services/oauth-service";
import { AxiosResponse } from "axios";
import userService from "@/services/user-service";
import { useAppDispatch } from "@/lib/hooks";
import { storeAuthorizedUser } from "@/lib/features/authorization/authorization-slice";
import {
  AuthResponse,
  GoogleIdTokenRequest,
  GoogleIdTokenResponse,
} from "@/dto/auth";

const jwt = require("jsonwebtoken");

export default function GoogleSignInButton({
  isLoading,
  setIsLoading,
  callback,
}: {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  callback: () => void;
}) {
  const dispatch = useAppDispatch();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setIsLoading(true);
      const googleTokenRequest: GoogleIdTokenRequest = {
        code: tokenResponse.code,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
        redirect_uri: "http://localhost:3000",
        grant_type: "authorization_code",
      };

      oauthService
        .exchangeGoogleCode(googleTokenRequest)
        .then((res: AxiosResponse<GoogleIdTokenResponse>) => {
          const idToken = res.data.id_token;
          return oauthService.authenticateWithGoogle(idToken);
        })
        .then((res: AxiosResponse<AuthResponse>) => {
          const accessToken = res.data.token;
          const decoded = jwt.decode(accessToken, { complete: true });
          return userService
            .getUser(decoded.payload.userId)
            .then((userRes) => ({
              accessToken,
              user: userRes.data,
            }));
        })
        .then((authorizedUser) => {
          dispatch(storeAuthorizedUser(authorizedUser));
          callback();
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error during authentication process:", error);
        });
    },
    onError: (error) => {
      setIsLoading(false);
      console.error(error);
    },
    flow: "auth-code",
  });

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      disabled={isLoading}
      onClick={login}
    >
      Zaloguj się z Google
    </Button>
  );
}
