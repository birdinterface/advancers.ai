"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import { AuthForm } from "@/components/custom/auth-form";
import { SubmitButton } from "@/components/custom/submit-button";

import { register, RegisterActionState } from "../actions";

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [state, formAction] = useActionState<RegisterActionState, FormData>(
    register,
    {
      status: "idle",
    },
  );

  useEffect(() => {
    if (state.status === "user_exists") {
      toast.error("Account already exists");
    } else if (state.status === "failed") {
      toast.error("Failed to create account");
    } else if (state.status === "success") {
      toast.success("Account created successfully");
      router.refresh();
    }
  }, [state, router]);

  const handleSubmit = (formData: FormData) => {
    setEmail(formData.get("email") as string);
    formAction(formData);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background" style={{ marginTop: '-40px' }}>
      <div className="w-full max-w-md rounded-2xl gap-12 flex flex-col">
        <div className="flex flex-col items-center justify-center gap-6 px-4 text-center sm:px-16">
          <div className="p-12 -m-12">
            <img
              src="/images/blur.png"
              alt="Logo"
              className="size-[80px]"
              style={{ filter: 'blur(15px)' }}
              draggable={false}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold dark:text-zinc-50">Sign Up</h3>
            <p className="text-sm text-gray-500 dark:text-zinc-400">
              Create an account with google or your email
            </p>
          </div>
        </div>
        <AuthForm action={handleSubmit} defaultEmail={email} showNameField={true}>
          <SubmitButton>Sign Up</SubmitButton>
          <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
            {"Already have an account? "}
            <Link
              href="/login"
              className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
            >
              Sign in
            </Link>
            {" instead."}
          </p>
        </AuthForm>
        <div className="text-center">
          <Link
            href="/welcome"
            className="text-sm text-gray-500 hover:text-gray-800 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            Learn more about AdvancersAI →
          </Link>
        </div>
      </div>
    </div>
  );
}
