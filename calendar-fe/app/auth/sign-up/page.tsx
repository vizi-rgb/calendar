import { Metadata } from "next";
import React from "react";
import RegisterForm from "@/components/forms/register-form/register-form";

export const metadata: Metadata = {
  title: "Zarejestruj się",
};

export default function SignUp() {
  return <RegisterForm />;
}
