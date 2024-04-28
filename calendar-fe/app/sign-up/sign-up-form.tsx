"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import userService from "@/services/user-service";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

function FullForm({
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

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (password != e.target.passwordConfirmation.value) {
      setError(true);
      setErrorMessage("Hasła nie są takie same");
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
        router.push("/sign-up/confirmation");
      })
      .catch((err) => {
        setError(true);
        setErrorMessage(err.response.data.message);
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
              <button
                className="absolute right-0 top-0 px-2 py-2.5"
                onClick={() => setPasswordShown(!passwordShown)}
              >
                {passwordShown ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </button>
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
              <button
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
              </button>
            </div>
          </div>
          <Button type="submit" className="w-full">
            Zarejestruj się
          </Button>
          <Button variant="outline" className="w-full" onClick={onCancel}>
            Powrót
          </Button>
        </div>
      </form>
    </>
  );
}

function EmailForm({ onSuccess }: { onSuccess: (data: string) => void }) {
  const [email, setEmail] = useState("");
  const [takenEmail, setTakenEmail] = useState("");
  const [isEmailTaken, setIsEmailTaken] = useState(false);

  const onEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    userService
      .checkIfEmailIsTaken(email)
      .then((res) => {
        onSuccess(email);
      })
      .catch((err) => {
        setIsEmailTaken(true);
        setTakenEmail(email);
      });
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            {isEmailTaken && (
              <div className="py-6">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Błąd</AlertTitle>
                  <AlertDescription>
                    Adres email {takenEmail} jest już zajęty
                  </AlertDescription>
                </Alert>
              </div>
            )}
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="rl9@example.com"
              value={email}
              onChange={(e) => onEmailChange(e)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Dalej
          </Button>
          <Button variant="outline" className="w-full">
            Zaloguj się z Google
          </Button>
        </div>
      </form>
    </>
  );
}

export default function SignUpForm() {
  const [isEmailAvailable, setIsEmailAvailable] = useState(false);
  const [email, setEmail] = useState("");

  const handleEmailAvailabilitySuccess = (data: string) => {
    setIsEmailAvailable(true);
    setEmail(data);
  };

  const handleFullFormCancel = () => {
    setIsEmailAvailable(false);
  };

  return (
    <>
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Zarejestruj się</h1>
        <p className="text-balance text-muted-foreground">
          {isEmailAvailable
            ? "Wypełnij pozostałe dane, aby ukończyć proces rejestracji"
            : "Podaj adres email, który zostanie przypisany do twojego konta"}
        </p>
      </div>
      {isEmailAvailable && (
        <FullForm email={email} onCancel={handleFullFormCancel} />
      )}
      {!isEmailAvailable && (
        <EmailForm onSuccess={handleEmailAvailabilitySuccess} />
      )}
      <div className="mt-4 text-center text-sm">
        Masz konto?{" "}
        <Link href="#" className="underline">
          Zaloguj się
        </Link>
      </div>
    </>
  );
}
