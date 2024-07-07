"use client";

import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import userService from "@/services/user-service";
import { AlertCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import GoogleButton from "@/components/button/google-button";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginRequest } from "@/dto/auth";
import { useAppDispatch } from "@/lib/hooks";
import { storeAuthorizedUser } from "@/lib/features/authorization/authorization-slice";
import { AxiosError } from "axios";

const schema = object({
  email: string()
    .email("Nieprawidłowy format email")
    .required("Email jest wymagany"),
  password: string()
    .min(6, "Hasło musi mieć co najmiej 6 znaków")
    .max(60, "Hasło może mieć maksymalnie 60 znaków")
    .required("Hasło jest wymagane"),
});

export default function LoginForm() {
  const [authError, setAuthError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
  });

  const onSuccess = (data: any) => {
    dispatch(storeAuthorizedUser(data));
    router.push("/calendar");
  };

  const onError = (error: AxiosError) => {
    setAuthError(true);
    setErrorMessage("Nieprawidłowy email lub hasło");
  };

  const onSubmit = (credentials: LoginRequest) => {
    setIsLoading(true);

    userService.login({
      credentials: credentials,
      onSuccess: onSuccess,
      onError: onError,
      doFinally: () => setIsLoading(false),
    });
  };

  return (
    <>
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Zaloguj się</h1>
        <p className="text-balance text-muted-foreground">
          Wpisz adres email oraz hasło, aby zalogować się do swojego konta.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          {(errors.email || errors.password || authError) && (
            <div className="py-6">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Błąd</AlertTitle>
                <AlertDescription>
                  {errors.email?.message ||
                    errors.password?.message ||
                    errorMessage}
                </AlertDescription>
              </Alert>
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="rl9@example.com"
              {...register("email")}
              autoFocus={true}
            />
            <Label htmlFor="password">Hasło</Label>
            <div className="relative">
              <Input
                id="password"
                type={passwordShown ? "text" : "password"}
                className="pr-8"
                {...register("password")}
              />
              <div
                className="absolute right-0 top-0 px-2 py-2.5"
                onClick={() => setPasswordShown(!passwordShown)}
              >
                {passwordShown ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </div>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            <p className="px-2">Zaloguj się</p>
          </Button>
          <GoogleButton
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            callback={() => router.push("/calendar")}
          />
        </div>
      </form>
      <div className="mt-4 text-center text-sm">
        Nie masz konta?{" "}
        <Link href="sign-up" className="underline">
          Zarejestruj się
        </Link>
      </div>
    </>
  );
}
