"use client";

import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import userService from "@/services/user-service";
import { LoginRequest } from "@/services/dto/login-request";
import { AlertCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import GoogleSignInButton from "@/app/auth/google-signin-button";

export default function SignInForm() {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    const credentials: LoginRequest = {
      email,
      password,
    };

    userService
      .login(credentials)
      .then((response) => {
        console.log(response.data);
        router.push("/calendar");
      })
      .catch((error) => {
        setError(true);
        setErrorMessage("Nieprawidłowy email lub hasło");
        console.log(error.response.data);
      })
      .finally(() => {
        setIsLoading(false);
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
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="grid gap-4">
          {error && (
            <div className="py-6">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Błąd</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="rl9@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus={true}
              required
            />
            <Label htmlFor="password">Hasło</Label>
            <div className="relative">
              <Input
                id="password"
                type={passwordShown ? "text" : "password"}
                required
                className="pr-8"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          <GoogleSignInButton isLoading={isLoading} />
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
