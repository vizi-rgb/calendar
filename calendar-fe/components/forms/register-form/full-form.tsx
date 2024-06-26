import { object, ref, string } from "yup";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import userService from "@/services/user-service";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterRequest } from "@/dto/auth";

interface RegisterFormInputs {
  email: string;
  name: string;
  surname: string;
  password: string;
  passwordConfirmation: string;
}

const mapRegisterFormInputsToRegisterRequest = (
  inputs: RegisterFormInputs,
): RegisterRequest => {
  return {
    email: inputs.email,
    name: inputs.name,
    surname: inputs.surname,
    password: inputs.password,
  };
};

const schema = object({
  email: string()
    .required("Email jest wymagany")
    .email("Nieprawidłowy format email"),
  name: string()
    .required("Imię jest wymagane")
    .min(2, "Imię musi mieć co najmniej 2 znaki")
    .max(50, "Imię nie może mieć więcej niż 50 znaków"),
  surname: string()
    .required("Nazwisko jest wymagane")
    .min(2, "Nazwisko musi mieć co najmniej 2 znaki")
    .max(50, "Nazwisko nie może mieć więcej niż 50 znaków"),
  password: string()
    .required("Hasło jest wymagane")
    .min(6, "Hasło musi mieć co najmniej 6 znaków")
    .max(60, "Hasło nie może mieć więcej niż 60 znaków"),
  passwordConfirmation: string()
    .required("Potwierdzenie hasła jest wymagane")
    .oneOf(
      [ref("password"), "Hasło i potwierdzenie hasła nie są takie same"],
      "Hasła nie są takie same",
    ),
});

const FullForm = ({
  email,
  onCancel,
}: {
  email: string;
  onCancel: () => void;
}) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordConfirmationShown, setPasswordConfirmationShown] =
    useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const path = usePathname();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
  });

  const onSubmit = (credentials: RegisterFormInputs) => {
    setIsLoading(true);

    userService
      .register(mapRegisterFormInputsToRegisterRequest(credentials))
      .then((res) => {
        const tokenPayload = atob(res.data.token.split(".")[1]);
        const userId = JSON.parse(tokenPayload).userId;
        const url = `${path}/confirmation/${userId}`;

        router.push(url);
      })
      .catch((err) => {
        setError(true);
        setErrorMessage("Błąd rejestracji. Spróbuj ponownie.");
        setIsLoading(false);
      });
  };

  const anyError =
    errors.email ||
    errors.name ||
    errors.surname ||
    errors.password ||
    errors.passwordConfirmation ||
    error;
  const firstErrorMessage =
    errors.email?.message ||
    errors.name?.message ||
    errors.surname?.message ||
    errors.password?.message ||
    errors.passwordConfirmation?.message ||
    errorMessage;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            {anyError && (
              <div className="py-6">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Błąd</AlertTitle>
                  <AlertDescription>{firstErrorMessage}</AlertDescription>
                </Alert>
              </div>
            )}
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="rl9@example.com"
              {...register("email", { value: email })}
              disabled={true}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">Imię</Label>
              <Input id="first-name" {...register("name")} autoFocus={true} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Nazwisko</Label>
              <Input id="last-name" {...register("surname")} />
            </div>
          </div>
          <div className="grid gap-2">
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
          <div className="grid gap-2">
            <Label htmlFor="passwordConfirmation">Potwierdzenie hasła</Label>
            <div className="relative">
              <Input
                id="passwordConfirmation"
                type={passwordConfirmationShown ? "text" : "password"}
                {...register("passwordConfirmation")}
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
          <Button
            variant="outline"
            className="w-full"
            onClick={onCancel}
            disabled={isLoading}
          >
            Powrót
          </Button>
        </div>
      </form>
    </>
  );
};

export default FullForm;
