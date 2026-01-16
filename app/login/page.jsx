import { LoginForm } from "@/components/login-form"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Zap } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col p-6 sm:p-8 lg:p-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-3 group">
            <Image src="/images/logo.png" alt="Logo" width={40} height={40} className="group-hover:scale-105 transition-transform" />
            <span className="font-bold text-xl text-[var(--black-custom)]" style={{ fontFamily: "var(--font-poppins)" }}>
              CashBhak
            </span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-[var(--primary-custom)] transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[var(--black-custom)] mb-2" style={{ fontFamily: "var(--font-poppins)" }}>
                Selamat Datang Kembali
              </h1>
              <p className="text-gray-500">
                Masuk ke akun Anda untuk melanjutkan
              </p>
            </div>

            <LoginForm />
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-8">
          © 2026 CashBhak. All Rights Reserved.
        </p>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[var(--primary-custom)] to-[var(--blue-custom)] flex-col justify-center items-center p-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 border border-white rounded-full"></div>
          <div className="absolute bottom-40 right-20 w-60 h-60 border border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/3 w-20 h-20 border border-white rounded-full"></div>
        </div>

        <div className="relative z-10 text-center max-w-lg">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Point of Sale Terbaik
          </div>

          <h2 className="text-3xl xl:text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-poppins)" }}>
            Kelola Bisnis Anda dengan Mudah
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Sistem kasir modern yang membantu ribuan bisnis berkembang di Indonesia
          </p>

          <img
            src="/images/finance.png"
            alt="Finance Illustration"
            className="w-full max-w-md mx-auto drop-shadow-2xl"
          />

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">1000+</p>
              <p className="text-white/70 text-sm">Bisnis Aktif</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">50K+</p>
              <p className="text-white/70 text-sm">Transaksi/Hari</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">99.9%</p>
              <p className="text-white/70 text-sm">Uptime</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
