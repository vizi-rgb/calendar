import { Metadata } from "next";
import React from "react";
import SignUpForm from "@/app/sign-up/sign-up-form";

export const metadata: Metadata = {
  title: "Zarejestruj się",
};

export default function SignUp() {
  return <SignUpForm />;
}
