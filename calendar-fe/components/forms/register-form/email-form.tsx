import { object, string } from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import userService from "@/services/user-service";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GoogleButton from "@/components/button/google-button";
import { EmailVerificationRequest } from "@/dto/auth";

const schema = object({
  email: string()
    .email("Nieprawidłowy format email")
    .required("Email jest wymagany"),
});

const EmailForm = ({ onSuccess }: { onSuccess: (data: string) => void }) => {
  const [takenEmail, setTakenEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
  });

  const onSubmit = (credentials: EmailVerificationRequest) => {
    setIsLoading(true);
    userService
      .checkIfEmailIsTaken(credentials)
      .then((res) => {
        onSuccess(credentials.email);
      })
      .catch((err) => {
        setTakenEmail(credentials.email);
        setAuthError(true);
        setErrorMessage(`Email ${takenEmail} jest już zajęty`);
        setIsLoading(false);
      });
  };

  const onGoogleAuthError = () => {
    setAuthError(true);
    setErrorMessage("Nie udało się zalogować przez Google");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            {(errors.email || authError) && (
              <div className="py-6">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Błąd</AlertTitle>
                  <AlertDescription>
                    {errors.email?.message || errorMessage}
                  </AlertDescription>
                </Alert>
              </div>
            )}
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="rl9@example.com"
              {...register("email")}
              autoFocus={true}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            <p className="px-2">Dalej</p>
          </Button>
          <GoogleButton
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            onSuccess={() => router.push("/calendar")}
            onError={onGoogleAuthError}
          />
        </div>
      </form>
    </>
  );
};

export default EmailForm;
