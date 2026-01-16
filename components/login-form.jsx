
"use client"
import React from "react";
import { toast } from "sonner";
import { useNotifications } from "@/context/NotificationContext";
import { signIn } from "next-auth/react"
import { redirect } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react"

export function LoginForm({ className, ...props }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { addNotification } = useNotifications();

  async function handleLogin(formData) {
    setIsLoading(true);
    const response = await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
    })

    if (!response.ok) {
      setIsLoading(false);
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
    <form className={cn("space-y-6", className)} {...props} action={handleLogin}>
      {/* Email Field */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            id="email"
            type="email"
            placeholder="nama@email.com"
            name="email"
            required
            className="pl-11 py-6 rounded-xl border-gray-200 focus:border-[var(--primary-custom)] focus:ring-[var(--primary-custom)]/20"
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <button
            type="button"
            className="text-sm text-[var(--primary-custom)] hover:text-[var(--primary-custom)]/80 transition-colors"
          >
            Lupa password?
          </button>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Masukkan password"
            required
            autoComplete="current-password"
            className="pl-11 pr-11 py-6 rounded-xl border-gray-200 focus:border-[var(--primary-custom)] focus:ring-[var(--primary-custom)]/20"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full py-6 rounded-xl bg-[var(--primary-custom)] hover:bg-[var(--primary-custom)]/90 text-white font-semibold transition-all duration-300 shadow-lg shadow-[var(--primary-custom)]/30 hover:shadow-xl hover:shadow-[var(--primary-custom)]/40"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Memproses...
          </>
        ) : (
          'Masuk'
        )}
      </Button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">atau</span>
        </div>
      </div>

      {/* Sign Up Link */}
      <p className="text-center text-gray-600">
        Belum punya akun?{" "}
        <Link href="/signup" className="font-semibold text-[var(--primary-custom)] hover:text-[var(--primary-custom)]/80 transition-colors">
          Daftar sekarang
        </Link>
      </p>
    </form>
  );
}
