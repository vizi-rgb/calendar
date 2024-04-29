"use client";
import { useEffect, useState } from "react";
import userService from "@/services/user-service";
import UserResource from "@/services/dto/user-resource";
import { Button } from "@/components/ui/button";

export default function SignUpConfirmation({
  params,
}: {
  params: { userId: string };
}) {
  const [user, setUser] = useState<UserResource | null>(null);

  useEffect(() => {
    userService.getUser(params.userId).then((res) => setUser(res.data));
  }, []);

  return (
    <div className="flex flex-col gap-y-4">
      <h1>Konto zostało zarejestrowane pomyślnie</h1>
      <hr />
      <p>
        Witaj {user?.name}! Aby korzystać z serwisu, potwierdź swój adres email
        - na adres <strong>{user?.email}</strong> został przesłany link
        aktywacyjny.
      </p>
      <Button variant={"outline"}>Wyślij link aktywacyjny ponownie</Button>
    </div>
  );
}
