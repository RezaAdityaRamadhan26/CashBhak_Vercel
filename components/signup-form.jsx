"use client"
import React from "react";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { register } from "@/lib/action";
import Link from "next/link"
import { User, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react"

export function SignupForm({ className, ...props }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  async function handleSubmit(formData) {
    setIsLoading(true);
    await register(formData);
    setIsLoading(false);
  }

  return (
    <form className={cn("space-y-5", className)} {...props} action={handleSubmit}>
      {/* Name Field */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nama Lengkap
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            name="username"
            required
            className="pl-11 py-6 rounded-xl border-gray-200 focus:border-[var(--primary-custom)] focus:ring-[var(--primary-custom)]/20"
          />
        </div>
      </div>

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
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password1"
            placeholder="Minimal 8 karakter"
            required
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
        <p className="text-xs text-gray-500">Minimal 8 karakter</p>
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-2">
        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
          Konfirmasi Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            id="confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            name="password2"
            placeholder="Ulangi password"
            required
            className="pl-11 pr-11 py-6 rounded-xl border-gray-200 focus:border-[var(--primary-custom)] focus:ring-[var(--primary-custom)]/20"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            onClick={() => setShowConfirmPassword((v) => !v)}
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
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
            Membuat akun...
          </>
        ) : (
          'Buat Akun'
        )}
      </Button>

      {/* Divider */}
      <div className="flex items-center gap-4 my-2">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="text-sm text-gray-500">atau</span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      {/* Sign In Link */}
      <p className="text-center text-gray-600">
        Sudah punya akun?{" "}
        <Link href="/login" className="font-semibold text-[var(--primary-custom)] hover:text-[var(--primary-custom)]/80 transition-colors">
          Masuk di sini
        </Link>
      </p>
    </form>
  );
}
