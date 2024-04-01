import Image from "next/image";
import { Metadata } from "next";
import React from "react";
import SignUpForm from "@/app/sign-up/sign-up-form";

export const metadata: Metadata = {
  title: "Zarejestruj się",
};

export default function SignUp() {
  return (
    <div className="lg:flex lg:flex-row lg:justify-center lg:items-center lg:h-screen">
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] lg:border-2 lg:rounded-lg lg:w-[min(1400px,80vw)] overflow-hidden">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <SignUpForm />
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <Image
            src="/abstract.gif"
            alt="Image"
            width="1000"
            height="1000"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </div>
  );
}
