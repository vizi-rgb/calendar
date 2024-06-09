import { Metadata } from "next";
import SignInForm from "@/app/auth/sign-in/sign-in-form";

export const metadata: Metadata = {
  title: "Zaloguj się",
};

export default function SignIn() {
  return <SignInForm />;
}
