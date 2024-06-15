"use client";
import { useState } from "react";
import userService from "@/services/user-service";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GoogleSignInButton from "@/app/auth/google-signin-button";

export default function EmailForm({
  onSuccess,
}: {
  onSuccess: (data: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [takenEmail, setTakenEmail] = useState("");
  const [isEmailTaken, setIsEmailTaken] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const onEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    userService
      .checkIfEmailIsTaken(email)
      .then((res) => {
        onSuccess(email);
      })
      .catch((err) => {
        setIsEmailTaken(true);
        setIsLoading(false);
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
              autoFocus={true}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            <p className="px-2">Dalej</p>
          </Button>
          <GoogleSignInButton isLoading={isLoading} />
        </div>
      </form>
    </>
  );
}
