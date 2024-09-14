"use client";
import React, { useEffect, useState } from "react";
import userService from "@/services/user-service";
import User from "@/dto/user";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/route-contants";

export default function EmailVerificationConfirmation({
  params,
}: {
  params: { userId: string; token: string };
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    userService
      .getUser(params.userId)
      .then((res) => setUser(res.data))
      .catch(() => setIsSuccess(false));

    userService
      .verifyEmail(params.userId, params.token)
      .then(() => setIsSuccess(true))
      .catch(() => setIsSuccess(false));

    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <h1>
          Weryfikowanie adresu email
          <Loader2 className="animate-spin w-10 h-10" />
        </h1>
      ) : (
        <div className="flex flex-col gap-y-4">
          {isSuccess ? (
            <h1>Adres email został pomyślnie zweryfikowany</h1>
          ) : (
            <h1>Wystąpił błąd podczas weryfikacji adresu email</h1>
          )}
          {isSuccess ? (
            <>
              <p>Twój adres {user?.email} został pomyślnie zweryfikowany.</p>
              <hr />
              <Button
                variant={"outline"}
                onClick={() => router.push(ROUTES.LOGIN)}
              >
                Przejdź do logowania
              </Button>
            </>
          ) : (
            <Button variant={"outline"} disabled={isLoading}>
              Wyślij ponownie link
            </Button>
          )}
        </div>
      )}
    </>
  );
}
