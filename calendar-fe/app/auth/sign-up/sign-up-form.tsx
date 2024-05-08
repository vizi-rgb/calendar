"use client";
import { useState } from "react";
import Link from "next/link";
import EmailForm from "@/app/auth/sign-up/email-form";
import FullForm from "@/app/auth/sign-up/full-form";

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
        <Link href="sign-in" className="underline">
          Zaloguj się
        </Link>
      </div>
    </>
  );
}
