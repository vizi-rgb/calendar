"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SignUpForm() {
  const [isEmailAvailable, setIsEmailAvailable] = useState(false);

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
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="rl9@example.com"
            required
          />
        </div>
        {isEmailAvailable && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">Imię</Label>
                <Input id="first-name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Nazwisko</Label>
                <Input id="last-name" required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Hasło</Label>
              <Input id="password" type="password" required />
            </div>
          </>
        )}
        <Button type="submit" className="w-full">
          {isEmailAvailable ? "Zarejestruj się" : "Dalej"}
        </Button>
        <Button variant="outline" className="w-full">
          Zaloguj się z Google
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Masz konto?{" "}
        <Link href="#" className="underline">
          Zaloguj się
        </Link>
      </div>
    </>
  );
}
