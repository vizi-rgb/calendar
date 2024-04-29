"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import userService from "@/services/user-service";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default function FullForm({
  email,
  onCancel,
}: {
  email: string;
  onCancel: () => void;
}) {
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordConfirmationShown, setPasswordConfirmationShown] =
    useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const path = usePathname();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    if (password != e.target.passwordConfirmation.value) {
      setError(true);
      setErrorMessage("Hasła nie są takie same");
      setIsLoading(false);
      return;
    }

    userService
      .register({
        email: email,
        name: name,
        surname: surname,
        password: password,
      })
      .then((res) => {
        const userId = res.data.userId;
        const url = `${path}/confirmation/${userId}`;

        router.push(url);
      })
      .catch((err) => {
        setError(true);
        setErrorMessage("Błąd rejestracji. Spróbuj ponownie.");
        setIsLoading(false);
      });
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            {error && (
              <div className="py-6">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Błąd</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              </div>
            )}
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="rl9@example.com"
              value={email}
              disabled={true}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">Imię</Label>
              <Input
                id="first-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus={true}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Nazwisko</Label>
              <Input
                id="last-name"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid gap-2">
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
          <div className="grid gap-2">
            <Label htmlFor="passwordConfirmation">Potwierdzenie hasła</Label>
            <div className="relative">
              <Input
                id="passwordConfirmation"
                type={passwordConfirmationShown ? "text" : "password"}
                required
                className="pr-8"
              />
              <div
                className="absolute right-0 top-0 p-2.5"
                onClick={() =>
                  setPasswordConfirmationShown(!passwordConfirmationShown)
                }
              >
                {passwordConfirmationShown ? (
                  <EyeOpenIcon />
                ) : (
                  <EyeClosedIcon />
                )}
              </div>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            <p className="px-2">Zarejestruj się</p>
          </Button>
          <Button variant="outline" className="w-full" onClick={onCancel}>
            Powrót
          </Button>
        </div>
      </form>
    </>
  );
}
