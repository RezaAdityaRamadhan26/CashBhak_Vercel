
"use client"
import React from "react";
import { toast } from "sonner";
import { useNotifications } from "@/context/NotificationContext";

import { signIn } from "next-auth/react"
import { redirect } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function LoginForm({ className, ...props }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const { addNotification } = useNotifications();

  async function handleLogin(formData) {
    const response = await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
    })

    if (!response.ok) {
      toast.error('Gagal login. Periksa email atau password.');
      return null
    }

    toast.success('Login berhasil!');
    addNotification({
      type: 'success',
      title: 'Login Berhasil',
      description: 'Anda telah berhasil masuk ke akun Anda.',
    });
    redirect("/dashboard")
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} action={handleLogin}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="m@example.com" name="email" required />
        </Field>
        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <button
              type="button"
              tabIndex={-1}
              className="text-xs text-blue-500 hover:underline ml-2"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            required
            autoComplete="current-password"
          />
        </Field>
        <Field>
          <Button type="submit" className='bg-[var(--primary-custom)]'>Login</Button>
        </Field>

        <Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline underline-offset-4 text-blue-400">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
