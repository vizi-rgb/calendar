import { Metadata } from "next";
import LoginForm from "@/components/forms/login-form/login-form";

export const metadata: Metadata = {
  title: "Zaloguj się",
};

export default function SignIn() {
  return <LoginForm />;
}
